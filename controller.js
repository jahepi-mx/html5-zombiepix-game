class Controller {
    
    constructor() {
        
        var mapWidth = 2000; // 100 * 20
        var mapHeight = 2000; // 100 * 20
        var rows = 20;
        var cols = 20;
        var tileWidth = mapWidth / cols;
        var tileHeight = mapHeight / rows;
        var zombieKillerWidth = tileWidth * 0.8;
        var zombieKillerHeight = tileHeight * 0.8;
        
        var canvasWidth = 800;
        var canvasHeight = 800;
        var xOffset = canvasWidth / 2 - zombieKillerWidth / 2;
        var yOffset = canvasHeight / 2 - zombieKillerHeight / 2;
        var origX = 4 * tileWidth;
        var origY = 16 * tileHeight;
        var newOffsetX = xOffset - origX - tileWidth / 2 + zombieKillerWidth / 2;
        var newOffsetY = yOffset - origY - tileHeight / 2 + zombieKillerHeight / 2;
        
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
        this.map = new Map(rows, cols, mapWidth, mapHeight);
        this.zombieKiller = new ZombieKiller(xOffset, yOffset, zombieKillerWidth, zombieKillerHeight, this.map);

        this.camera = Camera.getInstance();
        this.camera.init(5, 5, newOffsetX, newOffsetY);
        
        var zombieSize = tileWidth * 0.8;
        this.zombies = [];
        this.deadZombies = [];
        this.maxCorpses = 10;
        
        for (var a = 0; a < 20; a++) {
            var speed = Math.round(Math.random() * 100 + 20);
            this.zombies.push(new Zombie(9 * tileWidth + tileWidth / 2 - zombieSize / 2, 11 * tileHeight + tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this.map, this.zombieKiller, speed));
        }
    
        var towerSize = 80;
        this.tower = new Tower(9 * tileWidth + tileWidth / 2 - towerSize / 2, 6 * tileHeight + tileHeight / 2 - towerSize / 2, towerSize, towerSize, this.map, this.zombieKiller);
    
    }
    
    update(deltatime) {
        this.map.update(deltatime, this.zombieKiller.currentX(), this.zombieKiller.currentY());
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
