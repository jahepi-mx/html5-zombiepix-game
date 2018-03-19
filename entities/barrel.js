let BARREL_TYPE = 45;

class Barrel extends Tile {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, BARREL_TYPE);
        this.hits = 5;
        this.map = map;
        this.walkable = false;
        this.animation = new Animation(6, 2);
        this.animation.stopAtSequenceNumber(1, null);
        this.hitRatio = 11000;
        this.image = "metal_background";
    }
    
    render(context) {
        if (this.isWalkable()) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
            if (!this.animation.isStopped()) {
                var image = "new_fuel_explo_" + (this.animation.getFrame() + 1); 
                context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
            }
        } else {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
            var image = "new_fuel";
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        }
    }
    
    isWalkable() {
        return this.walkable;
    }
    
    update(deltatime) {
        if (this.hits <= 0) {
            if (!this.walkable) {
                this.assets.playAudio(this.assets.explosion, false, Config.getInstance().soundEffectsVolume);
                for (let enemy of this.map.enemies) {
                    if (enemy.type === ZOMBYE_TYPE) {
                        var diffX = enemy.left() - this.left();
                        var diffY = enemy.top() - this.top();
                        if (diffX * diffX + diffY * diffY <= this.hitRatio) {
                            enemy.kill(true);
                        }
                    }
                }
            }
            this.walkable = true;
        }
        if (this.walkable && !this.animation.isStopped()) {
            this.animation.update(deltatime);
        }
    }  
}