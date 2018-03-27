class BossFightEvent extends Event {
    
    constructor(map) {
        super(map);
        this.entry = this.map.getTile(52, 26);
        this.tile = this.map.getTile(52, 24);
        this.exit = this.map.getTile(52, 12);
        this.config = Config.getInstance();
        this.newMusic = false;
        this.newMusicUpVolume = false;
        this.newMusicUpVolumeFinish = false;
        this.assets = Assets.getInstance();
        this.fontSize = Math.floor(this.config.canvasHeight * .10) + "px joystix";
        
        this.zombieSnake1 = null;
        this.zombieSnake2 = null;
        this.zombieSnake3 = null;
    }
    
    update(deltatime) {
        if (this.executed === false) {
            if (this.tile.collide(this.map.zombieKiller)) {
                this.executed = true;
                this.map.startX = 52;
                this.map.startY = 24;
                this.entry.image = "tile23";
                this.entry.type = 23;
                this.entry.walkable = false;
                var size1 = this.map.tileWidth * 1.2;
                var size2 = this.map.tileWidth * 0.5;
                var size3 = this.map.tileWidth * 0.9;
                this.zombieSnake1 = new ZombieSnake(52 * this.map.tileWidth + this.map.tileWidth / 2 - size1 / 2, 20 * this.map.tileHeight + this.map.tileHeight / 2 - size1 / 2, size1, size1, this.map, 12, 2, 2, 7);
                this.zombieSnake2 = new ZombieSnake(48 * this.map.tileWidth + this.map.tileWidth / 2 - size2 / 2, 16 * this.map.tileHeight + this.map.tileHeight / 2 - size2 / 2, size2, size2, this.map, 10, 2, 2, 10);
                this.zombieSnake3 = new ZombieSnake(56 * this.map.tileWidth + this.map.tileWidth / 2 - size3 / 2, 16 * this.map.tileHeight + this.map.tileHeight / 2 - size3 / 2, size3, size3, this.map, 15, 2, 2, 5);
                this.map.enemies.push(this.zombieSnake1);
                this.map.enemies.push(this.zombieSnake2);
                this.map.enemies.push(this.zombieSnake3);
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
        
        if (this.executed && this.newMusicUpVolume && !this.newMusicUpVolumeFinish) {
            this.config.musicGain.value += 1 * deltatime / 2;
            if (this.config.musicGain.value >= this.config.musicVolume) {
                this.config.musicGain.value = this.config.musicVolume;
                this.newMusicUpVolumeFinish = true;
            }
        }
        
        if (this.executed && this.zombieSnake1.isDead && this.zombieSnake2.isDead && this.zombieSnake3.isDead) {
            this.dispose = true;
            this.exit.image = "tile7";
            this.exit.type = 7;
            this.exit.walkable = true;
        }
    }
    
    render(context) {
        if (this.executed) {
            context.font = this.fontSize;
            context.fillStyle = "rgba(255, 0, 255, 255)";
            context.textAlign = "center";
            context.fillText("Defeat the zombie snakes to unlock the exit", this.config.canvasWidth / 2, this.config.canvasHeight * 0.2);
        }
    }
}



