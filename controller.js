class Controller {
    
    constructor() {
        
        var mapWidth = 800;
        var mapHeight = 800;
        var zombieKillerWidth = 50;
        var zombieKillerHeight = 50;
        var rows = 8;
        var cols = 8;
        var tileWidth = mapWidth / cols;
        var tileHeight = mapHeight / rows;
        
        var xOffset = mapWidth / 2 - zombieKillerWidth / 2;
        var yOffset = mapHeight / 2 - zombieKillerHeight / 2;
        var origX = 6 * tileWidth;
        var origY = 6 * tileHeight;
        var newOffsetX = xOffset - origX - tileWidth / 2 + zombieKillerWidth / 2;
        var newOffsetY = yOffset - origY - tileHeight / 2 + zombieKillerHeight / 2;
        
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
        this.map = new Map(rows, cols, mapWidth, mapHeight);
        this.zombieKiller = new ZombieKiller(xOffset, yOffset, zombieKillerWidth, zombieKillerHeight, this.map);

        this.camera = Camera.getInstance();
        this.camera.init(4, 4, newOffsetX, newOffsetY);
        
        var zombieSize = 50;
        this.zombie = new Zombie(1 * tileWidth + tileWidth / 2 - zombieSize, 1 * tileHeight + tileHeight / 2 - zombieSize, zombieSize, zombieSize, this.map, this.zombieKiller);
    
        var towerSize = 80;
        this.tower = new Tower(5 * tileWidth + tileWidth / 2 - towerSize / 2, 6 * tileHeight + tileHeight / 2 - towerSize / 2, towerSize, towerSize, this.map, this.zombieKiller);
    
    }
    
    update(deltatime) {
        this.zombieKiller.update(deltatime);
        this.zombie.update(deltatime);
        this.tower.update(deltatime);
    }
    
    onKeyDown(event) {
        var evt = event || window.event;
        if (evt.keyCode === 37) {
            this.zombieKiller.moveRight(true);
        }
        if (evt.keyCode === 39) {
            this.zombieKiller.moveLeft(true);
        }
        if (evt.keyCode === 38) {
            this.zombieKiller.moveUp(true);
        }
        if (evt.keyCode === 40) {
            this.zombieKiller.moveDown(true);
        }
    }
    
    onKeyUp(event) {
        var evt = event || window.event;
        if (evt.keyCode === 37) {
            this.zombieKiller.moveRight(false);
        }
        if (evt.keyCode === 39) {
            this.zombieKiller.moveLeft(false);
        }
        if (evt.keyCode === 38) {
            this.zombieKiller.moveUp(false);
        }
        if (evt.keyCode === 40) {
            this.zombieKiller.moveDown(false);
        }
    }
}
