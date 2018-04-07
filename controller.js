class Controller {
    
    constructor() {
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
        this.currentMap = 0;
        this.maps = [new Map1(50, 65, 5, 7), new Map2(80, 55, 5, 5)];
        this.map = this.maps[this.currentMap];
        this.map.init();
        this.zombieKiller = this.map.zombieKiller;
        this.isPaused = false;
        this.pauseTime = 0;
        this.pauseTimeLimit = 0.5;
    }
    
    update(deltatime) {
        this.pauseTime += deltatime;
        if (this.isPaused === false) {
            this.map.update(deltatime);
        }
    }
    
    onKeyDown(event) {
        var evt = event || window.event;
        //console.log(evt.keyCode);
        if (evt.keyCode === 65) {
            this.zombieKiller.moveRight(true);
        }
        if (evt.keyCode === 68) {
            this.zombieKiller.moveLeft(true);
        }
        if (evt.keyCode === 87) {
            this.zombieKiller.moveUp(true);
        }
        if (evt.keyCode === 83) {
            this.zombieKiller.moveDown(true);
        }
        if (evt.keyCode === 80) {
            if (this.pauseTime >= this.pauseTimeLimit) {
                this.pauseTime = 0;
                this.isPaused = !this.isPaused;
            }
        }
    }
    
    onKeyUp(event) {
        var evt = event || window.event;
        if (evt.keyCode === 65) {
            this.zombieKiller.moveRight(false);
        }
        if (evt.keyCode === 68) {
            this.zombieKiller.moveLeft(false);
        }
        if (evt.keyCode === 87) {
            this.zombieKiller.moveUp(false);
        }
        if (evt.keyCode === 83) {
            this.zombieKiller.moveDown(false);
        }
    }
    
    isCurrentMapCompleted() {
        return this.map.isCompleted;
    }
    
    nextMap() {
        var life = this.zombieKiller.life;
        this.map.dispose();
        this.map = this.maps[++this.currentMap];
        this.reset();
        this.zombieKiller.life = life;
    }
    
    isLastMap() {
        return this.currentMap === this.maps.length - 1;
    }
    
    reset() {
        this.isPaused = false;
        this.pauseTime = 0;
        this.map.reset();
        this.zombieKiller = this.map.zombieKiller;
    }
    
    resetStartUbication() {
        this.map.resetStartUbication();
    }
}
