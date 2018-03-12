class GameScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.controller = new Controller();
        this.fps = 0;
    }
    
    
    update(deltatime) {
        this.controller.update(deltatime);
        this.fps = Math.round(1 / deltatime);
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        this.controller.map.render(this.context);
        this.context.font = "65px joystix";
        this.context.fillStyle = "rgba(255, 0, 255, 255)";
        this.context.textAlign = "center";
        this.context.fillText(this.fps, Config.getInstance().canvasWidth - 50, 50);
        
        var life = this.controller.map.zombieKiller.life;
        var y = 60;
        var x = Config.getInstance().canvasWidth - 48 - 10;
        var size = 48;
        for (var a = 0; a < life; a++) {
            var image = "lifebar";
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x, y, size, size);
            x -= size + 10;
        }
    }
}

