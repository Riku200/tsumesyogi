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
    },
    {
        id: 1005,
        title: "問題 5",
        originalTitle: "No.5 金をナナメに進める",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三 金
            { piece: 'kaku', owner: PLAYER.SENTE, row: 3, col: 3 } // 4四 角
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: true,
        solution: { row: 1, col: 1, piece: 'kin' }, // 2二 金
        explanation: "【正解の手順】▲２二金まで<br>【金をナナメに進める】<br>▲２二金まで、金をナナメに進めて頭金の詰み形となります。金は囲いに欠かせない駒ですが、終盤戦では詰みの場面で大いに役立ちます。"
    },
    {
        id: 1006,
        title: "問題 6",
        originalTitle: "No.6 金をまっすぐ進める",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 金
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三 金
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 1 } // 2三 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        explanation: "【正解の手順】▲２二金直まで<br>【テーマ】：金をまっすぐ進める<br>【解説】▲２二金直まで、2三金をまっすぐ進めて詰上がります。もう１枚の金、３三金を進める▲２二金左は、△４二玉と逃げられてつかまりません。"
    },
    {
        id: 1007,
        title: "問題 7",
        originalTitle: "No.7 金を寄る",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 金
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 2, isPromoted: true }, // 3一 竜
            { piece: 'kin', owner: PLAYER.SENTE, row: 0, col: 1 } // 2一 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        explanation: "【正解の手順】▲１一金まで<br>【テーマ】：金を寄る<br>【解説】▲３二竜は△２二歩合で詰みません。金を寄る▲１一金が正解です。本問のように竜や飛車の横利きを生かして金で迫るという形は実戦でもよくあります。"
    },
    {
        id: 1008,
        title: "問題 8",
        originalTitle: "No.8 金を引く",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 1 }, // 2一 飛
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 1 } // 2二 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        explanation: "【正解の手順】▲２三金まで。<br>【テーマ】：金を引く<br>【解説】▲２三金まで、金を引いて腹金の詰み形となります。前問は竜の横利きで詰みましたが、本問では飛車がタテの利きでサポートしています。"
    },
    {
        id: 1009,
        title: "問題 9",
        originalTitle: "No.9 玉頭に銀打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 2 } // 3三 金
        ],
        hand: {
            [PLAYER.SENTE]: ['gin']
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 2, piece: 'gin' }, // 3二 銀
        explanation: "【正解の手順】▲３二銀まで。<br>【テーマ】：玉頭に銀打ち<br>【解説】▲３二銀まで、玉頭に銀を打って詰め上がります。横に利いていない銀で上から押さえるには他の駒との協力がポイント。本問では３三金が銀の横をカバーしています。"
    },
    {
        id: 1010,
        title: "問題 10",
        originalTitle: "No.10 ナナメ下からの銀打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 銀
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 0, col: 2 } // 3一 金
        ],
        hand: {
            [PLAYER.SENTE]: ['gin']
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 1, piece: 'gin', isPromoted: false }, // 2一 銀
        explanation: "【正解の手順】▲２一銀まで。<br>【テーマ】：ナナメ下からの銀打ち<br>【解説】▲２一銀まで、玉のナナメ下からの王手で詰めとなります。銀が金より優れている点は、ナナメ下に利いていること。本問で持駒が金なら王手もかかりません。"
    },
    {
        id: 1011,
        title: "問題 11",
        originalTitle: "No.11 直進して銀成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 玉
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 1 }, // 2三 銀
            { piece: 'kyosha', owner: PLAYER.SENTE, row: 3, col: 1 } // 2四 香
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'gin', isPromoted: true }, // 2二 銀成
        explanation: "【正解の手順】▲２二銀成まで。<br>【テーマ】：直進して銀成り<br>【解説】銀をまっすぐ進めて成る▲２二銀成が正解です。銀を成らないと△１二玉で詰めません。銀が金と同様の成銀になって詰め上がることはよくあります。"
    },
    {
        id: 1012,
        title: "問題 12",
        originalTitle: "No.12 直進して銀ナラズ",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 1, col: 1 }, // 2二 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 1 } // 2四 飛
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 1, piece: 'gin', isPromoted: false }, // 2一 銀不成
        explanation: "【正解の手順】▲２一銀不成まで。<br>【テーマ】：直進して銀ナラズ<br>【解説】前問と同じく銀をまっすぐ進めます。ただし成ってはいけません。ナナメ下の利きが必要です。銀は成らない方がいいというケースも多くあります。"
    }
];
