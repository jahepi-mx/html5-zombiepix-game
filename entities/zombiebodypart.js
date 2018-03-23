let BODYPART_TYPE = 64;

class ZombieBodyPart extends Entity {
    
    constructor(x, y, width, height, map, image) {
        super(x, y, width, height, BODYPART_TYPE);
        var angle = Math.random() * Math.PI * 2;
        this.xRatio = Math.cos(angle);
        this.yRatio = Math.sin(angle);
        this.friction = 0;
        this.velocityX = Math.random() * Config.getInstance().tileWidth * 2.5 + (Config.getInstance().tileWidth * 3.75);
        this.velocityY = Math.random() * Config.getInstance().tileWidth * 2.5 + (Config.getInstance().tileWidth * 3.75);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.type = Math.floor(Math.random() * 17) + 1;
        this.camera = Camera.getInstance();
        this.map = map;
        this.image = image;
        
        var friction = 0.8 + (0.12 * Math.random());
        this.frictionRatio = Math.pow(friction, 60);
    }
    
    update(deltatime) {
        
        if (this.friction === 0) {
            var fps = 1 / deltatime;
            this.friction = Math.pow(this.frictionRatio, 1 / fps);
        }
        
        var tmpX = this.x;
        this.x += this.xRatio * this.velocityX * deltatime;
        var x = Math.floor((this.left() + this.width / 2) / this.map.tileWidth);
        var y = Math.floor((this.top() + this.height / 2) / this.map.tileHeight);
        var tile = this.map.getTile(x, y);
        if (tile !== null && !tile.isWalkable() && this.collide(tile)) {
            this.x = tmpX;
            this.velocityX *= -1;
        }
        
        var tmpY = this.y;
        this.y += this.yRatio * this.velocityY * deltatime;
        var x = Math.floor((this.left() + this.width / 2) / this.map.tileWidth);
        var y = Math.floor((this.top() + this.height / 2) / this.map.tileHeight);
        var tile = this.map.getTile(x, y);
        if (tile !== null && !tile.isWalkable() && this.collide(tile)) {
            this.y = tmpY;
            this.velocityY *= -1;
        }
        
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;
    }
    
    render(context) {
        var image = "new_bodypart_" + this.type;
        if (this.image !== null) {
            image = this.image;
        }
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x + this.camera.offsetX, this.y + this.camera.offsetY, this.width, this.height);
    }
}

