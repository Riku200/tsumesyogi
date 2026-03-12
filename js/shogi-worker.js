/**
 * js/shogi-worker.js (SuishoPetite 軽量版)
 */
console.log("[Worker] ワーカースクリプト起動。軽量AI(Petite)を起動します...");

self.Module = {
    INITIAL_MEMORY: 33554432, // 32MB
    ALLOW_MEMORY_GROWTH: true,
    locateFile: function (path) {
        console.log("[Worker] AIがファイルを探しています:", path);
        // shogi-worker.jsから見た相対パスを指定
        return '../ai/YaneuraOu/' + path;
    },
    preRun: [],
    print: function (text) {
        console.log("[AI Output]:", text);
        postMessage({ type: 'stdout', message: text });
    },
    printErr: function (text) {
        console.warn("[AI Error]:", text);
    },
    onRuntimeInitialized: function () {
        console.log("[Worker] ★★★ Petite版が目覚めました！ ★★★");

        // 【重要】Threadsを1に設定して、SharedArrayBufferへの依存を最小限にする
        self.sendCommandToEngine("setoption name Threads value 1");
        self.sendCommandToEngine("setoption name Hash value 16");

        postMessage({ type: 'status', message: '将棋AI(軽量版) 準備完了' });
        postMessage({ type: 'ready' });
    }
};

self.sendCommandToEngine = function (cmd) {
    if (self.Module && self.Module.postMessage) {
        self.Module.postMessage(cmd);
    }
};

async function myInitHandler(e) {
    const msg = e.data;
    if (msg && msg.type === 'init') {
        try {
            // --- ここが重要：Petite版は外部binファイルをロードしないのでfetch処理を削除 ---
            postMessage({ type: 'status', message: '軽量エンジンを読み込み中...' });

            console.log("[Worker] AIエンジンの読み込みを開始...");

            // Petite版のJSを読み込む
            importScripts('../ai/YaneuraOu/yaneuraou.k-p.js');

            console.log("[Worker] importScripts(Petite) 通過！");

            // 冒頭で見せてくれた変数名「YaneuraOu_K_P」で起動します
            if (typeof YaneuraOu_K_P === 'function') {
                console.log("[Worker] YaneuraOu_K_P関数を検出。起動します...");
                YaneuraOu_K_P(self.Module).then((instance) => {
                    self.Module = instance;
                });
            } else {
                throw new Error("起動関数 YaneuraOu_K_P が見つかりません。");
            }

            const engineOnMessage = self.onmessage;
            self.onmessage = function (event) {
                if (event.data && event.data.type === 'command') {
                    self.sendCommandToEngine(event.data.command);
                } else if (engineOnMessage) {
                    engineOnMessage(event);
                }
            };

        } catch (err) {
            console.error("[Worker] 致命的なエラー:", err);
            postMessage({ type: 'error', message: err.message });
        }
    } else if (msg && msg.type === 'command') {
        self.sendCommandToEngine(msg.command);
    }
}

self.onmessage = myInitHandler;