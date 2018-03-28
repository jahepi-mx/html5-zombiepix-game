class StartEvent extends Event {
    
    constructor(map) {
        super(map);
        this.config = Config.getInstance();
        this.newMusic = false;
        this.assets = Assets.getInstance();
    }
    
    update(deltatime) {
        if (this.executed === false) {
            if (this.config.music !== null) {
                this.config.musicGain.value -= deltatime / 2;
                if (this.config.musicGain.value <= 0) {
                    this.config.musicGain.value = 0;
                    this.executed = true;
                }
            }
        }
        
        if (this.executed && this.newMusic === false) {
            if (this.config.music !== null) {
                this.config.music.stop();
                var musicData = this.assets.playAudioWithGainInfo(this.assets.game_music, true, 0);
                this.config.music = musicData.source;
                this.config.musicGain = musicData.gain;
                this.config.musicName = "game_music";
                this.newMusic = true;
            }
        }

        
        if (this.executed && this.newMusic && this.dispose === false) {
            this.config.musicGain.value += deltatime / 2;
            if (this.config.musicGain.value >= this.config.musicVolume) {
                this.config.musicGain.value = this.config.musicVolume;
                this.dispose = true;
            }
        }
    }
}
