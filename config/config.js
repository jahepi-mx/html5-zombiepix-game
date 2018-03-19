let configInstance = null;

class Config {
    
    constructor() {
        this.tileWidth = 80;
        this.tileHeight = 80;
        this.canvasWidth = 800;
        this.canvasHeight = 450;
        this.musicVolume = 0.5;
        this.soundEffectsVolume = 0.5;
        this.music = null;
        this.musicGain = null;
        this.musicName = "";
    }
    
    static getInstance() {
        if (configInstance === null) {
            configInstance = new Config();
        }
        return configInstance;
    } 
}
