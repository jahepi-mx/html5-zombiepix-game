class Bullet extends Entity {
    
    constructor(x, y, width, height, radians, map) {
        super(x, y, width, height);
        this.camera = Camera.getInstance();
        this.xRatio = Math.cos(radians);
        this.yRatio = Math.sin(radians);
        this.speed = 300;
        this.vectors = [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        this.map = map;
        this.collided = false;
    }
    
    update(deltatime) {
        this.x += this.speed * this.xRatio * deltatime;
        this.y += this.speed * this.yRatio * deltatime;
        
        var currentX = Math.floor(this.left() / this.map.tileWidth);
        var currentY = Math.floor(this.top() / this.map.tileHeight);
        for (let vector of this.vectors) {
            var newX = vector[0] + currentX;
            var newY = vector[1] + currentY;
            var tile = this.map.getTile(newX, newY);
            if (tile !== null && !tile.isWalkable() && tile.collide(this)) {
                this.collided = true;
                break;
            }
        }
    }
    
    render(context) {
        context.fillStyle = "#ff00ff";
        context.fillRect(this.x + this.camera.offsetX, this.y  + this.camera.offsetY, this.width, this.height);
    } 
}