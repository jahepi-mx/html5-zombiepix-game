let ZOMBIE_SNAKE_TYPE = 256;

class ZombieSnake extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, ZOMBIE_SNAKE_TYPE);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        this.bodyParts = [];
        this.length = 200;
        this.maxLength = this.length;
        this.radians = Math.PI * 2 * Math.random();
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.changeLengthTime = 0;
        this.changeLengthTimeLimit = 3;
        for (var a = 0; a < 4; a++) {
            this.bodyParts.push(new ZombieSnakePart(x, y, width, height, map));
        }
    }
    
    update(deltatime) {
        
        this.changeLengthTime += deltatime;
        if (this.changeLengthTime >= this.changeLengthTimeLimit) {
            this.changeLengthTime = 0;
            this.length = Math.random() * this.maxLength;
        }
        
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
       
        var cos = Math.cos(this.radians);
        var sin = Math.sin(this.radians);
        var n = 1;
        var delta = deltatime;
        for (let bodyPart of this.bodyParts) {
            bodyPart.xRatio = cos;
            bodyPart.yRatio = sin;
            bodyPart.lengthMovementSpeed = delta;
            bodyPart.toLength = this.length / this.bodyParts.length * n++;
            bodyPart.update(deltatime);
            delta *= 1.1;
        }
    }
    
    render(context) {
        for (let bodyPart of this.bodyParts) {
            bodyPart.render(context);
        } 
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
        this.length = 0;
        this.toLength = 0;
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.lengthMovementTo = this.map.tileWidth * 0.5;
        this.lengthMovementFrom = 0;
        this.lengthMovementSpeed = 0;
    }
    
    update(deltatime) {

        this.length += (this.toLength - this.length) * deltatime;
        
        if (Math.abs(this.lengthMovementTo - this.lengthMovementFrom) <= 5) {
            this.lengthMovementTo *= -1;
        }
        
        this.lengthMovementFrom += (this.lengthMovementTo - this.lengthMovementFrom) * this.lengthMovementSpeed;
    }
    
    render(context) {
        var x = this.x + this.length * this.xRatio;
        var y = this.y + this.length * this.yRatio + this.lengthMovementFrom;
        var image = "new_bullet";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x + this.camera.offsetX, y + this.camera.offsetY, this.width, this.height);
    }
    
    damage() {
        
    }
}