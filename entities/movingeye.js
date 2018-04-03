let MOVING_EYE_TYPE = 32;

class MovingEye extends Entity {
    
    constructor(x, y, width, height, map, bulletSpeed, velocity) {
        super(x, y, width, height, MOVING_EYE_TYPE);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        var radians = Math.PI * 2 * Math.random();
        this.xRatio = Math.cos(radians);
        this.yRatio = Math.sin(radians);
        this.velocity = velocity;
        this.vectors = [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        this.health = 60;
        this.maxHealth = this.health;
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.bullets = [];
        this.shootTime = 0;
        this.shootTimeLimit = 2;
        this.isDead = false;
        this.dispose = false;
        this.animation = new Animation(3, 4);
        this.animation.stopAtSequenceNumber(1, null);
        this.visibilityRatio = Config.getInstance().canvasWidth * Config.getInstance().canvasWidth + Config.getInstance().canvasHeight * Config.getInstance().canvasHeight;
        this.distanceFromZombieKiller = 0;
        this.bulletSpeed = bulletSpeed;
    }
    
    update(deltatime) {
        
        var diffX = this.left() - this.zombieKiller.left();
        var diffY = this.top() - this.zombieKiller.top();
        this.distanceFromZombieKiller = diffX * diffX + diffY * diffY;
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            //return;
        }
        
        if (this.dispose) {
            this.animation.update(deltatime);
        }
        
        if (this.animation.isStopped()) {
            this.isDead = true;
        }
        
        this.shootTime += deltatime;
        
        var tmpX = this.x;
        this.x += this.velocity * this.xRatio * deltatime;
        var currentX = Math.floor(this.x / this.map.tileWidth);
        var currentY = Math.floor(this.y / this.map.tileHeight);
        for (let vector of this.vectors) {
            var newX = currentX + vector[0];
            var newY = currentY + vector[1];
            var tile = this.map.getTile(newX, newY);
            if (tile !== null && !tile.isWalkable() && tile.collide(this)) {
                this.xRatio *= -1;
                this.x = tmpX;
            }
        }
        
        var tmpY = this.y;
        this.y += this.velocity * this.yRatio * deltatime;
        currentX = Math.floor(this.x / this.map.tileWidth);
        currentY = Math.floor(this.y / this.map.tileHeight);
        for (let vector of this.vectors) {
            var newX = currentX + vector[0];
            var newY = currentY + vector[1];
            var tile = this.map.getTile(newX, newY);
            if (tile !== null && !tile.isWalkable() && tile.collide(this)) {
                this.yRatio *= -1;
                this.y = tmpY;
            }
        }
        
        if (this.collide(this.zombieKiller)) {
            this.zombieKiller.damage();
        }
        
        if (this.shootTime >= this.shootTimeLimit) {
            this.shootTime = 0;
            var bulletSize = this.width * 0.4;
            var x = this.left() + this.width / 2 - bulletSize / 2;
            var y = this.top() + this.height / 2 - bulletSize / 2;
            var radians = Math.atan2(this.zombieKiller.top() - y, this.zombieKiller.left() - x);
            this.bullets.push(new MovingEyeBullet(x, y, bulletSize, bulletSize, radians, this.map, this.assets.enemy_shoot, this.bulletSpeed));
        }
        
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
    }
    
    render(context) {      
        
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            //return;
        }
        
        if (this.dispose) {
            var image = "moving_eye_dead_" + (this.animation.getFrame() + 1);
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        } else {
            var image = "new_eye_back";
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);

            var radians = Math.atan2(this.zombieKiller.top() - this.top(), this.zombieKiller.left() - this.left());
            image = "new_eye_pupil";
            var width = this.width * 0.06;
            var height = this.height * 0.06;
            var x = this.left() + this.width / 2 - width / 2 + (width * Math.cos(radians));
            var y = this.top() + this.height / 2 - height / 2 + (height * Math.sin(radians));

            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x + this.camera.offsetX, y + this.camera.offsetY, width, height);

            image = "moving_eye";
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x + this.camera.offsetX, this.y + this.camera.offsetY, this.width, this.height);

            context.fillStyle = "#ff0000";
            width = this.health / this.maxHealth * this.width * 0.7;
            var margin = Config.getInstance().tileHeight * 0.125;
            context.fillRect(this.left() + this.camera.offsetX + this.width / 2 - width / 2, this.top() + this.camera.offsetY - margin, width, margin);
        }
        
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
    }
    
    damage() {
        if (this.dispose === false && --this.health <= 0) {
            this.dispose = true;
        }
    }
    
    kill(fromExplosion) {
        
    }
}