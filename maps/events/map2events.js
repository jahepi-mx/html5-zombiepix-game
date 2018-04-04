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

class BossFight2Event extends Event {
    
    constructor(map) {
        super(map);
        this.entry = this.map.getTile(36, 71);
        this.tile = this.map.getTile(38, 71);
        this.tile2 = this.map.getTile(34, 71);
        this.tile3 = this.map.getTile(32, 71);
        this.exit = this.map.getTile(48, 74);
        this.config = Config.getInstance();
        this.newMusic = false;
        this.newMusicUpVolume = false;
        this.newMusicUpVolumeFinish = false;
        this.assets = Assets.getInstance();
        this.fontSize = Math.floor(this.config.canvasHeight * .10) + "px joystix";
        this.spawnZombies = false;
        this.spawnZombieTime = 0;
        this.spawnZombieTimeLimit = 5;
        
        this.movingEye1 = null;
        this.movingEye2 = null;
        this.movingEye3 = null;
        this.executed2 = false;
    }
    
    update(deltatime) {
        
        if (this.executed2 === false) {
            if (this.tile2.collide(this.map.zombieKiller)) {
                this.tile3.image = "tile46";
                this.tile3.type = 46;
                this.tile3.walkable = false;
                this.executed2 = true;
            }
        }
        
        if (this.executed === false) {
            if (this.tile.collide(this.map.zombieKiller)) {
                this.executed = true;
                this.map.startX = 34;
                this.map.startY = 71;
                this.entry.image = "tile46";
                this.entry.type = 46;
                this.entry.walkable = false;
                var size1 = this.map.tileWidth;
                var size2 = this.map.tileWidth;
                var size3 = this.map.tileWidth;
                this.movingEye1 = new MovingEye(40 * this.map.tileWidth + this.map.tileWidth / 2 - size1 / 2, 66 * this.map.tileHeight + this.map.tileHeight / 2 - size1 / 2, size1, size1, this.map, this.map.tileWidth * 2, this.map.tileWidth * 2);
                this.movingEye2 = new MovingEye(46 * this.map.tileWidth + this.map.tileWidth / 2 - size1 / 2, 69 * this.map.tileHeight + this.map.tileHeight / 2 - size2 / 2, size2, size2, this.map, this.map.tileWidth * 2.5, this.map.tileWidth * 2.5);
                this.movingEye3 = new MovingEye(43 * this.map.tileWidth + this.map.tileWidth / 2 - size1 / 2, 73 * this.map.tileHeight + this.map.tileHeight / 2 - size3 / 2, size3, size3, this.map, this.map.tileWidth * 2.8, this.map.tileWidth * 2.8);
                this.map.enemies = [];
                this.map.enemies.push(this.movingEye1);
                this.map.enemies.push(this.movingEye2);
                this.map.enemies.push(this.movingEye3);
                this.spawnZombies = true;
                this.map.items.push(new Life(47 * this.map.tileWidth, 74 * this.map.tileHeight, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, this.map));
                this.map.items.push(new Life(38 * this.map.tileWidth, 74 * this.map.tileHeight, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, this.map));
                this.map.items.push(new Life(38 * this.map.tileWidth, 65 * this.map.tileHeight, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, this.map));
                this.map.items.push(new Life(47 * this.map.tileWidth, 65 * this.map.tileHeight, this.map.tileWidth * 0.6, this.map.tileHeight * 0.6, this.map));
                
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
        
        if (this.executed && this.movingEye1.isDead && this.movingEye2.isDead && this.movingEye3.isDead) {
            //this.dispose = true;
            this.exit.image = "tile7";
            this.exit.type = 7;
            this.exit.walkable = true;
        }
        
        if (!this.map.zombieKiller.isDead && this.executed && (!this.movingEye1.isDead || !this.movingEye2.isDead || !this.movingEye3.isDead)) {
            this.spawnZombieTime += deltatime;
            if (this.spawnZombieTime >= this.spawnZombieTimeLimit) {
                this.spawnZombieTime = 0;
                this.map.enemies.push(new SpawnZombie(42 * this.map.tileWidth + this.map.tileWidth / 2, 69 * this.map.tileHeight + this.map.tileHeight / 2, this.map.tileWidth, this.map.tileWidth, this.map, this.map.tileWidth * 2, 20, 2));
            }
        }
    }
    
    render(context) {
        if (this.executed && this.movingEye1.isDead && this.movingEye2.isDead && this.movingEye3.isDead) {
            context.font = this.fontSize;
            context.fillStyle = "rgba(255, 0, 255, 255)";
            context.textAlign = "center";
            context.fillText("Exit was unlocked!", this.config.canvasWidth / 2, this.config.canvasHeight * 0.17);
        }
        
        if (this.executed && (!this.movingEye1.isDead || !this.movingEye2.isDead || !this.movingEye3.isDead)) {
            context.font = this.fontSize;
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("Boss Fight, Defeat the enemies!", this.config.canvasWidth / 2, this.config.canvasHeight * 0.17);
            
            var health = this.movingEye1.health + this.movingEye2.health + this.movingEye3.health;
            var maxHealth = this.movingEye1.maxHealth + this.movingEye2.maxHealth + this.movingEye3.maxHealth;
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

