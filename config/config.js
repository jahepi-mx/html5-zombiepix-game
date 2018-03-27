let configInstance = null;

class Config {
    
    constructor() {
        this.tileWidth = 80 * 1.5;
        this.tileHeight = 80 * 1.5;
        this.canvasWidth = 932; //800 * 1.5;
        this.canvasHeight = 524; //450 * 1.5;
        this.musicVolume = 0.3;
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
