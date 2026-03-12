class AIManager {
    constructor() {
        this.worker = null;
        this.isReady = false;
        this.isAnalyzing = false;

        this.statusEl = document.getElementById('ai-status');
        this.evalEl = document.getElementById('ai-eval');
        this.pvEl = document.getElementById('ai-pv');
        this.toggleBtn = document.getElementById('ai-toggle-btn');

        this.currentSFEN = "";
        this.initEventListeners();
    }

    initEventListeners() {
        if (!this.toggleBtn) return;
        this.toggleBtn.addEventListener('click', () => {
            if (this.isAnalyzing) {
                this.stopAnalysis();
            } else {
                this.startAnalysis();
            }
        });
    }

    initWorker() {
        if (this.worker) return;

        this.worker = new Worker('js/shogi-worker.js');
        this.updateStatus('AIの起動準備中...');

        this.worker.onmessage = (e) => {
            const msg = e.data;
            if (msg.type === 'status') {
                this.updateStatus(msg.message);
            } else if (msg.type === 'ready') {
                this.isReady = true;
                this.updateStatus('AI待機中');
                if (this.isAnalyzing && this.currentSFEN) {
                    this.sendSFEN(this.currentSFEN);
                }
            } else if (msg.type === 'error') {
                this.updateStatus('エラー: ' + msg.message);
                this.isAnalyzing = false;
                this.updateUIAction();
            } else if (msg.type === 'stdout') {
                this.parseInfo(msg.message);
            }
        };

        this.worker.postMessage({ type: 'init' });
    }

    startAnalysis() {
        this.isAnalyzing = true;
        this.updateUIAction();

        if (!this.worker) {
            this.initWorker();
        } else if (this.isReady && this.currentSFEN) {
            this.sendSFEN(this.currentSFEN);
        }
    }

    stopAnalysis() {
        this.isAnalyzing = false;
        this.updateUIAction();
        this.updateEval('-', '-');

        if (this.isReady && this.worker) {
            this.worker.postMessage({ type: 'command', command: 'stop' });
            this.updateStatus('AI停止中');
        }
    }

    updateSFEN(sfen) {
        this.currentSFEN = sfen;
        if (this.isAnalyzing && this.isReady) {
            this.sendSFEN(sfen);
        }
    }

    sendSFEN(sfen) {
        if (!this.worker) return;

        this.updateStatus('AI思考中...');
        this.updateEval('考え中...', '');

        // ★これが「一番最初に大成功した時」の最強の組み合わせです。
        // 余計な待機時間などは入れず、ストレートに命令します。
        this.worker.postMessage({ type: 'command', command: 'stop' });
        this.worker.postMessage({ type: 'command', command: 'isready' });
        this.worker.postMessage({ type: 'command', command: `position sfen ${sfen}` });
        this.worker.postMessage({ type: 'command', command: 'go depth 10' });
    }

    // --- USIを完全な日本語に翻訳する関数 ---
    translateUsiToJapanese(usi) {
        if (usi === "resign") return "投了";
        if (usi === "win") return "宣言勝ち";

        const cols = { '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９' };
        const rows = { 'a': '一', 'b': '二', 'c': '三', 'd': '四', 'e': '五', 'f': '六', 'g': '七', 'h': '八', 'i': '九' };
        const pieces = { 'P': '歩', 'L': '香', 'N': '桂', 'S': '銀', 'G': '金', 'B': '角', 'R': '飛', 'K': '玉' };

        try {
            if (usi.includes('*')) {
                // 持ち駒を打つ場合（例：P*5e → ５五歩打）
                const p = pieces[usi[0].toUpperCase()] || usi[0];
                const toX = cols[10 - usi[2]];
                const toY = rows[usi[3]];
                return `${toX}${toY}${p}打`;
            } else {
                // 盤上の移動の場合（例：7g7f → ７六(７七)）
                const fromX = cols[10 - usi[0]];
                const fromY = rows[usi[1]];
                const toX = cols[10 - usi[2]];
                const toY = rows[usi[3]];
                const promote = usi.includes('+') ? '成' : '';
                return `${toX}${toY}(${fromX}${fromY})${promote}`;
            }
        } catch (e) {
            return usi;
        }
    }

    parseInfo(text) {
        if (!this.isAnalyzing) return;

        if (text.startsWith('info') && text.includes('score')) {
            const cpMatch = text.match(/score cp (-?\d+)/);
            const mateMatch = text.match(/score mate ([-+]?\d+)/);
            const pvMatch = text.match(/pv (.*)$/);

            let evalText = "";
            let pvText = "";

            // 現在の手番を判定
            const isWhiteTurn = this.currentSFEN.includes(" w ");

            if (mateMatch) {
                let mateMoves = parseInt(mateMatch[1], 10);
                if (isWhiteTurn) mateMoves = mateMoves * -1;
                evalText = mateMoves > 0 ? `+詰${mateMoves}` : `-詰${Math.abs(mateMoves)}`;

            } else if (cpMatch) {
                let cp = parseInt(cpMatch[1], 10);
                if (isWhiteTurn) {
                    cp = cp * -1; // 後手番なら反転
                }
                evalText = cp > 0 ? `+${cp}` : `${cp}`;
            }

            if (pvMatch) {
                const pvArray = pvMatch[1].trim().split(" ");
                // 最初の5手くらいまで翻訳して繋げる
                const translatedPv = pvArray.slice(0, 5).map(move => this.translateUsiToJapanese(move)).join(" ");
                pvText = translatedPv + " ...";
            }

            if (evalText || pvText) {
                this.updateEval(evalText || this.evalEl.textContent, pvText);
            }
        } else if (text.startsWith('bestmove')) {
            this.updateStatus('AI検討完了');
        }
    }

    updateStatus(text) {
        if (this.statusEl) this.statusEl.textContent = text;
    }

    updateEval(cpText, pvText) {
        if (this.evalEl && cpText) this.evalEl.textContent = cpText;
        if (this.pvEl && pvText) this.pvEl.textContent = pvText;
    }

    updateUIAction() {
        if (this.toggleBtn) {
            this.toggleBtn.textContent = this.isAnalyzing ? "AI検討: ON" : "AI検討: OFF";
            this.toggleBtn.classList.toggle('active', this.isAnalyzing);

            if (this.isAnalyzing) {
                this.toggleBtn.style.backgroundColor = '#4CAF50';
                this.toggleBtn.style.color = 'white';
            } else {
                this.toggleBtn.style.backgroundColor = '';
                this.toggleBtn.style.color = '';
            }
        }
    }
}