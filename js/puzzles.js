const PUZZLES = [
    {
        id: 1,
        title: "No.1 頭に金打ち",
        board: [
            // { piece: 'type_id', owner: PLAYER, row: 0-8, col: 0-8 }
            // 画像の詰将棋: 玉が3一、歩が3三。攻め方(先手)の持駒は金。
            // ※配列の行(row)・列(col)は0オリジン。
            // 3一 = 行0, 列2(右から3番目)
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 },
            // 3三 = 行2, 列2
            { piece: 'fu', owner: SENTE, row: 2, col: 2 }
        ],
        hand: {
            [PLAYER.SENTE]: ['kin'],
            // 残りの駒は自動的に後手の持ち駒になる
        },
        movesToMate: 1 // 1手詰め
    },
    {
        id: 2,
        title: "No.2 尻金",
        board: [
            // 画像2の詰将棋: 玉が3一、歩が3三。攻め方(先手)の持駒は金。
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 },
            { piece: 'fu', owner: SENTE, row: 2, col: 2 }
        ],
        hand: {
            [PLAYER.SENTE]: ['kin'],
            // 残りの駒は自動的に後手の持ち駒になる
        },
        movesToMate: 1 // 1手詰め
    }
];
