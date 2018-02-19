class Controller {
    
    constructor() {
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
        this.map = new Map(8, 8, 800, 800);
        this.zombieKiller = new ZombieKiller(200, 200, 50, 50, this.map);
    }
    
    update(deltatime) {
        this.zombieKiller.update(deltatime);
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
