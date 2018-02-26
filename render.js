class Render {
    
    constructor(canvas, context) {
        this.controller = new Controller();
        this.context = context;
        this.canvas = canvas;
    }
    
    update(deltatime) {
        // update game state
        this.controller.update(deltatime);
        
        // draw game state
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        this.controller.map.render(this.context);
        this.context.font = "65px joystix";
        this.context.fillStyle = "rgba(255, 0, 255, 255)";
        this.context.textAlign = "center";
        this.context.fillText(Math.round(1 / deltatime), this.canvas.width - 50, 50);  
    }
}

