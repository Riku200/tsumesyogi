// --- main.js ---
let gameBoard;
let selectedPieceCell = null;
let selectedCapturedPiece = null;
let lastMovedCell = null;
let currentPlayer = PLAYER.SENTE;
let isPuzzleMode = false;
let isReplayMode = false; // ★追加：検討(リプレイ)モードかどうかの判定
let replayMoves = [];     // ★追加：解読した棋譜データ
let currentReplayStep = 0;// ★追加：現在何手目を見ているか
let currentPuzzle = null;
let currentPuzzleStep = 0;
let aiManager = null;
let hasViewedHint = false;
let isAIMatchMode = false; // ★AI対局モードかどうかのフラグ
let gameHistory = [];      // ★追加：指し手の履歴（Undo用）


document.addEventListener('DOMContentLoaded', () => {
    // オーディオ設定の反映（UI初期化）
    AudioManager.loadSettings();

    // ユーザー操作でBGM再生開始
    document.addEventListener('click', () => {
        AudioManager.playBGM();
    }, { once: true });

    // 初期状態はホーム画面なのでクラスを付与
    document.body.classList.add('on-home-screen');

    // 盤面データを初期化
    gameBoard = new Board();
    gameBoard.setupInitialPosition();

    // DOMへ描画
    renderBoard();

    // AIマネージャ初期化
    if (typeof AIManager !== 'undefined') {
        aiManager = new AIManager();
    }

    // イベントリスナーの登録
    document.getElementById('btn-start').addEventListener('click', () => {
        isPuzzleMode = false;
        currentPuzzle = null;
        document.getElementById('game-title').textContent = "通常対局";

        // ========== 棋譜読み込み・検討モード処理 ==========
        document.getElementById('btn-import-kifu').addEventListener('click', () => {
            document.getElementById('kifu-input').value = '';
            document.getElementById('kifu-modal').classList.remove('hidden');
        });

        document.getElementById('btn-kifu-cancel').addEventListener('click', () => {
            document.getElementById('kifu-modal').classList.add('hidden');
        });

        document.getElementById('btn-kifu-start').addEventListener('click', () => {
            const text = document.getElementById('kifu-input').value;
            if (parseKifu(text)) {
                document.getElementById('kifu-modal').classList.add('hidden');
                startReplayMode();
            } else {
                alert('有効な指し手が見つかりませんでした。将棋クエストの棋譜をコピーしてください。');
            }
        });

        document.getElementById('btn-replay-prev').addEventListener('click', () => {
            if (currentReplayStep > 0) {
                currentReplayStep--;
                updateReplayBoard();
            }
        });

        document.getElementById('btn-replay-next').addEventListener('click', () => {
            if (currentReplayStep < replayMoves.length) {
                currentReplayStep++;
                updateReplayBoard();
            }
        });

        //人間が指した後にAIにバトンタッチし、AIの手を盤面で自動実行するロジックを追加
        document.getElementById('btn-ai-match').addEventListener('click', () => {
            isPuzzleMode = false;
            isReplayMode = false;
            isAIMatchMode = true; // AI対局モードON
            document.getElementById('game-title').textContent = "AI対局 (後手AI)";

            initGame(); // 初期盤面セット
            showScreen('game-screen');

            // AI検討を強制的にONにしてスタート
            if (aiManager && !aiManager.isAnalyzing) {
                aiManager.startAnalysis();
            }
        });

        // 戻るボタンの処理を少し修正（検討モードの解除）
        const btnBackToMenu = document.getElementById('btn-back-to-menu');
        if (btnBackToMenu) {
            // 既存のイベントリスナーを上書きするため、元のリスナーは消しておくか、中にifを追加します
            btnBackToMenu.addEventListener('click', () => {
                isReplayMode = false; // ★追加：検討モード解除
                isAIMatchMode = false; // ★追加：AI対局モード解除
                document.getElementById('btn-replay-prev').classList.add('hidden');
                document.getElementById('btn-replay-next').classList.add('hidden');

                if (isPuzzleMode) {
                    renderPuzzleList();
                    showScreen('puzzle-select-screen');
                } else {
                    showScreen('home-screen');
                }
            });
        }

        const btnUndo = document.getElementById('btn-undo');
        if (btnUndo) {
            btnUndo.addEventListener('click', () => {
                handleUndo();
            });
        }

        // ===================================================

        // ヒントボタンや次へボタンを隠す
        const btnHint = document.getElementById('btn-show-hint');
        if (btnHint) btnHint.classList.add('hidden');
        const btnNext = document.getElementById('btn-next-puzzle');
        if (btnNext) btnNext.classList.add('hidden');

        initGame();
        showScreen('game-screen');
    });

    const btnPuzzleMenu = document.getElementById('btn-puzzle-menu');
    if (btnPuzzleMenu) {
        btnPuzzleMenu.addEventListener('click', () => {
            showScreen('puzzle-difficulty-screen');
        });
    }

    const btnSettings = document.getElementById('btn-settings');
    if (btnSettings) {
        btnSettings.addEventListener('click', () => {
            document.getElementById('bgm-toggle').checked = !AudioManager.isMuted;
            document.getElementById('bgm-volume').value = AudioManager.volume;
            showScreen('settings-screen');
        });
    }

    const btnBackToHomeFromSettings = document.getElementById('btn-back-to-home-from-settings');
    if (btnBackToHomeFromSettings) {
        btnBackToHomeFromSettings.addEventListener('click', () => {
            showScreen('home-screen');
        });
    }

    const bgmToggle = document.getElementById('bgm-toggle');
    if (bgmToggle) {
        bgmToggle.addEventListener('change', (e) => {
            AudioManager.toggleMute(!e.target.checked);
        });
    }

    const bgmVolume = document.getElementById('bgm-volume');
    if (bgmVolume) {
        bgmVolume.addEventListener('input', (e) => {
            AudioManager.setVolume(parseFloat(e.target.value));
        });
    }

    const btnDiff1 = document.getElementById('btn-diff-1');
    if (btnDiff1) {
        btnDiff1.addEventListener('click', () => {
            selectedDifficulty = 1;
            renderPuzzleList();
            showScreen('puzzle-select-screen');
        });
    }

    const btnDiff3 = document.getElementById('btn-diff-3');
    if (btnDiff3) {
        btnDiff3.addEventListener('click', () => {
            selectedDifficulty = 3;
            renderPuzzleList();
            showScreen('puzzle-select-screen');
        });
    }

    const btnBackToHomeFromDiff = document.getElementById('btn-back-to-home-from-diff');
    if (btnBackToHomeFromDiff) {
        btnBackToHomeFromDiff.addEventListener('click', () => {
            showScreen('home-screen');
        });
    }

    // 解答解説を見るボタン
    const btnShowHint = document.getElementById('btn-show-hint');
    if (btnShowHint) {
        btnShowHint.addEventListener('click', () => {
            if (isPuzzleMode && currentPuzzle) {
                hasViewedHint = true; // 解答を見たフラグだけ立てる
                const explText = currentPuzzle.explanation ? currentPuzzle.explanation : "";
                // 新しい解説エリアに表示
                document.getElementById('puzzle-explanation-text').innerHTML = explText;
                document.getElementById('puzzle-explanation-area').classList.add('is-visible');
            }
        });
    }

    // 次へボタン
    const btnNextPuzzle = document.getElementById('btn-next-puzzle');
    if (btnNextPuzzle) {
        btnNextPuzzle.addEventListener('click', () => {
            if (isPuzzleMode && currentPuzzle) {
                const puzzleList = selectedDifficulty === 3 ? PUZZLES_3 : PUZZLES_1;
                puzzleList.sort((a, b) => a.id - b.id);
                const currentIndex = puzzleList.findIndex(p => p.id === currentPuzzle.id);
                if (currentIndex !== -1 && currentIndex < puzzleList.length - 1) {
                    const nextPuzzle = puzzleList[currentIndex + 1];
                    currentPuzzle = nextPuzzle;
                    currentPuzzleStep = 0;
                    document.getElementById('game-title').textContent = nextPuzzle.title;
                    initPuzzle(nextPuzzle);
                } else {
                    alert("最後の問題です！");
                }
            }
        });
    }

    const btnBackToHome = document.getElementById('btn-back-to-home');
    if (btnBackToHome) {
        btnBackToHome.addEventListener('click', () => {
            showScreen('puzzle-difficulty-screen');
        });
    }

    const btnBackToMenu = document.getElementById('btn-back-to-menu');
    if (btnBackToMenu) {
        btnBackToMenu.addEventListener('click', () => {
            if (isPuzzleMode) {
                renderPuzzleList(); // リストを再描画してクリア状況を反映
                showScreen('puzzle-select-screen');
            } else {
                showScreen('home-screen');
            }
        });
    }

    // モーダル閉じるボタン
    const btnCloseModal = document.getElementById('btn-close-modal');
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            document.getElementById('result-modal').classList.add('hidden');
        });
    }

    const aiDepthSlider = document.getElementById('ai-depth');
    const aiDepthValue = document.getElementById('ai-depth-value');

    if (aiDepthSlider) {
        aiDepthSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            aiDepthValue.textContent = val;
            if (aiManager) aiManager.depth = parseInt(val);
        });
    }

    // 初期状態はホーム画面を表示
    showScreen('home-screen');
});

