class Map {
    
    constructor(rows, cols, width, height) {
        
        this.map = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6, 1, 1, 1, 5, 17, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 10, 2, 2, 2, 9, 12, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 2, 2, 2, 35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 17, 17, 6, 2, 1, 1, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 8, 2, 2, 2, 9, 10, 8, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 3, 12, 12, 4, 2, 1, 1, 1, 1, 8, 9, 10, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 2, 2, 1, 1, 1, 8, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 2, 2, 2, 5, 17, 6, 2, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 36, 36, 2, 9, 12, 10, 2, 9, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 2, 2, 2, 2, 2, 36, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 8, 5, 6, 2, 35, 2, 2, 36, 2, 2, 2, 35, 2, 1, 1, 1, 1, 1, 1, 1, 8, 9, 10, 2, 2, 35, 2, 5, 17, 6, 2, 35, 2, 2, 1, 1, 1, 1, 1, 1, 8, 2, 2, 2, 2, 2, 2, 9, 12, 10, 2, 5, 17, 6, 1, 1, 1, 1, 1, 1, 8, 2, 5, 17, 17, 17, 17, 17, 17, 6, 2, 9, 12, 10, 1, 1, 1, 1, 1, 1, 14, 2, 15, 1, 1, 1, 1, 1, 8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 12, 15, 1, 1, 1, 1, 1, 14, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 9, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
        
        this.rows = 20;
        this.cols = 20;
        this.tileWidth = 100;
        this.tileHeight = 100;
        this.width = this.tileWidth * this.cols;
        this.height = this.tileHeight * this.rows;
        this.tileMap = [];
        this.camera = Camera.getInstance();
        
        for (var a = 0; a < this.rows * this.cols; a++) {
            var x = a % this.cols;
            var y = Math.floor(a / this.cols);
            if (this.map[a] === CRATE_TYPE) {
                this.tileMap[a] = new Crate(x, y, this.tileWidth, this.tileHeight, this.map[a]);
            } else if (this.map[a] === BARREL_TYPE) {
                this.tileMap[a] = new Barrel(x, y, this.tileWidth, this.tileHeight, this.map[a], this);
            } else {
                this.tileMap[a] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[a] - 1);
            }
        }
        
        var zombieKillerWidth = this.tileWidth * 0.8;
        var zombieKillerHeight = this.tileHeight * 0.8;
        
        var canvasWidth = 800;
        var canvasHeight = 800;
        var xOffset = canvasWidth / 2 - zombieKillerWidth / 2;
        var yOffset = canvasHeight / 2 - zombieKillerHeight / 2;
        var origX = 4 * this.tileWidth;
        var origY = 16 * this.tileHeight;
        var newOffsetX = xOffset - origX - this.tileWidth / 2 + zombieKillerWidth / 2;
        var newOffsetY = yOffset - origY - this.tileHeight / 2 + zombieKillerHeight / 2;
        
        this.zombieKiller = new ZombieKiller(xOffset, yOffset, zombieKillerWidth, zombieKillerHeight, this);
        this.camera.init(5, 5, newOffsetX, newOffsetY);
        
        var zombieSize = this.tileWidth * 0.8;
        this.zombies = [];
        this.deadZombies = [];
        this.maxCorpses = 10;
        
        this.zombies.push(new Zombie(9 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 11 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 100));
        var towerSize = 80;
        this.tower = new Tower(9 * this.tileWidth + this.tileWidth / 2 - towerSize / 2, 6 * this.tileHeight + this.tileHeight / 2 - towerSize / 2, towerSize, towerSize, this);
    
    }
    
    render(context) {
        // Render camera area
        var xOrigin = this.zombieKiller.currentX();
        var yOrigin = this.zombieKiller.currentY();
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
        
        this.zombieKiller.render(context);
        for (let zombie of this.deadZombies) {
            zombie.render(context);
        }
        for (let zombie of this.zombies) {
            zombie.render(context);
        }
        this.tower.render(context);
        this.zombieKiller.render(context);
    }
    
    update(deltatime) {
        // update camera area
        var xOrigin = this.zombieKiller.currentX();
        var yOrigin = this.zombieKiller.currentY();
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
        
        this.zombieKiller.update(deltatime);

        for (var a = 0; a < this.zombies.length; a++) {
            this.zombies[a].update(deltatime);
            if (this.zombies[a].isDead) {
                this.deadZombies.push(this.zombies[a]);
                this.zombies.splice(a--, 1);
            }
        }
        
        for (let deadZombie of this.deadZombies) {
            deadZombie.update(deltatime);
        }
        
        if (this.deadZombies.length > this.maxCorpses) {
            this.deadZombies.shift();
        }
        
        this.tower.update(deltatime);
    }
    
    getTile(x, y) {
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
            return this.tileMap[y * this.cols + x];
        }
        return null;
    }
}

