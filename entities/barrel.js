let BARREL_TYPE = 45;

class Barrel extends Tile {
    
    constructor(x, y, width, height, map) {
        super(x, y, width, height, BARREL_TYPE);
        this.hits = 5;
        this.map = map;
        this.walkable = false;
        this.animation = new Animation(6, 2);
        this.animation.stopAtSequenceNumber(1, null);
        this.hitRatio = Math.pow(Config.getInstance().tileWidth, 2) + Math.pow(Config.getInstance().tileHeight, 2);
        this.image = "tile11";
        this.vectors = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        this.isIgniting = false;
        this.ignitingTime = 0;
        this.ignitingTimeLimit = 0.4;
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
        if (this.isIgniting) {
            this.ignitingTime += deltatime;
            if (this.ignitingTime >= this.ignitingTimeLimit) {
                this.hits = 0;
            }
        }
        if (this.hits <= 0) {
            if (!this.walkable) {
                this.assets.playAudio(this.assets.explosion, false, Config.getInstance().soundEffectsVolume);
                for (let enemy of this.map.enemies) {
                    var diffX = enemy.left() - this.left();
                    var diffY = enemy.top() - this.top();
                    if (diffX * diffX + diffY * diffY <= this.hitRatio) {
                        enemy.kill(true);
                    }
                }
                for (let vector of this.vectors) {
                    var x = this.x + vector[0];
                    var y = this.y + vector[1];
                    var tile = this.map.getTile(x, y);
                    if (tile !== null && (tile.type === BARREL_TYPE || tile.type === CRATE_TYPE || tile.type === CRATE_TYPE_NO_ITEM)) {
                        tile.destroy();
                    }
                }
                var diffX = this.map.zombieKiller.left() - this.left();
                var diffY = this.map.zombieKiller.top() - this.top();
                if (diffX * diffX + diffY * diffY <= this.hitRatio) {
                    this.map.zombieKiller.damage();
                }
                this.walkable = true;
            }
        }
        if (this.walkable && !this.animation.isStopped()) {
            this.animation.update(deltatime);
        }
    }
    
    destroy() {
        this.isIgniting = true;
    }
}