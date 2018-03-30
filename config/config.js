let configInstance = null;

class Config {
    
    constructor() {
        this.tileWidth = 120;
        this.tileHeight = 120;
        this.canvasWidth = 932;
        this.canvasHeight = 524;
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
