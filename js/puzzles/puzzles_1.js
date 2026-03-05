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
    },
    {
        id: 1013,
        title: "問題 13",
        originalTitle: "No.13 ナナメに進んで銀成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三 銀
            { piece: 'kaku', owner: PLAYER.SENTE, row: 3, col: 3 } // 4四 角
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'gin', isPromoted: true }, // 2二 銀成
        explanation: "【正解の手順】▲２二銀成まで。<br>【テーマ】：ナナメに進んで銀成り<br>【解説】▲２二銀成まで、銀をナナメに進めて成り、詰めとなります。詰め上がりは腹金の形。２二には４四角が利いており、取ることができません。"
    },
    {
        id: 1014,
        title: "問題 14",
        originalTitle: "No.14 ナナメに進んで銀ナラズ",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 }, // 3二 金
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三 銀
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'gin', isPromoted: false }, // 2二 銀不成
        explanation: "【正解の手順】▲２二銀不成まで。<br>【テーマ】：ナナメに進んで銀ナラズ<br>【解説】前問と同じように銀をナナメに進めますが、本問では成らないのが正解です。三段目の端玉に下から銀の王手。実戦でもよく現れるパターンと言えます。"
    },
    {
        id: 1015,
        title: "問題 15",
        originalTitle: "No.15 ナラズで銀引き",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 桂
            { piece: 'fu', owner: PLAYER.GOTE, row: 4, col: 1 }, // 2五 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 4, col: 0 }, // 1五 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 1, col: 0 }, // 1二 銀
            { piece: 'kin', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 1, piece: 'gin', isPromoted: false }, // 2三 銀不成
        explanation: "【正解の手順】▲２三銀不成まで。<br>【テーマ】：ナラズで銀引き<br>【解説】銀をナラズで引き、前問と同じようにナナメ下からの王手で詰め上がります。ナナメが自由な銀には『銀は千鳥に使え』『銀はナラズに好手あり』といった格言があります。"
    },
    {
        id: 1016,
        title: "問題 16",
        originalTitle: "No.16 四段目に銀引き成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 4, col: 0 }, // 1五 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三 銀
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 1, piece: 'gin', isPromoted: true }, // 2四 銀成
        explanation: "【正解の手順】▲２四銀成まで。<br>【テーマ】：四段目に銀引き成り<br>【解説】▲２四銀成まで、銀を引いて成り、詰めとなります。飛車、角、銀は三段目より上に入ったり、その中で動いた場合だけではなく、そこから出るときにも成ることができます。"
    },
    {
        id: 1017,
        title: "問題 17",
        originalTitle: "No.17 独特な桂馬",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 } // 3二 金
        ],
        hand: {
            [PLAYER.SENTE]: ['keima']
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 1, piece: 'keima' }, // 2三 桂
        explanation: "【正解の手順】▲２三桂まで。<br>【テーマ】：独特な桂馬<br>【解説】▲２三桂と打って詰め上がります。３二金が２筋に利いており、玉は逃げられません。１筋の玉に対して２筋に打って王手。桂馬の動きは独特です。"
    },
    {
        id: 1018,
        title: "問題 18",
        originalTitle: "No.18 飛び越える王手",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'kaku', owner: PLAYER.GOTE, row: 1, col: 1 } // 2二 角
        ],
        hand: {
            [PLAYER.SENTE]: ['keima']
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 1, piece: 'keima' }, // 2三 桂
        explanation: "【正解の手順】▲2三桂まで。<br>【テーマ】：飛び越える王手<br>【解説】前問と同じく▲2三桂までとなります。桂馬は駒を飛び越えることができます。詰め上がり図のように3枚の駒が玉をガードしていても王手は解消されません。"
    },
    {
        id: 1019,
        title: "問題 19",
        originalTitle: "No.19 ナラズで桂跳ね",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'fu', owner: PLAYER.SENTE, row: 1, col: 1 }, // 2二 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三 金
            { piece: 'keima', owner: PLAYER.SENTE, row: 4, col: 2 } // 3五 桂
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 1, piece: 'keima', isPromoted: false }, // 2三 桂不成
        explanation: "【正解の手順】▲２三桂不成まで。<br>【テーマ】：ナラズで桂跳ね<br>【解説】▲２三桂不成まで、桂馬をナラズで跳ねて詰みとなります。桂馬は味方の駒も飛び越えることができるので、２二歩があっても問題ありません。"
    },
    {
        id: 1020,
        title: "問題 20",
        originalTitle: "No.20 玉頭に桂なり",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 2, isPromoted: true }, // 3四 竜
            { piece: 'keima', owner: PLAYER.SENTE, row: 4, col: 2 } // 3五 桂
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 1, piece: 'keima', isPromoted: true }, // 2三 桂成
        explanation: "【正解の手順】▲２三桂成まで。<br>【テーマ】：玉頭に桂なり<br>【解説】▲２三桂成まで、桂馬を成って詰め上がります。成桂は金と同じ動き。詰め上がり図は頭金の詰め形になっています。なお、▲２三竜は△３一玉で失敗です。"
    },
    {
        id: 1021,
        title: "問題 21",
        originalTitle: "No.21 玉頭に香打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 }, // 3二 金
            { piece: 'fu', owner: PLAYER.SENTE, row: 3, col: 0 } // 1四 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kyosha']
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 0, piece: 'kyosha' }, // 1三 香
        explanation: "【正解の手順】▲１三香まで。<br>【テーマ】：玉頭に香打ち<br>【解説】▲１三香まで、玉頭に香車を打って詰めとなります。香車は前方すべてに利いているので、△１一玉とは引けません。２筋も３二金がカバーしています。"
    },
    {
        id: 1022,
        title: "問題 22",
        originalTitle: "No.22 離して香打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 3, isPromoted: true } // 4二 竜
        ],
        hand: {
            [PLAYER.SENTE]: ['kyosha']
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 1, piece: 'kyosha' }, // 2三 香
        explanation: "【正解の手順】▲２三香まで。<br>【テーマ】：離して香打ち<br>【解説】▲２二香は△１二玉で詰めません。離して打つ▲２三香が正解です。詰め上がり図以下△２二合駒としても▲同香成（▲同竜）までの詰め。合駒は無効となります。"
    },
    {
        id: 1023,
        title: "問題 23",
        originalTitle: "No.23 二段目に香成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 0, col: 3 }, // 4一 金
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三 銀
            { piece: 'kyosha', owner: PLAYER.SENTE, row: 3, col: 1 } // 2四 香
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'kyosha', isPromoted: true }, // 2二 香成
        explanation: "【正解の手順】▲２二香成まで。<br>【テーマ】：二段目に香成り<br>【解説】▲２二香成まで、香車を二段目に進めて成るのが正解です。詰め上がり図では、金と同じ動きの成香と銀が協力しています。"
    },
    {
        id: 1024,
        title: "問題 24",
        originalTitle: "No.24 下段に香成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 金
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 3 }, // 4二 金
            { piece: 'kyosha', owner: PLAYER.SENTE, row: 4, col: 0 }, // 1五 香
            { piece: 'hisha', owner: PLAYER.SENTE, row: 5, col: 0 } // 1六 飛
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 0, piece: 'kyosha', isPromoted: true }, // 1一 香成
        explanation: "【正解の手順】▲１一香成まで。<br>【テーマ】：下段に香成り<br>【解説】▲１一香成まで、香車を下段に進めて成り、腹金の詰め形となります。飛車と協力して香車を成り込むのは、矢倉戦で現れやすいパターンです。"
    },
    {
        id: 1025,
        title: "問題 25",
        originalTitle: "No.25 玉頭に歩突き",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 2 }, // 3二 飛
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 }, // 2五 歩
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 0 }, // 1五 歩
            { piece: 'kyosha', owner: PLAYER.SENTE, row: 5, col: 0 } // 1六 香
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 0, piece: 'fu' }, // 1四 歩
        explanation: "【正解の手順】▲１四歩まで。<br>【テーマ】：玉頭に歩突き<br>【解説】▲１四歩まで、歩を進めて詰みとなります。歩を打って詰ますのは『打ち歩詰め』の反則ですが、歩を突いて詰め上がる『突き歩詰め』は問題ありません。"
    },
    {
        id: 1026,
        title: "問題 26",
        originalTitle: "No.26 飛車の協力で突き歩詰め",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 4, col: 1 }, // 2五 飛
            { piece: 'fu', owner: PLAYER.SENTE, row: 5, col: 1 }, // 2六 歩
            { piece: 'fu', owner: PLAYER.SENTE, row: 5, col: 0 } // 1六 歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 4, col: 0, piece: 'fu' }, // 1五 歩
        explanation: "【正解の手順】▲１五歩まで。<br>【テーマ】：飛車の協力で突き歩詰め<br>【解説】前問と同じように本問も歩を突いて詰め上がります。▲１五歩ではなく▲１五飛は、△２四玉でつかまりません。"
    },
    {
        id: 1027,
        title: "問題 27",
        originalTitle: "No.27 と金をつくる",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'fu', owner: PLAYER.SENTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kyosha', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 香
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'fu', isPromoted: true }, // 2二 歩成
        explanation: "【正解の手順】▲２二歩成まで。<br>【テーマ】：と金をつくる<br>【解説】▲２二歩成まで、歩を進めて成り、腹金の形で詰め上がります。歩は一マスしか動けませんが、と金になれば金と同じ動き。詰みにも大いに役立ちます。"
    },
    {
        id: 1028,
        title: "問題 28",
        originalTitle: "No.28 コビンに歩成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 1 }, // 2三 銀
            { piece: 'fu', owner: PLAYER.SENTE, row: 2, col: 2 } // 3三 歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 2, piece: 'fu', isPromoted: true }, // 3一 歩成
        explanation: "【正解の手順】▲３一歩成まで。<br>【テーマ】：コビンに歩成り<br>【解説】▲３一銀成は△１二玉で失敗します。３三歩のままでは、銀と協力しても詰みはありません。歩を成ってと金にすれば、金銀が協力する形になって詰め上がります。"
    },
    {
        id: 1029,
        title: "問題 29",
        originalTitle: "No.29 下からの飛車打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 0, col: 1 } // 2一 金
        ],
        hand: {
            [PLAYER.SENTE]: ['hisha']
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 0, piece: 'hisha' }, // 1一 飛
        explanation: "【正解の手順】▲１一飛まで。<br>【テーマ】：下からの飛車打ち<br>【解説】▲２二飛は△１三玉でつかまりません。玉の下から打つ▲１一飛が正解です。詰め上がり図では飛車の利きがあり、△１三玉と逃げることができません。"
    },
    {
        id: 1030,
        title: "問題 30",
        originalTitle: "No.30 近づけて飛車打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 3 } // 4三 銀
        ],
        hand: {
            [PLAYER.SENTE]: ['hisha']
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 2, piece: 'hisha' }, // 3二 飛
        explanation: "【正解の手順】▲３二飛まで。<br>【テーマ】：近づけて飛車打ち<br>【解説】▲３二飛まで、玉の横に近づけて飛車を打ち、詰め上がります。同じようでも飛車を離して打つのは、△３三玉で詰みません。上に逃がさない飛車の打ち場所がポイントでした。"
    },
    {
        id: 1031,
        title: "問題 31",
        originalTitle: "No.31 玉頭に飛車打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 銀
            { piece: 'kaku', owner: PLAYER.SENTE, row: 1, col: 2 } // 3二 角
        ],
        hand: {
            [PLAYER.SENTE]: ['hisha']
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 0, piece: 'hisha' }, // 1四 飛
        explanation: "【正解の手順】▲１四飛まで。<br>【テーマ】：玉頭に飛車打ち<br>【解説】▲１四飛まで、玉頭に飛車を打って詰みとなります。▲１五飛と一つでも離して打つのは、△２四玉でつかまりません。前問と同じく飛車を近づけて打つのが急所です。"
    },
    {
        id: 1032,
        title: "問題 32",
        originalTitle: "No.32 離して飛車打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kaku', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 角
            { piece: 'kaku', owner: PLAYER.SENTE, row: 0, col: 2 } // 3一 角
        ],
        hand: {
            [PLAYER.SENTE]: ['hisha']
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 2, piece: 'hisha' }, // 3二 飛
        explanation: "【正解の手順】▲３二飛まで。<br>【テーマ】：離して飛車打ち<br>【解説】▲２二飛は△１三玉で詰みません。正解は離して打つ▲３二飛です。詰め上がり図以下△２二合駒は▲同飛成（▲同角成）までの詰め。合駒は無効となります。"
    },
    {
        id: 1033,
        title: "問題 33",
        originalTitle: "No.33 前に進む飛車",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 4, col: 1 }, // 2五 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 4, col: 0 }, // 1五 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三 金
            { piece: 'hisha', owner: PLAYER.SENTE, row: 5, col: 2 } // 3六 飛
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 2, piece: 'hisha' }, // 3四 飛
        explanation: "【正解の手順】▲３四飛まで。<br>【テーマ】：前に進む飛車<br>【解説】▲３四金は△１四玉で詰めません。飛車を使う▲３四飛が正解です。詰め上がり図では飛車の横利きがあるので、△１四玉とはできません。"
    },
    {
        id: 1034,
        title: "問題 34",
        originalTitle: "No.34 コビンに飛車成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 3 }, // 4二 金
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 飛
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 2, piece: 'hisha', isPromoted: true }, // 3二 飛成
        explanation: "【正解の手順】☗３二飛成まで。<br>【テーマ】：コビンに飛車成り<br>【解説】☗３二飛成まで、飛車を二段目まで進めて成り、詰めとなります。飛車からナナメ一マスにも利く竜になったことで、王手がかかりました。"
    },
    {
        id: 1035,
        title: "問題 35",
        originalTitle: "No.35 玉の下に飛車成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 0, col: 1 }, // 2一 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 2 } // 3二 飛
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 0, piece: 'hisha', isPromoted: true }, // 1二 飛成
        explanation: "【正解の手順】▲１二飛成まで。<br>【テーマ】：玉の下に飛車成り<br>【解説】▲１二飛成まで、飛車を１筋まで進めて成り、詰め上がります。前問同様竜になった効果は大きく、上だけではなく△２三玉と逃げることもできません。"
    },
    {
        id: 1036,
        title: "問題 36",
        originalTitle: "No.36 四段目に飛車引き成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 玉
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 1 }, // 2二 飛
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 1, piece: 'hisha', isPromoted: true }, // 2四 飛成
        explanation: "【正解の手順】▲２四飛成まで。<br>【テーマ】：四段目に飛車引き成り<br>【解説】▲２四飛成までで、玉の横まで飛車を引いて成り、詰みとなります。飛車、角、銀は相手陣三段目以内から引いて出るときも成ることができます。"
    },
    {
        id: 1037,
        title: "問題 37",
        originalTitle: "No.37 ナナメ下からの角打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 0, col: 2 }, // 3一 銀
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 歩
        ],
        hand: {
            [PLAYER.SENTE]: ['kaku']
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'kaku' }, // 2二 角
        explanation: "【正解の手順】▲２二角まで。<br>【テーマ】：ナナメ下からの角打ち<br>【解説】ナナメに強い角と銀が協力して詰め上がります。実戦でもナナメ下からの王手で角を使うことはよくあります。"
    },
    {
        id: 1038,
        title: "問題 38",
        originalTitle: "No.38 １筋もにらむ角打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.SENTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 飛
        ],
        hand: {
            [PLAYER.SENTE]: ['kaku']
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 2, piece: 'kaku' }, // 3一 角
        explanation: "【正解の手順】▲３一角まで。<br>【テーマ】：１筋もにらむ角打ち<br>【解説】前問と同じく、本問もナナメ下からの角打ちで詰めとなります。詰め上がり図では角の利きがあり、△１三玉と逃げることができません。実戦でもよく見る形です。"
    },
    {
        id: 1039,
        title: "問題 39",
        originalTitle: "No.39 コビンに角打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 金
            { piece: 'keima', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 桂
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 2 }, // 3四 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 0 } // 1一 飛
        ],
        hand: {
            [PLAYER.SENTE]: ['kaku']
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 0, piece: 'kaku' }, // 1四 角
        explanation: "【正解の手順】▲１四角まで。<br>【テーマ】：コビンに角打ち<br>【解説】下からの王手▲４一角は△３二合駒で詰めません。玉のコビンに打つ▲１四角が正解となります。詰め上がり図では角の利きがあり、△３二玉とは引けません。"
    },
    {
        id: 1040,
        title: "問題 40",
        originalTitle: "No.40 離して角打ち",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'kin', owner: PLAYER.GOTE, row: 3, col: 2 }, // 3四 金
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 1 } // 2一 飛
        ],
        hand: {
            [PLAYER.SENTE]: ['kaku']
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 2, piece: 'kaku' }, // 3一 角
        explanation: "【正解の手順】▲３一角まで。<br>【テーマ】：離して角打ち<br>【解説】▲２二角は△２四玉でつかまりません。飛車筋を通しておく▲３一角が正解です。詰め上がり図で△２二合駒は▲同飛成までの詰め。合駒は無効となります。"
    },
    {
        id: 1041,
        title: "問題 41",
        originalTitle: "No.41 コビンに角出",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 4 }, // 5三 金
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 0 }, // 1四 飛
            { piece: 'kaku', owner: PLAYER.SENTE, row: 5, col: 1 } // 2六 角
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 3, piece: 'kaku' }, // 4四 角
        explanation: "【正解の手順】▲４四角まで。<br>【テーマ】：コビンに角出<br>【解説】▲４四角まで、玉のコビンに角を出て詰め上がります。１四飛が角を取らせないだけではなく、玉を上に逃がさない役割も果たしています。"
    },
    {
        id: 1042,
        title: "問題 42",
        originalTitle: "No.42 玉の横に角成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 2 }, // 3三角
            { piece: 'fu', owner: PLAYER.SENTE, row: 2, col: 1 } // 2三歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'kaku', isPromoted: true }, // 2二角成
        explanation: "【正解の手順】▲２二角成まで。<br>【テーマ】：玉の横に角成り<br>【解説】▲２二歩成は△１三玉で詰みません。歩ではなく角を成る▲２二角成が正解です。角からタテ横一マスにも利く馬になったことで、王手がかかりました。"
    },
    {
        id: 1043,
        title: "問題 43",
        originalTitle: "No.43 馬と銀が協力",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 0, col: 2 }, // 3一 銀
            { piece: 'kaku', owner: PLAYER.SENTE, row: 4, col: 0 } // 1五 角
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 3, piece: 'kaku', isPromoted: true }, // 4二 角成
        explanation: "【正解の手順】▲４二角成まで。<br>【テーマ】：馬と銀が協力<br>【解説】前問では一マス動いて角が馬に。本問の角はもう少し動いて詰めとなります。詰め上がり図では、左右のナナメ下に利いている銀が大いに役立っています。"
    },
    {
        id: 1044,
        title: "問題 44",
        originalTitle: "No.44 四段目に角引き成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 玉
            { piece: 'kaku', owner: PLAYER.SENTE, row: 1, col: 3 }, // 4二 角
            { piece: 'fu', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 歩
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 1, piece: 'kaku', isPromoted: true }, // 2四 角成
        explanation: "【正解の手順】▲２四角成まで。<br>【テーマ】：四段目に角引き成り<br>【解説】▲２四角成まで、角を四段目に引いて成り、詰め上がります。角も飛車、銀と同じく、三段目以内から引いて出るときも成ることができます。"
    },
    {
        id: 1045,
        title: "問題 45",
        originalTitle: "No.45 前に進む竜",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 0, col: 3 }, // 4一 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 2, isPromoted: true } // 3四 竜
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 2, piece: 'hisha', isPromoted: true }, // 3二 竜
        explanation: "【正解の手順】▲３二竜まで。<br>【テーマ】：前に進む竜<br>【解説】▲３二銀成は△１二玉で詰めません。竜を使う▲３二竜が正解です。竜の利きは飛車プラスナナメ一マス。最強の駒と言ってもいいでしょう。"
    },
    {
        id: 1046,
        title: "問題 46",
        originalTitle: "No.46 四段目に竜引き",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 金
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 2, isPromoted: true }, // 3一 竜
            { piece: 'gin', owner: PLAYER.SENTE, row: 4, col: 2 } // 3五 銀
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 2, piece: 'hisha', isPromoted: true }, // 3四 竜
        explanation: "【正解の手順】▲３四竜まで。<br>【テーマ】：四段目に竜引き<br>【解説】▲３四竜まで、竜を四段目に引いて詰めとなります。詰め上がり図では、竜がタテ、横、ナナメとよく利いており、玉は動けません。"
    },
    {
        id: 1047,
        title: "問題 47",
        originalTitle: "No.47 一段目で横に動く竜",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 3 }, // 4三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 0, col: 4, isPromoted: true }, // 5一 竜
            { piece: 'kin', owner: PLAYER.SENTE, row: 0, col: 1 } // 2一 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 2, piece: 'hisha', isPromoted: true }, // 3一 竜
        explanation: "【正解の手順】▲３一竜まで。<br>【テーマ】：一段目で横に動く竜<br>【解説】竜を玉の下に進めて詰め上がります。一段目で竜と金が協力して二段目の玉をつかまえる。実戦で現れやすいパターンの一つです。"
    },
    {
        id: 1048,
        title: "問題 48",
        originalTitle: "No.48 二段目で横に動く竜",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 2 }, // 3三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 3 }, // 4四 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 0, col: 3 }, // 4一 銀
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 0, isPromoted: true } // 1二 竜
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 2, piece: 'hisha', isPromoted: true }, // 3二 竜
        explanation: "【正解の手順】▲３二竜まで。<br>【テーマ】：二段目で横に動く竜<br>【解説】前問は竜を右に動かすのが正解でした。本問では竜を左に動かして詰みとなります。竜と銀が協力する詰め上がりは、No.45と同じような形です。"
    },
    {
        id: 1049,
        title: "問題 49",
        originalTitle: "No.49 ナナメに進む竜",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 2, col: 4, isPromoted: true }, // 5三 竜
            { piece: 'keima', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 桂
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 3, piece: 'hisha', isPromoted: true }, // 4二 竜
        explanation: "【正解の手順】▲４二竜まで。<br>【テーマ】：ナナメに進む竜<br>【解説】▲４二竜まで、竜をナナメに進めて詰みとなります。同じようでも▲５二竜は△３三玉でつかまりません。竜ের動きが１マス違うだけで結果は大きく変わります。"
    },
    {
        id: 1050,
        title: "問題 50",
        originalTitle: "No.50 ナナメに引く竜",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 4, col: 0 }, // 1五 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 2, isPromoted: true }, // 3二 竜
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 1 } // 2二 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 1, piece: 'hisha', isPromoted: true }, // 2三 竜
        explanation: "【正解の手順】▲２三竜まで。<br>【テーマ】：ナナメに引く竜<br>【解説】▲３四竜は△２四合駒で詰みません。竜をナナメに引く▲２三竜が正解です。問題図で玉が動けるのは３カ所。詰め上がり図ではすべてのマスに竜が利いています。"
    },
    {
        id: 1051,
        title: "問題 51",
        originalTitle: "No.51 竜と金の協力で合い利かず",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 4, col: 1 }, // 2五 歩
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 2, isPromoted: true }, // 3二 竜
            { piece: 'kin', owner: PLAYER.SENTE, row: 2, col: 1 } // 2三 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 0, piece: 'hisha', isPromoted: true }, // 1二 竜
        explanation: "【正解の手順】▲１二竜まで。<br>【テーマ】：竜と金の協力で合い利かず<br>【解説】▲３四竜は△１五玉でつかまりません。筋に竜を進める▲１二竜が正解です。詰め上がり図で△１三合駒は▲同竜まででの詰めみ。合駒は無効となります。"
    },
    {
        id: 1052,
        title: "問題 52",
        originalTitle: "No.52 竜と角の協力で合い利かず",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 0, col: 3 }, // 4一 角
            { piece: 'hisha', owner: PLAYER.SENTE, row: 3, col: 3, isPromoted: true } // 4四 竜
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 3, piece: 'hisha', isPromoted: true }, // 4二 竜
        explanation: "【正解の手順】▲４二竜まで。<br>【テーマ】：竜と角の協力で合い利かず<br>【解説】▲２四竜は△３一玉で失敗します。竜を二段目に進める▲４二竜です。詰め上がり図以下△３二合駒は▲同竜までの詰み。前回と同じく無駄合いとなります。"
    },
    {
        id: 1053,
        title: "問題 53",
        originalTitle: "No.53 玉の横に馬を進める",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 玉
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 }, // 3二 金
            { piece: 'kaku', owner: PLAYER.SENTE, row: 3, col: 3, isPromoted: true } // 4四 馬
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'kaku', isPromoted: true }, // 2二 馬
        explanation: "【正解の手順】▲２二馬まで。<br>【テーマ】：玉の横に馬を進める<br>【解説】腹金の▲２二金は△１三玉で詰みません。金ではなく馬を進める▲２二馬が正解です。馬の利きは角プラステ横一マス。竜に負けないような強い駒と言っていいでしょう。"
    },
    {
        id: 1054,
        title: "問題 54",
        originalTitle: "No.54 一段目に馬を進める",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 3 }, // 4三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'gin', owner: PLAYER.SENTE, row: 1, col: 3 }, // 4二 銀
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 0, isPromoted: true } // 1三 馬
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 2, piece: 'kaku', isPromoted: true }, // 3一 馬
        explanation: "【正解の手順】▲３一馬まで。<br>【テーマ】：一段目に馬を進める<br>【解説】玉の下に馬を進めて詰みとなります。問題図では離れていた馬と銀が、詰め上がり図ではしっかりと協力しています。"
    },
    {
        id: 1055,
        title: "問題 55",
        originalTitle: "No.55 玉の下に馬引き",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 2 }, // 3四 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 0, col: 0, isPromoted: true }, // 1一 馬
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 2 } // 3三 銀
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'kaku', isPromoted: true }, // 2二 馬
        explanation: "【正解の手順】▲２二馬まで。<br>【テーマ】：玉の下に馬引き<br>【解説】▲２二銀成は△３三玉と逃げられてつかまりません。銀ではなく馬を引く▲２二馬が正解です。前問とは玉の位置は違いますが、同じように馬と銀が協力して詰め上がります。"
    },
    {
        id: 1056,
        title: "問題 56",
        originalTitle: "No.56 玉のコビンに馬を進める",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 2 }, // 3一 玉
            { piece: 'keima', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 桂
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 3, isPromoted: true }, // 4三 馬
            { piece: 'keima', owner: PLAYER.SENTE, row: 3, col: 2 } // 3四 桂
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 3, piece: 'kaku', isPromoted: true }, // 4二 馬
        explanation: "【正解の手順】▲４二馬まで。<br>【テーマ】：玉のコビンに馬を進める<br>【解説】▲４二馬まで、玉のコビンに馬を進めて詰みとなります。馬がまっすぐ一マス前進。角にはできないことで、馬になっているからこその動きでした。"
    },
    {
        id: 1057,
        title: "問題 57",
        originalTitle: "No.57 玉のコビンに馬寄り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 1, col: 2 }, // 3二 金
            { piece: 'gin', owner: PLAYER.GOTE, row: 1, col: 1 }, // 2二 銀
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 3, col: 3, isPromoted: true }, // 4四 馬
            { piece: 'gin', owner: PLAYER.SENTE, row: 4, col: 1 } // 2五 銀
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 3, col: 2, piece: 'kaku', isPromoted: true }, // 3四 馬
        explanation: "【正解の手順】▲３四馬まで。<br>【テーマ】：玉のコビンに馬寄り<br>【解説】▲３四馬まで、玉のコビンに馬を寄って詰みとなります。詰め上がり図では馬の利きがあり、△１二玉とは引けません。なお、▲４五馬は△３三玉で失敗です。"
    },
    {
        id: 1058,
        title: "問題 58",
        originalTitle: "No.58 まっすぐに馬引き",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 2 }, // 3四 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 1 }, // 2四 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 0, col: 1, isPromoted: true }, // 2一 馬
            { piece: 'kin', owner: PLAYER.SENTE, row: 1, col: 2 } // 3二 金
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 1, col: 1, piece: 'kaku', isPromoted: true }, // 2二 馬
        explanation: "【正解の手順】▲２二馬まで。<br>【テーマ】：まっすぐに馬引き<br>【解説】▲２二金は△３三玉でつかまりません。金ではなく馬をまっすぐ引く▲２二馬が正解となります。詰め上がり図では馬と金がしっかりと協力しており、玉は動けません。"
    },
    {
        id: 1059,
        title: "問題 59",
        originalTitle: "No.59 一段目の馬で合い利かず",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 2, col: 0 }, // 1三 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 1, col: 0 }, // 1二 香
            { piece: 'fu', owner: PLAYER.GOTE, row: 2, col: 1 }, // 2三 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 3, col: 0 }, // 1四 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 4, isPromoted: true }, // 5三 馬
            { piece: 'gin', owner: PLAYER.SENTE, row: 2, col: 2 } // 3三 銀
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 0, col: 2, piece: 'kaku', isPromoted: true }, // 3一 馬
        explanation: "【正解の手順】▲３一馬まで。<br>【テーマ】：一段目の馬で合い利かず<br>【解説】▲３五馬は△２四合駒で詰みません。一段目に馬を進める▲３一馬が正解です。詰め上がり図で△２二合駒は▲同馬までで詰み。合駒は無効となります。"
    },
    {
        id: 1060,
        title: "問題 60",
        originalTitle: "No.60 龍と馬の協力で合い利かず",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 0, col: 1 }, // 2一 玉
            { piece: 'kyosha', owner: PLAYER.GOTE, row: 0, col: 0 }, // 1一 香
            { piece: 'hisha', owner: PLAYER.SENTE, row: 1, col: 3, isPromoted: true }, // 4二 竜
            { piece: 'kaku', owner: PLAYER.SENTE, row: 3, col: 2, isPromoted: true } // 3四 馬
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 2, col: 3, piece: 'kaku', isPromoted: true }, // 4三 馬
        explanation: "【正解の手順】▲４三馬まで。<br>【テーマ】：龍と馬の協力で合い利かず<br>【解説】▲４三馬まで、馬を一マス進めて詰みとなります。詰め上がり図以下、龍と馬の利きに打つ△３二合駒は▲同竜までの詰み。前問と同じく無駄合いです。"
    },
    {
        id: 1061,
        title: "問題 61",
        originalTitle: "No.61 自陣で頭金",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 7, col: 0 }, // 1八 玉
            { piece: 'kin', owner: PLAYER.GOTE, row: 6, col: 0 }, // 1七 金
            { piece: 'kaku', owner: PLAYER.SENTE, row: 6, col: 2, isPromoted: true } // 3七 馬
        ],
        hand: {
            [PLAYER.SENTE]: ['kin']
        },
        isShapePuzzle: false,
        solution: { row: 8, col: 0, piece: 'kin' }, // 1九 金
        explanation: "【正解の手順】▲１九金まで。<br>【テーマ】：自陣で頭金<br>【解説】玉が相手陣三段目より上に入る形（自陣に入れられる形）を入玉と言います。入玉の形も詰みの基本は変わりありません。本問は▲１九金まで、頭金の詰め上がりです。"
    },
    {
        id: 1062,
        title: "問題 62",
        originalTitle: "No.62 玉のナナメ下に銀出",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 6, col: 0 }, // 1七 玉
            { piece: 'fu', owner: PLAYER.GOTE, row: 5, col: 0 }, // 1六 歩
            { piece: 'fu', owner: PLAYER.GOTE, row: 7, col: 1 }, // 2八 歩
            { piece: 'kaku', owner: PLAYER.SENTE, row: 5, col: 2, isPromoted: true }, // 3六 馬
            { piece: 'gin', owner: PLAYER.SENTE, row: 6, col: 2 } // 3七 銀
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 5, col: 1, piece: 'gin' }, // 2六 銀
        explanation: "【正解の手順】▲２六銀まで。<br>【テーマ】：玉のナナメ下に銀出<br>【解説】玉のナナメ下に銀を進めて詰みとなります。詰め上がり図では馬がよく利いており、これ以上玉が入ることはできません。"
    },
    {
        id: 1063,
        title: "問題 63",
        originalTitle: "No.63 自陣で飛車成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 8, col: 0 }, // 1九 玉
            { piece: 'hisha', owner: PLAYER.SENTE, row: 2, col: 1 }, // 2三 飛
            { piece: 'gin', owner: PLAYER.SENTE, row: 7, col: 2 } // 3八 銀
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 8, col: 1, piece: 'hisha', isPromoted: true }, // 2九 飛成
        explanation: "【正解の手順】▲２九飛成まで。<br>【テーマ】：自陣で飛車成り<br>【解説】▲２九飛成まで、相手陣にいた飛車を引いて成り、詰め上がります。飛車や角を相手陣から引くときは、成ることを忘れないようにしましょう。"
    },
    {
        id: 1064,
        title: "問題 64",
        originalTitle: "No.64 自陣で角成り",
        movesToMate: 1,
        board: [
            { piece: 'ou', owner: PLAYER.GOTE, row: 8, col: 1 }, // 2九 玉
            { piece: 'kaku', owner: PLAYER.SENTE, row: 2, col: 6 }, // 7三 角
            { piece: 'gin', owner: PLAYER.SENTE, row: 6, col: 0 } // 1七 銀
        ],
        hand: {
            [PLAYER.SENTE]: []
        },
        isShapePuzzle: false,
        solution: { row: 7, col: 1, piece: 'kaku', isPromoted: true }, // 2八 角成
        explanation: "【正解の手順】▲２八角成まで。<br>【テーマ】：自陣で角成り<br>【解説】相手陣から角を引いて成り、詰みとなります。問題図では４カ所に動けた玉が、馬の力でつかまってしまいました。"
    }
];
