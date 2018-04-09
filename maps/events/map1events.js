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
                var size2 = this.map.tileWidth * 0.8;
                var size3 = this.map.tileWidth * 1;
                this.map.enemies = [];
                this.zombieSnake1 = new ZombieSnake(52 * this.map.tileWidth + this.map.tileWidth / 2 - size1 / 2, 20 * this.map.tileHeight + this.map.tileHeight / 2 - size1 / 2, size1, size1, this.map, 22, 1, 1, 7, this.map.tileWidth * 1);
                this.zombieSnake2 = new ZombieSnake(48 * this.map.tileWidth + this.map.tileWidth / 2 - size2 / 2, 16 * this.map.tileHeight + this.map.tileHeight / 2 - size2 / 2, size2, size2, this.map, 20, 0.6, 1.5, 10, this.map.tileWidth * 1.5);
                this.zombieSnake3 = new ZombieSnake(56 * this.map.tileWidth + this.map.tileWidth / 2 - size3 / 2, 16 * this.map.tileHeight + this.map.tileHeight / 2 - size3 / 2, size3, size3, this.map, 25, 0.8, 0.5, 5, this.map.tileWidth * 1.7);
                this.zombieSnake1.visibilityRatio *= 1.2;
                this.zombieSnake2.visibilityRatio *= 1.2;
                this.zombieSnake3.visibilityRatio *= 1.2;
                this.map.enemies.push(this.zombieSnake1);
                this.map.enemies.push(this.zombieSnake2);
                this.map.enemies.push(this.zombieSnake3);
                
                this.map.items.push(new Life(47 * this.map.tileWidth, 24 * this.map.tileHeight, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, this.map));
                this.map.items.push(new Life(57 * this.map.tileWidth, 24 * this.map.tileHeight, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, this.map));
                this.map.items.push(new Life(47 * this.map.tileWidth, 13 * this.map.tileHeight, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, this.map));
                this.map.items.push(new Life(57 * this.map.tileWidth, 13 * this.map.tileHeight, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, this.map));
                
                //this.map.enemies.push(new SpawnZombie(52 * this.map.tileWidth + this.map.tileWidth / 2, 23 * this.map.tileHeight + this.map.tileHeight / 2, this.map.tileWidth, this.map.tileHeight, this.map, this.map.tileWidth * 1.3, 30, 2));
            }
        }
        
        if (this.executed && this.newMusic === false) {
            if (this.config.music !== null) {
                this.config.musicGain.value -= deltatime / 2;
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
            this.config.musicGain.value += deltatime / 2;
            if (this.config.musicGain.value >= this.config.musicVolume) {
                this.config.musicGain.value = this.config.musicVolume;
                this.newMusicUpVolumeFinish = true;
            }
        }
        
        if (this.executed && this.zombieSnake1.isDead && this.zombieSnake2.isDead && this.zombieSnake3.isDead) {
            //this.dispose = true;
            this.exit.image = "tile7";
            this.exit.type = 7;
            this.exit.walkable = true;
        }
    }
    
    render(context) {
        if (this.executed && this.zombieSnake1.isDead && this.zombieSnake2.isDead && this.zombieSnake3.isDead) {
            context.font = this.fontSize;
            context.fillStyle = "rgba(255, 0, 255, 255)";
            context.textAlign = "center";
            context.fillText("Exit was unlocked!", this.config.canvasWidth / 2, this.config.canvasHeight * 0.17);
        }
        
        if (this.executed && (!this.zombieSnake1.isDead || !this.zombieSnake2.isDead || !this.zombieSnake3.isDead)) {
            context.font = this.fontSize;
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("Boss Fight, Defeat Zombie Snakes", this.config.canvasWidth / 2, this.config.canvasHeight * 0.17);
            
            var health = this.zombieSnake1.health + this.zombieSnake2.health + this.zombieSnake3.health;
            var maxHealth = this.zombieSnake1.maxHealth + this.zombieSnake2.maxHealth + this.zombieSnake3.maxHealth;
            var width = this.config.canvasWidth * 0.5;
            var height = this.config.canvasHeight * 0.03;
            var offset = this.config.canvasHeight * 0.01;
            var x = this.config.canvasWidth / 2 - width / 2;
            var y = this.config.canvasHeight * 0.19;
            context.fillStyle = "black";
            context.fillRect(x, y, width, height);
            context.fillStyle = "red";
            context.fillRect(x + offset, y + offset, (width - offset * 2) * health / maxHealth, height - offset * 2);
        }
    }
}



