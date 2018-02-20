let cameraInstance = null;

class Camera {
    
    constructor() {
    }
    
    init(offsetX, offsetY) {
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

