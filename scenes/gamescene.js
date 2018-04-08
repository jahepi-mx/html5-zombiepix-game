class GameScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.canvas.style.cursor = "none";
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.controller = new Controller();
        this.fps = 0;
        this.fpsFontSize = Math.floor(Config.getInstance().canvasHeight * .14) + "px joystix";
        this.fpsMarginLeft = Math.floor(Config.getInstance().canvasWidth * .0625);
        this.fpsMarginTop = Math.floor(Config.getInstance().canvasHeight * .08);
        this.cursor = Cursor.getInstance();
        var ratio = 88 / 150;
        this.popUpWidth = Config.getInstance().canvasWidth * 0.8;
        this.popUpHeight = Config.getInstance().canvasWidth * 0.8 * ratio;
        this.popUpX = Config.getInstance().canvasWidth / 2 - this.popUpWidth / 2;
        this.popUpY = Config.getInstance().canvasHeight / 2 - this.popUpHeight / 2;
        this.margin = Config.getInstance().canvasWidth * .0125;
        this.yFrom = Config.getInstance().canvasHeight * .04;
        this.exitButton = new Button(Config.getInstance().canvasWidth * .25, Config.getInstance().canvasHeight * .11, "exit", this.popUpX + (Config.getInstance().canvasWidth * .075), this.popUpY + this.popUpHeight * 0.6, Config.getInstance().canvasHeight * .13, "#fff", "#ff0000", "#ff00ff");
        this.tryAgainButton = new Button(Config.getInstance().canvasWidth * .25, Config.getInstance().canvasHeight * .11, "try again", this.popUpX + this.popUpWidth - (Config.getInstance().canvasWidth * .3125), this.popUpY + this.popUpHeight * 0.6, Config.getInstance().canvasHeight * .13, "#fff", "#ff0000", "#ff00ff");
        this.continueButton = new Button(Config.getInstance().canvasWidth * .25, Config.getInstance().canvasHeight * .11, "continue", this.popUpX + this.popUpWidth - (Config.getInstance().canvasWidth * .3125), this.popUpY + this.popUpHeight * 0.6, Config.getInstance().canvasHeight * .13, "#fff", "#ff0000", "#ff00ff");
        
        var config = Config.getInstance();
        var sceneMusic = "game_music";
        if (config.music === null || sceneMusic !== config.musicName) {
            if (config.music !== null) {
                config.music.stop();
            }
            var musicData = this.assets.playAudioWithGainInfo(this.assets.game_music, true, config.musicVolume);
            config.music = musicData.source;
            config.musicGain = musicData.gain;
            config.musicName = sceneMusic;
        }
    }
    
    
    update(deltatime) {
         
        if (this.controller.map.isCompleted === false) {
            this.controller.update(deltatime);
        }
        
        this.exitButton.update(deltatime);
        this.tryAgainButton.update(deltatime);
        this.continueButton.update(deltatime);
        this.fps = Math.round(1 / deltatime);
        
        if (this.exitButton.isClicked) {
            this.controller.resetStartUbication();
            this.onChangeSceneCallback("mainscene");
        }
        
        if (this.tryAgainButton.isClicked) {
            this.controller.reset();
        }
        
        if (this.continueButton.isClicked) {
            this.controller.resetStartUbication();
            this.controller.nextMap();
        }
        
        if (this.controller.isCurrentMapCompleted() && this.controller.isLastMap()) {
            this.onChangeSceneCallback("endscene");
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        this.controller.map.render(this.context);
        this.context.font = this.fpsFontSize;
        this.context.fillStyle = "rgba(255, 0, 255, 255)";
        this.context.textAlign = "center";
        //this.context.fillText(this.fps, this.fpsMarginLeft, this.fpsMarginTop);
        
        var life = this.controller.map.zombieKiller.life;
        var y = this.yFrom;
        var size = this.canvas.height * 0.08;
        var x = this.canvas.width - size - this.margin;
        for (var a = 0; a < life; a++) {
            var image = "lifebar";
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x, y, size, size);
            x -= size + this.margin;
        }
        
        if (this.controller.map.zombieKiller.isDeadForAWhile()) {
            var image = "popup_dead";
            this.exitButton.visible = this.tryAgainButton.visible = true;
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.popUpX, this.popUpY, this.popUpWidth, this.popUpHeight);
        } else {
            this.exitButton.visible = this.tryAgainButton.visible = false;
        }
        
        if (this.controller.isCurrentMapCompleted() && this.controller.isLastMap() === false) {
            var image = "popup_safe";
            this.continueButton.visible = true;
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.popUpX, this.popUpY, this.popUpWidth, this.popUpHeight);
        } else {
            this.continueButton.visible = false;
        }
        
        this.exitButton.render(this.context);
        this.tryAgainButton.render(this.context);
        this.continueButton.render(this.context);
        
        if (this.controller.isPaused) {
            this.context.font = Math.floor(Config.getInstance().canvasHeight * 0.2) + "px joystix";
            this.context.textAlign = "center";
            var x = this.canvas.width / 2;
            var y = this.canvas.height / 2;
            this.context.fillStyle = "#fff";
            this.context.fillText("pause", x, y);
        }
        
        var image = "aim";
        var aimSize = this.controller.map.zombieKiller.aimSize;
        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.cursor.x - aimSize / 2, this.cursor.y - aimSize / 2, aimSize, aimSize);
    }
}

