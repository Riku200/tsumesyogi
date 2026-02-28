let gameBoard;
let selectedPieceCell = null; // 現在選択されている駒のセル座標 {row, col}
let selectedCapturedPiece = null; // 現在選択されている持ち駒 {player, pieceType}
let lastMovedCell = null; // 最後に駒が動いた、または打たれたセル座標 {row, col}
let currentPlayer = PLAYER.SENTE; // 現在のターン (初期は先手)
let isPuzzleMode = false;         // 詰将棋モードかどうか
let currentPuzzle = null;         // 現在のパズルデータ

document.addEventListener('DOMContentLoaded', () => {
    // 盤面データを初期化
    gameBoard = new Board();
    gameBoard.setupInitialPosition();

    // DOMへ描画
    renderBoard();

    // イベントリスナーの登録
    document.getElementById('btn-start').addEventListener('click', () => {
        isPuzzleMode = false;
        currentPuzzle = null;
        document.getElementById('game-title').textContent = "通常対局";
        initGame();
        showScreen('game-screen');
    });

    const btnPuzzleMenu = document.getElementById('btn-puzzle-menu');
    if (btnPuzzleMenu) {
        btnPuzzleMenu.addEventListener('click', () => {
            renderPuzzleList();
            showScreen('puzzle-select-screen');
        });
    }

    document.getElementById('btn-back-to-home').addEventListener('click', () => {
        showScreen('home-screen');
    });

    document.getElementById('btn-back-to-menu').addEventListener('click', () => {
        showScreen('home-screen');
    });

    // 初期状態はホーム画面を表示
    showScreen('home-screen');
});

/**
 * 画面の切り替えを行う
 */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

/**
 * 詰将棋のリストを描画する
 */
function renderPuzzleList() {
    const listContainer = document.getElementById('puzzle-list');
    listContainer.innerHTML = '';

    PUZZLES.forEach(puzzle => {
        const btn = document.createElement('button');
        btn.classList.add('puzzle-btn');
        btn.innerHTML = `<strong>${puzzle.title}</strong><br><small>${puzzle.movesToMate}手詰め</small>`;

        btn.addEventListener('click', () => {
            isPuzzleMode = true;
            currentPuzzle = puzzle;
            document.getElementById('game-title').textContent = puzzle.title;
            initPuzzle(puzzle);
            showScreen('game-screen');
        });

        listContainer.appendChild(btn);
    });
}

/**
 * 将棋盤のDOM要素を現在のgameBoardの状態で再描画する関数
 */
function renderBoard() {
    const boardElement = document.getElementById('shogi-board');
    boardElement.innerHTML = '';

    // 9x9の盤面を描画 (内部配列と同じ0-indexedで回す)
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            // セルクリック時のイベントを追加
            cell.addEventListener('click', () => handleCellClick(row, col));

            const piece = gameBoard.getPiece(row, col);
            if (piece) {
                // 駒の形を作るための内部要素を作成
                const pieceShape = document.createElement('div');
                pieceShape.classList.add('piece-shape');

                const pieceText = document.createElement('span');
                pieceText.textContent = piece.displayName;
                pieceShape.appendChild(pieceText);

                // 持ち主によるスタイリング（後手は文字をひっくり返すなど）を追加
                if (piece.owner === PLAYER.GOTE) {
                    pieceShape.classList.add('gote-piece');
                } else {
                    pieceShape.classList.add('sente-piece');
                }

                cell.appendChild(pieceShape);
            }

            // 選択中のセルや移動可能範囲のハイライトを復元
            if (selectedPieceCell && selectedPieceCell.row === row && selectedPieceCell.col === col) {
                cell.classList.add('selected');
            }

            // 最後に動かした駒のハイライト
            if (lastMovedCell && lastMovedCell.row === row && lastMovedCell.col === col) {
                cell.classList.add('last-moved');
            }

            boardElement.appendChild(cell);
        }
    }

    // 駒台の描画
    renderHand(PLAYER.SENTE, 'player-hand');
    renderHand(PLAYER.GOTE, 'opponent-hand');
}