// --- セーブ機能 (localStorage) ---
const SAVE_KEY = 'tsumesyogi_cleared_puzzles';

function getClearedPuzzles() {
    try {
        const data = localStorage.getItem(SAVE_KEY);
        if (!data) return {};

        const parsed = JSON.parse(data);

        // 後方互換性：古い配列データの場合はオブジェクトに変換する
        if (Array.isArray(parsed)) {
            const migrated = {};
            parsed.forEach(id => {
                migrated[id] = 1;
            });
            // 自動で新しい形式を保存し直す
            localStorage.setItem(SAVE_KEY, JSON.stringify(migrated));
            return migrated;
        }

        return parsed || {};
    } catch (e) {
        console.error("セーブデータの読み込みに失敗しました", e);
        return {};
    }
}

function saveClearedPuzzle(puzzleId) {
    const cleared = getClearedPuzzles();
    // 初クリアの場合は0で初期化
    if (!cleared[puzzleId]) {
        cleared[puzzleId] = 0;
    }
    // クリア回数を加算
    cleared[puzzleId]++;

    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(cleared));
    } catch (e) {
        console.error("セーブデータの書き込みに失敗しました", e);
    }
}

let resultModalTimeout = null;

/**
 * 結果モーダルを表示する
 * @param {boolean} autoHide - trueの場合はボタンが無くても5秒で自動消去する
 */
