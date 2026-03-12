/**
 * js/shogi-worker.js (AI完全覚醒版)
 */
console.log("[Worker] ワーカースクリプト起動。AIを目覚めさせます...");

// 1. 設定書（Module）を「self」というグローバルな場所に確実に置く
// これにより、後から読み込まれるAIエンジンが必ずこの設定を見つけられます。
self.Module = {
    INITIAL_MEMORY: 33554432, // 32MBからスタート
    ALLOW_MEMORY_GROWTH: true, // 必要に応じて自動拡張

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
        console.log("[Worker] ★★★ AIが完全に目覚めました！ ★★★");
        // ★ ここに追加！ AIが目覚めた瞬間にメモリ制限をかけます
        self.sendCommandToEngine("setoption name Hash value 16");
        self.sendCommandToEngine("setoption name Threads value 1");
        postMessage({ type: 'status', message: '将棋AI 準備完了' });
        postMessage({ type: 'ready' });
    }
};

let stdinBuffer = [];

// AIにキーボード入力を伝える関数をグローバルに定義
self.sendCommandToEngine = function (cmd) {
    console.log("[Worker] AIに命令を送信:", cmd);
    if (self.Module && self.Module.postMessage) {
        // 最近のEmscriptenエンジンはこの方法
        self.Module.postMessage(cmd);
    } else {
        // 古いバージョンのエンジン向けの予備
        if (typeof onmessage === 'function' && self.onmessage !== myInitHandler) {
            self.onmessage({ data: cmd });
        }
    }
};

// メインスレッドからの初期化命令を待つ
async function myInitHandler(e) {
    const msg = e.data;
    if (msg && msg.type === 'init') {
        try {
            postMessage({ type: 'status', message: '評価関数をロード中...' });

            const EVAL_URL = '../ai/YaneuraOu/eval/suisho5.bin';
            console.log("[Worker] 水匠5の脳みそ(bin)を取得します...");
            let evalRes = await fetch(EVAL_URL);

            if (!evalRes.ok) {
                throw new Error(`評価関数の取得に失敗しました: HTTP ${evalRes.status}`);
            }

            const evalData = new Uint8Array(await evalRes.arrayBuffer());

            // AIの脳内に「nn.bin」という名前でセット
            self.Module.preRun.push(function () {
                try {
                    self.Module.FS.mkdir('/eval');
                    self.Module.FS.writeFile('/eval/nn.bin', evalData);
                    console.log("[Worker] 脳みそセット成功！");
                } catch (err) { console.error(err); }
            });

            console.log("[Worker] AIエンジンの読み込みを開始...");

            // ★重要：AIエンジンを読み込む前に、AIが勝手にonmessageを奪わないよう一時退避
            const myOldOnMessage = self.onmessage;
            self.onmessage = null;

            // AIエンジンJSを読み込む（ここでModuleが参照されます）
            importScripts('../ai/YaneuraOu/yaneuraou.k-p.js');

            console.log("[Worker] importScripts 通過！");

            // 起動関数名がおそらく変わっています（yaneuraou.k-p.js の中身に依存）
            if (typeof YaneuraOu_k_p === 'function') {
                YaneuraOu_k_p(self.Module).then((instance) => {
                    self.Module = instance;
                });
            } else if (typeof YaneuraOu_HalfKP_noeval === 'function') {
                // もし関数名が同じならそのままでもOK
                YaneuraOu_HalfKP_noeval(self.Module).then((instance) => {
                    self.Module = instance;
                });
            }

            // 私たちの耳を復元しつつ、AIの耳も共存させる
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