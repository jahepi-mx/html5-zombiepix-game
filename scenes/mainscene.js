class MainScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.playButton = new Button(200, 50, "play game", Config.getInstance().canvasWidth * 0.1, Config.getInstance().canvasHeight * 0.8, 60, "#fff", "#ff0000", "#ff00ff");
    }
    
    update(deltatime) {
        this.playButton.update(deltatime);
        if (this.playButton.isClicked) {
            this.onChangeSceneCallback("gamescene");
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        var image = "main";
        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 0, 0, Config.getInstance().canvasWidth, Config.getInstance().canvasHeight);
        this.playButton.render(this.context);
    }
}

