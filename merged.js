// pieces.js - 鬧偵・蝓ｺ譛ｬ螳夂ｾｩ

// 繝励Ξ繧､繝､繝ｼ縺ｮ螳夂ｾｩ
const PLAYER = {
    SENTE: 1, // 蜈域焔・郁・蛻・・荳句・・・
    GOTE: 2   // 蠕梧焔・育嶌謇九・荳雁・・・
};

// 鬧偵・遞ｮ鬘槭∬｡ｨ遉ｺ蜷阪∫ｧｻ蜍輔・繧ｯ繝医Ν([row, col] 縺ｮ逶ｸ蟇ｾ遘ｻ蜍暮㍼, 蜈域焔(荳頑婿蜷代・繧､繝翫せ)蝓ｺ貅・縺ｮ螳夂ｾｩ
// row: -1縺御ｸ翫・1縺御ｸ・/ col: -1縺悟ｷｦ(蜿ｳ遲・縲・1縺悟承(蟾ｦ遲・
const PIECE_TYPES = {
    FU: { id: 'fu', name: '豁ｩ', promotedName: '縺ｨ', canPromote: true, moves: [[-1, 0]] },
    KYOSHA: { id: 'kyosha', name: '鬥・, promotedName: '譚・, canPromote: true, moves: "forward_line" },
    KEIMA: { id: 'keima', name: '譯・, promotedName: '蝨ｭ', canPromote: true, moves: [[-2, -1], [-2, 1]] },
    GIN: { id: 'gin', name: '驫', promotedName: '蜈ｨ', canPromote: true, moves: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 1]] },
    KIN: { id: 'kin', name: '驥・, canPromote: false, moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]] },
    KAKU: { id: 'kaku', name: '隗・, promotedName: '鬥ｬ', canPromote: true, moves: "diagonal_lines" },
    HISHA: { id: 'hisha', name: '鬟・, promotedName: '遶・, canPromote: true, moves: "straight_lines" },
    GYOKU: { id: 'gyoku', name: '邇・, canPromote: false, moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] },
    OU: { id: 'ou', name: '邇・, canPromote: false, moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] }
};

// 謌舌ｊ鬧偵・遘ｻ蜍輔・繧ｯ繝医Ν・磯≡縺ｨ蜷後§蜍輔″縺ｫ縺ｪ繧九ｂ縺ｮ・・
const PROMOTED_KIN_MOVES = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]];
PIECE_TYPES.FU.promotedMoves = PROMOTED_KIN_MOVES;
PIECE_TYPES.KYOSHA.promotedMoves = PROMOTED_KIN_MOVES;
PIECE_TYPES.KEIMA.promotedMoves = PROMOTED_KIN_MOVES;
PIECE_TYPES.GIN.promotedMoves = PROMOTED_KIN_MOVES;
PIECE_TYPES.HISHA.promotedMoves = "dragon";
PIECE_TYPES.KAKU.promotedMoves = "horse";
/**
 * 鬧偵が繝悶ず繧ｧ繧ｯ繝医ｒ逕滓・縺吶ｋ繝輔ぃ繧ｯ繝医Μ髢｢謨ｰ
 */
function createPiece(type, owner, isPromoted = false) {
    return {
        type: type,
        owner: owner,
        isPromoted: isPromoted,

        get displayName() {
            return this.isPromoted ? this.type.promotedName : this.type.name;
        }
    };
}
const PUZZLES = [
    {
        id: 1,
        title: "No.1 鬆ｭ縺ｫ驥第遠縺｡",
        board: [
            // { piece: 'type_id', owner: PLAYER, row: 0-8, col: 0-8 }
            // 逕ｻ蜒上・隧ｰ蟆・｣・ 邇峨′3荳縲∵ｭｩ縺・荳峨よ判繧∵婿(蜈域焔)縺ｮ謖・ｧ偵・驥代・
            // 窶ｻ驟榊・縺ｮ陦・row)繝ｻ蛻・col)縺ｯ0繧ｪ繝ｪ繧ｸ繝ｳ縲・
            // 3荳 = 陦・, 蛻・(蜿ｳ縺九ｉ3逡ｪ逶ｮ)
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 },
            // 3荳・= 陦・, 蛻・
            { piece: 'fu', owner: SENTE, row: 2, col: 2 }
        ],
        hand: {
            [PLAYER.SENTE]: ['kin'],
            // 谿九ｊ縺ｮ鬧偵・閾ｪ蜍慕噪縺ｫ蠕梧焔縺ｮ謖√■鬧偵↓縺ｪ繧・
        },
        movesToMate: 1 // 1謇玖ｩｰ繧・
    },
    {
        id: 2,
        title: "No.2 蟆ｻ驥・,
        board: [
            // 逕ｻ蜒・縺ｮ隧ｰ蟆・｣・ 邇峨′3荳縲∵ｭｩ縺・荳峨よ判繧∵婿(蜈域焔)縺ｮ謖・ｧ偵・驥代・
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 },
            { piece: 'fu', owner: SENTE, row: 2, col: 2 }
        ],
        hand: {
            [PLAYER.SENTE]: ['kin'],
            // 谿九ｊ縺ｮ鬧偵・閾ｪ蜍慕噪縺ｫ蠕梧焔縺ｮ謖√■鬧偵↓縺ｪ繧・
        },
        movesToMate: 1 // 1謇玖ｩｰ繧・
    }
];
// board.js - 蟆・｣九・逶､髱｢迥ｶ諷九・邂｡逅・

