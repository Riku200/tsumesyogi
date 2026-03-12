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

        this.worker.postMessage({ type: 'command', command: 'stop' });
        this.worker.postMessage({ type: 'command', command: 'isready' });
        this.worker.postMessage({ type: 'command', command: `position sfen ${sfen}` });
        this.worker.postMessage({ type: 'command', command: 'go depth 10' });
    }

    parseInfo(text) {
        // AIの思考ログをコンソールに出力
        console.log("[AI]:", text);

        if (!this.isAnalyzing) return;

        if (text.startsWith('info') && text.includes('score')) {
            const cpMatch = text.match(/score cp (-?\d+)/);
            const mateMatch = text.match(/score mate ([-+]?\d+)/);
            const pvMatch = text.match(/pv (.*)$/);

            let evalText = "";
            let pvText = "";

            if (mateMatch) {
                const mateMoves = parseInt(mateMatch[1], 10);
                evalText = mateMoves > 0 ? `+詰${mateMoves}` : `-詰${Math.abs(mateMoves)}`;
            } else if (cpMatch) {
                const cp = parseInt(cpMatch[1], 10);
                evalText = cp > 0 ? `+${cp}` : `${cp}`;
            }

            if (pvMatch) {
                pvText = pvMatch[1].trim();
            }

            if (evalText || pvText) {
                this.updateEval(evalText || document.getElementById('ai-eval').textContent, pvText);
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