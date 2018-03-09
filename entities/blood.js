class Blood extends Entity {
    
    constructor(x, y, width, height) {
        super(x, y, width, height);
        var angle = Math.random() * Math.PI * 2;
        this.xRatio = Math.cos(angle) * (Math.random() * 40 + 40);
        this.yRatio = Math.sin(angle) * (Math.random() * 40 + 40);
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