class Board {
    constructor() {
        // 9x9縺ｮ莠梧ｬ｡蜈・・蛻励Ｏull縺ｧ蛻晄悄蛹悶・
        // grid[row][col] 縺ｧ繧｢繧ｯ繧ｻ繧ｹ (0-indexed: row 0=荳谿ｵ逶ｮ, col 0=荳遲・
        this.grid = Array(9).fill(null).map(() => Array(9).fill(null));
        this.capturedPieces = {
            [PLAYER.SENTE]: [],
            [PLAYER.GOTE]: []
        };
    }

    /**
     * 蟷ｳ謇九・蛻晄悄驟咲ｽｮ縺ｧ逶､髱｢繧偵そ繝・ヨ繧｢繝・・縺吶ｋ
     */
    setupInitialPosition() {
        // 縺ｾ縺夂乢髱｢繧偵け繝ｪ繧｢
        this.grid = Array(9).fill(null).map(() => Array(9).fill(null));
        this.capturedPieces = { [PLAYER.SENTE]: [], [PLAYER.GOTE]: [] };

        // -------------------------
        // 蠕梧焔 (荳雁・) 縺ｮ驟咲ｽｮ - row: 0, 1, 2
        // -------------------------
        // 1谿ｵ逶ｮ: 鬥・譯・驫 驥・邇・驥・驫 譯・鬥・(col: 0 -> 8)
        const goteRow1 = [
            PIECE_TYPES.KYOSHA, PIECE_TYPES.KEIMA, PIECE_TYPES.GIN, PIECE_TYPES.KIN,
            PIECE_TYPES.OU, // 窶ｻ蠕梧焔縺ｯ邇句ｰ・′荳闊ｬ逧・〒縺吶′邇峨〒繧ょ庄
            PIECE_TYPES.KIN, PIECE_TYPES.GIN, PIECE_TYPES.KEIMA, PIECE_TYPES.KYOSHA
        ];
        goteRow1.forEach((type, col) => {
            this.grid[0][col] = createPiece(type, PLAYER.GOTE);
        });

        // 2谿ｵ逶ｮ: 鬟幄ｻ・col:1), 隗定｡・col:7) -> 窶ｻ蟆・｣九・蜿ｳ縺九ｉ1遲・col0)縺ｪ縺ｮ縺ｧ縲・｣幄ｻ翫・蜿ｳ縺九ｉ2逡ｪ逶ｮ=col:1, 隗偵・蟾ｦ縺九ｉ2逡ｪ逶ｮ=col:7 (蠕梧焔隕也せ)
        // 螳滄圀縺ｮ逶､髱｢(蜿ｳ縺九ｉ1遲・縺ｫ蜷医ｏ縺帙ｋ縺溘ａ縲…ol 0=1遲・ col 8=9遲九→縺励∪縺・
        // 蠕梧焔: 2遲・col:1)縺ｫ鬟幄ｻ翫・遲・col:7)縺ｫ隗・
        this.grid[1][1] = createPiece(PIECE_TYPES.HISHA, PLAYER.GOTE);
        this.grid[1][7] = createPiece(PIECE_TYPES.KAKU, PLAYER.GOTE);

        // 3谿ｵ逶ｮ: 豁ｩ x 9
        for (let col = 0; col < 9; col++) {
            this.grid[2][col] = createPiece(PIECE_TYPES.FU, PLAYER.GOTE);
        }

        // -------------------------
        // 蜈域焔 (荳句・) 縺ｮ驟咲ｽｮ - row: 6, 7, 8
        // -------------------------
        // 7谿ｵ逶ｮ: 豁ｩ x 9
        for (let col = 0; col < 9; col++) {
            this.grid[6][col] = createPiece(PIECE_TYPES.FU, PLAYER.SENTE);
        }

        // 8谿ｵ逶ｮ: 8遲・col:7)縺ｫ鬟幄ｻ翫・遲・col:1)縺ｫ隗・
        this.grid[7][7] = createPiece(PIECE_TYPES.HISHA, PLAYER.SENTE);
        this.grid[7][1] = createPiece(PIECE_TYPES.KAKU, PLAYER.SENTE);

        // 9谿ｵ逶ｮ: 鬥・譯・驫 驥・邇・驥・驫 譯・鬥・(col: 0 -> 8)
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
     * 謖・ｮ壹＠縺溘・繧ｹ縺ｮ鬧偵ｒ蜿門ｾ・
     */
    getPiece(row, col) {
        if (row < 0 || row >= 9 || col < 0 || col >= 9) return null;
        return this.grid[row][col];
    }

    /**
     * 謖・ｮ壹＠縺溷ｺｧ讓吶′逶､髱｢蜀・°蛻､螳・
     */
    isValidPosition(row, col) {
        return row >= 0 && row < 9 && col >= 0 && col < 9;
    }

    /**
     * 鬧偵・遘ｻ蜍募庄閭ｽ遽・峇繧定ｨ育ｮ励☆繧具ｼ育視謇区叛鄂ｮ縺ｮ閠・・縺ｪ縺暦ｼ・
     */
    getPseudoLegalMoves(row, col) {
        const piece = this.getPiece(row, col);
        if (!piece) return [];

        const validMoves = [];
        const moves = piece.isPromoted && piece.type.promotedMoves ? piece.type.promotedMoves : piece.type.moves;

        // 蠕梧焔縺ｮ蝣ｴ蜷医・遘ｻ蜍墓婿蜷代ｒ蜿崎ｻ｢縺輔○繧・(row譁ｹ蜷代↓-1繧呈寺縺代ｋ)
        const directionY = piece.owner === PLAYER.SENTE ? 1 : -1;

        if (Array.isArray(moves)) {
            // 蜊倡匱繧ｸ繝｣繝ｳ繝礼ｳｻ縺ｮ蜍輔″・域ｭｩ縲∵｡るｦｬ縲・橿縲・≡縲∫脂縺ｪ縺ｩ・・
            moves.forEach(m => {
                const targetRow = row + (m[0] * directionY);
                // col縺ｮ蜿崎ｻ｢縺ｯ荳崎ｦ・ｼ亥ｰ・｣狗乢縺ｯ蟾ｦ蜿ｳ蟇ｾ遘ｰ縺ｮ蜍輔″縺ｮ縺溘ａ・峨◆縺縺怜宍蟇・↓縺ｯ蠕梧焔隕也せ縺ｧ縺ｮ蟾ｦ蜿ｳ縺悟ｿ・ｦ√↑繧ｲ繝ｼ繝繧ゅ≠繧九′縲∝ｰ・｣九・驫繧・≡縺ｪ縺ｩ縺ｯ蟾ｦ蜿ｳ蟇ｾ遘ｰ縺ｪ縺ｮ縺ｧY譁ｹ蜷代・蜿崎ｻ｢縺縺代〒蟇ｾ蠢懷庄閭ｽ
                const targetCol = col + m[1];

                if (this.isValidPosition(targetRow, targetCol)) {
                    const targetPiece = this.getPiece(targetRow, targetCol);
                    // 閾ｪ蛻・・鬧偵′縺ｪ縺・・繧ｹ縺ｪ繧臥ｧｻ蜍募庄閭ｽ
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

            // 逶ｴ邱夂ｧｻ蜍輔・蜃ｦ逅・
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

            // 1繝槭せ繧ｸ繝｣繝ｳ繝暦ｼ育ｫ懊・ｦｬ縺ｮ霑ｽ蜉縺ｮ蜍輔″・・
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
     * 鬧偵・遘ｻ蜍募庄閭ｽ遽・峇繧定ｨ育ｮ励☆繧具ｼ育視謇区叛鄂ｮ繧帝亟豁｢・・
     */
    getValidMoves(row, col) {
        const piece = this.getPiece(row, col);
        if (!piece) return [];

        const pseudoMoves = this.getPseudoLegalMoves(row, col);
        const validMoves = [];

        pseudoMoves.forEach(m => {
            // 莉ｮ遘ｻ蜍・
            const targetPiece = this.grid[m.row][m.col];
            this.grid[m.row][m.col] = piece;
            this.grid[row][col] = null;

            if (!this.isCheck(piece.owner)) {
                validMoves.push(m);
            }

            // 蜈・↓謌ｻ縺・
            this.grid[row][col] = piece;
            this.grid[m.row][m.col] = targetPiece;
        });

        return validMoves;
    }

    /**
     * 邇区焔縺梧寺縺九▲縺ｦ縺・ｋ縺句愛螳・
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
        if (kingRow === -1) return false; // 邇九′縺・↑縺・ｴ蜷医・萓ｿ螳應ｸ廓alse

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
     * 逶､荳翫・鬧偵ｒ遘ｻ蜍輔＆縺帙ｋ
     */
    movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = this.getPiece(fromRow, fromCol);
        if (!piece) return false;

        // 逶ｮ讓吝慍轤ｹ縺ｫ鬧偵′縺ゅｋ蝣ｴ蜷医・蜿悶ｋ・域戟縺｡鬧偵↓縺吶ｋ・・
        const targetPiece = this.getPiece(toRow, toCol);
        if (targetPiece) {
            // 謌舌▲縺ｦ縺・ｋ蝣ｴ蜷医・蜈・・鬧偵↓謌ｻ縺・
            const captured = createPiece(targetPiece.type, piece.owner, false);
            this.capturedPieces[piece.owner].push(captured);
        }

        // 遘ｻ蜍募・逅・
        this.grid[toRow][toCol] = piece;
        this.grid[fromRow][fromCol] = null;

        return true;
    }

    /**
     * 謖・ｮ壹＠縺滓戟縺｡鬧偵ｒ謇薙※繧九・繧ｹ縺ｮ繝ｪ繧ｹ繝医ｒ霑斐☆
     */
    getValidDrops(player, pieceType) {
        const validDrops = [];

        // 莠梧ｭｩ繝√ぉ繝・け逕ｨ縺ｫ縲∵里縺ｫ閾ｪ蛻・・譛ｪ謌舌・豁ｩ縺後≠繧句・繧呈ｴ励＞蜃ｺ縺・
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
                    // 莠梧ｭｩ縺ｮ繝√ぉ繝・け
                    if (pieceType.id === PIECE_TYPES.FU.id && pawnCols.has(col)) {
                        continue;
                    }

                    // 陦後″謇縺ｮ縺ｪ縺・ｧ偵・繝√ぉ繝・け
                    if (player === PLAYER.SENTE) {
                        if ((pieceType.id === PIECE_TYPES.FU.id || pieceType.id === PIECE_TYPES.KYOSHA.id) && row === 0) continue;
                        if (pieceType.id === PIECE_TYPES.KEIMA.id && row <= 1) continue;
                    } else {
                        if ((pieceType.id === PIECE_TYPES.FU.id || pieceType.id === PIECE_TYPES.KYOSHA.id) && row === 8) continue;
                        if (pieceType.id === PIECE_TYPES.KEIMA.id && row >= 7) continue;
                    }

                    // 閾ｪ邇峨・邇区焔謾ｾ鄂ｮ繝√ぉ繝・け
                    // 莉ｮ驟咲ｽｮ縺励※遒ｺ隱・
                    this.grid[row][col] = createPiece(pieceType, player, false);
                    const isSafe = !this.isCheck(player);
                    this.grid[row][col] = null; // 蜈・↓謌ｻ縺・

                    if (isSafe) {
                        // 謇薙■豁ｩ隧ｰ繧√・遖∵ｭ｢蛻､螳壹・縺薙％縺ｫ霑ｽ蜉莠亥ｮ夲ｼ井ｻ雁屓縺ｯ邁｡譏鍋沿縺ｮ縺溘ａ蜑ｲ諢幢ｼ・
                        validDrops.push({ row, col });
                    }
                }
            }
        }

        return validDrops;
    }

    /**
     * 謖√■鬧偵ｒ逶､縺ｮ謖・ｮ壹・菴咲ｽｮ縺ｫ謇薙▽
     */
    dropPiece(player, pieceType, toRow, toCol) {
        if (!this.isValidPosition(toRow, toCol) || this.grid[toRow][toCol] !== null) {
            return false;
        }

        const hand = this.capturedPieces[player];
        const pieceIndex = hand.findIndex(p => p.type.id === pieceType.id);

        if (pieceIndex === -1) {
            return false; // 謖√■鬧偵↓縺ｪ縺・
        }

        // 謖√■鬧偵°繧牙炎髯､
        const piece = hand.splice(pieceIndex, 1)[0];

        // 逶､縺ｫ驟咲ｽｮ
        this.grid[toRow][toCol] = piece;

        return true;
    }
}
let gameBoard;
let selectedPieceCell = null; // 迴ｾ蝨ｨ驕ｸ謚槭＆繧後※縺・ｋ鬧偵・繧ｻ繝ｫ蠎ｧ讓・{row, col}
let selectedCapturedPiece = null; // 迴ｾ蝨ｨ驕ｸ謚槭＆繧後※縺・ｋ謖√■鬧・{player, pieceType}
let lastMovedCell = null; // 譛蠕後↓鬧偵′蜍輔＞縺溘√∪縺溘・謇薙◆繧後◆繧ｻ繝ｫ蠎ｧ讓・{row, col}
let currentPlayer = PLAYER.SENTE; // 迴ｾ蝨ｨ縺ｮ繧ｿ繝ｼ繝ｳ (蛻晄悄縺ｯ蜈域焔)
let isPuzzleMode = false;         // 隧ｰ蟆・｣九Δ繝ｼ繝峨°縺ｩ縺・°
let currentPuzzle = null;         // 迴ｾ蝨ｨ縺ｮ繝代ぜ繝ｫ繝・・繧ｿ

document.addEventListener('DOMContentLoaded', () => {
    // 逶､髱｢繝・・繧ｿ繧貞・譛溷喧
    gameBoard = new Board();
    gameBoard.setupInitialPosition();

    // DOM縺ｸ謠冗判
    renderBoard();

    // 繧､繝吶Φ繝医Μ繧ｹ繝翫・縺ｮ逋ｻ骭ｲ
    document.getElementById('btn-start').addEventListener('click', () => {
        isPuzzleMode = false;
        currentPuzzle = null;
        document.getElementById('game-title').textContent = "騾壼ｸｸ蟇ｾ螻";
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

    // 蛻晄悄迥ｶ諷九・繝帙・繝逕ｻ髱｢繧定｡ｨ遉ｺ
    showScreen('home-screen');
});

/**
 * 逕ｻ髱｢縺ｮ蛻・ｊ譖ｿ縺医ｒ陦後≧
 */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

/**
 * 隧ｰ蟆・｣九・繝ｪ繧ｹ繝医ｒ謠冗判縺吶ｋ
 */
function renderPuzzleList() {
    const listContainer = document.getElementById('puzzle-list');
    listContainer.innerHTML = '';

    PUZZLES.forEach(puzzle => {
        const btn = document.createElement('button');
        btn.classList.add('puzzle-btn');
        btn.innerHTML = `<strong>${puzzle.title}</strong><br><small>${puzzle.movesToMate}謇玖ｩｰ繧・/small>`;

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
 * 蟆・｣狗乢縺ｮDOM隕∫ｴ繧堤樟蝨ｨ縺ｮgameBoard縺ｮ迥ｶ諷九〒蜀肴緒逕ｻ縺吶ｋ髢｢謨ｰ
 */
function renderBoard() {
    const boardElement = document.getElementById('shogi-board');
    boardElement.innerHTML = '';

    // 9x9縺ｮ逶､髱｢繧呈緒逕ｻ (蜀・Κ驟榊・縺ｨ蜷後§0-indexed縺ｧ蝗槭☆)
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            // 繧ｻ繝ｫ繧ｯ繝ｪ繝・け譎ゅ・繧､繝吶Φ繝医ｒ霑ｽ蜉
            cell.addEventListener('click', () => handleCellClick(row, col));

            const piece = gameBoard.getPiece(row, col);
            if (piece) {
                // 鬧偵・蠖｢繧剃ｽ懊ｋ縺溘ａ縺ｮ蜀・Κ隕∫ｴ繧剃ｽ懈・
                const pieceShape = document.createElement('div');
                pieceShape.classList.add('piece-shape');

                const pieceText = document.createElement('span');
                pieceText.textContent = piece.displayName;
                pieceShape.appendChild(pieceText);

                // 謖√■荳ｻ縺ｫ繧医ｋ繧ｹ繧ｿ繧､繝ｪ繝ｳ繧ｰ・亥ｾ梧焔縺ｯ譁・ｭ励ｒ縺ｲ縺｣縺上ｊ霑斐☆縺ｪ縺ｩ・峨ｒ霑ｽ蜉
                if (piece.owner === PLAYER.GOTE) {
                    pieceShape.classList.add('gote-piece');
                } else {
                    pieceShape.classList.add('sente-piece');
                }

                cell.appendChild(pieceShape);
            }

            // 驕ｸ謚樔ｸｭ縺ｮ繧ｻ繝ｫ繧・ｧｻ蜍募庄閭ｽ遽・峇縺ｮ繝上う繝ｩ繧､繝医ｒ蠕ｩ蜈・
            if (selectedPieceCell && selectedPieceCell.row === row && selectedPieceCell.col === col) {
                cell.classList.add('selected');
            }

            // 譛蠕後↓蜍輔°縺励◆鬧偵・繝上う繝ｩ繧､繝・
            if (lastMovedCell && lastMovedCell.row === row && lastMovedCell.col === col) {
                cell.classList.add('last-moved');
            }

            boardElement.appendChild(cell);
        }
    }

    // 鬧貞床縺ｮ謠冗判
    renderHand(PLAYER.SENTE, 'player-hand');
    renderHand(PLAYER.GOTE, 'opponent-hand');
}

function renderHand(player, elementId) {
    const container = document.querySelector(`#${elementId} .pieces-container`);
    container.innerHTML = '';

    const hand = gameBoard.capturedPieces[player];
    if (!hand || hand.length === 0) return;

    // 鬧偵・遞ｮ鬘槭＃縺ｨ縺ｫ縺ｾ縺ｨ繧√ｋ
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

        // 蠕梧焔縺ｮ謖√■鬧偵・譁・ｭ励ｒ蜿崎ｻ｢縺輔○繧・
        if (player === PLAYER.GOTE) {
            pieceEl.classList.add('gote-piece');
        }

        // 驕ｸ謚槭＆繧後◆謖√■鬧偵・繝上う繝ｩ繧､繝亥ｾｩ蜈・
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
 * 隧ｰ蟆・｣九ｒ蛻晄悄蛹悶☆繧・
 */
function initPuzzle(puzzle) {
    gameBoard.loadPuzzle(puzzle);
    currentPlayer = PLAYER.SENTE;
    lastMovedCell = null;
    clearSelection();
    renderBoard();
}

/**
 * 謖√■鬧偵′繧ｯ繝ｪ繝・け縺輔ｌ縺溘→縺阪・蜃ｦ逅・
 */
function handleHandPieceClick(player, pieceType) {
    if (player !== currentPlayer) return; // 逶ｸ謇九・謇狗分縺ｮ謖√■鬧偵・驕ｸ縺ｹ縺ｪ縺・

    clearSelection();
    selectedCapturedPiece = { player, pieceType };

    renderBoard();

    // 逶､髱｢縺ｮ謇薙※繧句ｴ謇繧偵ワ繧､繝ｩ繧､繝・
    const validDrops = gameBoard.getValidDrops(player, pieceType);
    validDrops.forEach(m => {
        const moveElement = document.querySelector(`.cell[data-row="${m.row}"][data-col="${m.col}"]`);
        if (moveElement) {
            moveElement.classList.add('valid-move');
        }
    });
}

/**
 * 逶､髱｢縺ｮ繝槭せ縺後け繝ｪ繝・け縺輔ｌ縺溘→縺阪・蜃ｦ逅・
 */
function handleCellClick(row, col) {
    // 謖√■鬧偵′驕ｸ謚槭＆繧後※縺・ｋ蝣ｴ蜷・-> 謇薙▽
    if (selectedCapturedPiece) {
        const { player, pieceType } = selectedCapturedPiece;

        const validDrops = gameBoard.getValidDrops(player, pieceType);
        const isValidDrop = validDrops.some(m => m.row === row && m.col === col);

        if (isValidDrop) {
            gameBoard.dropPiece(player, pieceType, row, col);

            lastMovedCell = { row, col };
            clearSelection();

            // 隧ｰ蟆・｣九Δ繝ｼ繝峨・蛻､螳壹ｒ蟾ｮ縺苓ｾｼ繧
            if (isPuzzleMode && player === PLAYER.SENTE) {
                if (!checkPuzzleCondition()) {
                    return; // 螟ｱ謨励＠縺ｦ繝ｪ繧ｻ繝・ヨ縺輔ｌ繧句ｴ蜷医・縺薙％縺ｧ謇薙■蛻・ｊ
                }
            }

            // 繧ｿ繝ｼ繝ｳ縺ｮ莠､莉｣
            currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;
            renderBoard();
            return;
        } else {
            // 謇薙※縺ｪ縺・ｴ謇縺後け繝ｪ繝・け縺輔ｌ縺溷ｴ蜷医・驕ｸ謚槭ｒ隗｣髯､縺励√・繧ｹ縺ｮ鬧偵ｒ驕ｸ謚槭＠逶ｴ縺吶°蛻､螳・
            clearSelection();
            const clickedPiece = gameBoard.getPiece(row, col);
            if (clickedPiece && clickedPiece.owner === currentPlayer) {
                selectPiece(row, col);
            }
            return;
        }
    }

    // 譌｢縺ｫ逶､髱｢縺ｮ鬧偵′驕ｸ謚槭＆繧後※縺・ｋ蝣ｴ蜷・-> 遘ｻ蜍輔ｂ縺励￥縺ｯ驕ｸ謚櫁ｧ｣髯､
    if (selectedPieceCell) {
        const { row: selRow, col: selCol } = selectedPieceCell;

        // 蜷後§繝槭せ繧偵け繝ｪ繝・け縺励◆蝣ｴ蜷医・驕ｸ謚櫁ｧ｣髯､
        if (selRow === row && selCol === col) {
            clearSelection();
            return;
        }

        // 遘ｻ蜍輔〒縺阪ｋ縺九←縺・°縺ｮ蛻､螳・
        const validMoves = gameBoard.getValidMoves(selRow, selCol);
        const isValidMove = validMoves.some(m => m.row === row && m.col === col);

        if (isValidMove) {
            const movingPiece = gameBoard.getPiece(selRow, selCol);
            let promote = false;

            // 謌舌ｊ縺ｮ蛻､螳・(逶ｸ謇矩劵蝨ｰ縺ｫ蜈･縺｣縺溘√∪縺溘・逶ｸ謇矩劵蝨ｰ縺九ｉ蜃ｺ縺・
            if (movingPiece.type.canPromote && !movingPiece.isPromoted) {
                const isEnterSenteEnemyZone = currentPlayer === PLAYER.SENTE && (row <= 2 || selRow <= 2);
                const isEnterGoteEnemyZone = currentPlayer === PLAYER.GOTE && (row >= 6 || selRow >= 6);

                if (isEnterSenteEnemyZone || isEnterGoteEnemyZone) {
                    // 蠑ｷ蛻ｶ謌舌ｊ縺ｮ蛻､螳夲ｼ域ｭｩ縲・ｦ呵ｻ翫・1谿ｵ逶ｮ縲∵｡るｦｬ縺ｮ1,2谿ｵ逶ｮ・・
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
                        promote = confirm("謌舌ｊ縺ｾ縺吶°・・);
                    }
                }
            }

            // 遘ｻ蜍募・逅・
            gameBoard.movePiece(selRow, selCol, row, col);

            // 謌舌ｊ繧帝←逕ｨ
            if (promote) {
                const movedPiece = gameBoard.getPiece(row, col);
                movedPiece.isPromoted = true;
            }

            lastMovedCell = { row, col };
            clearSelection();

            // 隧ｰ蟆・｣九Δ繝ｼ繝峨・蛻､螳壹ｒ蟾ｮ縺苓ｾｼ繧
            if (isPuzzleMode && currentPlayer === PLAYER.SENTE) { // 遘ｻ蜍募燕縺ｯcurrentPlayer
                if (!checkPuzzleCondition()) {
                    return;
                }
            }

            // 繧ｿ繝ｼ繝ｳ縺ｮ莠､莉｣
            currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;

            renderBoard();
        } else {
            // 遘ｻ蜍輔〒縺阪↑縺・・繧ｹ縺後け繝ｪ繝・け縺輔ｌ縺溘′縲√◎繧後′閾ｪ蛻・・蛻･縺ｮ鬧偵↑繧蛾∈謚槭＠逶ｴ縺・
            const clickedPiece = gameBoard.getPiece(row, col);
            if (clickedPiece && clickedPiece.owner === currentPlayer) {
                selectPiece(row, col);
            } else {
                clearSelection();
            }
        }
    }
    // 鬧偵′驕ｸ謚槭＆繧後※縺・↑縺・ｴ蜷・-> 閾ｪ蛻・・鬧偵↑繧蛾∈謚・
    else {
        const piece = gameBoard.getPiece(row, col);
        if (piece && piece.owner === currentPlayer) {
            selectPiece(row, col);
        }
    }
}

/**
 * 鬧偵ｒ驕ｸ謚樒憾諷九↓縺吶ｋ
 */
function selectPiece(row, col) {
    clearSelection(); // 荳譌ｦ譌｢蟄倥・驕ｸ謚槭ｒ繧ｯ繝ｪ繧｢
    selectedPieceCell = { row, col };

    // 驕ｸ謚槭＆繧後◆繧ｻ繝ｫ縺ｫ繝上う繝ｩ繧､繝医ｒ莉倅ｸ・
    const selectedElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (selectedElement) {
        selectedElement.classList.add('selected');
    }

    // 遘ｻ蜍募庄閭ｽ遽・峇繧偵ワ繧､繝ｩ繧､繝・
    const validMoves = gameBoard.getValidMoves(row, col);
    validMoves.forEach(m => {
        const moveElement = document.querySelector(`.cell[data-row="${m.row}"][data-col="${m.col}"]`);
        if (moveElement) {
            moveElement.classList.add('valid-move');
        }
    });
}

/**
 * 驕ｸ謚樒憾諷九ｒ隗｣髯､縺吶ｋ
 */
/**
 * 隧ｰ蟆・｣九・繧ｯ繝ｪ繧｢繝ｻ螟ｱ謨怜愛螳夲ｼ亥・謇九・謇狗分邨ゆｺ・峩蠕後↓蜻ｼ縺ｰ繧後ｋ・・
 */
function checkPuzzleCondition() {
    // 1. 邇区焔縺後°縺九▲縺ｦ縺・ｋ縺具ｼ・
    if (!gameBoard.isCheck(PLAYER.GOTE)) {
        setTimeout(() => {
            alert("荳肴ｭ｣隗｣・∫視謇九ｒ縺九￠縺ｦ縺上□縺輔＞縲・);
            initPuzzle(currentPuzzle);
        }, 300);
        return false;
    }

    // 2. 邇画婿・亥ｾ梧焔・峨↓縲∫視謇九ｒ蝗樣∩縺ｧ縺阪ｋ蜷域ｳ墓焔・磯・￡繧九∝粋鬧偵・ｧ偵ｒ蜿悶ｋ・峨′縺ゅｋ縺具ｼ・
    const hasValidEscapeMove = checkGoteHasEscapeMove();

    if (!hasValidEscapeMove) {
        // 隧ｰ縺ｿ・・
        setTimeout(() => {
            alert("豁｣隗｣・∬ｩｰ縺ｿ縺ｧ縺呻ｼ・);
            // 谺｡縺ｮ蝠城｡後∈騾ｲ繧縺ｪ縺ｩ縺ｮ蜃ｦ逅・ｒ縺薙％縺ｫ霑ｽ蜉
        }, 300);
        return true;
    }

    // 蝗樣∩蜿ｯ閭ｽ縺ｪ繧峨ご繝ｼ繝邯夊｡鯉ｼ域悽譚･縺ｯ縺薙％縺ｧCPU縺梧怙驕ｩ縺ｪ騾・￡譁ｹ繧偵☆繧九′莉雁屓縺ｯ荳譌ｦ菴輔ｂ縺励↑縺・°蝗ｺ螳壹・謇九ｒ謖・☆・・
    setTimeout(() => {
        alert("邇峨↓騾・￡驕薙′縺ゅｊ縺ｾ縺呻ｼ域悴隧ｰ縺ｿ・峨・);
        initPuzzle(currentPuzzle);
    }, 500);
    return false;
}

/**
 * 蠕梧焔・育脂譁ｹ・峨↓縲∫視謇九ｒ螟悶☆蜷域ｳ墓焔縺悟ｭ伜惠縺吶ｋ縺九←縺・°繧定ｪｿ縺ｹ繧・
 */
function checkGoteHasEscapeMove() {
    // 逶､荳翫・鬧偵・遘ｻ蜍輔↓繧医ｋ蝗樣∩
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const p = gameBoard.grid[r][c];
            if (p && p.owner === PLAYER.GOTE) {
                const validMoves = gameBoard.getValidMoves(r, c);
                if (validMoves.length > 0) {
                    return true; // 1縺､縺ｧ繧ら視謇区叛鄂ｮ縺ｫ縺ｪ繧峨↑縺・焔縺後≠繧後・蝗樣∩蜿ｯ閭ｽ
                }
            }
        }
    }

    // 謖√■鬧偵ｒ謇薙▽縺薙→・亥粋鬧抵ｼ峨↓繧医ｋ蝗樣∩
    const goteHand = gameBoard.capturedPieces[PLAYER.GOTE];
    if (goteHand.length > 0) {
        // 蜈ｨ縺ｦ縺ｮ遨ｺ縺阪・繧ｹ縺ｫ蟇ｾ縺励※縲∵戟縺｡鬧偵ｒ謇薙▽蜷域ｳ墓焔縺後≠繧九°遒ｺ隱・
        // (getValidDrops 縺ｫ縺ｯ閾ｪ邇峨・邇区焔謾ｾ鄂ｮ繝√ぉ繝・け縺悟性縺ｾ繧後※縺・ｋ)
        for (let i = 0; i < goteHand.length; i++) {
            const pieceType = goteHand[i];
            const validDrops = gameBoard.getValidDrops(PLAYER.GOTE, pieceType);
            if (validDrops.length > 0) {
                return true; // 1縺､縺ｧ繧よ遠縺ｦ繧九・繧ｹ・亥粋鬧偵〒邇区焔繧帝亟縺偵ｋ繝槭せ・峨′縺ゅｌ縺ｰ蝗樣∩蜿ｯ閭ｽ
            }
        }
    }

    // 菴輔ｂ謇九′縺ｪ縺代ｌ縺ｰ隧ｰ縺ｿ
    return false;
}

function clearSelection() {
    selectedPieceCell = null;
    selectedCapturedPiece = null;
    document.querySelectorAll('.cell.selected').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.cell.valid-move').forEach(el => el.classList.remove('valid-move'));
    // 謖√■鬧偵・驕ｸ謚樒憾諷九ｂ隗｣髯､
    document.querySelectorAll('.hand-piece.selected').forEach(el => el.classList.remove('selected'));
}

