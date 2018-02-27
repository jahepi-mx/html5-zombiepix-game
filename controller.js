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
}
