let configInstance = null;

class Config {
    
    constructor() {
        this.tileWidth = 80;
        this.tileHeight = 80;
        this.canvasWidth = 800;
        this.canvasHeight = 450;
    }
    
    static getInstance() {
        if (configInstance === null) {
            configInstance = new Config();
        }
        return configInstance;
    } 
}
