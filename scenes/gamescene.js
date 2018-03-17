class GameScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.controller = new Controller();
        this.fps = 0;
        
        var ratio = 88 / 150;
        this.popUpWidth = Config.getInstance().canvasWidth * 0.8;
        this.popUpHeight = Config.getInstance().canvasWidth * 0.8 * ratio;
        this.popUpX = Config.getInstance().canvasWidth / 2 - this.popUpWidth / 2;
        this.popUpY = Config.getInstance().canvasHeight / 2 - this.popUpHeight / 2;
        
        this.exitButton = new Button(200, 50, "exit", this.popUpX + 60, this.popUpY + this.popUpHeight * 0.6, 60, "#fff", "#ff0000", "#ff00ff");
        this.tryAgainButton = new Button(200, 50, "try again", this.popUpX + this.popUpWidth - 250, this.popUpY + this.popUpHeight * 0.6, 60, "#fff", "#ff0000", "#ff00ff");
        this.continueButton = new Button(200, 50, "continue", this.popUpX + this.popUpWidth - 250, this.popUpY + this.popUpHeight * 0.6, 60, "#fff", "#ff0000", "#ff00ff");
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
            this.onChangeSceneCallback("mainscene");
        }
        
        if (this.tryAgainButton.isClicked) {
            this.controller.reset();
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        this.controller.map.render(this.context);
        this.context.font = "65px joystix";
        this.context.fillStyle = "rgba(255, 0, 255, 255)";
        this.context.textAlign = "center";
        this.context.fillText(this.fps, 50, 40);
        
        var life = this.controller.map.zombieKiller.life;
        var y = 20;
        var size = this.canvas.height * 0.1;
        var margin = 10;
        var x = this.canvas.width - size - margin;
        for (var a = 0; a < life; a++) {
            var image = "lifebar";
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x, y, size, size);
            x -= size + margin;
        }
        
        if (this.controller.map.zombieKiller.isDeadForAWhile()) {
            var image = "popup_dead";
            this.exitButton.visible = this.tryAgainButton.visible = true;
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.popUpX, this.popUpY, this.popUpWidth, this.popUpHeight);
        } else {
            this.exitButton.visible = this.tryAgainButton.visible = false;
        }
        
        if (this.controller.map.isCompleted) {
            var image = "popup_safe";
            this.continueButton.visible = true;
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.popUpX, this.popUpY, this.popUpWidth, this.popUpHeight);
        } else {
            this.continueButton.visible = false;
        }
        
        this.exitButton.render(this.context);
        this.tryAgainButton.render(this.context);
        this.continueButton.render(this.context);
    }
}

