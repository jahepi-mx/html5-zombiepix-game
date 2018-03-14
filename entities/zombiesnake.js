let ZOMBIE_SNAKE_TYPE = 256;

class ZombieSnake extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, ZOMBIE_SNAKE_TYPE);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        this.bodyParts = 4;
        this.length = 200;
        this.radians = Math.PI * 2 * Math.random();
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
    }
    
    update(deltatime) {
        
        var diffX = this.zombieKiller.left() - this.left();
        var diffY = this.zombieKiller.top() - this.top();
        var radians = Math.atan2(diffY, diffX);
        
        var radiansDiff = radians - this.radians;
        
        if (radiansDiff > Math.PI) {
            this.radians += Math.PI * 2;
	} else if (radiansDiff < -Math.PI) {
            this.radians -= Math.PI * 2;
	}
                
        this.radians += (radians - this.radians) * deltatime;
        //this.x = this.tmpX + this.length * Math.cos(this.radians);
        //this.y = this.tmpY + this.length * Math.sin(this.radians);
       
        
    }
    
    render(context) {
        for (var a = 1; a <= this.bodyParts; a++) {
            var x = this.x + (this.length / this.bodyParts * a) * Math.cos(this.radians);
            var y = this.y + (this.length / this.bodyParts * a) * Math.sin(this.radians);
            var image = "new_bullet";
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x + this.camera.offsetX, y + this.camera.offsetY, this.width, this.height);
        }
    }
}

let ZOMBIE_SNAKE_PART_TYPE = 512;

class ZombieSnakePart extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, ZOMBIE_SNAKE_PART_TYPE);
        this.map = map;
    }
}