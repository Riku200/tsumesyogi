/**
 * js/shogi-worker.js (AI完全覚醒版)
 */
console.log("[Worker] ワーカースクリプト起動。AIを目覚めさせます...");

// 1. 設定書（Module）を「self」というグローバルな場所に確実に置く
// これにより、後から読み込まれるAIエンジンが必ずこの設定を見つけられます。
self.Module = {
    // 最初から大きく確保せず、必要に応じて増やす設定にする
    INITIAL_MEMORY: 67108864, // 64MBからスタート
    ALLOW_MEMORY_GROWTH: true, // これが重要！

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
            importScripts('../ai/YaneuraOu/yaneuraou.halfkp.noeval.js');

            console.log("[Worker] importScripts 通過！");

            if (typeof YaneuraOu_HalfKP_noeval === 'function') {
                console.log("[Worker] YaneuraOu_HalfKP_noeval関数を検出。手動で起動します...");
                YaneuraOu_HalfKP_noeval(self.Module).then((instance) => {
                    self.Module = instance;
                    console.log("[Worker] エンジンインスタンス生成完了");
                });
            } else {
                console.error("[Worker] エラー: YaneuraOu_HalfKP_noeval 関数が見つかりません。");
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