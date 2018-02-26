class Controller {
    
    constructor() {
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
        this.map = new Map();
        this.zombieKiller = this.map.zombieKiller;
    }
    
    update(deltatime) {
        this.map.update(deltatime);
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
