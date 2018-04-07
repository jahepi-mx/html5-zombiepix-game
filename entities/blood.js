let BLOOD_TYPE = 2;

class Blood extends Entity {
    
    constructor(x, y, width, height, zombieKiller) {
        super(x, y, width, height, BLOOD_TYPE);
        var angle = Math.random() * Math.PI * 2;
        var distance = Config.getInstance().tileWidth * 0.5;
        this.xRatio = Math.cos(angle) * (Math.random() * distance + distance);
        this.yRatio = Math.sin(angle) * (Math.random() * distance + distance);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.type = Math.floor(Math.random() * 4) + 1;
        this.camera = Camera.getInstance();
        this.zombieKiller = zombieKiller;
        this.visibilityRatio = Config.getInstance().canvasWidth * Config.getInstance().canvasWidth + Config.getInstance().canvasHeight * Config.getInstance().canvasHeight;
    }
    
    update(deltatime) {
        
    }
    
    render(context) {
        
        var diffX = this.left() - this.zombieKiller.left();
        var diffY = this.top() - this.zombieKiller.top();
        this.distanceFromZombieKiller = diffX * diffX + diffY * diffY;
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            return;
        }
        
        var image = "new_blood_" + this.type;
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x + this.camera.offsetX + this.xRatio, this.y + this.camera.offsetY + this.yRatio, this.width, this.height);
    }
}


