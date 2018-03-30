let ZOMBIE_SNAKE_TYPE = 256;

class ZombieSnake extends Entity {
    
    constructor(x, y, width, height, map, health, shootTime, changeLengthTime, numberOfBodyParts, bulletSpeed) {
        super(x, y, width, height, ZOMBIE_SNAKE_TYPE);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        
        this.distanceBetweenParts = Math.sqrt(width * width + height * height) * 0.4;
        
        this.bodyParts = [];
        this.length = this.distanceBetweenParts * numberOfBodyParts;
        this.maxLength = this.length;
        this.radians = Math.PI * 2 * Math.random();
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.changeLengthTime = 0;
        this.changeLengthTimeLimit = changeLengthTime;
        this.maxHealth = 0;
        this.health = 0;
        this.shootTime = 0;
        this.shootTimeLimit = shootTime;
        this.bullets = [];
        this.isDead = false;
        this.visibilityRatio = Config.getInstance().canvasWidth * Config.getInstance().canvasWidth + Config.getInstance().canvasHeight * Config.getInstance().canvasHeight;
        this.distanceFromZombieKiller = 0;
        this.tau = Math.PI * 2;
        this.bulletSpeed = bulletSpeed;
        
        for (var a = 0; a < numberOfBodyParts; a++) {
            var bodyPart = new ZombieSnakePart(x, y, width, height, map, health);
            bodyPart.yOffsetTo = a === 0 ? 0 : height * 0.6;
            this.bodyParts.push(bodyPart);
            this.maxHealth += bodyPart.health;
        }
    }
    
    update(deltatime) {
        
        for (var a = 0; a < this.bullets.length; a++) {
            this.bullets[a].update(deltatime);
            if (!this.bullets[a].collided && this.bullets[a].collide(this.zombieKiller)) {
                this.bullets[a].collided = true;
                this.zombieKiller.damage();
            }
            if (this.bullets[a].dispose) {
                this.bullets.splice(a--, 1);
            }
        }
        
        var diffX = this.left() - this.zombieKiller.left();
        var diffY = this.top() - this.zombieKiller.top();
        this.distanceFromZombieKiller = diffX * diffX + diffY * diffY;
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            return;
        }
        
        this.shootTime += deltatime;
        
        if (this.shootTime >= this.shootTimeLimit) {
            this.shootTime = 0;
            var bulletSize = this.width * 0.33;
            if (this.bodyParts.length > 0) {
                var bodyPart = this.bodyParts[this.bodyParts.length - 1];
                var x = bodyPart.left() + bodyPart.width / 2 - bulletSize / 2;
                var y = bodyPart.top() + bodyPart.height / 2 - bulletSize / 2;
                var radians = Math.atan2(this.zombieKiller.top() - y, this.zombieKiller.left() - x);
                this.bullets.push(new EyeBullet(x, y, bulletSize, bulletSize, radians, this.map, this.assets.enemy_shoot, this.bulletSpeed));
            }
        }
        
        this.changeLengthTime += deltatime;
        if (this.changeLengthTime >= this.changeLengthTimeLimit) {
            this.changeLengthTime = 0;
            this.length = Math.random() * this.maxLength;
        }
        
        diffX = this.zombieKiller.left() - this.left();
        diffY = this.zombieKiller.top() - this.top();
        var radians = Math.atan2(diffY, diffX);
        /* radians %= this.tau;
        if (radians < 0) {
            radians += this.tau;
        } */
        this.radians += (radians - this.radians) * deltatime;
       
        this.health = 0;
        var cos = Math.cos(this.radians);
        var sin = Math.sin(this.radians);
        var n = 1;
        var delta = deltatime / 3;
        
        var yOffsetDone = true;
        for (var a = 0; a < this.bodyParts.length; a++) {
            var bodyPart = this.bodyParts[a];
            this.health += bodyPart.health;
            bodyPart.update(deltatime);
            if (bodyPart.dispose) {
                this.bodyParts.splice(a--, 1);
                this.maxLength = this.distanceBetweenParts * this.bodyParts.length;
            } else {
                bodyPart.xRatio = cos;
                bodyPart.yRatio = sin;
                bodyPart.toLength = this.length / this.bodyParts.length * n++;
                delta *= 1.3;
                bodyPart.yOffsetDelta = delta;
                if (!bodyPart.yOffsetDone) {
                    yOffsetDone = false;
                }
                bodyPart.update(deltatime);
                
                if (bodyPart.isDead === false && bodyPart.collide(this.zombieKiller)) {
                    this.zombieKiller.damage();
                }
            }
        }
        
