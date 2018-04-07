class Tile extends Entity {
    
    constructor(x, y, width, height, type) {
        super(x, y, width, height, type);
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.image = "tile" + this.type;
        this.walkable = this.type >= 1 && this.type <= 12 || (this.type === 56 || this.type === 57);
    }
    
    render(context) {
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width + 1, this.height + 1);
    }
    
    isWalkable() {
        return this.walkable;
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

