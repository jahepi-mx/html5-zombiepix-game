class Controller {
    
    constructor() {
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
        this.currentMap = 0;
        this.maps = [new Map2(80, 55, 5, 5), new Map1(50, 65, 52, 24)];
        this.map = this.maps[this.currentMap];
        this.map.init();
        this.zombieKiller = this.map.zombieKiller;
    }
    
    update(deltatime) {
        this.map.update(deltatime);
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
        this.map.reset();
        this.zombieKiller = this.map.zombieKiller;
    }
    
    resetStartUbication() {
        this.map.resetStartUbication();
    }
}
