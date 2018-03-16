let LIFE_TYPE = 16;

class Life extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, LIFE_TYPE);
        this.radians = Math.PI * 2 * Math.random();
        this.xRatio = Math.cos(this.radians);
        this.yRatio = Math.sin(this.radians);
        this.velocityX = 600;
        this.velocityY = 600;
        this.friction = 0;
        this.dispose = false;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.camera = Camera.getInstance();
        this.map = map;
        
        // Friction of 0.91 if the game runs at 60 fps
        var friction = 0.91;
        this.frictionRatio = Math.pow(friction, 60);
    }
    
    update(deltatime) {
        
        if (this.friction === 0) {
            var fps = 1 / deltatime;
            this.friction = Math.pow(this.frictionRatio, 1 / fps);
        }
            
        if (this.map.zombieKiller.collide(this)) {
            this.dispose = true;
            this.map.zombieKiller.life++;
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
        var image = "life";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x + this.camera.offsetX, this.y + this.camera.offsetY, this.width, this.height);
    }
}


