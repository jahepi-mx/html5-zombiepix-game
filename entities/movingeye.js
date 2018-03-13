let MOVING_EYE_TYPE = 32;

class MovingEye extends Entity {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, MOVING_EYE_TYPE);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        var radians = Math.PI * 2 * Math.random();
        this.xRatio = Math.cos(radians);
        this.yRatio = Math.sin(radians);
        this.velocity = 200;
        this.vectorMoves = [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        this.health = 10;
        this.maxHealth = this.health;
        this.camera = Camera.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.isDead = false;
    }
    
    update(deltatime) {
        
        var tmpX = this.x;
        this.x += this.velocity * this.xRatio * deltatime;
        var currentX = Math.floor(this.x / this.map.tileWidth);
        var currentY = Math.floor(this.y / this.map.tileHeight);
        for (let vector of this.vectorMoves) {
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
        for (let vector of this.vectorMoves) {
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
    }
    
    render(context) {      
        
        var image = "new_eye_back";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        
        var radians = Math.atan2(this.zombieKiller.top() - this.top(), this.zombieKiller.left() - this.left());
        image = "new_eye_pupil";
        var width = this.width * 0.1;
        var height = this.height * 0.1;
        var x = this.left() + this.width / 2 - width / 2 + (10 * Math.cos(radians));
        var y = this.top() + this.height / 2 - height / 2 + (10 * Math.sin(radians));
        
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x + this.camera.offsetX, y + this.camera.offsetY, width, height);
        
        image = "moving_eye";
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x + this.camera.offsetX, this.y + this.camera.offsetY, this.width, this.height);
        
        context.fillStyle = "#ff0000";
        width = this.health / this.maxHealth * this.width * 0.7;
        context.fillRect(this.left() + this.camera.offsetX + this.width / 2 - width / 2, this.top() + this.camera.offsetY - 10, width, 10);
    }
    
    damage() {
        if (--this.health <= 0) {
            this.isDead = true;
        }
    }
}