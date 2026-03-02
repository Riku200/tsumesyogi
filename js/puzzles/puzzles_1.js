const PUZZLES_1 = [
    {
        id: 1001,
        title: "問題 1",
        originalTitle: "No.1 玉頭に金打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'fu', owner: PLAYER.SENTE, row: 2, col: 2 } // 3三 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: true,
        solution: { row: 1, col: 2, piece: 'kin' }, // 3二 金
        explanation: "【正解の手順】▲3二金まで<br>【玉頭に金打ち】<br>玉の上から打つ▲3二金までで、頭金と呼ばれている形になって詰みです。玉頭の金、頭金は実戦でもっとも現れる詰み形と言っていいでしょう！"
    },
    {
        id: 1002,
        title: "問題 2",
        originalTitle: "No.2 コビンに金打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 玉
            { piece: 'fu', owner: PLAYER.SENTE, row: 2, col: 1 } // 2三 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: true,
        solution: { row: 1, col: 1, piece: 'kin' }, // 2二 金
        explanation: "【正解の手順】▲2二金まで<br>【コビンに金打ち】<br>玉のナナメ、コビンに打つ▲2二金が正解です。前、横すべてに利いている金は、頭金や本問のように上から押さえる場合にうってつけの駒です！"
    },
    {
        id: 1003,
        title: "問題 3",
        originalTitle: "No.3 横からの金打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'fu', owner: PLAYER.SENTE, row: 2, col: 1 } // 2三 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: true,
        solution: { row: 1, col: 1, piece: 'kin' }, // 2二 金
        explanation: "【正解の手順】▲2二金まで<br>【横からの金打ち】<br>玉の横から打つ▲2二金までで、腹金と呼ばれている形で詰みです。頭金やコビンへの金打ちと同じく、腹金もよく見かける詰み形です！"
    },
    {
        id: 1004,
        title: "問題 4",
        originalTitle: "No.4 下からの金打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 0, col: 1 }, // 2一 金 (攻め方)
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 } // 3二 金 (玉方)
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: true,
        solution: { row: 0, col: 0, piece: 'kin' }, // 1一 金
        explanation: "【正解の手順】▲1一金打まで<br>【下からの金打ち】<br>▲1一金打まで、下からの金打ちで詰め上がります。一段目の金はあまり働きがよくないですが、本問のように玉頭がふさがっているときには有効な手段になります！"
    }
];
