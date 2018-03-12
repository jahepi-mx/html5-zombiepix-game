let configInstance = null;

class Config {
    
    constructor() {
        this.tileWidth = 100;
        this.tileHeight = 100;
        this.canvasWidth = 800;
        this.canvasHeight = 800;
    }
    
    static getInstance() {
        if (configInstance === null) {
            configInstance = new Config();
        }
        return configInstance;
    } 
}
