// board.js - 将棋の盤面状態の管理

class Board {
    constructor() {
        // 9x9の二次元配列。nullで初期化。
        // grid[row][col] でアクセス (0-indexed: row 0=一段目, col 0=一筋)
        this.grid = Array(9).fill(null).map(() => Array(9).fill(null));
        this.capturedPieces = {
            [PLAYER.SENTE]: [],
            [PLAYER.GOTE]: []
        };
    }

    /**
     * 平手の初期配置で盤面をセットアップする
     */
    setupInitialPosition() {
        // まず盤面をクリア
        this.grid = Array(9).fill(null).map(() => Array(9).fill(null));
        this.capturedPieces = { [PLAYER.SENTE]: [], [PLAYER.GOTE]: [] };

        // -------------------------
        // 後手 (上側) の配置 - row: 0, 1, 2
        // -------------------------
        // 1段目: 香 桂 銀 金 王 金 銀 桂 香 (col: 0 -> 8)
        const goteRow1 = [
            PIECE_TYPES.KYOSHA, PIECE_TYPES.KEIMA, PIECE_TYPES.GIN, PIECE_TYPES.KIN,
            PIECE_TYPES.OU, // ※後手は王将が一般的ですが玉でも可
            PIECE_TYPES.KIN, PIECE_TYPES.GIN, PIECE_TYPES.KEIMA, PIECE_TYPES.KYOSHA
        ];
        goteRow1.forEach((type, col) => {
            this.grid[0][col] = createPiece(type, PLAYER.GOTE);
        });

        // 2段目: 飛車(col:1), 角行(col:7) -> ※将棋は右から1筋(col0)なので、飛車は右から2番目=col:1, 角は左から2番目=col:7 (後手視点)
        // 実際の盤面(右から1筋)に合わせるため、col 0=1筋, col 8=9筋とします
        // 後手: 2筋(col:1)に飛車、8筋(col:7)に角
        this.grid[1][1] = createPiece(PIECE_TYPES.HISHA, PLAYER.GOTE);
        this.grid[1][7] = createPiece(PIECE_TYPES.KAKU, PLAYER.GOTE);

        // 3段目: 歩 x 9
        for (let col = 0; col < 9; col++) {
            this.grid[2][col] = createPiece(PIECE_TYPES.FU, PLAYER.GOTE);
        }

        // -------------------------
        // 先手 (下側) の配置 - row: 6, 7, 8
        // -------------------------
        // 7段目: 歩 x 9
        for (let col = 0; col < 9; col++) {
            this.grid[6][col] = createPiece(PIECE_TYPES.FU, PLAYER.SENTE);
        }

        // 8段目: 8筋(col:7)に飛車、2筋(col:1)に角
        this.grid[7][7] = createPiece(PIECE_TYPES.HISHA, PLAYER.SENTE);
        this.grid[7][1] = createPiece(PIECE_TYPES.KAKU, PLAYER.SENTE);

        // 9段目: 香 桂 銀 金 玉 金 銀 桂 香 (col: 0 -> 8)
        const senteRow9 = [
            PIECE_TYPES.KYOSHA, PIECE_TYPES.KEIMA, PIECE_TYPES.GIN, PIECE_TYPES.KIN,
            PIECE_TYPES.GYOKU,
            PIECE_TYPES.KIN, PIECE_TYPES.GIN, PIECE_TYPES.KEIMA, PIECE_TYPES.KYOSHA
        ];
        senteRow9.forEach((type, col) => {
            this.grid[8][col] = createPiece(type, PLAYER.SENTE);
        });
    }

    /**
     * 指定したマスの駒を取得
     */
    getPiece(row, col) {
        if (row < 0 || row >= 9 || col < 0 || col >= 9) return null;
        return this.grid[row][col];
    }

    /**
     * 指定した座標が盤面内か判定
     */
    isValidPosition(row, col) {
        return row >= 0 && row < 9 && col >= 0 && col < 9;
    }

    /**
     * 駒の移動可能範囲を計算する（王手放置の考慮なし）
     */
    getPseudoLegalMoves(row, col) {
        const piece = this.getPiece(row, col);
        if (!piece) return [];

        const validMoves = [];
        const moves = piece.isPromoted && piece.type.promotedMoves ? piece.type.promotedMoves : piece.type.moves;

        // 後手の場合は移動方向を反転させる (row方向に-1を掛ける)
        const directionY = piece.owner === PLAYER.SENTE ? 1 : -1;

        if (Array.isArray(moves)) {
            // 単発ジャンプ系の動き（歩、桂馬、銀、金、玉など）
            moves.forEach(m => {
                const targetRow = row + (m[0] * directionY);
                // colの反転は不要（将棋盤は左右対称の動きのため）ただし厳密には後手視点での左右が必要なゲームもあるが、将棋の銀や金などは左右対称なのでY方向の反転だけで対応可能
                const targetCol = col + m[1];

                if (this.isValidPosition(targetRow, targetCol)) {
                    const targetPiece = this.getPiece(targetRow, targetCol);
                    // 自分の駒がないマスなら移動可能
                    if (!targetPiece || targetPiece.owner !== piece.owner) {
                        validMoves.push({ row: targetRow, col: targetCol });
                    }
                }
            });
        } else if (typeof moves === 'string') {
            let directions = [];
            let singleJumps = [];

            if (moves === "forward_line") {
                directions = [[-1, 0]];
            } else if (moves === "straight_lines") {
                directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            } else if (moves === "diagonal_lines") {
                directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
            } else if (moves === "dragon") {
                directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                singleJumps = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
            } else if (moves === "horse") {
                directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
                singleJumps = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            }

            // 直線移動の処理
            directions.forEach(d => {
                let r = row;
                let c = col;
                while (true) {
                    r += d[0] * directionY;
                    c += d[1];

                    if (!this.isValidPosition(r, c)) break;

                    const targetPiece = this.getPiece(r, c);
                    if (targetPiece) {
                        if (targetPiece.owner !== piece.owner) {
                            validMoves.push({ row: r, col: c }); // Can take opponent piece
                        }
                        break; // Blocked by either own piece or opponent piece
                    }
                    validMoves.push({ row: r, col: c }); // Empty square
                }
            });

            // 1マスジャンプ（竜、馬の追加の動き）
            singleJumps.forEach(d => {
                let r = row + (d[0] * directionY);
                let c = col + d[1];
                if (this.isValidPosition(r, c)) {
                    const targetPiece = this.getPiece(r, c);
                    if (!targetPiece || targetPiece.owner !== piece.owner) {
                        validMoves.push({ row: r, col: c });
                    }
                }
            });
        }

        return validMoves;
    }

