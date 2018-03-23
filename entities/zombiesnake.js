let ZOMBIE_SNAKE_TYPE = 256;

class ZombieSnake extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, ZOMBIE_SNAKE_TYPE);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        this.bodyParts = [];
        this.length = 400;
        this.maxLength = this.length;
        this.radians = Math.PI * 2 * Math.random();
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.changeLengthTime = 0;
        this.changeLengthTimeLimit = 3;
        this.maxHealth = 0;
        this.health = 0;
        this.shootTime = 0;
        this.shootTimeLimit = 0.5;
        this.bullets = [];
        this.isDead = false;
        this.visibilityRatio = Config.getInstance().canvasWidth * Config.getInstance().canvasWidth + Config.getInstance().canvasHeight * Config.getInstance().canvasHeight;
        this.distanceFromZombieKiller = 0;
        this.tau = Math.PI * 2;
        
        for (var a = 0; a < 7; a++) {
            var bodyPart = new ZombieSnakePart(x, y, width, height, map);
            this.bodyParts.push(bodyPart);
            this.maxHealth += bodyPart.health;
        }
    }
    
    update(deltatime) {
        
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
                this.bullets.push(new EyeBullet(x, y, bulletSize, bulletSize, radians, this.map));
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
        
        var reachLengthMovement = true;
        for (var a = 0; a < this.bodyParts.length; a++) {
            var bodyPart = this.bodyParts[a];
            this.health += bodyPart.health;
            bodyPart.update(deltatime);
            if (bodyPart.dispose) {
                this.bodyParts.splice(a--, 1);
            } else {
                bodyPart.xRatio = cos;
                bodyPart.yRatio = sin;
                bodyPart.lengthMovementSpeed = delta;
                bodyPart.toLength = this.length / this.bodyParts.length * n++;
                bodyPart.update(deltatime);
                delta *= 1.5;
                if (bodyPart.isDead === false && bodyPart.collide(this.zombieKiller)) {
                    this.zombieKiller.damage();
                }
                if (bodyPart.reachLengthMovement === false) {
                    reachLengthMovement = false;
                }
            }
        }
        
        for (var a = this.bodyParts.length - 1, b = 1; a >= 0 ; a--, b++) {
            this.bodyParts[a].image = "snake_" + b;
            if (reachLengthMovement) {
                this.bodyParts[a].lengthMovementTo *= -1;
                this.bodyParts[a].reachLengthMovement = false;
            }
        }
        
        for (var a = 0; a < this.bullets.length; a++) {
            this.bullets[a].update(deltatime);
            if (this.bullets[a].collide(this.zombieKiller)) {
                this.bullets[a].collided = true;
                this.zombieKiller.damage();
            }
            if (this.bullets[a].dispose) {
                this.bullets.splice(a--, 1);
            }
        }
        
        if (this.bodyParts.length === 0) {
            this.isDead = true;
        }
    }
    
    render(context) {
        
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
        
        for (let bullet of this.bullets) {
            bullet.render(context);
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
}

let ZOMBIE_SNAKE_PART_TYPE = 512;

class ZombieSnakePart extends Entity {
    
    constructor(x, y, width, height, map) {
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
        this.lengthMovementFrom = 0;
        this.lengthMovementSpeed = 0;
        this.health = 4;
        this.isDead = false;
        this.dispose = false;
        this.image = null;
        this.reachLengthMovement = false;
        this.friction = 0;
        
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
        
        if (Math.abs(this.lengthMovementTo - this.lengthMovementFrom) <= 1) {
            this.reachLengthMovement = true;
        }
        
        this.lengthMovementFrom += (this.lengthMovementTo - this.lengthMovementFrom) * this.lengthMovementSpeed;
    }
    
    render(context) {
        var x = this.x + this.length * this.xRatio;
        var y = this.y + this.length * this.yRatio + this.lengthMovementFrom;
        var image = this.image;
        if (image !== null) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x + this.camera.offsetX, y + this.camera.offsetY, this.width, this.height);
        }
    }
    
    left() {
        return this.x + this.length * this.xRatio;
    }
    
    top() {
        return this.y + this.length * this.yRatio + this.lengthMovementFrom;
    }
    
    damage() {
        this.health--;
        if (this.health <= 0) {
            this.isDead = true;
        }
    }
}