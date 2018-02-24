let CRATE_TYPE = 2;

class Crate extends Tile {
    
    constructor(x, y, width, height, type) {
        super(x, y, width, height, type);
        this.hits = 5;
        this.walkable = false;
    }
    
    render(context) {
        var image = "floor";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        image = this.walkable ? "crate_destroyed" : "crate";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
    }
    
    isWalkable() {
        return this.walkable;
    }
    
    update(deltatime) {
        if (this.hits <= 0) {
            this.walkable = true;
        }
    }  
}
