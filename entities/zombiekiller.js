class ZombieKiller extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height);    
        this.map = map;
        this.isLeft = false;
        this.isRight = false;
        this.isDown = false;
        this.isUp = false;
        this.friction = 0.95;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.speed = 200;
        this.camera = Camera.getInstance();
        this.vectors = [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    }
    
    update(deltatime) {
        
        if (this.isLeft) {
            this.xVelocity = -this.speed;
        }
        
        if (this.isRight) {
            this.xVelocity = this.speed;
        }
        
        if (this.isDown) {
            this.yVelocity = -this.speed;
        }
        
        if (this.isUp) {
            this.yVelocity = this.speed;
        }
        
        var tmpX = this.camera.offsetX;
        this.camera.offsetX += this.xVelocity * deltatime;
        var currentX = Math.floor(this.left() / this.map.tileWidth);
        var currentY = Math.floor(this.top() / this.map.tileHeight);
        for (let vector of this.vectors) {
            var newX = vector[0] + currentX;
            var newY = vector[1] + currentY;
            var tile = this.map.getTile(newX, newY);
            if (tile !== null && !tile.isWalkable() && tile.collide(this)) {
                this.camera.offsetX = tmpX;
                break;
            }
        }
        
        var tmpY = this.camera.offsetY;
        this.camera.offsetY += this.yVelocity * deltatime;
        var currentX = Math.floor(this.left() / this.map.tileWidth);
        var currentY = Math.floor(this.top() / this.map.tileHeight);
        for (let vector of this.vectors) {
            var newX = vector[0] + currentX;
            var newY = vector[1] + currentY;
            var tile = this.map.getTile(newX, newY);
            if (tile !== null && !tile.isWalkable() && tile.collide(this)) {
                this.camera.offsetY = tmpY;
                break;
            }
        }
        
        this.xVelocity *= this.friction;
        this.yVelocity *= this.friction;
    }
    
    render(context) {
        context.fillStyle = "#ff0000";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    moveLeft(bool) {
        this.isLeft = bool;
    }
    
    moveRight(bool) {
        this.isRight = bool;
    }
    
    moveDown(bool) {
        this.isDown = bool;
    }
    
    moveUp(bool) {
        this.isUp = bool;
    }
    
    left() {
        return this.x - this.camera.offsetX;
    }
    
    right() {
        return this.left() + this.width;
    }
    
    top() {
        return this.y - this.camera.offsetY;
    }
    
    bottom() {
        return this.top() + this.height;
    }
}

