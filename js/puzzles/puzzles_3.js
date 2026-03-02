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
    }
];
