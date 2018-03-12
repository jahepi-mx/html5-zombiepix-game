class GameScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
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
        this.context.fillText(this.fps, this.canvas.width - 50, 50);
    }
}

