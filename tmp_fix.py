import os
import re

html_path = r'c:\geminiAntigravity\game\tsumesyogi\index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Locate pieces.js embedded block
pieces_start = html.find('// --- pieces.js ---')
pieces_script_start = html.rfind('<script>', 0, pieces_start)
pieces_script_end = html.find('</script>', pieces_start) + len('</script>')
pieces_code = html[pieces_start:pieces_script_end - len('</script>')]

# Locate board.js and main.js embedded block
board_start = html.find('// --- board.js ---')
board_script_start = html.rfind('<script>', 0, board_start)
main_start = html.find('// --- main.js ---', board_start)
board_main_script_end = html.find('</script>', main_start) + len('</script>')

board_code = html[board_start:main_start]
main_code = html[main_start:board_main_script_end - len('</script>')]

# Prepare board.js
get_sfen_code = """
    /**
     * 現在の盤面と持ち駒、手番を元にSFEN文字列を生成する
     * @param {number} currentPlayer - PLAYER.SENTE または PLAYER.GOTE
     * @param {number} moveCount - 手数 (デフォルト1)
     * @returns {string} SFEN文字列
     */
    getSFEN(currentPlayer = 1, moveCount = 1) { // PLAYER.SENTE is 1
        let sfenBoard = "";
        
        // 1. 盤面の生成 (row: 0 -> 8 は一〜九段目に対応)
        for (let row = 0; row < 9; row++) {
            let emptyCount = 0;
            // col: 0 -> 8 は 9筋から1筋に対応
            for (let col = 0; col < 9; col++) {
                const piece = this.grid[row][col];
                if (!piece) {
                    emptyCount++;
                } else {
                    if (emptyCount > 0) {
                        sfenBoard += emptyCount;
                        emptyCount = 0;
                    }
                    
                    let pieceChar = "";
                    switch (piece.type.id) {
                        case 'fu': pieceChar = 'p'; break;
                        case 'kyosha': pieceChar = 'l'; break;
                        case 'keima': pieceChar = 'n'; break;
                        case 'gin': pieceChar = 's'; break;
                        case 'kin': pieceChar = 'g'; break;
                        case 'kaku': pieceChar = 'b'; break;
                        case 'hisha': pieceChar = 'r'; break;
                        case 'ou': 
                        case 'gyoku': pieceChar = 'k'; break;
                    }
                    
                    if (piece.isPromoted) {
                        pieceChar = '+' + pieceChar;
                    }
                    
                    if (piece.owner === 1) { // PLAYER.SENTE
                        pieceChar = pieceChar.toUpperCase();
                    }
                    
                    sfenBoard += pieceChar;
                }
            }
            if (emptyCount > 0) {
                sfenBoard += emptyCount;
            }
            if (row < 8) {
                sfenBoard += "/";
            }
        }
        
        // 2. 手番
        const sfenTurn = currentPlayer === 1 ? 'b' : 'w'; // PLAYER.SENTE is 1
        
        // 3. 持ち駒
        let sfenHand = "";
        const handOrder = [
            { id: 'hisha', sfen: 'r' }, { id: 'kaku', sfen: 'b' },
            { id: 'kin', sfen: 'g' }, { id: 'gin', sfen: 's' },
            { id: 'keima', sfen: 'n' }, { id: 'kyosha', sfen: 'l' },
            { id: 'fu', sfen: 'p' }
        ];
        
        for (const target of handOrder) {
            const count = this.capturedPieces[1].filter(p => p.type.id === target.id).length; // PLAYER.SENTE is 1
            if (count > 0) {
                sfenHand += (count > 1 ? count : "") + target.sfen.toUpperCase();
            }
        }
        for (const target of handOrder) {
            const count = this.capturedPieces[2].filter(p => p.type.id === target.id).length; // PLAYER.GOTE is 2
            if (count > 0) {
                sfenHand += (count > 1 ? count : "") + target.sfen.toLowerCase();
            }
        }
        
        if (sfenHand === "") {
            sfenHand = "-";
        }
        
        // 4. 手数
        return `${sfenBoard} ${sfenTurn} ${sfenHand} ${moveCount}`;
    }
}
"""
board_code = board_code[:board_code.rfind('}')] + get_sfen_code

# Prepare main.js
main_code = main_code.replace('let currentPuzzleStep = 0;', 'let currentPuzzleStep = 0;\n        let aiManager = null;')

main_code = main_code.replace("renderBoard();\n\n            // イベントリスナーの登録", 
"""renderBoard();

            // AIマネージャ初期化
            if (typeof AIManager !== 'undefined') {
                aiManager = new AIManager();
            }

            // イベントリスナーの登録""")

initGame_before = """        function initGame() {
            gameBoard.setupInitialPosition();
            currentPlayer = PLAYER.SENTE;
            lastMovedCell = null;
            clearSelection();

            // 駒台のタイトルを通常対局用に戻す
            document.getElementById('player-hand-title').textContent = "先手";
            document.getElementById('opponent-hand-title').textContent = "後手";

            renderBoard();
        }"""
initGame_after = """        function initGame() {
            gameBoard.setupInitialPosition();
            currentPlayer = PLAYER.SENTE;
            lastMovedCell = null;
            clearSelection();

            // 駒台のタイトルを通常対局用に戻す
            document.getElementById('player-hand-title').textContent = "先手";
            document.getElementById('opponent-hand-title').textContent = "後手";

            renderBoard();
            
            // AIへ新規盤面イベントの連携
            if (aiManager && !isPuzzleMode) {
                aiManager.updateSFEN(gameBoard.getSFEN(currentPlayer, 1));
            }
        }"""
main_code = main_code.replace(initGame_before, initGame_after)

handleCellClick_turn_before = """                    // ターンの交代
                    currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;

                    if (!isPuzzleMode && gameBoard.isCheck(currentPlayer) && !checkPlayerHasEscapeMove(currentPlayer)) {"""

handleCellClick_turn_after = """                    // ターンの交代
                    currentPlayer = currentPlayer === PLAYER.SENTE ? PLAYER.GOTE : PLAYER.SENTE;

                    // AI連携
                    if (aiManager && !isPuzzleMode) {
                        aiManager.updateSFEN(gameBoard.getSFEN(currentPlayer, 1));
                    }

                    if (!isPuzzleMode && gameBoard.isCheck(currentPlayer) && !checkPlayerHasEscapeMove(currentPlayer)) {"""
main_code = main_code.replace(handleCellClick_turn_before, handleCellClick_turn_after)

# Format the extracted content without the leading spaces applied to it when it was embedded
# Usually we can ignore it, but standardizing is good
# Actually we can keep it as is.

# Write
with open(r'c:\geminiAntigravity\game\tsumesyogi\js\pieces.js', 'w', encoding='utf-8') as f:
    f.write(pieces_code.strip() + "\n")
with open(r'c:\geminiAntigravity\game\tsumesyogi\js\board.js', 'w', encoding='utf-8') as f:
    f.write(board_code.strip() + "\n")
with open(r'c:\geminiAntigravity\game\tsumesyogi\js\main.js', 'w', encoding='utf-8') as f:
    f.write(main_code.strip() + "\n")

# Reconstruct HTML
html_new = html[:pieces_script_start] + \
           '    <script src="js/pieces.js"></script>\n' + \
           html[pieces_script_end:board_script_start] + \
           '    <script src="js/board.js"></script>\n' + \
           '    <script src="js/main.js"></script>\n' + \
           html[board_main_script_end:]

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_new)
print("done")