        for (var a = this.bodyParts.length - 1, b = 0; a >= 0 ; a--, b++) {
            var id = b % 7;
            if (b > 0 && id === 0) {
                id = 1;
            }
            this.bodyParts[a].image = "snake_" + (id + 1);
            if (yOffsetDone) {
                this.bodyParts[a].yOffsetTo *= -1;
                this.bodyParts[a].yOffsetDone = false;
            }
        }

        if (this.bodyParts.length === 0) {
            this.isDead = true;
        }
    }
    
    render(context) {
        
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
        
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            return;
        }
        
        context.fillStyle = "#ff0000";
        var width = this.health / this.maxHealth * this.width * 0.7;
        var margin = Config.getInstance().tileHeight * 0.125;
        context.fillRect(this.left() + this.camera.offsetX + this.width / 2 - width / 2, this.top() + this.camera.offsetY - margin, width, margin);
        
        for (let bodyPart of this.bodyParts) {
            bodyPart.render(context);
        } 
    }
    
    collide(entity) {
        var collided = false;
        for (let bodyPart of this.bodyParts) {
            if (bodyPart.collide(entity)) {
                collided = true;
                bodyPart.damage();
            }
        }
        return collided;
    }
    
    damage() {
        
    }
    
    kill(fromExplosion) {
        for (let bodyPart of this.bodyParts) {
            bodyPart.health = 0;
            bodyPart.isDead = true;
        }
    }
}

let ZOMBIE_SNAKE_PART_TYPE = 512;

class ZombieSnakePart extends Entity {
    
    constructor(x, y, width, height, map, health) {
        super(x, y, width, height, ZOMBIE_SNAKE_PART_TYPE);
        this.map = map;
        this.xRatio = 0,
        this.yRatio = 0;
        this.radians = Math.PI * 2 * Math.random();
        this.xDeadRatio = Math.cos(this.radians);
        this.yDeadRatio = Math.sin(this.radians);
        this.length = 0;
        this.toLength = 0;
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.lengthMovementTo = this.map.tileWidth;
        this.health = health;
        this.isDead = false;
        this.dispose = false;
        this.image = null;
        this.friction = 0;
        this.yOffsetTo = 0;
        this.yOffsetFrom = 0;
        this.yOffsetDelta = 0;
        this.yOffsetDone = false;
        this.flag = false;
        
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
            
            if (this.friction === 0) {
                var fps = 1 / deltatime;
                this.friction = Math.pow(this.frictionRatio, 1 / fps);
            }
            
            this.width *= this.friction;
            this.height *= this.friction;
            this.x += this.xDeadRatio * this.lengthMovementTo * deltatime;
            this.y += this.yDeadRatio * this.lengthMovementTo * deltatime;
            if (this.width <= Math.abs(this.lengthMovementTo) * 0.2) {
                this.dispose = true;
            }
            return;
        }
        
        this.length += (this.toLength - this.length) * deltatime;
        this.yOffsetFrom += (this.yOffsetTo - this.yOffsetFrom) * this.yOffsetDelta;
        
        if (Math.abs(this.yOffsetTo - this.yOffsetFrom) <= this.height * 0.15) {
            this.yOffsetDone = true;
        } 
    }
    
    render(context) {
        var x = this.x + this.length * this.xRatio;
        var y = this.y + this.length * this.yRatio + this.yOffsetFrom;
        var image = this.image;
        if (image !== null) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x + this.camera.offsetX, y + this.camera.offsetY, this.width, this.height);
        }
    }
    
    left() {
        return this.x + this.length * this.xRatio;
    }
    
    top() {
        return this.y + this.length * this.yRatio + this.yOffsetFrom;
    }
    
    damage() {
        this.health--;
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
    }
}