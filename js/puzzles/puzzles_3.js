const PUZZLES_3 = [
    {
        id: 3001,
        title: "問題 1",
        originalTitle: "No.1 玉頭への金打ち",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 3 }, // 4二 玉
            { piece: 'gin', owner: PLAYER.SENTE, row: 3, col: 3 } // 4四 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'kin']
        },
        isShapePuzzle: false, // 3手詰めは手順で判定する
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 3, player: PLAYER.SENTE }, // ☗4三金
            { isDrop: false, fromRow: 1, fromCol: 3, toRow: 0, toCol: 2, player: PLAYER.GOTE }, // ☖3一玉
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ☗3二金打 (3二へは盤上の金引きもあるが打つのが正解)
        ],
        explanation: "【正解の手順】☗４三金 ☖３一玉 ☗３二金打まで<br>【玉頭への金打ち】<br>玉頭に打つ初手☗４三金が頭金と呼ばれる一手で、どこへ逃げても再度の頭金で詰みとなります。金は前、横５カ所に利いており、上から押さえるには最適の駒と言えます！"
    },
    {
        id: 3002,
        title: "問題 2",
        originalTitle: "No.2 横からの金打ち",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'gin', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 銀
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 3 } // 4三 金
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE }, // ☗3二金打
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 0, player: PLAYER.GOTE }, // ☖1一玉
            { isDrop: true, piece: 'kin', toRow: 0, toCol: 1, player: PLAYER.SENTE } // ☗2一金打
        ],
        explanation: "【正解の手順】☗３二金打 ☖１一玉 ☗２一金打まで<br>【横からの金打ち】<br>前問は頭金の連打。本問は玉の横から打つ腹金二回が正解手順です。なお、初手☗３二金打に☖２三玉は☗３三金寄（引）までの駒余りとなるため、正しい逃げ方ではありません。"
    },
    {
        id: 3003,
        title: "問題 3",
        originalTitle: "No.3 下からの金打ち",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'gin', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 銀
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 3 } // 4三 角
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 0, toCol: 1, player: PLAYER.SENTE }, // ☗2一金
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 1, toCol: 0, player: PLAYER.GOTE }, // ☖1二玉
            { isDrop: true, piece: 'kin', toRow: 0, toCol: 0, player: PLAYER.SENTE } // ☗1一金打
        ],
        explanation: "【正解の手順】☗２一金 ☖１二玉 ☗１一金打まで<br>【下からの金打ち】<br>初手☗３二金は☖１二玉で詰みません。本問は☗２一金、☗１一金打と玉の下から打つ金を続けて詰め上がります。効率の悪い一段目の金が急所になることもあります！"
    },
    {
        id: 3004,
        title: "問題 4",
        originalTitle: "No.4 コビンへの金打ち",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'gin', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 銀
            { piece: 'gin', owner: PLAYER.SENTE, row: 3, col: 0 } // 1四 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 1, player: PLAYER.SENTE }, // ☗2三金
            { isDrop: false, fromRow: 1, fromCol: 0, toRow: 0, toCol: 1, player: PLAYER.GOTE }, // ☖2一玉
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ☗3二金打
        ],
        explanation: "【正解の手順】☗２三金 ☖２一玉 ☗３二金打まで<br>【コビンへの金打ち】<br>初手☗１三金の頭金は☖２一玉で続きません。以下☗２二金打は☖同銀と取られてしまいます。持駒金二枚の４問目は玉のナナメから、コビンへの金連打でした！"
    },
    {
        id: 3107,
        title: "問題 107",
        originalTitle: "No.107 隅へ追い込む",
        movesToMate: 3,
        board: [
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 0 }, // 1一 飛
            { piece: 'fu', owner: PLAYER.SENTE, row: 3, col: 2 }, // 3四 歩
            { piece: 'kyosha', owner: PLAYER.SENTE, row: 3, col: 0 } // 1四 香
        ],
        hand: {
            [PLAYER.SENTE]: ['gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 3, fromCol: 0, toRow: 2, toCol: 0, player: PLAYER.SENTE }, // ▲１三香成
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 0, player: PLAYER.GOTE }, // △１一玉
            { isDrop: true, piece: 'gin', toRow: 1, toCol: 0, player: PLAYER.SENTE } // ▲１二銀打
        ],
        explanation: "【正解の手順】▲１三香成 △１一玉 ▲１二銀まで<br>【隅へ追い込む】<br>▲１二飛成や▲１三飛成と飛車成から入るのは△３一玉で続きません。初手は▲１三香成が正解です。以下は△１一玉に▲１二銀で詰みとなります。"
    },
    {
        id: 3005,
        title: "問題 5",
        originalTitle: "No.5 コビンへの銀打ち",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 3 } // 4二 金
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin'] // 手順解説にそって金と銀
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 1, toCol: 2, player: PLAYER.SENTE }, // ▲３二銀打
            { isDrop: false, fromRow: 0, fromCol: 1, toRow: 1, toCol: 0, player: PLAYER.GOTE }, // △１二玉
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 1, player: PLAYER.SENTE } // ▲２三金打
        ],
        explanation: "【正解の手順】▲３二銀 △１二玉 ▲２三金まで<br>【コビンへの銀打ち】<br>持駒の金と銀を使う順序がポイントです。初手▲３二金打は△１二玉で詰みません。正解の▲３二銀が急所の一手で、１二、２二どちらへ逃げても▲２三金までとなります。"
    },
    {
        id: 3006,
        title: "問題 6",
        originalTitle: "No.6 上へと追い出す",
        movesToMate: 3,
        board: [
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 2, isPromoted: true }, // 3二 竜
            { piece: 'fu', owner: PLAYER.SENTE, row: 5, col: 1 } // 2六 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 1, toCol: 1, player: PLAYER.SENTE }, // ▲2二銀
            { isDrop: false, fromRow: 2, fromCol: 0, toRow: 3, toCol: 1, player: PLAYER.GOTE }, // △2四玉
            { isDrop: true, piece: 'kin', toRow: 4, toCol: 1, player: PLAYER.SENTE } // ▲2五金
        ],
        explanation: "【正解の手順】▲2二銀 △2四玉 ▲2五金まで<br>【上へと追い出す】<br>△2四玉のときに▲2五金で詰む形を目指したいところです。そこで、初手は金を残して▲2二銀。以下は△1二玉なら▲2一龍まででの駒余り。△2四玉には頭金が実現します。"
    },
    {
        id: 3007,
        title: "問題 7",
        originalTitle: "No.7",
        movesToMate: 3,
        board: [
            { piece: 'kin', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 金
            { piece: 'gin', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 銀
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 玉
            { piece: 'kin', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 金 (※本来は3四ですが盤面に合わせてrow/colを設定)
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 2, toCol: 3, player: PLAYER.SENTE }, // ▲４三銀打
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 1, toCol: 1, player: PLAYER.GOTE }, // △２二玉
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 1, player: PLAYER.SENTE } // ▲２三金打
        ],
        explanation: "【正解の手順】▲４三銀 △２二玉 ▲２三金打まで<br>左辺へ逃がさない初手▲２三銀は△４二玉で、左辺が広くつかまりません。▲４三銀～▲２三金打が正解手順です。これを▲４三金打～▲２三銀としては△１三玉でいけません。"
    },
    {
        id: 3008,
        title: "問題 8",
        originalTitle: "No.8",
        movesToMate: 3,
        board: [
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 3, isPromoted: true }, // 4一 竜
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE }, // ▲３二金打
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 2, toCol: 0, player: PLAYER.GOTE }, // △１三玉
            { isDrop: true, piece: 'gin', toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲２二銀打
        ],
        explanation: "【正解の手順】▲３二金 △１三玉 ▲２二銀まで<br>銀を残す前の３問は金を残して銀打ちからでしたが、本問は銀を残して▲３二金から入ります。これは△１三玉に▲２二銀と打つため。ナナメ後ろに利く駒が最後に必要だったのです。"
    },
    {
        id: 3009,
        title: "問題 9",
        originalTitle: "No.9",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 3 } // 4三 金
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 0, toCol: 2, player: PLAYER.SENTE }, // ▲３一銀打
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 2, player: PLAYER.GOTE }, // △同玉
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ▲３二金打
        ],
        explanation: "【正解の手順】▲３一銀 △同玉 ▲３二金打まで<br>No.9 危険地帯に誘え初手▲３二金打は△１二玉で続きません。正解の▲３一銀が、実戦でも現れやすい好手です。以下は△同玉なら▲３二金打、△１二玉も▲２二金まで。どちらも正解手順です。"
    },
    {
        id: 3010,
        title: "問題 10",
        originalTitle: "No.10",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 1 }, // 2三 銀
            { piece: 'kin', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 金
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 2, fromCol: 1, toRow: 1, toCol: 0, isPromote: true, player: PLAYER.SENTE }, // ▲１二銀成 (isPromoteはプログラムの都合上不要かもですが本来は成る) - 正確には成りの指定が複雑な場合は、from/to のみでチェックされます
            { isDrop: false, fromRow: 2, fromCol: 0, toRow: 1, toCol: 0, player: PLAYER.GOTE }, // △同玉
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 1, player: PLAYER.SENTE } // ▲２三金打
        ],
        explanation: "【正解の手順】▲１二銀成△同 玉 ▲２三金打まで<br>ジャマ駒消去２三銀を消してしまえば▲２三金打までですが、初手▲２二銀不成は△同玉でつかまりません。正解は▲１二銀成で、△同玉、△同香いずれも▲２三金打が実現します。"
    },
    {
        id: 3011,
        title: "問題 11",
        originalTitle: "No.11",
        movesToMate: 3,
        board: [
            { piece: 'gin', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 銀
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 2 } // 3三 金
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 1, toCol: 2, player: PLAYER.SENTE }, // ▲３二銀打
            { isDrop: false, fromRow: 0, fromCol: 2, toRow: 1, toCol: 2, player: PLAYER.GOTE }, // △同銀
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲２二金打
        ],
        explanation: "【正解の手順】▲３二銀 △同銀 ▲２二金打まで<br>守備駒を動かす初手▲３二銀が、守りの要３一銀を移動させる好手です。以下は△１二玉なら▲２三金までの駒余り。△３二同銀には▲２二金打で詰みとなります。"
    },
    {
        id: 3012,
        title: "問題 12",
        originalTitle: "No.12",
        movesToMate: 3,
        board: [
            { piece: 'kin', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 金
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kaku', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 角
            { piece: 'hisha', owner: PLAYER.SENTE, row: 2, col: 3, isPromoted: true } // 4三 竜
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 1, toCol: 2, player: PLAYER.SENTE }, // ▲３二銀打
            { isDrop: false, fromRow: 0, fromCol: 3, toRow: 1, toCol: 2, player: PLAYER.GOTE }, // △同金
            { isDrop: true, piece: 'kin', toRow: 0, toCol: 3, player: PLAYER.SENTE } // ▲４一金打
        ],
        explanation: "【正解の手順】▲３二銀 △同金 ▲４一金まで<br>打ち場所をつくるための捨て駒がテーマです。初手▲３二銀が、４一金を移動させる好手。以下は△同金の一手に、空いたところへ打つ▲４一金で詰め上がります。"
    },
    {
        id: 3013,
        title: "問題 13",
        originalTitle: "No.13",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 銀
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 0, col: 2, isPromoted: true } // 3一 馬
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 2, toCol: 0, player: PLAYER.SENTE }, // ▲１三銀打
            { isDrop: false, fromRow: 0, fromCol: 1, toRow: 2, toCol: 0, player: PLAYER.GOTE }, // △同桂
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲２二金打
        ],
        explanation: "【正解の手順】▲１三銀 △同桂 ▲２二金まで<br>単に▲２二金は△１三玉から上部へ逃げられて詰みません。正解の▲１三銀が、代表的な詰手筋「逃げ道に捨てよ」の一手で、△同桂に▲２二金が実現します。"
    }
];
