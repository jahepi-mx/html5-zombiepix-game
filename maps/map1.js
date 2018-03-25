class Map1 extends Map {
    
    constructor(rows, cols) {
        super(rows, cols);
    }
    
    init() {
        
        this.map = [
            21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 11, 7, 8, 21, 21, 21, 31, 29, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 7, 7, 7, 45, 13, 13, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 2, 21, 21, 21, 21, 21, 21, 21, 31, 30, 26, 21, 21, 21, 21, 21, 21, 21, 21, 21, 7, 7, 6, 21, 33, 34, 40, 21, 13, 13, 13, 21, 21, 21, 21, 21, 21, 21, 21, 21, 7, 23, 23, 23, 43, 46, 42, 23, 23, 7, 23, 23, 21, 21, 21, 21, 21, 21, 21, 21, 7, 7, 7, 22, 32, 35, 41, 7, 7, 1, 22, 22, 21, 21, 21, 21, 21, 21, 21, 21, 7, 6, 7, 7, 13, 19, 13, 2, 22, 22, 22, 22, 21, 21, 21, 21, 21, 21, 21, 21, 7, 44, 44, 7, 13, 20, 13, 7, 22, 22, 22, 22, 23, 23, 21, 21, 21, 21, 21, 21, 7, 7, 3, 6, 7, 12, 44, 7, 7, 4, 22, 33, 34, 40, 21, 21, 21, 21, 21, 21, 44, 45, 7, 7, 44, 7, 7, 7, 45, 7, 22, 32, 35, 41, 22, 22, 22, 22, 22, 22, 7, 10, 45, 44, 24, 30, 26, 7, 45, 5, 2, 13, 14, 13, 22, 22, 22, 22, 7, 7, 7, 7, 8, 7, 13, 13, 13, 2, 1, 6, 6, 8, 8, 23, 22, 22, 22, 22, 2, 23, 23, 23, 23, 23, 13, 17, 13, 7, 8, 8, 10, 6, 2, 22, 22, 22, 22, 22, 7, 22, 22, 22, 22, 22, 4, 3, 7, 7, 8, 1, 8, 8, 10, 22, 22, 22, 22, 22, 23, 22, 22, 22, 22, 22, 23, 23, 23, 23, 8, 6, 8, 3, 8, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 4, 6, 4, 8, 57, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22
        ];
        
        this.tileMap = [];
        this.enemies = [];
        this.deadZombies = [];
        this.items = [];
        this.maxCorpses = 10;

        for (var a = 0; a < this.rows * this.cols; a++) {
            var x = a % this.cols;
            var y = Math.floor(a / this.cols);
            if (this.map[a] === CRATE_TYPE || this.map[a] === CRATE_TYPE_NO_ITEM) {
                this.tileMap[a] = new Crate(x, y, this.tileWidth, this.tileHeight, this, this.map[a] === CRATE_TYPE);
            } else if (this.map[a] === BARREL_TYPE) {
                this.tileMap[a] = new Barrel(x, y, this.tileWidth, this.tileHeight, this);
            } else if (this.map[a] === EXIT_TYPE) {
                this.tileMap[a] = new Exit(x, y, this.tileWidth, this.tileHeight, this);
            } else {
                this.tileMap[a] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[a]);
            }
        }
        
        var zombieKillerWidth = this.tileWidth * 0.8;
        var zombieKillerHeight = this.tileHeight * 0.8;
        
        var canvasWidth = Config.getInstance().canvasWidth;
        var canvasHeight = Config.getInstance().canvasHeight;
        var xOffset = canvasWidth / 2 - zombieKillerWidth / 2;
        var yOffset = canvasHeight / 2 - zombieKillerHeight / 2;
        var origX = 16 * this.tileWidth;
        var origY = 16 * this.tileHeight;
        var newOffsetX = xOffset - origX - this.tileWidth / 2 + zombieKillerWidth / 2;
        var newOffsetY = yOffset - origY - this.tileHeight / 2 + zombieKillerHeight / 2;
        
        this.zombieKiller = new ZombieKiller(xOffset, yOffset, zombieKillerWidth, zombieKillerHeight, this);
        this.camera.init(6, 4, newOffsetX, newOffsetY);
        
        var zombieSize = this.tileWidth * 0.8;
        this.enemies.push(new Zombie(9 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 11 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 100));
        this.enemies.push(new Zombie(7 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 11 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 120));
        this.enemies.push(new Zombie(8 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 12 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 150));
        this.enemies.push(new Zombie(9 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 12 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 140));
        this.enemies.push(new Zombie(9 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 9 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 130));
        
        this.enemies.push(new Zombie(6 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 4 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 130));
        this.enemies.push(new Zombie(7 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 8 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 170));
        this.enemies.push(new Zombie(7 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 9 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 100));
        
        this.enemies.push(new Zombie(12 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 180));
        this.enemies.push(new Zombie(13 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 190));
        
        this.enemies.push(new Zombie(14 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 11 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 150));
        this.enemies.push(new Zombie(15 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 11 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 80));
        this.enemies.push(new Zombie(15 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 12 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 130));
        this.enemies.push(new Zombie(15 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 13 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 170));
        this.enemies.push(new Zombie(16 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 13 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 150));
        
        var eyeSize = this.tileWidth * 1.2;
        this.enemies.push(new Eye(9 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 13 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this));
        
        eyeSize = this.tileWidth;
        this.enemies.push(new MovingEye(16 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this));
        this.enemies.push(new ZombieSnake(16 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this));
        
        this.events = [];
    }
}