function showResultModal(message, buttonsData, explanation = "", autoHide = true) {
    const modal = document.getElementById('result-modal');
    const messageEl = document.getElementById('result-message');
    const explanationEl = document.getElementById('result-explanation');
    const buttonsContainer = document.getElementById('modal-buttons');

    if (resultModalTimeout) {
        clearTimeout(resultModalTimeout);
        resultModalTimeout = null;
    }

    messageEl.textContent = message;

    if (explanationEl) {
        if (explanation) {
            explanationEl.innerHTML = explanation;
            explanationEl.classList.remove('hidden');
        } else {
            explanationEl.classList.add('hidden');
        }
    }

    modal.classList.remove('hidden');

    buttonsContainer.innerHTML = '';

    // autoHideがtrue かつ ボタンの指定がなければ5秒後に自動消去
    if (autoHide && (!buttonsData || !Array.isArray(buttonsData) || buttonsData.length === 0)) {
        resultModalTimeout = setTimeout(() => {
            modal.classList.add('hidden');
        }, 5000);
    } else if (buttonsData && Array.isArray(buttonsData)) {
        buttonsData.forEach(btnInfo => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            if (btnInfo.className) {
                btn.classList.add(btnInfo.className);
            }
            btn.textContent = btnInfo.text;

            btn.addEventListener('click', () => {
                modal.classList.add('hidden');
                if (btnInfo.onClick) {
                    btnInfo.onClick();
                }
            });
            buttonsContainer.appendChild(btn);
        });
    }
}


/**
 * 画面の切り替えを行う
 */
function showScreen(screenId) {
    // 画面遷移時に正解ポップアップを非表示にする
    const successPopup = document.getElementById('success-popup');
    if (successPopup) {
        successPopup.classList.remove('show');
    }

    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');


    // タイトル画面の時は背面コンテナを透明化して画像を見せるため
    document.body.classList.remove('on-home-screen', 'on-normal-match', 'on-puzzle-menu', 'on-puzzle-match');
    if (screenId === 'home-screen') {
        document.body.classList.add('on-home-screen');
    } else if (screenId === 'puzzle-difficulty-screen' || screenId === 'puzzle-select-screen' || screenId === 'settings-screen') {
        document.body.classList.add('on-puzzle-menu');
    } else if (screenId === 'game-screen') {
        if (isPuzzleMode) {
            document.body.classList.add('on-puzzle-match');
        } else {
            document.body.classList.add('on-normal-match');
        }
    }
}

/**
 * 詰将棋のリストを描画する
 */