function renderHand(player, elementId) {
    const container = document.querySelector(`#${elementId} .pieces-container`);
    container.innerHTML = '';

    const hand = gameBoard.capturedPieces[player];
    if (!hand || hand.length === 0) return;

    // 駒の種類ごとにまとめる
    const counts = {};
    const piecesByType = {};
    hand.forEach(p => {
        if (!counts[p.type.id]) {
            counts[p.type.id] = 0;
            piecesByType[p.type.id] = p;
        }
        counts[p.type.id]++;
    });

    for (const typeId in counts) {
        const p = piecesByType[typeId];
        const pieceEl = document.createElement('div');
        pieceEl.classList.add('hand-piece');
        pieceEl.textContent = `${p.displayName} x${counts[typeId]}`;

        // 後手の持ち駒は文字を反転させる
        if (player === PLAYER.GOTE) {
            pieceEl.classList.add('gote-piece');
        }

        // 選択された持ち駒のハイライト復元
        if (selectedCapturedPiece && selectedCapturedPiece.player === player && selectedCapturedPiece.pieceType.id === p.type.id) {
            pieceEl.classList.add('selected');
        }

        pieceEl.addEventListener('click', () => handleHandPieceClick(player, p.type));

        container.appendChild(pieceEl);
    }
}

function initGame() {
    gameBoard.setupInitialPosition();
    currentPlayer = PLAYER.SENTE;
    lastMovedCell = null;
    clearSelection();
    renderBoard();
}

/**
 * 詰将棋を初期化する
 */
function initPuzzle(puzzle) {
    gameBoard.loadPuzzle(puzzle);
    currentPlayer = PLAYER.SENTE;
    lastMovedCell = null;
    clearSelection();
    renderBoard();
}

/**
 * 持ち駒がクリックされたときの処理
 */
function handleHandPieceClick(player, pieceType) {
    if (player !== currentPlayer) return; // 相手の手番の持ち駒は選べない

    clearSelection();
    selectedCapturedPiece = { player, pieceType };

    renderBoard();

    // 盤面の打てる場所をハイライト
    const validDrops = gameBoard.getValidDrops(player, pieceType);
    validDrops.forEach(m => {
        const moveElement = document.querySelector(`.cell[data-row="${m.row}"][data-col="${m.col}"]`);
        if (moveElement) {
            moveElement.classList.add('valid-move');
        }
    });
}

/**
 * 盤面のマスがクリックされたときの処理
 */
function handleCellClick(row, col) {
    // 持ち駒が選択されている場合 -> 打つ
    if (selectedCapturedPiece) {
        const { player, pieceType } = selectedCapturedPiece;

        const validDrops = gameBoard.getValidDrops(player, pieceType);
        const isValidDrop = validDrops.some(m => m.row === row && m.col === col);

        if (isValidDrop) {
            gameBoard.dropPiece(player, pieceType, row, col);

            lastMovedCell = { row, col };
            clearSelection();

            // 詰将棋モードの判定を差し込む
            if (isPuzzleMode && player === PLAYER.SENTE) {
                if (!checkPuzzleCondition()) {
                    return; // 失敗してリセットされる場合はここで打ち切り
                }
            }

            // ターンの交代
            currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;
            renderBoard();
            return;
        } else {
            // 打てない場所がクリックされた場合は選択を解除し、マスの駒を選択し直すか判定
            clearSelection();
            const clickedPiece = gameBoard.getPiece(row, col);
            if (clickedPiece && clickedPiece.owner === currentPlayer) {
                selectPiece(row, col);
            }
            return;
        }
    }

    // 既に盤面の駒が選択されている場合 -> 移動もしくは選択解除
    if (selectedPieceCell) {
        const { row: selRow, col: selCol } = selectedPieceCell;

        // 同じマスをクリックした場合は選択解除
        if (selRow === row && selCol === col) {
            clearSelection();
            return;
        }

        // 移動できるかどうかの判定
        const validMoves = gameBoard.getValidMoves(selRow, selCol);
        const isValidMove = validMoves.some(m => m.row === row && m.col === col);

        if (isValidMove) {
            const movingPiece = gameBoard.getPiece(selRow, selCol);
            let promote = false;

            // 成りの判定 (相手陣地に入った、または相手陣地から出た)
            if (movingPiece.type.canPromote && !movingPiece.isPromoted) {
                const isEnterSenteEnemyZone = currentPlayer === PLAYER.SENTE && (row <= 2 || selRow <= 2);
                const isEnterGoteEnemyZone = currentPlayer === PLAYER.GOTE && (row >= 6 || selRow >= 6);

                if (isEnterSenteEnemyZone || isEnterGoteEnemyZone) {
                    // 強制成りの判定（歩、香車の1段目、桂馬の1,2段目）
                    let mustPromote = false;
                    if (currentPlayer === PLAYER.SENTE) {
                        if ((movingPiece.type.id === 'fu' || movingPiece.type.id === 'kyosha') && row === 0) mustPromote = true;
                        if (movingPiece.type.id === 'keima' && row <= 1) mustPromote = true;
                    } else {
                        if ((movingPiece.type.id === 'fu' || movingPiece.type.id === 'kyosha') && row === 8) mustPromote = true;
                        if (movingPiece.type.id === 'keima' && row >= 7) mustPromote = true;
                    }

                    if (mustPromote) {
                        promote = true;
                    } else {
                        promote = confirm("成りますか？");
                    }
                }
            }

            // 移動処理
            gameBoard.movePiece(selRow, selCol, row, col);

            // 成りを適用
            if (promote) {
                const movedPiece = gameBoard.getPiece(row, col);
                movedPiece.isPromoted = true;
            }

            lastMovedCell = { row, col };
            clearSelection();

            // 詰将棋モードの判定を差し込む
            if (isPuzzleMode && currentPlayer === PLAYER.SENTE) { // 移動前はcurrentPlayer
                if (!checkPuzzleCondition()) {
                    return;
                }
            }

            // ターンの交代
            currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;

            renderBoard();
        } else {
            // 移動できないマスがクリックされたが、それが自分の別の駒なら選択し直す
            const clickedPiece = gameBoard.getPiece(row, col);
            if (clickedPiece && clickedPiece.owner === currentPlayer) {
                selectPiece(row, col);
            } else {
                clearSelection();
            }
        }
    }
    // 駒が選択されていない場合 -> 自分の駒なら選択
    else {
        const piece = gameBoard.getPiece(row, col);
        if (piece && piece.owner === currentPlayer) {
            selectPiece(row, col);
        }
    }
}

