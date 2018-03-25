let CRATE_TYPE = 44;
let CRATE_TYPE_NO_ITEM = 58;

class Crate extends Tile {
    
    constructor(x, y, width, height, map, hasItem) {
        super(x, y, width, height, CRATE_TYPE);
        this.hits = 5;
        this.walkable = false;
        this.animation = new Animation(3, 6);
        this.animation.stopAtSequenceNumber(1, null);
        this.map = map;
        this.image = "tile7";
        this.hasItem = hasItem;
    }
    
    render(context) {

        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        
        if (this.hits <= 0) {
            var image = "crate_broken_" + (this.animation.getFrame() + 1); 
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        } else {
            var image = "new_crate_" + (this.hits < 0 ? 0 : this.hits);
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        }
    }
    
    isWalkable() {
        return this.walkable;
    }
    
    update(deltatime) {
        if (!this.walkable && this.hits <= 0) {
            this.walkable = true;
            if (this.hasItem) {
                this.map.items.push(new Life(this.left(), this.top(), Config.getInstance().tileWidth * 0.6, Config.getInstance().tileHeight * 0.6, this.map));
            }
        }
        if (this.walkable) {
            this.animation.update(deltatime);
        }
    }
    
    destroy() {
        this.hits = 0;
    }
}
