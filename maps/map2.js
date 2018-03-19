class Map2 extends Map {
    
    constructor(rows, cols) {
        super(rows, cols);
    }
    
    init() {
        
        this.map = [
            17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 48, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17
        ];
        
        this.tileMap = [];
        this.enemies = [];
        this.deadZombies = [];
        this.items = [];
        this.maxCorpses = 10;

        for (var a = 0; a < this.rows * this.cols; a++) {
            var x = a % this.cols;
            var y = Math.floor(a / this.cols);
            if (this.map[a] === CRATE_TYPE) {
                this.tileMap[a] = new Crate(x, y, this.tileWidth, this.tileHeight, this);
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
        var origX = 1 * this.tileWidth;
        var origY = 1 * this.tileHeight;
        var newOffsetX = xOffset - origX - this.tileWidth / 2 + zombieKillerWidth / 2;
        var newOffsetY = yOffset - origY - this.tileHeight / 2 + zombieKillerHeight / 2;
        
        this.zombieKiller = new ZombieKiller(xOffset, yOffset, zombieKillerWidth, zombieKillerHeight, this);
        this.camera.init(6, 4, newOffsetX, newOffsetY);
        
        var zombieSize = this.tileWidth * 0.8;
        
        this.events = [new EnemyEvent(this), new TileEvent(this)];
    }
}

