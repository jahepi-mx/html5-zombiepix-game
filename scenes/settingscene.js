class SettingScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.musicSlider = new Slider(this.canvas.width * 0.1, this.canvas.height * 0.3, this.canvas.width * 0.3, this.canvas.height * 0.03, this.canvas.height * 0.03, Config.getInstance().musicVolume);
        this.effectsSlider = new Slider(this.canvas.width * 0.57, this.canvas.height * 0.3, this.canvas.width * 0.3, this.canvas.height * 0.03, this.canvas.height * 0.03, Config.getInstance().soundEffectsVolume);
        this.backButton = new Button(100, 20, "Back", this.canvas.width * 0.8, this.canvas.height * 0.85, 60, "#fff", "#ff0000", "#ff00ff");
        
        var config = Config.getInstance();
        if (config.music === null || config.musicName !== config.musicName) {
            if (config.music !== null) {
                config.music.stop();
            }
            var musicData = this.assets.playAudioWithGainInfo(this.assets.main_music, true, config.musicVolume);
            config.music = musicData.source;
            config.musicGain = musicData.gain;
            config.musicName = "main_music";
        }
    }
    
    update(deltatime) {
        this.backButton.update(deltatime);
        this.musicSlider.update(deltatime);
        this.effectsSlider.update(deltatime);
        
        if (this.backButton.isClicked) {
            this.onChangeSceneCallback("mainscene");
        }
        
        Config.getInstance().musicVolume = this.musicSlider.getRatio();
        Config.getInstance().soundEffectsVolume = this.effectsSlider.getRatio();
        Config.getInstance().musicGain.value = Config.getInstance().musicVolume;
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        var image = "main";
        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 0, 0, this.canvas.width, this.canvas.height);
        
        this.backButton.render(this.context);
        this.musicSlider.render(this.context);
        this.effectsSlider.render(this.context);
        
        this.context.font = "30px joystix";
        this.context.textAlign = "left";
        var x = this.canvas.width * 0.1;
        var y = this.canvas.height * 0.26;
        this.context.fillStyle = "#d0f2ff";
        this.context.fillText("music volume " + Math.floor(this.musicSlider.getRatio() * 100) + "%", x, y);
        
        this.context.font = "30px joystix";
        this.context.textAlign = "left";
        var x = this.canvas.width * 0.57;
        var y = this.canvas.height * 0.26;
        this.context.fillStyle = "#d0f2ff";
        this.context.fillText("sound effects volume " + Math.floor(this.effectsSlider.getRatio() * 100) + "%", x, y);
    }
}
