class Map {
    
    constructor(rows, cols, startX, startY) {
        this.rows = rows;
        this.cols = cols;
        this.map = null;
        this.tileMap = null;
        this.enemies = null;
        this.blood = null;
        this.deadZombies = null;
        this.items = null;
        this.events = null;
        this.isCompleted = false;
        this.tileWidth = Config.getInstance().tileWidth;
        this.tileHeight = Config.getInstance().tileHeight;
        this.width = this.tileWidth * this.cols;
        this.height = this.tileHeight * this.rows;
        this.camera = Camera.getInstance();
        this.maxCorpses = 0;
        this.maxBlood = 0;
        this.startX = startX;
        this.startY = startY;
        this.startXTmp = startX;
        this.startYTmp = startY;
    }
    
    init() {
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
        
        for (let blood of this.blood) {
            blood.render(context);
        }
        
        for (let zombie of this.deadZombies) {
            zombie.render(context);
        }
        for (let enemy of this.enemies) {
            enemy.render(context);
        }

        this.zombieKiller.render(context);
        
        for (let item of this.items) {
            item.render(context);
        }
        
        for (let event of this.events) {
            event.render(context);
        }
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

        for (let bullet of this.zombieKiller.bullets) {
            for (let enemy of this.enemies) {
                if (!bullet.collided && enemy.collide(bullet)) {
                    bullet.setAsCollided();
                    enemy.damage();
                }
            }
        }
        
        for (var a = 0; a < this.enemies.length; a++) {
            this.enemies[a].update(deltatime);
            if (this.enemies[a].isDead) {
                if (this.enemies[a].type === ZOMBYE_TYPE) {
                    this.deadZombies.push(this.enemies[a]);
                }
                this.enemies.splice(a--, 1);
            }
        }
        
        for (let deadZombie of this.deadZombies) {
            deadZombie.update(deltatime);
        }
        
        if (this.deadZombies.length > this.maxCorpses) {
            this.deadZombies.shift();
        }
        
        if (this.blood.length > this.maxBlood) {
            this.blood.shift();
        }
        
        for (var a = 0; a < this.items.length; a++) {
            this.items[a].update(deltatime);
            if (this.items[a].dispose) {
                this.items.splice(a--, 1);
            }
        }
        
        for (var a = 0; a < this.events.length; a++) {
            this.events[a].update(deltatime);
            if (this.events[a].dispose) {
                this.events.splice(a--, 1);
            }
        }
    }
    
    getTile(x, y) {
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
            return this.tileMap[y * this.cols + x];
        }
        return null;
    }
    
    reset() {
        this.init();
        this.isCompleted = false;
    }
    
    dispose() {
        this.map = null;
        this.tileMap = null;
        this.enemies = null;
        this.deadZombies = null;
        this.items = null;
        this.events = null;
        this.blood = null;
    }
    
    resetStartUbication() {
        this.startX = this.startXTmp;
        this.startY = this.startYTmp;
    }
}

