// audio.js - BGMとSEの管理

const AudioManager = {
    bgm: null,
    isMuted: false,
    volume: 0.5,
    isInitialized: false,

    init: function () {
        if (this.isInitialized) return;

        // BGMインスタンス作成
        this.bgm = new Audio('music/Imperial_Dawn.mp3');
        this.bgm.loop = true;

        // 設定の読み込み
        this.loadSettings();

        // 音量とミュート状態の適用
        this.applySettings();

        this.isInitialized = true;
    },

    loadSettings: function () {
        try {
            const savedSettings = localStorage.getItem('tsumesyogi_audio_settings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                this.isMuted = settings.isMuted !== undefined ? settings.isMuted : false;
                this.volume = settings.volume !== undefined ? settings.volume : 0.5;
            }
        } catch (e) {
            console.error("オーディオ設定の読み込みに失敗しました", e);
        }
    },

    saveSettings: function () {
        try {
            const settings = {
                isMuted: this.isMuted,
                volume: this.volume
            };
            localStorage.setItem('tsumesyogi_audio_settings', JSON.stringify(settings));
        } catch (e) {
            console.error("オーディオ設定の保存に失敗しました", e);
        }
    },

    applySettings: function () {
        if (this.bgm) {
            this.bgm.volume = this.volume;
            // ミュート状態なら一時停止、ミュート解除されていれば再生を試みる（クリック後前提）
            if (this.isMuted) {
                this.bgm.pause();
            } else if (this.isInitialized) {
                // 既にユーザー操作が行われており初期化されている場合は再生
                this.bgm.play().catch(e => console.log("BGM autoplay prevented:", e));
            }
        }
    },

    setVolume: function (vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.bgm) {
            this.bgm.volume = this.volume;
        }
        this.saveSettings();
    },

    toggleMute: function (muted) {
        this.isMuted = muted;
        if (this.isMuted) {
            if (this.bgm) this.bgm.pause();
        } else {
            if (this.bgm) this.bgm.play().catch(e => console.log("BGM play prevented:", e));
        }
        this.saveSettings();
    },

    playBGM: function () {
        if (!this.isInitialized) {
            this.init();
        }
        if (!this.isMuted && this.bgm) {
            this.bgm.play().catch(e => console.log("BGM play prevented:", e));
        }
    }
};