/**
 * 駒を選択状態にする
 */
function selectPiece(row, col) {
    clearSelection(); // 一旦既存の選択をクリア
    selectedPieceCell = { row, col };

    // 選択されたセルにハイライトを付与
    const selectedElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (selectedElement) {
        selectedElement.classList.add('selected');
    }

    // 移動可能範囲をハイライト
    const validMoves = gameBoard.getValidMoves(row, col);
    validMoves.forEach(m => {
        const moveElement = document.querySelector(`.cell[data-row="${m.row}"][data-col="${m.col}"]`);
        if (moveElement) {
            moveElement.classList.add('valid-move');
        }
    });
}

/**
 * 選択状態を解除する
 */
/**
 * 詰将棋のクリア・失敗判定（先手の手番終了直後に呼ばれる）
 */
function checkPuzzleCondition() {
    // 1. 王手がかかっているか？
    if (!gameBoard.isCheck(PLAYER.GOTE)) {
        setTimeout(() => {
            alert("不正解！王手をかけてください。");
            initPuzzle(currentPuzzle);
        }, 300);
        return false;
    }

    // 2. 玉方（後手）に、王手を回避できる合法手（逃げる、合駒、駒を取る）があるか？
    const hasValidEscapeMove = checkGoteHasEscapeMove();

    if (!hasValidEscapeMove) {
        // 詰み！
        setTimeout(() => {
            alert("正解！詰みです！");
            // 次の問題へ進むなどの処理をここに追加
        }, 300);
        return true;
    }

    // 回避可能ならゲーム続行（本来はここでCPUが最適な逃げ方をするが今回は一旦何もしないか固定の手を指す）
    setTimeout(() => {
        alert("玉に逃げ道があります（未詰み）。");
        initPuzzle(currentPuzzle);
    }, 500);
    return false;
}

/**
 * 後手（玉方）に、王手を外す合法手が存在するかどうかを調べる
 */
function checkGoteHasEscapeMove() {
    // 盤上の駒の移動による回避
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const p = gameBoard.grid[r][c];
            if (p && p.owner === PLAYER.GOTE) {
                const validMoves = gameBoard.getValidMoves(r, c);
                if (validMoves.length > 0) {
                    return true; // 1つでも王手放置にならない手があれば回避可能
                }
            }
        }
    }

    // 持ち駒を打つこと（合駒）による回避
    const goteHand = gameBoard.capturedPieces[PLAYER.GOTE];
    if (goteHand.length > 0) {
        // 全ての空きマスに対して、持ち駒を打つ合法手があるか確認
        // (getValidDrops には自玉の王手放置チェックが含まれている)
        for (let i = 0; i < goteHand.length; i++) {
            const pieceType = goteHand[i];
            const validDrops = gameBoard.getValidDrops(PLAYER.GOTE, pieceType);
            if (validDrops.length > 0) {
                return true; // 1つでも打てるマス（合駒で王手を防げるマス）があれば回避可能
            }
        }
    }

    // 何も手がなければ詰み
    return false;
}

function clearSelection() {
    selectedPieceCell = null;
    selectedCapturedPiece = null;
    document.querySelectorAll('.cell.selected').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.cell.valid-move').forEach(el => el.classList.remove('valid-move'));
    // 持ち駒の選択状態も解除
    document.querySelectorAll('.hand-piece.selected').forEach(el => el.classList.remove('selected'));
}

