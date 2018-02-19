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
        this.controller.zombieKiller.render(context);
    }
}