function renderPuzzleList() {
    const listContainer = document.getElementById('puzzle-list');
    listContainer.innerHTML = '';

    const clearedPuzzles = getClearedPuzzles();

    const puzzlesToRender = selectedDifficulty === 3 ? PUZZLES_3 : PUZZLES_1;

    // ID順にソートするよう修正
    puzzlesToRender.sort((a, b) => a.id - b.id);

    puzzlesToRender.forEach(puzzle => {
        const btn = document.createElement('button');
        btn.classList.add('puzzle-btn');

        const clearCount = clearedPuzzles[puzzle.id] || 0;
        let clearBadge = "";
        if (clearCount > 0) {
            const stars = "★".repeat(clearCount);
            clearBadge = `<span class="clear-badge">${stars} クリア！</span>`;
        }

        // titleプロパティはヒント抜きの「問題 n」が入るように設定済み
        btn.innerHTML = `<strong>${puzzle.title}</strong><br><small>${puzzle.movesToMate}手詰め</small>${clearBadge}`;

        btn.addEventListener('click', () => {
            isPuzzleMode = true;
            currentPuzzle = puzzle;
            currentPuzzleStep = 0; // 3手詰め用のステップ初期化
            document.getElementById('game-title').textContent = puzzle.title; // ヘッダーもヒント抜き

            // パズルモード時はヒントボタンと次へボタンを表示
            const btnHint = document.getElementById('btn-show-hint');
            if (btnHint) btnHint.classList.remove('hidden');
            const btnNext = document.getElementById('btn-next-puzzle');
            if (btnNext) btnNext.classList.remove('hidden');

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
    if (!boardElement) return;
    boardElement.innerHTML = '';

    // 9x9の盤面を描画 (右から1筋〜9筋とするため、colは8から0へ減らす方向で描画)
    for (let row = 0; row < 9; row++) {
        for (let col = 8; col >= 0; col--) {
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

        const wrapperEl = document.createElement('div');
        wrapperEl.classList.add('hand-piece-wrapper');

        const pieceEl = document.createElement('div');
        pieceEl.classList.add('hand-piece');
        pieceEl.textContent = p.displayName;

        const countEl = document.createElement('span');
        countEl.classList.add('piece-count');
        countEl.textContent = `x${counts[typeId]}`;

        // 後手の持ち駒は文字を反転させる
        if (player === PLAYER.GOTE) {
            pieceEl.classList.add('gote-piece');
        }

        // 選択された持ち駒のハイライト復元
        if (selectedCapturedPiece && selectedCapturedPiece.player === player && selectedCapturedPiece.pieceType.id === p.type.id) {
            pieceEl.classList.add('selected');
        }

        wrapperEl.appendChild(pieceEl);
        wrapperEl.appendChild(countEl);
        wrapperEl.addEventListener('click', () => handleHandPieceClick(player, p.type));

        container.appendChild(wrapperEl);
    }
}

function initGame() {
    gameBoard.setupInitialPosition();
    currentPlayer = PLAYER.SENTE;
    lastMovedCell = null;
    clearSelection();

    // 駒台のタイトルを通常対局用に戻す
    document.getElementById('player-hand-title').textContent = "先手";
    document.getElementById('opponent-hand-title').textContent = "後手";

    const aiArea = document.getElementById('ai-evaluation-area');
    if (aiArea) aiArea.classList.remove('hidden');

    renderBoard();

    // AIへ新規盤面イベントの連携
    if (aiManager && !isPuzzleMode) {
        aiManager.updateSFEN(gameBoard.getSFEN(currentPlayer, 1));
    }

    gameHistory = [];
    updateUndoButtonVisibility();
}

function initPuzzle(puzzle) {
    // パズル初期化時に正解ポップアップを非表示にする
    const successPopup = document.getElementById('success-popup');
    if (successPopup) {
        successPopup.classList.remove('show');
    }

    gameBoard.loadPuzzle(puzzle);
    currentPlayer = PLAYER.SENTE;
    lastMovedCell = null;
    hasViewedHint = false;
    currentPuzzleStep = 0;
    clearSelection();

    // 詰将棋モードでは自分の駒台のタイトルを「持駒」にする
    document.getElementById('player-hand-title').textContent = "持駒";

    // AI検討エリアを非表示にして分析を停止
    const aiArea = document.getElementById('ai-evaluation-area');
    if (aiArea) aiArea.classList.add('hidden');
    if (typeof aiManager !== 'undefined' && aiManager && aiManager.isAnalyzing) {
        aiManager.stopAnalysis();
    }

    // ★ 解説エリアを非表示にリセットする
    const explArea = document.getElementById('puzzle-explanation-area');
    if (explArea) explArea.classList.remove('is-visible');
    const explText = document.getElementById('puzzle-explanation-text');
    if (explText) explText.innerHTML = "";

    gameHistory = [];
    updateUndoButtonVisibility();

    renderBoard();
}

/**
 * 持ち駒がクリックされたときの処理
 */
function handleHandPieceClick(player, pieceType) {
    if (isReplayMode) return; // ★追加：検討モード中は手動操作禁止
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
    if (isReplayMode) return; // ★追加：検討モード中は手動操作禁止

    // 持ち駒が選択されている場合 -> 打つ
    if (selectedCapturedPiece) {
        const { player, pieceType } = selectedCapturedPiece;

        const validDrops = gameBoard.getValidDrops(player, pieceType);
        const isValidDrop = validDrops.some(m => m.row === row && m.col === col);

        if (isValidDrop) {
            pushToHistory(); // 指す前に状態を保存
            gameBoard.dropPiece(player, pieceType, row, col);


            lastMovedCell = { row, col };
            clearSelection();

            // 詰将棋モードの判定を差し込む
            if (isPuzzleMode && player === PLAYER.SENTE) {
                const puzzleResult = checkPuzzleCondition(row, col, pieceType, true);
                if (!puzzleResult) {
                    return; // 失敗してリセットされる場合はここで打ち切り
                } else if (puzzleResult === 'continue') {
                    // 3手詰めの途中（CPUの手番へ）
                } else {
                    // クリア
                }
            }

            // ターンの交代
            currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;

            // --- AI対局モードの処理 ---
            if (isAIMatchMode && currentPlayer !== humanRole) {
                if (aiManager) {
                    aiManager.updateStatus("AIが考えています...");
                    aiManager.sendSFEN(gameBoard.getSFEN(currentPlayer, 1));
                }
            }

            // AI連携
            if (aiManager && !isPuzzleMode) {
                aiManager.updateSFEN(gameBoard.getSFEN(currentPlayer, 1));
            }

            if (!isPuzzleMode && gameBoard.isCheck(currentPlayer) && !checkPlayerHasEscapeMove(currentPlayer)) {
                const winner = currentPlayer === PLAYER.SENTE ? "後手" : "先手";
                setTimeout(() => alert(`詰みです！ ${winner}の勝ち！`), 300);
            }

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
            pushToHistory(); // 指す前に状態を保存
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
                const puzzleResult = checkPuzzleCondition(row, col, gameBoard.getPiece(row, col).type, false, selRow, selCol);
                if (!puzzleResult) {
                    return;
                } else if (puzzleResult === 'continue') {
                    // 3手詰めの途中
                } else {
                    // クリア
                }
            }

            // ターンの交代
            currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;

            // AI連携
            if (aiManager && !isPuzzleMode) {
                aiManager.updateSFEN(gameBoard.getSFEN(currentPlayer, 1));
            }

            if (!isPuzzleMode && gameBoard.isCheck(currentPlayer) && !checkPlayerHasEscapeMove(currentPlayer)) {
                const winner = currentPlayer === PLAYER.SENTE ? "後手" : "先手";
                setTimeout(() => showResultModal(`詰みです！\n${winner}の勝ち！`, [
                    { text: 'メニューに戻る', onClick: () => showScreen('home-screen'), className: 'primary-btn' }
                ]), 300);
            }

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
 * Returns: true (クリア), false (失敗), 'continue' (3手詰めの途中)
 */
function checkPuzzleCondition(toRow = -1, toCol = -1, pieceType = null, isDrop = false, fromRow = -1, fromCol = -1) {
    // 3手詰めなど、手順が指定されている場合
    if (currentPuzzle.expectedMoves) {
        const expected = currentPuzzle.expectedMoves[currentPuzzleStep];
        let isCorrectMove = false;

        if (expected.isDrop === isDrop && expected.toRow === toRow && expected.toCol === toCol) {
            if (isDrop && expected.piece === pieceType.id) {
                isCorrectMove = true;
            } else if (!isDrop && expected.fromRow === fromRow && expected.fromCol === fromCol) {
                isCorrectMove = true;
            }
        }

        if (!isCorrectMove) {
            setTimeout(() => {
                showResultModal("不正解！\n手順が違います。", [
                    { text: 'やり直す', onClick: () => initPuzzle(currentPuzzle) }
                ]);
            }, 500);
            return false;
        }

        // 正解の手だった場合
        if (currentPuzzleStep === 0) {
            // 1手目成功 -> CPUの応答手(2手目)を自動で指す
            currentPuzzleStep++;
            setTimeout(() => {
                const cpuMove = currentPuzzle.expectedMoves[currentPuzzleStep];
                if (cpuMove.isDrop) {
                    const pType = PIECE_TYPES[cpuMove.piece.toUpperCase()];
                    gameBoard.dropPiece(PLAYER.GOTE, pType, cpuMove.toRow, cpuMove.toCol);
                } else {
                    gameBoard.movePiece(cpuMove.fromRow, cpuMove.fromCol, cpuMove.toRow, cpuMove.toCol);
                }

                // 効果音等ならここで再生
                renderBoard();
                currentPuzzleStep++; // 次はプレイヤーの最終手(3手目)
                currentPlayer = PLAYER.SENTE; // 手番をプレイヤーに戻す
            }, 800);
            return 'continue';

        } else if (currentPuzzleStep === 2) {
            // 3手目成功 -> 最終的なクリア処理へ
            return handlePuzzleClear();
        }
    }

    // --- 従来の一手詰め処理 ---
    if (currentPuzzle.isShapePuzzle) {
        const sol = currentPuzzle.solution;
        const p = gameBoard.getPiece(sol.row, sol.col);
        if (p && p.type.id === sol.piece && p.owner === PLAYER.SENTE) {
            return handlePuzzleClear();
        } else {
            setTimeout(() => {
                showResultModal("不正解！", [
                    { text: 'やり直す', onClick: () => initPuzzle(currentPuzzle) }
                ]);
            }, 500);
            return false;
        }
    }

    // 1. 王手がかかっているか？
    if (!gameBoard.isCheck(PLAYER.GOTE)) {
        setTimeout(() => {
            showResultModal("失敗！\n王手をかけてください。", [
                { text: 'やり直す', onClick: () => initPuzzle(currentPuzzle) }
            ]);
        }, 300);
        return false;
    }

    // 2. 玉方に合法手があるか？
    const hasValidEscapeMove = checkPlayerHasEscapeMove(PLAYER.GOTE);

    if (!hasValidEscapeMove) {
        return handlePuzzleClear();
    }

    // 回避可能なら失敗
    setTimeout(() => {
        showResultModal("玉に逃げ道があります\nやり直し", [
            { text: 'やり直す', onClick: () => initPuzzle(currentPuzzle) }
        ]);
    }, 500);
    return false;
}

function handlePuzzleClear() {
    if (isPuzzleMode && currentPuzzle && !hasViewedHint) {
        saveClearedPuzzle(currentPuzzle.id);
    }

    setTimeout(() => {
        const explText = currentPuzzle && currentPuzzle.explanation ? currentPuzzle.explanation : "";

        if (isPuzzleMode) {
            if (!hasViewedHint) {
                // 3秒間大正解ポップアップを表示
                const successPopup = document.getElementById('success-popup');
                successPopup.classList.add('show');
                setTimeout(() => {
                    successPopup.classList.remove('show');
                }, 3000);
            }

            // 解説エリアを表示
            document.getElementById('puzzle-explanation-text').innerHTML = explText;
            document.getElementById('puzzle-explanation-area').classList.add('is-visible');
            // 自動で一覧へ戻るタイマーを削除し、プレイヤーが自発的に「メニューに戻る」を押すまで待機する
        } else {
            const winner = currentPlayer === PLAYER.SENTE ? "後手" : "先手";
            showResultModal(`詰みです！\n${winner}の勝ち！`, [
                { text: 'メニューに戻る', onClick: () => showScreen('home-screen'), className: 'primary-btn' }
            ]);
        }
    }, 300);
    return true;
}

/**
 * プレイヤー側の王を探し、王手を外す合法手が存在するかどうかを調べる
 */
function checkPlayerHasEscapeMove(player) {
    // 盤上の駒の移動による回避
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const p = gameBoard.grid[r][c];
            if (p && p.owner === player) {
                const validMoves = gameBoard.getValidMoves(r, c);
                if (validMoves.length > 0) {
                    return true; // 1つでも王手放置にならない手があれば回避可能
                }
            }
        }
    }

    // 持ち駒を打つこと（合駒）による回避
    const hand = gameBoard.capturedPieces[player];
    if (hand.length > 0) {
        // 全ての空きマスに対して、持ち駒を打つ合法手があるか確認
        for (let i = 0; i < hand.length; i++) {
            const pieceType = hand[i].type;
            const validDrops = gameBoard.getValidDrops(player, pieceType);
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

// ==========================================
// 棋譜解析（CSA形式パーサー）と盤面再現
// ==========================================
const CSA_PIECE_MAP = {
    'FU': 'fu', 'KY': 'kyosha', 'KE': 'keima', 'GI': 'gin',
    'KI': 'kin', 'KA': 'kaku', 'HI': 'hisha', 'OU': 'ou', // 王将
    'TO': 'fu', 'NY': 'kyosha', 'NK': 'keima', 'NG': 'gin', // 成り駒の元
    'UM': 'kaku', 'RY': 'hisha'
};
const PROMOTED_CSA = ['TO', 'NY', 'NK', 'NG', 'UM', 'RY'];

function parseKifu(text) {
    replayMoves = [];
    const lines = text.split('\n');

    for (let line of lines) {
        line = line.trim();
        if ((line.startsWith('+') || line.startsWith('-')) && line.length >= 7) {
            const side = line[0];
            const fromX = parseInt(line[1]);
            const fromY = parseInt(line[2]);
            const toX = parseInt(line[3]);
            const toY = parseInt(line[4]);
            const pieceStr = line.substring(5, 7);

            replayMoves.push({
                player: side === '+' ? PLAYER.SENTE : PLAYER.GOTE,
                // --- 修正：CSAの数字をそのまま配列のインデックス(0-8)に変換 ---
                fromCol: fromX === 0 ? -1 : fromX - 1,
                fromRow: fromY === 0 ? -1 : fromY - 1,
                toCol: toX - 1,
                toRow: toY - 1,
                // -------------------------------------------------------
                pieceId: CSA_PIECE_MAP[pieceStr],
                isPromoted: PROMOTED_CSA.includes(pieceStr),
                isDrop: fromX === 0
            });
        }
    }
    return replayMoves.length > 0;
}

function startReplayMode() {
    isPuzzleMode = false;
    isReplayMode = true;
    currentReplayStep = 0;
    currentPuzzle = null;
    document.getElementById('game-title').textContent = "AI検討モード";

    document.getElementById('btn-show-hint').classList.add('hidden');
    document.getElementById('btn-next-puzzle').classList.add('hidden');
    document.getElementById('btn-replay-prev').classList.remove('hidden');
    document.getElementById('btn-replay-next').classList.remove('hidden');

    // AI検討を強制的にONにしてスタート
    if (aiManager && !aiManager.isAnalyzing) {
        aiManager.startAnalysis();
    }

    updateReplayBoard();
    showScreen('game-screen');
}

function updateReplayBoard() {
    // 一旦初期配置に戻す（バグを防ぐ最強の手段）
    gameBoard.setupInitialPosition();
    currentPlayer = PLAYER.SENTE;
    lastMovedCell = null;
    clearSelection();

    // 現在のステップまで高速で再現する
    for (let i = 0; i < currentReplayStep; i++) {
        const move = replayMoves[i];
        if (move.isDrop) {
            // PIECE_TYPESの中からIDが一致するものを探す
            const typeObj = Object.values(PIECE_TYPES).find(pt => pt.id === move.pieceId);
            gameBoard.dropPiece(move.player, typeObj, move.toRow, move.toCol);
        } else {
            gameBoard.movePiece(move.fromRow, move.fromCol, move.toRow, move.toCol);
            // 成りの適用
            if (move.isPromoted) {
                const p = gameBoard.getPiece(move.toRow, move.toCol);
                if (p) p.isPromoted = true;
            }
        }
        lastMovedCell = { row: move.toRow, col: move.toCol };
        currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;
    }

    renderBoard();

    // 盤面が更新されたらAIに教える
    if (aiManager && aiManager.isAnalyzing) {
        aiManager.updateSFEN(gameBoard.getSFEN(currentPlayer, currentReplayStep + 1));
    }
}

/**
 * AIが返してきた "7g7f" などの手を盤面に反映する
 */
window.onAIMoveDecided = function (bestMove) {
    // 対局モードでない、または自分のターンなら何もしない
    if (!isAIMatchMode || currentPlayer === humanRole) return;

    try {
        let toR, toC; // 座標保存用（ハイライト用）
        const aiColor = (humanRole === PLAYER.SENTE) ? PLAYER.GOTE : PLAYER.SENTE;

        pushToHistory(); // AIが指す前に状態を保存

        if (bestMove.includes('*')) {

            // --- 駒打ちの場合 (例: P*5e) ---
            const pieceChar = bestMove[0];
            const colNum = parseInt(bestMove[2]); // 1-9
            const rowChar = bestMove[3]; // a-i

            toR = "abcdefghi".indexOf(rowChar);
            // ★修正: AIからの数字を左右反転させてアプリの盤面に戻す
            toC = 9 - colNum;

            const pieceId = { 'P': 'fu', 'L': 'kyosha', 'N': 'keima', 'S': 'gin', 'G': 'kin', 'B': 'kaku', 'R': 'hisha' }[pieceChar.toUpperCase()];
            const pType = Object.values(PIECE_TYPES).find(t => t.id === pieceId);

            gameBoard.dropPiece(aiColor, pType, toR, toC);
        } else {
            // --- 移動の場合 (例: 7g7f) ---
            // ★修正: 左右反転を元に戻すために 9 から引く
            const fromC = 9 - parseInt(bestMove[0]);
            const fromR = "abcdefghi".indexOf(bestMove[1]);

            toC = 9 - parseInt(bestMove[2]);
            toR = "abcdefghi".indexOf(bestMove[3]);

            const promote = bestMove.includes('+');

            gameBoard.movePiece(fromR, fromC, toR, toC);
            if (promote) {
                const p = gameBoard.getPiece(toR, toC);
                if (p) p.isPromoted = true;
            }
        }

        // ★ 最後に動かした駒をハイライト（緑色）にする
        lastMovedCell = { row: toR, col: toC };

        // 手番を人間に戻す
        currentPlayer = humanRole;
        renderBoard();

    } catch (e) {
        console.error("AIの手の実行に失敗:", e);
    }
};

let humanRole = PLAYER.SENTE; // 人間がどちらか

document.getElementById('btn-ai-match').addEventListener('click', () => {
    // シンプルに「後手(AI)で始めますか？」と聞く例
    const playAsGote = confirm("あなたが「後手」で始めますか？\n（キャンセルを押すとあなたが「先手」になります）");
    humanRole = playAsGote ? PLAYER.GOTE : PLAYER.SENTE;

    isAIMatchMode = true;
    document.getElementById('game-title').textContent = playAsGote ? "AI対局 (先手AI)" : "AI対局 (後手AI)";

    initGame();
    showScreen('game-screen');

    if (aiManager && !aiManager.isAnalyzing) aiManager.startAnalysis();

    // ★ もし人間が後手なら、開始と同時にAI（先手）に指させる
    if (humanRole === PLAYER.GOTE) {
        currentPlayer = PLAYER.SENTE; // AIの手番
        aiManager.sendSFEN(gameBoard.getSFEN(PLAYER.SENTE, 1));
    }
});

/**
 * 履歴に現在の状態を保存する
 */
function pushToHistory() {
    gameHistory.push({
        state: gameBoard.captureState(),
        currentPlayer: currentPlayer,
        lastMovedCell: lastMovedCell ? { ...lastMovedCell } : null
    });
    updateUndoButtonVisibility();
}

/**
 * 待った（Undo）の実行
 */
function handleUndo() {
    if (gameHistory.length === 0) return;

    if (isAIMatchMode) {
        // AI対局時：もしAIが思考中なら一度止める
        if (aiManager) aiManager.stopAnalysis();

        if (currentPlayer === humanRole) {
            // ① 自分の番（AIが指し終わった後）に「待った」を押した場合
            // AIの手(1つ前)と、自分の手(2つ前)の両方を取り消して、自分の番に戻す
            if (gameHistory.length >= 2) {
                gameHistory.pop(); // AIが指す前の状態を捨てる
                const previousState = gameHistory.pop(); // 自分が指す前の状態を取り出す
                restoreGameFromHistory(previousState);
            }
        } else {
            // ② AIの番（自分が指して、AIが考え中）に「待った」を押した場合
            // 自分の手(1つ前)だけを取り消して、自分の番に戻す
            if (gameHistory.length >= 1) {
                const previousState = gameHistory.pop(); // 自分が指す前の状態を取り出す
                restoreGameFromHistory(previousState);
            }
        }
    } else {
        // 通常対局時：単純に1手（相手の番）に戻す
        const previousState = gameHistory.pop();
        restoreGameFromHistory(previousState);
    }

    renderBoard();
    updateUndoButtonVisibility();

    // AI連携の更新（盤面が変わったので再評価）
    if (aiManager && !isPuzzleMode) {
        aiManager.updateSFEN(gameBoard.getSFEN(currentPlayer, 1));
        if (isAIMatchMode) {
            aiManager.startAnalysis(); // 検討（評価値表示）を再開
        }
    }
}

/**
 * 保存された履歴データから復元する
 */
function restoreGameFromHistory(historyItem) {
    if (!historyItem) return;
    gameBoard.restoreState(historyItem.state);
    currentPlayer = historyItem.currentPlayer;
    lastMovedCell = historyItem.lastMovedCell;
}

/**
 * 待ったボタンの表示制御
 */
function updateUndoButtonVisibility() {
    const btnUndo = document.getElementById('btn-undo');
    if (!btnUndo) return;

    if (isPuzzleMode || isReplayMode) {
        btnUndo.classList.add('hidden');
    } else {
        if (gameHistory.length > 0) {
            btnUndo.classList.remove('hidden');
        } else {
            btnUndo.classList.add('hidden');
        }
    }
}