class Tower extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        this.shootTime = 0;
        this.shootTimeLimit = 0.5;
        this.bullets = [];
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
    }
    
    update(deltatime) {
        
        this.shootTime += deltatime;
        
        if (this.shootTime >= this.shootTimeLimit) {
            this.shootTime = 0;
            var bulletSize = 40;
            var x = this.left() + this.width / 2 - bulletSize / 2;
            var y = this.top() + this.height / 2 - bulletSize / 2;
            var radians = Math.atan2(this.zombieKiller.top() - y, this.zombieKiller.left() - x);
            this.bullets.push(new Bullet(x, y, bulletSize, bulletSize, radians, this.map));
        }
        
        for (var a = 0; a < this.bullets.length; a++) {
            this.bullets[a].update(deltatime);
            if (this.bullets[a].collided) {
                this.bullets.splice(a--, 1);
            }
        }
    }
    
    render(context) {
        
        var image = "eye";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        
        var radians = Math.atan2(this.zombieKiller.top() - this.top(), this.zombieKiller.left() - this.left());
        image = "eye_pupil";
        var width = this.width * 0.3;
        var height = this.height * 0.3;
        var x = this.left() + this.width / 2 - width / 2 + (20 * Math.cos(radians));
        var y = this.top() + this.height / 2 - height / 2 + (20 * Math.sin(radians));
        
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x + this.camera.offsetX, y + this.camera.offsetY, width, height);
        
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
    }
}


