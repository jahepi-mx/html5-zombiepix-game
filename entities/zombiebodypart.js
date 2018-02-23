class ZombieBodyPart extends Entity {
    
    constructor(x, y, width, height) {
        super(x, y, width, height);
        var angle = Math.random() * Math.PI * 2;
        this.xRatio = Math.cos(angle);
        this.yRatio = Math.sin(angle);
        this.friction = Math.random();
        this.speed = Math.random() * 200 + 300;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.bodypart = Math.floor(Math.random() * 5) + 1;
        this.camera = Camera.getInstance();
    }
    
    update(deltatime) {
        this.x += this.xRatio * this.speed * deltatime;
        this.y += this.yRatio * this.speed * deltatime;
        this.speed *= this.friction;
    }
    
    render(context) {
        var image = "bodypart_" + this.bodypart;
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x + this.camera.offsetX, this.y + this.camera.offsetY, this.width, this.height);
    }
}

