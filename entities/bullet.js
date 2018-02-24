class Bullet extends Entity {
    
    constructor(x, y, width, height, radians, map) {
        super(x, y, width, height);
        this.camera = Camera.getInstance();
        this.xRatio = Math.cos(radians);
        this.yRatio = Math.sin(radians);
        this.x += (this.width + 20) * this.xRatio;
        this.y += (this.height + 20) * this.yRatio;
        this.speed = 300;
        this.map = map;
        this.collided = false;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
    }
    
    update(deltatime) {
        this.x += this.speed * this.xRatio * deltatime;
        this.y += this.speed * this.yRatio * deltatime;
        
        var currentX = Math.floor((this.left() + this.width / 2) / this.map.tileWidth);
        var currentY = Math.floor((this.top() + this.height / 2) / this.map.tileHeight);
        var tile = this.map.getTile(currentX, currentY);
        if (tile !== null && !tile.isWalkable() && tile.collide(this) && (tile.type === CRATE_TYPE || tile.type === BARREL_TYPE)) {
            tile.hits--;
            this.collided = true;
        } else if (tile !== null && !tile.isWalkable() && tile.collide(this)) {
            this.collided = true;
        }
    }
    
    render(context) {
        var image = "bullet";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
    } 
}