    /**
     * 駒の移動可能範囲を計算する（王手放置を防止）
     */
    getValidMoves(row, col) {
        const piece = this.getPiece(row, col);
        if (!piece) return [];

        const pseudoMoves = this.getPseudoLegalMoves(row, col);
        const validMoves = [];

        pseudoMoves.forEach(m => {
            // 仮移動
            const targetPiece = this.grid[m.row][m.col];
            this.grid[m.row][m.col] = piece;
            this.grid[row][col] = null;

            if (!this.isCheck(piece.owner)) {
                validMoves.push(m);
            }

            // 元に戻す
            this.grid[row][col] = piece;
            this.grid[m.row][m.col] = targetPiece;
        });

        return validMoves;
    }

    /**
     * 王手が掛かっているか判定
     */
    isCheck(player) {
        let kingRow = -1; let kingCol = -1;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const p = this.grid[r][c];
                if (p && p.owner === player && (p.type.id === 'ou' || p.type.id === 'gyoku')) {
                    kingRow = r; kingCol = c;
                    break;
                }
            }
        }
        if (kingRow === -1) return false; // 王がいない場合は便宜上false

        const opponent = player === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const p = this.grid[r][c];
                if (p && p.owner === opponent) {
                    const moves = this.getPseudoLegalMoves(r, c);
                    if (moves.some(m => m.row === kingRow && m.col === kingCol)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 盤上の駒を移動させる
     */
    movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = this.getPiece(fromRow, fromCol);
        if (!piece) return false;

        // 目標地点に駒がある場合は取る（持ち駒にする）
        const targetPiece = this.getPiece(toRow, toCol);
        if (targetPiece) {
            // 成っている場合は元の駒に戻す
            const captured = createPiece(targetPiece.type, piece.owner, false);
            this.capturedPieces[piece.owner].push(captured);
        }

        // 移動処理
        this.grid[toRow][toCol] = piece;
        this.grid[fromRow][fromCol] = null;

        return true;
    }

    /**
     * 指定した持ち駒を打てるマスのリストを返す
     */
    getValidDrops(player, pieceType) {
        const validDrops = [];

        // 二歩チェック用に、既に自分の未成の歩がある列を洗い出す
        const pawnCols = new Set();
        if (pieceType.id === PIECE_TYPES.FU.id) {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    const p = this.grid[row][col];
                    if (p && p.owner === player && p.type.id === PIECE_TYPES.FU.id && !p.isPromoted) {
                        pawnCols.add(col);
                    }
                }
            }
        }

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] === null) {
                    // 二歩のチェック
                    if (pieceType.id === PIECE_TYPES.FU.id && pawnCols.has(col)) {
                        continue;
                    }

                    // 行き所のない駒のチェック
                    if (player === PLAYER.SENTE) {
                        if ((pieceType.id === PIECE_TYPES.FU.id || pieceType.id === PIECE_TYPES.KYOSHA.id) && row === 0) continue;
                        if (pieceType.id === PIECE_TYPES.KEIMA.id && row <= 1) continue;
                    } else {
                        if ((pieceType.id === PIECE_TYPES.FU.id || pieceType.id === PIECE_TYPES.KYOSHA.id) && row === 8) continue;
                        if (pieceType.id === PIECE_TYPES.KEIMA.id && row >= 7) continue;
                    }

                    // 自玉の王手放置チェック
                    // 仮配置して確認
                    this.grid[row][col] = createPiece(pieceType, player, false);
                    const isSafe = !this.isCheck(player);
                    this.grid[row][col] = null; // 元に戻す

                    if (isSafe) {
                        // 打ち歩詰めの禁止判定はここに追加予定（今回は簡易版のため割愛）
                        validDrops.push({ row, col });
                    }
                }
            }
        }

        return validDrops;
    }

    /**
     * 持ち駒を盤の指定の位置に打つ
     */
    dropPiece(player, pieceType, toRow, toCol) {
        if (!this.isValidPosition(toRow, toCol) || this.grid[toRow][toCol] !== null) {
            return false;
        }

        const hand = this.capturedPieces[player];
        const pieceIndex = hand.findIndex(p => p.type.id === pieceType.id);

        if (pieceIndex === -1) {
            return false; // 持ち駒にない
        }

        // 持ち駒から削除
        const piece = hand.splice(pieceIndex, 1)[0];

        // 盤に配置
        this.grid[toRow][toCol] = piece;

        return true;
    }
}
