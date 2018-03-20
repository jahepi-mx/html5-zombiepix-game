class EnemyEvent extends Event {
    
    constructor(map) {
        super(map);
        this.tile = this.map.getTile(5, 5);
        this.config = Config.getInstance();
        this.newMusic = false;
        this.newMusicUpVolume = false;
        this.assets = Assets.getInstance();
    }
    
    update(deltatime) {
        if (this.executed === false) {
            if (this.tile.collide(this.map.zombieKiller)) {
                this.executed = true;
                var zombieSize = this.map.tileWidth * 0.8;
                this.map.enemies.push(new Zombie(6 * this.map.tileWidth + this.map.tileWidth / 2 - zombieSize / 2, 6 * this.map.tileHeight + this.map.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this.map, 100));
                this.map.enemies.push(new Zombie(6 * this.map.tileWidth + this.map.tileWidth / 2 - zombieSize / 2, 7 * this.map.tileHeight + this.map.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this.map, 120));
            }
        }
        
        if (this.executed && this.newMusic === false) {
            if (this.config.music !== null) {
                this.config.musicGain.value -= 1 * deltatime / 2;
                if (this.config.musicGain.value <= 0) {
                    this.config.musicGain.value = 0;
                    this.newMusic = true;
                }
            }
        }
        
        if (this.executed && this.newMusic && this.newMusicUpVolume === false) {
            if (this.config.music !== null) {
                this.config.music.stop();
                var musicData = this.assets.playAudioWithGainInfo(this.assets.boss_music, true, 0);
                this.config.music = musicData.source;
                this.config.musicGain = musicData.gain;
                this.config.musicName = "boss_music";
                this.newMusicUpVolume = true;
            }
        }
        
        if (this.executed && this.newMusicUpVolume && this.dispose === false) {
            this.config.musicGain.value += 1 * deltatime / 2;
            if (this.config.musicGain.value >= this.config.musicVolume) {
                this.config.musicGain.value = this.config.musicVolume;
                this.dispose = true;
            }
        }
    }
}
