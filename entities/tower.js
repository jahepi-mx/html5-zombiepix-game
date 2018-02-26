class Tower extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        this.shootTime = 0;
        this.shootTimeLimit = 0.5;
        this.bullets = [];
        this.camera = Camera.getInstance();
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
        
        context.fillStyle = "#a12300";
        context.fillRect(this.x + this.camera.offsetX, this.y  + this.camera.offsetY, this.width, this.height);
        
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
    }
}


