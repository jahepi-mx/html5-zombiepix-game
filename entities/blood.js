let BLOOD_TYPE = 2;

class Blood extends Entity {
    
    constructor(x, y, width, height) {
        super(x, y, width, height, BLOOD_TYPE);
        var angle = Math.random() * Math.PI * 2;
        var distance = Config.getInstance().tileWidth * 0.5;
        this.xRatio = Math.cos(angle) * (Math.random() * distance + distance);
        this.yRatio = Math.sin(angle) * (Math.random() * distance + distance);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.type = Math.floor(Math.random() * 4) + 1;
        this.camera = Camera.getInstance();
    }
    
    update(deltatime) {
        
    }
    
    render(context) {
        var image = "new_blood_" + this.type;
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x + this.camera.offsetX + this.xRatio, this.y + this.camera.offsetY + this.yRatio, this.width, this.height);
    }
}


