class Map {
    
    constructor(rows, cols, width, height) {
        
        this.map = [
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
        ];
        
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.height = height;
        this.tileWidth = this.width / this.cols;
        this.tileHeight = this.height / this.rows;
        this.tileMap = [];
        
        for (var a = 0; a < this.rows * this.cols; a++) {
            var x = a % this.cols;
            var y = Math.floor(a / this.cols);
            this.tileMap[a] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[a]);
        }
    }
    
    render(context) {    
        for (var a = 0; a < this.rows * this.cols; a++) {
            this.tileMap[a].render(context);
        }   
    }
    
    getTile(x, y) {
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
            return this.tileMap[y * this.cols + x];
        }
        return null;
    }
}

