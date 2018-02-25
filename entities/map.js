class Map {
    
    constructor(rows, cols, width, height) {
        
        this.map = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6, 1, 1, 1, 5, 17, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 10, 2, 2, 2, 9, 12, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 2, 2, 2, 35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 17, 17, 6, 2, 1, 1, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 8, 2, 2, 2, 9, 10, 8, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 3, 12, 12, 4, 2, 1, 1, 1, 1, 8, 9, 10, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 2, 2, 1, 1, 1, 8, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 2, 2, 2, 5, 17, 6, 2, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 36, 36, 2, 9, 12, 10, 2, 9, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 2, 2, 2, 2, 2, 36, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 8, 5, 6, 2, 35, 2, 2, 36, 2, 2, 2, 35, 2, 1, 1, 1, 1, 1, 1, 1, 8, 9, 10, 2, 2, 35, 2, 5, 17, 6, 2, 35, 2, 2, 1, 1, 1, 1, 1, 1, 8, 2, 2, 2, 2, 2, 2, 9, 12, 10, 2, 5, 17, 6, 1, 1, 1, 1, 1, 1, 8, 2, 5, 17, 17, 17, 17, 17, 17, 6, 2, 9, 12, 10, 1, 1, 1, 1, 1, 1, 14, 2, 15, 1, 1, 1, 1, 1, 8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 12, 15, 1, 1, 1, 1, 1, 14, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 9, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
        
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.height = height;
        this.tileWidth = this.width / this.cols;
        this.tileHeight = this.height / this.rows;
        this.tileMap = [];
        this.camera = Camera.getInstance();
        
        for (var a = 0; a < this.rows * this.cols; a++) {
            var x = a % this.cols;
            var y = Math.floor(a / this.cols);
            if (this.map[a] === CRATE_TYPE) {
                this.tileMap[a] = new Crate(x, y, this.tileWidth, this.tileHeight, this.map[a]);
            } else if (this.map[a] === BARREL_TYPE) {
                this.tileMap[a] = new Barrel(x, y, this.tileWidth, this.tileHeight, this.map[a]);
            } else {
                this.tileMap[a] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[a] - 1);
            }
        }
    }
    
    render(context, xOrigin, yOrigin) {
        // Render camera area
        var xFrom = xOrigin - this.camera.width;
        var xTo = xOrigin + this.camera.width;     
        xFrom = xFrom < 0 ? 0 : xFrom;
        xTo = xTo >= this.cols ? this.cols - 1 : xTo;
        
        var yFrom = yOrigin - this.camera.height;
        var yTo = yOrigin + this.camera.height;
        yFrom = yFrom < 0 ? 0 : yFrom;
        yTo = yTo >= this.rows ? this.rows - 1 : yTo;
        
        for (var x = xFrom; x <= xTo; x++) {
            for (var y = yFrom; y <= yTo; y++) {
                this.tileMap[y * this.cols + x].render(context);
            }
        }
    }
    
    update(deltatime, xOrigin, yOrigin) {
        // update camera area
        var xFrom = xOrigin - this.camera.width;
        var xTo = xOrigin + this.camera.width;     
        xFrom = xFrom < 0 ? 0 : xFrom;
        xTo = xTo >= this.cols ? this.cols - 1 : xTo;
        
        var yFrom = yOrigin - this.camera.height;
        var yTo = yOrigin + this.camera.height;
        yFrom = yFrom < 0 ? 0 : yFrom;
        yTo = yTo >= this.rows ? this.rows - 1 : yTo;
        
        for (var x = xFrom; x <= xTo; x++) {
            for (var y = yFrom; y <= yTo; y++) {
                this.tileMap[y * this.cols + x].update(deltatime);
            }
        }
    }
    
    getTile(x, y) {
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
            return this.tileMap[y * this.cols + x];
        }
        return null;
    }
}

