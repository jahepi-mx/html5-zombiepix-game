class Entity {
    
    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }
    
    render(context) {
        
    }
    
    update(deltatime) {
        
    }
    
    left() {
        return this.x;
    }
    
    right() {
        return this.left() + this.width;
    }
    
    top() {
        return this.y;
    }
    
    bottom() {
        return this.top() + this.height;
    }
    
    collide(entity) {
        var width = entity.width / 2 + this.width / 2;
        var height = entity.height / 2 + this.height / 2;
        var xDistance = Math.abs((this.left() + this.width / 2) - (entity.left() + entity.width / 2));
        var yDistance = Math.abs((this.top() + this.height / 2) - (entity.top() + entity.height / 2));
        return xDistance <= width && yDistance <= height;
    }  
}
