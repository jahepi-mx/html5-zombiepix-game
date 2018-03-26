let EYE_TYPE = 8;

class Eye extends Entity {
    
    constructor(x, y, width, height, map, shootTime) {
        super(x, y, width, height, EYE_TYPE);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        this.shootTime = 0;
        this.shootTimeLimit = shootTime;
        this.bullets = [];
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.animation = new Animation(9, 2);
        this.animation.stopAtSequenceNumber(1, null);
        this.blinkTime = 0;
        this.blinkTimeLimit = 3;
        this.isDead = false;
        this.visibilityRatio = Config.getInstance().canvasWidth * Config.getInstance().canvasWidth + Config.getInstance().canvasHeight * Config.getInstance().canvasHeight;
        this.distanceFromZombieKiller = 0;
    }
    
    update(deltatime) {
        
        var diffX = this.left() - this.zombieKiller.left();
        var diffY = this.top() - this.zombieKiller.top();
        this.distanceFromZombieKiller = diffX * diffX + diffY * diffY;
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            return;
        }
        
        this.blinkTime += deltatime;
        this.shootTime += deltatime;
        
        if (this.blinkTime > this.blinkTimeLimit) {
            this.animation.update(deltatime);
        }
        
        if (this.animation.isStopped()) {
            this.blinkTime = 0;
            this.animation.reset();
        }
        
        if (this.shootTime >= this.shootTimeLimit) {
            this.shootTime = 0;
            var bulletSize = this.width * 0.33;
            var x = this.left() + this.width / 2 - bulletSize / 2;
            var y = this.top() + this.height / 2 - bulletSize / 2;
            var radians = Math.atan2(this.zombieKiller.top() - y, this.zombieKiller.left() - x);
            this.bullets.push(new EyeBullet(x, y, bulletSize, bulletSize, radians, this.map, this.assets.enemy_shoot));
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
    }
    
    render(context) {
        
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            return;
        }
        
        var image = "new_eye_back";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        
        var radians = Math.atan2(this.zombieKiller.top() - this.top(), this.zombieKiller.left() - this.left());
        image = "new_eye_pupil";
        var width = this.width * 0.1;
        var height = this.height * 0.1;
        var x = this.left() + this.width / 2 - width / 2 + (width * Math.cos(radians));
        var y = this.top() + this.height / 2 - height / 2 + (height * Math.sin(radians));
        
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x + this.camera.offsetX, y + this.camera.offsetY, width, height);
        
        if (this.blinkTime > this.blinkTimeLimit) {
            image = "new_eye_" + (this.animation.getFrame() + 1);
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        } else {
            image = "new_eye";
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        }
        
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
    }
    
    damage() {
        
    }
}


