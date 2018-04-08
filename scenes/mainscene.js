class MainScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.canvas.style.cursor = "pointer";
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.playButton = new Button(Config.getInstance().canvasWidth * .25, Config.getInstance().canvasHeight * .04, "play game", this.canvas.width * 0.1, this.canvas.height * 0.8, Config.getInstance().canvasHeight * .13, "#fff", "#ff0000", "#ff00ff");
        this.settingsButton = new Button(Config.getInstance().canvasWidth * .125, Config.getInstance().canvasHeight * .04, "settings", this.canvas.width * 0.1, this.canvas.height * 0.95, Config.getInstance().canvasHeight * .08, "#ffff00", "#ffff00", "#fff");
        this.introText = [
            {text: "The zombie apocalypse has begun. ", color: "#ffffff"},
            {text: "Your mission, reach the safe zone", color: "#ffffff"},
            {text: "from the city and survive. ", color: "#ffffff"},
            {text: "Follow your instincts and", color: "#ffffff"},
            {text: "good luck on your adventure.", color: "#ffffff"},
        ];
        
        var zombieWidth = Config.getInstance().canvasWidth * 0.4;
        var zombieHeight = zombieWidth * 1.277;
        this.zombies = [
            {x: canvas.width * 0.8, y: canvas.height - zombieHeight * 0.8, width: zombieWidth, height: zombieHeight, yFrom: 0, yTo: Config.getInstance().canvasHeight * .04, xFrom: 0, xTo: 0, xToTmp: this.canvas.width * 0.03},
            {x: canvas.width * 0.4, y: canvas.height - zombieHeight, width: zombieWidth, height: zombieHeight, yFrom: 0, yTo: -Config.getInstance().canvasHeight * .02, xFrom: 0, xTo: 0, xToTmp: this.canvas.width * 0.1},
        ];
        
        this.startIntro = false;
        this.startIntroTime = 0;
        this.startIntroTimeLimit = 8;
        
        var config = Config.getInstance();
        var sceneMusic = "main_music";
        if (config.music === null || sceneMusic !== config.musicName) {
            if (config.music !== null) {
                config.music.stop();
            }
            var musicData = this.assets.playAudioWithGainInfo(this.assets.main_music, true, config.musicVolume);
            config.music = musicData.source;
            config.musicGain = musicData.gain;
            config.musicName = sceneMusic;
        }
    }
    
    update(deltatime) {
        this.playButton.update(deltatime);
        this.settingsButton.update(deltatime);
        
        if (this.playButton.isClicked) {
            if (!this.startIntro) {
                for (let zombie of this.zombies) {
                    zombie.xTo = zombie.xToTmp;
                }
            }
            this.startIntro = true;
        }
        
        if (this.startIntro) {
            this.startIntroTime += deltatime;
        }
        
        for (let zombie of this.zombies) {
            zombie.yFrom += (zombie.yTo - zombie.yFrom) * deltatime;
            zombie.xFrom += (zombie.xTo - zombie.xFrom) * deltatime;
            if (Math.abs(zombie.yTo - zombie.yFrom) <= 5) {
                zombie.yTo *= -1;
            }
        }
        
        if (this.startIntroTime >= this.startIntroTimeLimit) {
            this.onChangeSceneCallback("gamescene");
        }
        
        if (this.settingsButton.isClicked) {
            this.onChangeSceneCallback("settingscene");
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        var image = "main";
        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 0, 0, this.canvas.width, this.canvas.height);
        var image = "main_zombie";
        for (let zombie of this.zombies) {
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, zombie.x + zombie.xFrom, zombie.y + zombie.yFrom, zombie.width, zombie.height);
        }
        
        if (!this.startIntro) {
            this.playButton.render(this.context);
            this.settingsButton.render(this.context);
        } else {
            this.context.font = Math.floor(Config.getInstance().canvasHeight * .08) + "px joystix";
            this.context.textAlign = "left";
            var x = this.canvas.width * 0.04;
            var y = this.canvas.height * 0.08;
            for (let text of this.introText) {
                this.context.fillStyle = text.color;
                this.context.fillText(text.text, x, y);
                y += Config.getInstance().canvasHeight * 0.1;
            }
        }
    }
}

