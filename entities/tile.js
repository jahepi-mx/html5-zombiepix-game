class Tile extends Entity {
    
    constructor(x, y, width, height, type) {
        super(x, y, width, height);
        this.type = type;
    }
    
    render(context) {
        if (this.type === 0) {
            context.fillStyle = "#ffffff";
        } else if (this.type === 1) {
            context.fillStyle = "#000000";
        }
        context.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
    
    isWalkable() {
        return this.type === 0;
    }
    
    left() {
        return this.x * this.width;
    }
    
    right() {
        return this.left() + this.width;
    }
    
    top() {
        return this.y * this.height;
    }
    
    bottom() {
        return this.top() + this.height;
    }
}

