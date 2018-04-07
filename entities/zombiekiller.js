let ZOMBIEKILLER_TYPE = 128;

class ZombieKiller extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, ZOMBIEKILLER_TYPE);    
        this.map = map;
        this.isLeft = false;
        this.isRight = false;
        this.isDown = false;
        this.isUp = false;
        this.friction = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.speed = Config.getInstance().tileWidth * 2.5;
        this.camera = Camera.getInstance();
        this.vectors = [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        this.bullets = [];
        this.cursor = Cursor.getInstance();
        this.shootTime = 0;
        this.shootTimeLimit = 0.1;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.walkAnimation = new Animation(4, 2);
        this.life = 4;
        this.isDead = false;
        this.damageTime = 1;
        this.damageTimeLimit = 1;
        this.damageSpriteTimeLimit = this.damageTimeLimit / 3;
        this.deadTime = 0;
        this.bodyparts = [];
        this.renderWidth = width * 1.62;
        this.renderHeight = height * 1.62;
        this.aimSize = this.renderWidth * 0.3;
        
        // Friction of 0.95 if the game runs at 60 fps
        var friction = 0.95;
        this.frictionRatio = Math.pow(friction, 60);
        
        /* 
         x^30 = 0.95^60 -- If the game runs at 30fps, the correct friction is the value of x
         x^20 = 0.95^60 -- If the game runs at 20fps, the correct friction is the value of x
        */
    }
    
    update(deltatime) {
        
        if (this.isDead) {
            this.deadTime += deltatime;
            for (let bodypart of this.bodyparts) {
                bodypart.update(deltatime);
            }
            return;
        }
        
        if (this.friction === 0) {
            var fps = 1 / deltatime;
            this.friction = Math.pow(this.frictionRatio, 1 / fps);
        }
            
        this.damageTime += deltatime;
        this.shootTime += deltatime;
        this.walkAnimation.update(deltatime);
        
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
                var radians = Math.atan2(this.cursor.y - (this.y + this.height / 2), this.cursor.x - (this.x + this.width / 2));
                var bulletSize = this.renderWidth * 0.25;
                var bulletX = this.left() + this.width / 2 - bulletSize / 2;
                var bulletY = this.top() + this.height / 2 - bulletSize / 2;
                this.bullets.push(new Bullet(bulletX, bulletY, bulletSize, bulletSize, radians, this.map, this.assets.shoot, Config.getInstance().tileWidth * 3.75));
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
            if (this.bullets[a].dispose) {
                this.bullets.splice(a--, 1);
            }
        }
        
        this.xVelocity *= this.friction;
        this.yVelocity *= this.friction;
    }
    
    render(context) {
        
        var isRed = this.damageTime < this.damageSpriteTimeLimit;
        
        if (this.isDead) {
            for (let bodypart of this.bodyparts) {
                bodypart.render(context);
            }
            return;
        }
        
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(Math.atan2(this.y + this.height / 2 - this.cursor.y, this.x + this.width / 2 - this.cursor.x) + Math.PI);       
        if (Math.abs(this.xVelocity) <= 15 && Math.abs(this.yVelocity) <= 15) { 
            var image = isRed ? "red_new_zk" : "new_zk";
            if (this.cursor.isPressed) {
                image = isRed ? "red_new_zk_walk_shoot_1" : "new_zk_walk_shoot_1";
            }
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, -this.renderWidth / 2, -this.renderHeight / 2, this.renderWidth, this.renderHeight);
        } else {
            var frame = (isRed ? "red_new_zk_walk_" : "new_zk_walk_") + (this.walkAnimation.getFrame() + 1);
            if (this.cursor.isPressed) {
                frame = (isRed ? "red_new_zk_walk_shoot_" : "new_zk_walk_shoot_") + (this.walkAnimation.getFrame() + 1);
            }
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, -this.renderWidth / 2, -this.renderHeight / 2, this.renderWidth, this.renderHeight);
        }
        context.restore();
        
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
        return Math.floor((this.left() + this.width / 2) / this.map.tileWidth);
    }
    
    currentY() {
        return Math.floor((this.top() + this.height / 2) / this.map.tileHeight);
    }
    
    damage() {
        if (!this.isDead && this.damageTime >= this.damageTimeLimit) {
            this.damageTime = 0;
            this.life--;
            this.assets.playAudio(this.assets.ouch, false, Config.getInstance().soundEffectsVolume);
            if (this.life <= 0) {
                for (var a = 1; a <= 4; a++) {
                    var bodypart = new ZombieBodyPart(this.left(), this.top(), this.renderWidth, this.renderHeight, this.map, "human_bodypart_" + a);
                    bodypart.velocityX = Config.getInstance().tileWidth * 11.25;
                    bodypart.velocityY = Config.getInstance().tileWidth * 11.25;
                    this.bodyparts.push(bodypart);
                }
                this.life = 0;
                this.isDead = true;
            }
        }
    }
    
    isDeadForAWhile() {
        return this.deadTime >= 2;
    }
}

