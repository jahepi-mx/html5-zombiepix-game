let cursorInstance = null;

class Cursor {
            
    constructor() {
        this.x = 0;
        this.y = 0;
        this.isPressed = false;
    }
    
    static getInstance() {
        if (cursorInstance === null) {
            cursorInstance = new Cursor();
        }
        return cursorInstance;
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }
};

