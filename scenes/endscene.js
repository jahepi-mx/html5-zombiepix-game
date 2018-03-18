class EndScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.time = 0;
        this.timeLimit = 30;
        this.heroToDist = this.canvas.width * 0.01;
        this.heroFromDist = 0;
    }
    
    update(deltatime) {
        this.time += deltatime;
        
        if (this.time >= this.timeLimit) {
            this.onChangeSceneCallback("mainscene");
        }
        
        this.heroFromDist += (this.heroToDist - this.heroFromDist) * deltatime;
        if (Math.abs(this.heroToDist - this.heroFromDist) <= 5) {
            this.heroToDist *= -1;
        }
    } 
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        var image = "end";
        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 0, 0, this.canvas.width, this.canvas.height);
        
        var image = "end_hero";
        var width = 80 * 4.5;
        var height = 99 * 4.5;
        var x = this.canvas.width * 0.5;
        var y = this.canvas.height - height + 30;

        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x, y + this.heroFromDist, width, height);
        
        this.context.font = "80px joystix";
        this.context.textAlign = "left";
        var x = this.canvas.width * 0.04;
        var y = this.canvas.height * 0.8;
        this.context.fillStyle = "#fff";
        this.context.fillText("THE END", x, y);
    }
}


