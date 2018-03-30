class MovingEyeBullet extends Bullet {
    
    constructor(x, y, width, height, radians, map, sound, speed) {
        super(x, y, width, height, radians, map, sound);
        this.radianStep = Math.PI * 2 / 3;
        this.radians = 0;
        this.rotationDistance = this.map.tileWidth;
        this.speed = speed; //Config.getInstance().tileWidth * 1.25;
        this.tmpX = x;
        this.tmpY = y;
    }
    
    update(deltatime) {
        
        if (this.collided) {
            this.animation.update(deltatime);
        }
        
        if (this.animation.isStopped()) {
            this.dispose = true;
        }
        
        this.tmpX += this.speed * this.xRatio * deltatime;
        this.x = this.tmpX + this.rotationDistance * Math.cos(this.radians);
        this.tmpY += this.speed * this.yRatio * deltatime;
        this.y = this.tmpY + this.rotationDistance * Math.sin(this.radians);
        this.radians += this.radianStep * deltatime;
        
        var currentX = Math.floor((this.left() + this.width / 2) / this.map.tileWidth);
        var currentY = Math.floor((this.top() + this.height / 2) / this.map.tileHeight);
        var tile = this.map.getTile(currentX, currentY);
        if (!this.collided && tile !== null && !tile.isWalkable() && tile.collide(this) && (tile.type === CRATE_TYPE || tile.type === BARREL_TYPE)) {
            tile.hits--;
            this.setAsCollided();
        } else if (!this.collided && tile !== null && !tile.isWalkable() && tile.collide(this)) {
            this.setAsCollided();
        } else {
            var diffX = this.origX - this.x;
            var diffY = this.origY - this.y;
            if (!this.collided && diffX * diffX + diffY * diffY >= this.maxDistance) {
                this.setAsCollided();
            }
        }  
    }
}
