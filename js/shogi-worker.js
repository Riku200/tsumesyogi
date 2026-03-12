/**
 * js/shogi-worker.js (SuishoPetite 軽量版・シングルスレッド対応)
 */
console.log("[Worker] ワーカースクリプト起動。軽量AI(Petite)を起動します...");

function getAbsoluteUrl(relativePath) {
    return new URL(relativePath, location.href).href;
}

self.Module = {
    INITIAL_MEMORY: 134217728, // 128MB
    ALLOW_MEMORY_GROWTH: true,
    mainScriptUrlOrBlob: getAbsoluteUrl('../ai/YaneuraOu/yaneuraou.k-p.js'),

    locateFile: function (path) {
        const url = getAbsoluteUrl('../ai/YaneuraOu/' + path);
        return url;
    },
    preRun: [],
    // ここは空でOK（直接console.logされるため）
    print: function (text) { },
    printErr: function (text) {
        console.warn("[AI Error]:", text);
    },
    onRuntimeInitialized: function () {
        console.log("[Worker] ★★★ Petite版が目覚めました！ ★★★");

        // Petite版はシングルスレッド専用なので Threads 指定は削除
        self.sendCommandToEngine("setoption name Hash value 16");

        postMessage({ type: 'status', message: '将棋AI(軽量版) 準備完了' });
        postMessage({ type: 'ready' });
    }
};

// ★★★ ここを追加！：コンソールへの出力を横取りして、画面(ai-manager.js)に転送する ★★★
const originalConsoleLog = console.log;
console.log = function (...args) {
    originalConsoleLog(...args); // 本来のコンソール出力も残す
    const text = args.join(' ');

    // AIの思考結果（info）や最善手（bestmove）から始まるテキストなら、画面側に送信する
    if (text.startsWith('info ') || text.startsWith('bestmove ') || text.startsWith('readyok') || text.startsWith('id ')) {
        postMessage({ type: 'stdout', message: text });
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