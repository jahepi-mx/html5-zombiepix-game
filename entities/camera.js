let cameraInstance = null;

class Camera {
    
    constructor() {
        this.width = 0;
        this.height = 0;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    
    init(width, height, offsetX, offsetY) {
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    
    static getInstance() {
        if (cameraInstance === null) {
            cameraInstance = new Camera();
        }
        return cameraInstance;
    }
}

