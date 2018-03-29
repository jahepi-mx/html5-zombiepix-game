let BULLET_TYPE = 4;

class Bullet extends Entity {
    
    constructor(x, y, width, height, radians, map, sound, speed) {
        super(x, y, width, height, BULLET_TYPE);
        this.camera = Camera.getInstance();
        this.xRatio = Math.cos(radians);
        this.yRatio = Math.sin(radians);
        this.x += (this.width + 20) * this.xRatio;
        this.y += (this.height + 20) * this.yRatio;
        this.speed = speed; // Config.getInstance().tileWidth * 3.75;
        this.map = map;
        this.collided = false;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.dispose = false;
        this.animation = new Animation(2, 6);
        this.animation.stopAtSequenceNumber(1, null);
        this.assets.playAudio(sound, false, Config.getInstance().soundEffectsVolume);
        this.maxDistance = Config.getInstance().canvasWidth * Config.getInstance().canvasWidth + Config.getInstance().canvasHeight * Config.getInstance().canvasHeight;
        this.origX = this.x;
        this.origY = this.y;
    }
    
    update(deltatime) {
        
        if (this.collided) {
            this.animation.update(deltatime);
        }
        
        if (this.animation.isStopped()) {
            this.dispose = true;
        }
        
        this.x += this.speed * this.xRatio * deltatime;
        this.y += this.speed * this.yRatio * deltatime;
        
        var currentX = Math.floor((this.left() + this.width / 2) / this.map.tileWidth);
        var currentY = Math.floor((this.top() + this.height / 2) / this.map.tileHeight);
        var tile = this.map.getTile(currentX, currentY);
        if (!this.collided && tile !== null && !tile.isWalkable() && tile.collide(this) && (tile.type === CRATE_TYPE || tile.type === BARREL_TYPE)) {
            tile.hits--;
            this.setAsCollided();
        } else if (!this.collided && tile !== null && !tile.isWalkable() && tile.collide(this)) {
            this.setAsCollided();
        } else {
            var diffX = this.origX - this.x;
            var diffY = this.origY - this.y;
            if (!this.collided && diffX * diffX + diffY * diffY >= this.maxDistance) {
                this.setAsCollided();
            }
        }
    }
    
    setAsCollided() {
        this.collided = true;
        this.assets.playAudio(this.assets.bullet_explosion, false, Config.getInstance().soundEffectsVolume);
    }
    
    render(context) {
        if (this.collided) {
            var image = "new_bullet_explo_" + (this.animation.getFrame() + 1);
            var width = this.width * 6;
            var height = this.height * 6;
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX - width / 2 + this.width / 2, this.top() + this.camera.offsetY - height / 2 + this.height / 2, width, height);
        } else {
            var image = "new_bullet";
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        }
    } 
}