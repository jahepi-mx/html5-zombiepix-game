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
        this.bullets = [];
        this.cursor = Cursor.getInstance();
        this.shootTime = 0;
        this.shootTimeLimit = 0.1;
    }
    
    update(deltatime) {
        
        this.shootTime += deltatime;
        
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
        
        if (this.cursor.isPressed) {
            if (this.shootTime >= this.shootTimeLimit) {
                this.shootTime = 0;
                var radians = Math.atan2(this.cursor.y - this.y, this.cursor.x - this.x);
                var bulletSize = 20;
                var bulletX = this.left() + this.width / 2 - bulletSize / 2;
                var bulletY = this.top() + this.height / 2 - bulletSize / 2;
                this.bullets.push(new Bullet(bulletX, bulletY, bulletSize, bulletSize, radians, this.map));
            }
        }
        
        var tmpX = this.camera.offsetX;
        this.camera.offsetX += this.xVelocity * deltatime;
        var currentX = this.currentX();
        var currentY = this.currentY();
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
        var currentX = this.currentX();
        var currentY = this.currentY();
        for (let vector of this.vectors) {
            var newX = vector[0] + currentX;
            var newY = vector[1] + currentY;
            var tile = this.map.getTile(newX, newY);
            if (tile !== null && !tile.isWalkable() && tile.collide(this)) {
                this.camera.offsetY = tmpY;
                break;
            }
        }
        
        for (var a = 0; a < this.bullets.length; a++) {
            this.bullets[a].update(deltatime);
            if (this.bullets[a].collided) {
                this.bullets.splice(a--, 1);
            }
        }
        
        this.xVelocity *= this.friction;
        this.yVelocity *= this.friction;
    }
    
    render(context) {
        context.fillStyle = "#ff0000";
        context.fillRect(this.x, this.y, this.width, this.height);
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
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
    
    currentX() {
        return Math.floor(this.left() / this.map.tileWidth);
    }
    
    currentY() {
        return Math.floor(this.top() / this.map.tileHeight);
    }
}

