let EXIT_TYPE = 57;

class Exit extends Tile {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, EXIT_TYPE);
        this.animation = new Animation(5, 2);
        this.map = map;
    }
    
    render(context) {
        var image = "tile7";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        image = "tile57_" + (this.animation.getFrame() + 1);
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);  
    }
    
    update(deltatime) {
        this.animation.update(deltatime);
        
        if (this.collide(this.map.zombieKiller)) {
            this.map.isCompleted = true;
        }
    }  
}
