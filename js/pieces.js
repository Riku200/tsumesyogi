// pieces.js - 駒の基本定義

// プレイヤーの定義
const PLAYER = {
    SENTE: 1, // 先手（自分・下側）
    GOTE: 2   // 後手（相手・上側）
};

// 駒の種類、表示名、移動ベクトル([row, col] の相対移動量, 先手(上方向マイナス)基準)の定義
// row: -1が上、+1が下 / col: -1が左(右筋)、+1が右(左筋)
const PIECE_TYPES = {
    FU: { id: 'fu', name: '歩', promotedName: 'と', canPromote: true, moves: [[-1, 0]] },
    KYOSHA: { id: 'kyosha', name: '香', promotedName: '杏', canPromote: true, moves: "forward_line" },
    KEIMA: { id: 'keima', name: '桂', promotedName: '圭', canPromote: true, moves: [[-2, -1], [-2, 1]] },
    GIN: { id: 'gin', name: '銀', promotedName: '全', canPromote: true, moves: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 1]] },
    KIN: { id: 'kin', name: '金', canPromote: false, moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]] },
    KAKU: { id: 'kaku', name: '角', promotedName: '馬', canPromote: true, moves: "diagonal_lines" },
    HISHA: { id: 'hisha', name: '飛', promotedName: '竜', canPromote: true, moves: "straight_lines" },
    GYOKU: { id: 'gyoku', name: '玉', canPromote: false, moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] },
    OU: { id: 'ou', name: '王', canPromote: false, moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] }
};

// 成り駒の移動ベクトル（金と同じ動きになるもの）
const PROMOTED_KIN_MOVES = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]];
PIECE_TYPES.FU.promotedMoves = PROMOTED_KIN_MOVES;
PIECE_TYPES.KYOSHA.promotedMoves = PROMOTED_KIN_MOVES;
PIECE_TYPES.KEIMA.promotedMoves = PROMOTED_KIN_MOVES;
PIECE_TYPES.GIN.promotedMoves = PROMOTED_KIN_MOVES;
PIECE_TYPES.HISHA.promotedMoves = "dragon";
PIECE_TYPES.KAKU.promotedMoves = "horse";
/**
 * 駒オブジェクトを生成するファクトリ関数
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
