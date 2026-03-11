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
        explanation: "【正解の手順】▲４三銀 △２二玉 ▲２三金打まで<br>【左辺へ逃がさない】<br>初手▲２三銀は△４二玉で、左辺が広くつかまりません。▲４三銀～▲２三金打が正解手順です。これを▲４三金打～▲２三銀としては△１三玉でいけません。"
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
        explanation: "【正解の手順】▲３二金 △１三玉 ▲２二銀まで<br>【銀を残す】<br>前の３問は金を残して銀打ちからでしたが、本問は銀を残して▲３二金から入ります。これは△１三玉に▲２二銀と打つため。ナナメ後ろに利く駒が最後に必要だったのです。"
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
        explanation: "【正解の手順】▲３一銀 △同玉 ▲３二金打まで<br>【危険地帯に誘え】<br>初手▲３二金打は△１二玉で続きません。正解の▲３一銀が、実戦でも現れやすい好手です。以下は△同玉なら▲３二金打、△１二玉も▲２二金まで。どちらも正解手順です。"
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
        explanation: "【正解の手順】▲１二銀成△同 玉 ▲２三金打まで<br>【ジャマ駒消去】<br>２三銀を消してしまえば▲２三金打までですが、初手▲２二銀不成は△同玉でつかまりません。正解は▲１二銀成で、△同玉、△同香いずれも▲２三金打が実現します。"
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
        explanation: "【正解の手順】▲３二銀 △同銀 ▲２二金打まで<br>【守備駒を動かす】<br>初手▲３二銀が、守りの要３一銀を移動させる好手です。以下は△１二玉なら▲２三金までの駒余り。△３二同銀には▲２二金打で詰みとなります。"
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
        explanation: "【正解の手順】▲３二銀 △同金 ▲４一金まで<br>【打ち場所をつくる】<br>本問のテーマは打ち場所をつくるための捨て駒。初手▲３二銀が、４一金を移動させる好手。以下は△同金の一手に、空いたところへ打つ▲４一金で詰め上がります。"
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
        explanation: "【正解の手順】▲１三銀 △同桂 ▲２二金まで<br>【逃げ道に捨てよ】<br>単に▲２二金は△１三玉から上部へ逃げられて詰みません。正解の▲１三銀が、代表的な詰手筋「逃げ道に捨てよ」の一手で、△同桂に▲２二金が実現します。"
    },
    {
        id: 3014,
        title: "問題 14",
        originalTitle: "No.14",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'gin', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 銀
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 0, col: 2, isPromoted: true } // 3一 馬
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 0, player: PLAYER.SENTE }, // ▲１三金打
            { isDrop: false, fromRow: 0, fromCol: 1, toRow: 2, toCol: 0, player: PLAYER.GOTE }, // △同桂
            { isDrop: true, piece: 'gin', toRow: 0, toCol: 1, player: PLAYER.SENTE } // ▲２一銀打
        ],
        explanation: "【正解の手順】▲１三金 △同桂 ▲２一銀まで<br>【少しの違いに注意】<br>前問とは銀の位置が違います。３三銀が２二に利いており、同様の順では届きません。本問では銀を残して▲１三金から入るのが良く、△同桂に▲２一銀で詰め上がります。"
    },
    {
        id: 3015,
        title: "問題 15",
        originalTitle: "No.15",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 }, // 3二 金
            { piece: 'gin', owner: PLAYER.SENTE, row: 1, col: 1 } // 2二 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 0, player: PLAYER.SENTE }, // ▲１三金打
            { isDrop: false, fromRow: 0, fromCol: 1, toRow: 2, toCol: 0, player: PLAYER.GOTE }, // △同桂
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 1, isPromote: false, player: PLAYER.SENTE } // ▲２一銀不成 (※ isPromote:false の指定自体は省略でも動く仕様であれば不要だが、明示)
        ],
        explanation: "【正解の手順】▲１三金 △同桂 ▲２一銀不成まで<br>【銀ナラズの前に一工夫】<br>いきなり▲２一銀不成は△１三玉で続きません。本問も玉頭に捨てる▲１三金が急所の一手です。以下は△同桂に▲２二銀不成（から２一へ）で詰みとなります。"
    },
    {
        id: 3016,
        title: "問題 16",
        originalTitle: "No.16",
        movesToMate: 3,
        board: [
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'gin', owner: PLAYER.GOTE, row: 3, col: 2 }, // 3四 銀
            { piece: 'fu', owner: PLAYER.SENTE, row: 0, col: 2, isPromoted: true }, // 3一 と
            { piece: 'kaku', owner: PLAYER.SENTE, row: 1, col: 2 } // 3二 角
        ],
        hand: {
            [PLAYER.SENTE]: ['gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 2, toCol: 1, player: PLAYER.SENTE }, // ▲２三銀打
            { isDrop: false, fromRow: 3, fromCol: 2, toRow: 2, toCol: 1, player: PLAYER.GOTE }, // △同銀
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 0, toCol: 1, isPromote: true, player: PLAYER.SENTE } // ▲２一角成
        ],
        explanation: "【正解の手順】▲２三銀 △同銀 ▲２一角成まで<br>【２二をふさぐ】<br>初手▲２一角成は△２三玉でつかまりません。正解の▲２三銀が「逃げ道に捨てよ」の好手です。以下は△同銀に▲２一角成までとなります。"
    },
    {
        id: 3017,
        title: "問題 17",
        originalTitle: "No.17",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 3 }, // 4二 銀
            { piece: 'fu', owner: PLAYER.SENTE, row: 0, col: 3, isPromoted: true }, // 4一 と
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 2, isPromoted: true } // 3四 龍
        ],
        hand: {
            [PLAYER.SENTE]: ['kin'],
            [PLAYER.GOTE]: ['kin', 'gin', 'keima', 'kyosha', 'fu'] // 合駒（Ai）用
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 3, fromCol: 2, toRow: 2, toCol: 1, player: PLAYER.SENTE }, // ▲２三龍
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.GOTE }, // △２二合
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ▲３二金
        ],
        explanation: "【正解の手順】▲２三龍 △２二合 ▲３二金まで<br>【上から迫る龍】<br>初手▲２三龍が急所の一手で、何を合駒しても▲３二金までとなります。詰め上がり図は金合いで受けた場合です。龍の威力で合駒の金が動けません。"
    },
    {
        id: 3018,
        title: "問題 18",
        originalTitle: "No.18",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 3, isPromoted: true }, // 4一 竜
            { piece: 'fu', owner: PLAYER.SENTE, row: 3, col: 0 } // 1四 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kin'],
            [PLAYER.GOTE]: ['kin', 'gin', 'keima', 'kyosha', 'fu'] // 合駒用
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 0, fromCol: 3, toRow: 1, toCol: 2, player: PLAYER.SENTE }, // ▲３二龍
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.GOTE }, // △２二合
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 1, player: PLAYER.SENTE } // ▲２三金
        ],
        explanation: "【正解の手順】▲３二龍 △２二合 ▲２三金まで<br>【横から迫る龍】<br>前問は上から迫る龍。本問は初手▲３二龍と横から迫ります。以下は△２二金合とはじかれても▲２三金で詰みとなります。詰め上がり図では前問同様、合駒の金が動けません。"
    },
    {
        id: 3019,
        title: "問題 19",
        originalTitle: "No.19",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 金
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 2, isPromoted: true }, // 3二 竜
            { piece: 'fu', owner: PLAYER.SENTE, row: 3, col: 0 } // 1四 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'keima']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'keima', toRow: 3, toCol: 1, player: PLAYER.SENTE }, // ▲2四桂
            { isDrop: false, fromRow: 2, fromCol: 1, toRow: 3, toCol: 1, player: PLAYER.GOTE }, // △同歩
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 1, player: PLAYER.SENTE } // ▲2三金
        ],
        explanation: "【正解の手順】▲２四桂 △同 歩 ▲２三金まで<br>【２三を空ける】<br>前問の金合いをした局面に似ていますが、本問は▲２三金と打てません。そこで、打ち場所をつくるために▲２四桂と捨てます。以下は△同歩に▲２三金が実現します。"
    },
    {
        id: 3020,
        title: "問題 20",
        originalTitle: "No.20",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 金
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 銀
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 3, isPromoted: true }, // 4一 竜
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 } // 3二 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 0, fromCol: 3, toRow: 0, toCol: 2, player: PLAYER.SENTE }, // ▲3一龍
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 2, player: PLAYER.GOTE }, // △同銀
            { isDrop: true, piece: 'kin', toRow: 0, toCol: 1, player: PLAYER.SENTE } // ▲2一金
        ],
        explanation: "【正解の手順】▲３一龍 △同 銀 ▲２一金まで<br>【龍を切る】<br>対穴熊の終盤戦に現れそうな形です。金、銀どちらも取れますが、初手▲２二金は△同玉で続きません。正解は金の方を取る▲３一龍で、△同銀に▲２一金までとなります。"
    },
    {
        id: 3021,
        title: "問題 21",
        originalTitle: "No.21 金頭の桂",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 3 } // 4三 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'keima']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'keima', toRow: 2, toCol: 2, player: PLAYER.SENTE }, // ▲３三桂打
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 2, toCol: 2, player: PLAYER.GOTE }, // △同金
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 3, player: PLAYER.SENTE } // ▲４二金打
        ],
        explanation: "【正解の手順】▲３三桂 △同 金 ▲４二金まで<br>【テーマ】：金頭の桂<br>【解説】３二金の頭に打つ初手▲３三桂が「金頭の桂」と呼ばれる手筋です。以下は△３一玉なら▲２一金まで。△５一玉や△３三同金は頭金で詰みとなります。"
    },
    {
        id: 3022,
        title: "問題 22",
        originalTitle: "No.22 金頭への桂跳ね",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 4 }, // 5二 金
            { piece: 'gin', owner: PLAYER.GOTE, row: 2, col: 3 }, // 4三 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 1, isPromoted: true }, // 2二 龍
            { piece: 'keima', owner: PLAYER.SENTE, row: 4, col: 3 } // 4五 桂
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 4, fromCol: 3, toRow: 2, toCol: 4, isPromote: false, player: PLAYER.SENTE }, // ▲５三桂不成
            { isDrop: false, fromRow: 1, fromCol: 4, toRow: 2, toCol: 4, player: PLAYER.GOTE }, // △同金
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 3, player: PLAYER.SENTE } // ▲４二金打
        ],
        explanation: "【正解の手順】▲５三桂不成 △同 金 ▲４二金まで<br>【テーマ】：金頭への桂跳ね<br>【解説】初手▲５三桂不成が、桂跳ねによる「金頭の桂」です。以下は△５一玉なら▲６一金、△５三同金も頭金で詰め上がります。なお、初手▲３三桂不成は△５一玉で届きません。"
    },
    {
        id: 3023,
        title: "問題 23",
        originalTitle: "No.23 一二に利かす桂打ち",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 2, isPromoted: true } // 3三 馬
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'keima']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'keima', toRow: 2, toCol: 1, player: PLAYER.SENTE }, // ▲２三桂打
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 2, toCol: 1, player: PLAYER.GOTE }, // △同金
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ▲３二金打
        ],
        explanation: "【正解の手順】 ▲２三桂 △同金 ▲３二金まで<br>【テーマ】：一二に利かす桂打ち<br>【解説】初手▲４三桂は △２一玉でつかまりません。正解は逆から打つ▲２三桂で、△2一玉なら▲１一馬までの駒余り。△４一玉には▲５一金、△２三同金も▲３二金までとなります。"
    },
    {
        id: 3024,
        title: "問題 24",
        originalTitle: "No.24 飛び越えることができる桂馬",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'fu', owner: PLAYER.SENTE, row: 1, col: 3, isPromoted: true }, // 4二 と
            { piece: 'kaku', owner: PLAYER.SENTE, row: 3, col: 3 } // 4四 角
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'keima']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'keima', toRow: 3, toCol: 2, player: PLAYER.SENTE }, // ▲３四桂打
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 1, toCol: 0, player: PLAYER.GOTE }, // △１二玉
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲２二金打
        ],
        explanation: "【正解の手順】▲３四桂 △１二玉 ▲２二金まで<br>【テーマ】：飛び越えることができる桂馬<br>【解説】初手▲３四桂が、駒を飛び越えて利く桂馬ならではの一手で、△１二玉に▲２二金までとなります。本問のような角と桂馬が協力する形は、美濃囲い攻略の代表的手筋です。"
    },
    {
        id: 3025,
        title: "問題 25",
        originalTitle: "No.25 離して打つ角",
        movesToMate: 3,
        board: [
            { piece: 'hisha', owner: PLAYER.GOTE, row: 1, col: 4 }, // 5二 飛
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 }, // 3二 金
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kaku']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kaku', toRow: 0, toCol: 2, player: PLAYER.SENTE }, // ▲３一角
            { isDrop: false, fromRow: 2, fromCol: 0, toRow: 1, toCol: 0, player: PLAYER.GOTE }, // △１二玉
            { isDrop: false, fromRow: 0, fromCol: 2, toRow: 1, toCol: 1, isPromote: true, player: PLAYER.SENTE } // ▲２二角成
        ],
        explanation: "【正解の手順】▲３一角 △１二玉 ▲２二角成まで<br>【テーマ】：離して打つ角<br>【解説】初手▲２二角は △１二玉で届きません。正解は離して打つ▲３一角です。以下は△2二合としても▲同角成までの駒余り。△１二玉には▲２二角成で詰みとなります。"
    },
    {
        id: 3026,
        title: "問題 26",
        originalTitle: "No.26 金を使って開き王手",
        movesToMate: 3,
        board: [
            { piece: 'hisha', owner: PLAYER.GOTE, row: 1, col: 4 }, // 5二 飛
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 0, col: 2 }, // 3一 角
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 1 }, // 2二 金
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 1, toCol: 2, player: PLAYER.SENTE }, // ▲３二金
            { isDrop: false, fromRow: 2, fromCol: 0, toRow: 1, toCol: 0, player: PLAYER.GOTE }, // △１二玉
            { isDrop: false, fromRow: 0, fromCol: 2, toRow: 1, toCol: 1, isPromote: true, player: PLAYER.SENTE } // ▲２二角成
        ],
        explanation: "【正解の手順】▲３二金 △１二玉 ▲２二角成まで<br>【テーマ】：金を使って開き王手<br>【解説】【途中図は▲３二金まで】初めに金を動かして開き王手をしますが、▲２一金は△２二合で続きません。正解は金を寄せる▲３二金（途中図）です。以下は△１二玉に▲２二角成で詰め上がります。"
    },
    {
        id: 3027,
        title: "問題 27",
        originalTitle: "No.27 銀ナラズで開き王手",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 3 }, // 4二 飛
            { piece: 'gin', owner: PLAYER.SENTE, row: 1, col: 1 } // 2二 銀
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 2, toCol: 2, isPromote: false, player: PLAYER.SENTE }, // ▲３三銀不成
            { isDrop: false, fromRow: 1, fromCol: 0, toRow: 2, toCol: 0, player: PLAYER.GOTE }, // △１三玉
            { isDrop: false, fromRow: 1, fromCol: 3, toRow: 1, toCol: 1, isPromote: true, player: PLAYER.SENTE } // ▲２二飛成
        ],
        explanation: "【正解の手順】▲３三銀不成 △１三玉 ▲２二飛成まで<br>【テーマ】：銀ナラズで開き王手<br>【解説】初手 ▲３三銀成は △１三玉から２四に逃げられてしまいます。正解の ▲３三銀不成が２四に利かせた一手で、△１三玉に ▲２二飛成までとなります。"
    },
    {
        id: 3028,
        title: "問題 28",
        originalTitle: "No.28 離して打つ飛車",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kaku', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 角
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'keima', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 桂
        ],
        hand: {
            [PLAYER.SENTE]: ['hisha', 'kyosha']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'hisha', toRow: 1, toCol: 2, player: PLAYER.SENTE }, // ▲３二飛
            { isDrop: false, fromRow: 1, fromCol: 0, toRow: 2, toCol: 0, player: PLAYER.GOTE }, // △１三玉
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 1, toCol: 1, isPromote: true, player: PLAYER.SENTE } // ▲２二飛成
        ],
        explanation: "【正解の手順】▲３二飛 △１三玉 ▲２二飛成まで<br>【テーマ】：離して打つ飛車<br>【解説】近づけて打つ▲２二飛から入るのは△１三玉で詰みません。正解は離して打つ▲３二飛で、△１三玉に▲２二飛成までとなります。３手一組で飛車を龍にする問題でした。"
    },
    {
        id: 3029,
        title: "問題 29",
        originalTitle: "No.29 下から迫る",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 3 }, // 4一 飛
            { piece: 'kin', owner: PLAYER.SENTE, row: 0, col: 1 } // 2一 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 0, fromCol: 1, toRow: 0, toCol: 0, player: PLAYER.SENTE }, // ▲１一金
            { isDrop: false, fromRow: 1, fromCol: 0, toRow: 1, toCol: 1, player: PLAYER.GOTE }, // △２二玉
            { isDrop: false, fromRow: 0, fromCol: 3, toRow: 0, toCol: 1, isPromote: true, player: PLAYER.SENTE } // ▲２一飛成
        ],
        explanation: "【正解の手順】▲１一金 △２二玉 ▲２一飛成まで<br>【テーマ】：下から迫る<br>【解説】初手▲４二飛成は△２一玉と金を取られてしまいます。正解手順は▲１一金〜▲２一飛成。下から迫って解決します。実戦でもよく見かける追い方の問題でした。"
    },
    {
        id: 3030,
        title: "問題 30",
        originalTitle: "No.30 馬を切る",
        movesToMate: 3,
        board: [
            { piece: 'kin', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 金
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 5 }, // 6二 飛
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 5, isPromoted: true }, // 6三 馬
            { piece: 'fu', owner: PLAYER.SENTE, row: 3, col: 0 } // 1四 歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 2, fromCol: 5, toRow: 0, toCol: 3, player: PLAYER.SENTE }, // ▲４一馬
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 0, toCol: 3, player: PLAYER.GOTE }, // △同銀
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲２二金
        ],
        explanation: "【正解の手順】▲４一馬 △同銀 ▲２二金まで<br>【テーマ】：馬を切る<br>【解説】美濃囲いの４一金は守りの要。それを取る初手▲４一馬が痛快な一手です。以下は△２二玉なら▲３二飛成までの駒余り。△同玉は頭金、△同銀も▲２二金で詰め上がります。"
    },
    {
        id: 3031,
        title: "問題 31",
        originalTitle: "No.31 歩を突かせる",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 1, isPromoted: true } // 2一 竜
        ],
        hand: {
            [PLAYER.SENTE]: ['gin', 'keima']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'keima', toRow: 4, toCol: 1, player: PLAYER.SENTE }, // ▲２五桂
            { isDrop: false, fromRow: 3, fromCol: 1, toRow: 4, toCol: 1, player: PLAYER.GOTE }, // △同歩
            { isDrop: true, piece: 'gin', toRow: 3, toCol: 1, player: PLAYER.SENTE } // ▲２四銀
        ],
        explanation: "【正解の手順】▲２五桂 △同歩 ▲２四銀まで<br>【テーマ】：歩を突かせる<br>【解説】初手▲２二銀は△２三玉で届きません。正解は打ち場所をつくるための▲２五桂です。以下は△同歩の一手に、空いたところへ打つ▲２四銀で詰みとなります。"
    },
    {
        id: 3032,
        title: "問題 32",
        originalTitle: "No.32 桂馬の儀打",
        movesToMate: 3,
        board: [
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'gin', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 銀
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 1, col: 2, isPromoted: true } // 3二 馬
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'keima']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'keima', toRow: 3, toCol: 1, player: PLAYER.SENTE }, // ▲2四桂
            { isDrop: false, fromRow: 2, fromCol: 2, toRow: 3, toCol: 1, player: PLAYER.GOTE }, // △同銀
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲2二金
        ],
        explanation: "【正解の手順】▲2四桂 △同銀 ▲2二金まで<br>【テーマ】：桂馬の儀打<br>【解説】3三銀が2二に利いており、初手▲2二金では詰みません。正解の▲2四桂が好手で、△同歩は▲2三金まで。△同銀には▲2二金が実現します。"
    },
    {
        id: 3033,
        title: "問題 33",
        originalTitle: "No.33 合駒をさせない",
        movesToMate: 3,
        board: [
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 3 }, // 4二 金
            { piece: 'hisha', owner: PLAYER.SENTE, row: 2, col: 3, isPromoted: true } // 4三 竜
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE }, // ▲２二金
            { isDrop: false, fromRow: 1, fromCol: 0, toRow: 1, toCol: 1, player: PLAYER.GOTE }, // △同玉
            { isDrop: false, fromRow: 2, fromCol: 3, toRow: 1, toCol: 2, player: PLAYER.SENTE } // ▲３二龍
        ],
        explanation: "【正解の手順】▲２二金 △同 玉 ▲３二龍まで<br>【テーマ】：合駒をさせない<br>【解説】いきなり▲３二龍とするのは△２二香合で続きません。正解の▲２二金が「危険地帯に誘え」の好手です。以下は△同玉に▲３二龍で詰めとなります。"
    },
    {
        id: 3034,
        title: "問題 34",
        originalTitle: "No.34 玉を引っ張り出す",
        movesToMate: 3,
        board: [
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'gin', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 銀
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'fu', owner: PLAYER.SENTE, row: 1, col: 2, isPromoted: true }, // 3二 と
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 3 }, // 4三 銀
            { piece: 'kaku', owner: PLAYER.SENTE, row: 4, col: 1, isPromoted: true } // 2五 馬
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 1, player: PLAYER.SENTE }, // ▲２三金
            { isDrop: false, fromRow: 1, fromCol: 0, toRow: 2, toCol: 1, player: PLAYER.GOTE }, // △同玉
            { isDrop: false, fromRow: 4, fromCol: 1, toRow: 3, toCol: 2, player: PLAYER.SENTE } // ▲３四馬
        ],
        explanation: "【正解の手順】▲２三金 △同 玉 ▲３四馬まで<br>【テーマ】：玉を引っ張り出す<br>【解説】初手▲３四馬は△２三歩合で続きません。正解の▲２三金が前問同様、合駒をされないよう玉を呼ぶ好手です。以下は△同玉に▲３四馬で詰め上がります。"
    },
    {
        id: 3035,
        title: "問題 35",
        originalTitle: "No.35 合い利かずの詰め",
        movesToMate: 3,
        board: [
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 金
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'gin', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 3, isPromoted: true }, // 4一 竜
            { piece: 'kaku', owner: PLAYER.SENTE, row: 0, col: 2 } // 3一 角
        ],
        hand: {
            [PLAYER.SENTE]: ['gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 0, toCol: 1, player: PLAYER.SENTE }, // ▲２一銀
            { isDrop: false, fromRow: 1, fromCol: 0, toRow: 0, toCol: 1, player: PLAYER.GOTE }, // △同玉
            { isDrop: false, fromRow: 0, fromCol: 2, toRow: 2, toCol: 0, isPromote: true, player: PLAYER.SENTE } // ▲１三角成
        ],
        explanation: "【正解の手順】▲２一銀 △同 玉 ▲１三角成まで<br>【テーマ】：合い利かずの詰め<br>【解説】初手▲２一銀が「危険地帯に誘え」の好手で、△同玉に▲１三角成までとなります。詰め上がり図では合駒が利きません。△３一合としても▲同龍で無効です。"
    },
    {
        id: 3036,
        title: "問題 36",
        originalTitle: "No.36 開き王手の前に銀捨て",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 0 }, // 1三角
            { piece: 'kyosha', owner: PLAYER.SENTE, row: 3, col: 0 } // 1四 香
        ],
        hand: {
            [PLAYER.SENTE]: ['gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 1, toCol: 0, player: PLAYER.SENTE }, // ▲１二銀
            { isDrop: false, fromRow: 0, fromCol: 0, toRow: 1, toCol: 0, player: PLAYER.GOTE }, // △同玉
            { isDrop: false, fromRow: 2, fromCol: 0, toRow: 0, toCol: 2, isPromote: true, player: PLAYER.SENTE } // ▲３一角成
        ],
        explanation: "【正解の手順】▲１二銀 △同 玉 ▲３一角成まで<br>【テーマ】：開き王手の前に銀捨て<br>【解説】単に▲３一角成は△１二桂合で届きません。まず▲１二銀で玉を呼び、△同玉に▲３一角成が正解手順となります。なお、詰め上がり図での合駒は▲同香不成で無効です。"
    },
    {
        id: 3037,
        title: "問題 37",
        originalTitle: "No.37 玉は下段に落とせ",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 2, col: 3, isPromoted: true } // 4三 竜
        ],
        hand: {
            [PLAYER.SENTE]: ['kaku', 'kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kaku', toRow: 0, toCol: 2, player: PLAYER.SENTE }, // ▲３一角
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 2, player: PLAYER.GOTE }, // △同玉
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ▲３二金
        ],
        explanation: "【正解の手順】▲３一角 △同 玉 ▲３二金まで<br>【テーマ】：玉は下段に落とせ<br>【解説】１三に玉を逃がしてはつかまりません。初手▲３一角が「玉は下段に落とせ」の好手です。以下は△１二玉なら▲３二龍までの駒余り。△同玉には▲３二金で詰め上がります。"
    },
    {
        id: 3038,
        title: "問題 38",
        originalTitle: "No.38 下からの角打ち",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 桂
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'keima', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 桂
        ],
        hand: {
            [PLAYER.SENTE]: ['kaku', 'kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kaku', toRow: 0, toCol: 1, player: PLAYER.SENTE }, // ▲２一角
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 0, toCol: 1, player: PLAYER.GOTE }, // △同玉
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲２二金
        ],
        explanation: "【正解の手順】▲２一角 △同 玉 ▲２二金まで<br>【テーマ】：下からの角打ち<br>【解説】初手▲５四角は玉を４三に逃がさず有力ですが、△４三歩合で届きません。正解の▲２一角が、前問同様「玉は下段に落とせ」の一手で、どう応じても頭金までとなります。"
    },
    {
        id: 3039,
        title: "問題 39",
        originalTitle: "No.39 歩頭に金捨て",
        movesToMate: 3,
        board: [
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'gin', owner: PLAYER.GOTE, row: 4, col: 0 }, // 1五 銀
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 }, // 3二 金
            { piece: 'hisha', owner: PLAYER.SENTE, row: 2, col: 2, isPromoted: true } // 3三 竜
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 3, toCol: 1, player: PLAYER.SENTE }, // ▲２四金
            { isDrop: false, fromRow: 4, fromCol: 0, toRow: 3, toCol: 1, player: PLAYER.GOTE }, // △同銀
            { isDrop: false, fromRow: 2, fromCol: 2, toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲２二龍
        ],
        explanation: "【正解の手順】▲２四金 △同 銀 ▲２二龍まで<br>【テーマ】：歩頭に金捨て<br>【解説】単に▲２二龍は△２四玉で詰みません。正解の▲２四金が「逃げ道に捨てよ」の好手です。以下は△１二玉なら▲２三龍までの駒余り。△２四同銀には▲２二龍が実現します。"
    },
    {
        id: 3040,
        title: "問題 40",
        originalTitle: "No.40 金に動いてもらう",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 3 }, // 4二 銀
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'gin', owner: PLAYER.SENTE, row: 0, col: 3 }, // 4一 銀
            { piece: 'kin', owner: PLAYER.SENTE, row: 3, col: 1 } // 2四 金
        ],
        hand: {
            [PLAYER.SENTE]: ['hisha', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'gin', toRow: 2, toCol: 1, player: PLAYER.SENTE }, // ▲２三銀
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 2, toCol: 1, player: PLAYER.GOTE }, // △同金
            { isDrop: true, piece: 'hisha', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ▲３二飛
        ],
        explanation: "【正解の手順】▲２三銀 △同 金 ▲３二飛まで<br>【テーマ】：金に動いてもらう<br>【解説】初手▲３二銀成と金を取るのは△同玉で続きません。正解は金の移動を目指す▲２三銀です。以下は△３一玉なら金を取って駒余り。△２三同金には▲３二飛で詰めとなります。"
    },
    {
        id: 3041,
        title: "問題 41",
        originalTitle: "No.41 銀が並んで詰め上がり",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kaku', owner: PLAYER.SENTE, row: 1, col: 1 }, // 2二 角
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 2 } // 3三 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 2, isPromote: true, player: PLAYER.SENTE }, // ▲３一角成
            { isDrop: false, fromRow: 0, fromCol: 1, toRow: 0, toCol: 2, player: PLAYER.GOTE }, // △同玉
            { isDrop: true, piece: 'gin', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ▲３二銀打
        ],
        explanation: "【正解の手順】▲３一角成△同　玉　▲３二銀打まで<br>【テーマ】：銀が並んで詰め上がり<br>【解説】初手▲３一角成が「危険地帯に誘え」の好手です。以下は玉が逃げれば▲２二馬までの駒余り。△３一同玉には▲３二銀打で詰めとなります。"
    },
    {
        id: 3042,
        title: "問題 42",
        originalTitle: "No.42 ジャマな銀を消す",
        movesToMate: 3,
        board: [
            { piece: 'hisha', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 飛
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 銀
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 1, col: 1 }, // 2二 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 1 } // 2四 飛
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 0, isPromote: true, player: PLAYER.SENTE }, // ▲１一銀成
            { isDrop: false, fromRow: 0, fromCol: 3, toRow: 0, toCol: 0, player: PLAYER.GOTE }, // △同飛
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE } // ▲２二金
        ],
        explanation: "【正解の手順】▲１一銀成 △同 飛 ▲２二金まで<br>【テーマ】：ジャマな銀を消す<br>【解説】初手▲１一金は△同飛▲同銀成△同玉で届きません。正解はジャマになっている銀を消す▲１一銀成です。以下は△同玉、△同飛いずれも▲２二金までとなります。"
    },
    {
        id: 3043,
        title: "問題 43",
        originalTitle: "No.43 捨てるのは角",
        movesToMate: 3,
        board: [
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 金
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 2 }, // 3四 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 1, col: 2 } // 3二 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['kaku', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kaku', toRow: 0, toCol: 1, player: PLAYER.SENTE }, // ▲２一角
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 1, player: PLAYER.GOTE }, // △同金
            { isDrop: true, piece: 'gin', toRow: 2, toCol: 1, player: PLAYER.SENTE } // ▲２三銀打
        ],
        explanation: "【正解の手順】▲２一角 △同 金 ▲２三銀打まで<br>【テーマ】：捨てるのは角<br>【解説】初手▲２一角が２二金を移動させるための一手で、△同金に▲２三銀打までとなります。なお、角と銀の打ち順を変えて▲２一銀打〜▲２三角は△２二玉で詰めません。"
    },
    {
        id: 3044,
        title: "問題 44",
        originalTitle: "No.44 金を打って引く",
        movesToMate: 3,
        board: [
            { piece: 'kin', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 金
            { piece: 'hisha', owner: PLAYER.GOTE, row: 1, col: 3 }, // 4二 飛
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 3 }, // 4三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 1 } // 2四 飛
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 1, player: PLAYER.SENTE }, // ▲２二金
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 2, toCol: 2, player: PLAYER.GOTE }, // △３三玉
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 2, toCol: 1, player: PLAYER.SENTE } // ▲２三金
        ],
        explanation: "【正解の手順】▲２二金 △３三玉 ▲２三金まで<br>【テーマ】：金を打って引く<br>【解説】金の打ち場所がポイントです。初手▲２三金は玉を引かれて、２二に飛車が利いており続きません。正解手順は▲２二金〜▲２三金。金を打って引いて詰め上がります。"
    },
    {
        id: 3045,
        title: "問題 45",
        originalTitle: "No.45 玉を呼ぶ金捨て",
        movesToMate: 3,
        board: [
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 0, isPromoted: true }, // 1四 竜
            { piece: 'kyosha', owner: PLAYER.SENTE, row: 4, col: 0 } // 1五 香
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 0, toCol: 1, player: PLAYER.SENTE }, // ▲２一金
            { isDrop: false, fromRow: 1, fromCol: 1, toRow: 0, toCol: 1, player: PLAYER.GOTE }, // △同玉
            { isDrop: false, fromRow: 3, fromCol: 0, toRow: 0, toCol: 0, isPromote: true, player: PLAYER.SENTE } // ▲１一龍
        ],
        explanation: "【正解の手順】▲２一金 △同 玉 ▲１一龍まで<br>【テーマ】：玉を呼ぶ金捨て<br>【解説】金を持ったままいきなり龍の王手をしてもうまくいきません。初手▲２一金が「危険地帯に誘え」の好手です。以下は1二玉なら3二竜までの駒余り。△2一同玉に▲１一龍で詰めとなります。"
    },
    {
        id: 3046,
        title: "問題 46",
        originalTitle: "No.46 金から打つ",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'kaku', owner: PLAYER.SENTE, row: 3, col: 1, isPromoted: true } // 2四 馬
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'gin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 3, player: PLAYER.SENTE }, // ▲４二金
            { isDrop: false, fromRow: 0, fromCol: 2, toRow: 1, toCol: 1, player: PLAYER.GOTE }, // △２二玉
            { isDrop: true, piece: 'gin', toRow: 2, toCol: 2, player: PLAYER.SENTE } // ▲２三銀
        ],
        explanation: "【正解の手順】▲４二金 △２二玉 ▲２三銀まで<br>【テーマ】：金から打つ<br>【解説】持駒の金銀を使う順序がテーマです。初手▲４二銀は△３二玉と逃げられて届きません。正解手順は▲４二金〜▲２三銀。金を先に使うのがポイントでした。"
    },
    {
        id: 3047,
        title: "問題 47",
        originalTitle: "No.47 龍を捨てる",
        movesToMate: 3,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 金
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 4, isPromoted: true }, // 5二 竜
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 4 } // 5三 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: false, fromRow: 1, fromCol: 4, toRow: 0, toCol: 3, isPromote: true, player: PLAYER.SENTE }, // ▲４一龍
            { isDrop: false, fromRow: 0, fromCol: 2, toRow: 0, toCol: 3, player: PLAYER.GOTE }, // △同玉
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 3, player: PLAYER.SENTE } // ▲４二金
        ],
        explanation: "【正解の手順】▲４一龍 △同 玉 ▲４二金まで<br>【テーマ】：龍を捨てる<br>【解説】初手▲４二銀成は△２一玉▲３二金△１二玉で失敗。▲５一龍も△３二玉でつかまりません。正解の▲４一龍が玉を呼ぶための好手で、△同玉に頭金までとなります。"
    },
    {
        id: 3048,
        title: "問題 48",
        originalTitle: "No.48 金はナナメに誘え",
        movesToMate: 3,
        board: [
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'gin', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 3, isPromoted: true }, // 4一 竜
            { piece: 'gin', owner: PLAYER.SENTE, row: 4, col: 2 } // 3五 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['kin', 'kin']
        },
        isShapePuzzle: false,
        expectedMoves: [
            { isDrop: true, piece: 'kin', toRow: 2, toCol: 3, player: PLAYER.SENTE }, // ▲４三金
            { isDrop: false, fromRow: 1, fromCol: 2, toRow: 2, toCol: 3, player: PLAYER.GOTE }, // △同金
            { isDrop: true, piece: 'kin', toRow: 1, toCol: 2, player: PLAYER.SENTE } // ▲３二金
        ],
        explanation: "【正解の手順】▲４三金 △同　金 ▲３二金まで<br>【テーマ】：金はナナメに誘え<br>【解説】初手▲３四金や▲４四金は△２二玉で詰みません。正解の▲４三金が、３二金を動かす好手です。以下は△２二玉なら▲３二龍までの駒余り. △同金には▲３二金で解決します。"
    }
];



