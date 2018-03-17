class Tile extends Entity {
    
    constructor(x, y, width, height, type) {
        super(x, y, width, height, type);
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
    }
    
    render(context) {
        var image = "tile" + this.type;
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
    }
    
    isWalkable() {
        return this.type >= 1 && this.type <= 12 || (this.type === 47 || this.type === 48);
    }
    
    left() {
        return this.x * this.width;
    }
    
    right() {
        return this.left() + this.width;
    }
    
    top() {
        return this.y * this.height;
    }
    
    bottom() {
        return this.top() + this.height;
    }
}

