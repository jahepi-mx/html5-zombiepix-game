class EndScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.canvas.style.cursor = "pointer";
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.time = 0;
        this.timeLimit = 45;
        this.heroToDist = this.canvas.width * 0.01;
        this.heroFromDist = 0;
        this.texts = [
            {text: "Well done, you survived", x: this.canvas.width * 0.05, y: this.canvas.height * 0.52, z: 500, size: Config.getInstance().canvasHeight * .14, isLast: false},
            {text: "the dangers of the city", x: this.canvas.width * 0.05, y: this.canvas.height * 0.52, z: 700, size: Config.getInstance().canvasHeight * .14, isLast: false},
            {text: "Time to keep fighting", x: this.canvas.width * 0.05, y: this.canvas.height * 0.52, z: 800, size: Config.getInstance().canvasHeight * .14, isLast: false},
            {text: "against other creatures", x: this.canvas.width * 0.05, y: this.canvas.height * 0.52, z: 950, size: Config.getInstance().canvasHeight * .14, isLast: false},
            {text: "you might encounter, good luck", x: this.canvas.width * 0.05, y: this.canvas.height * 0.52, z: 1100, size: Config.getInstance().canvasHeight * .14, isLast: false},
            {text: "The END", x: this.canvas.width * 0.05, y: this.canvas.height * 0.52, z: 1300, size: Config.getInstance().canvasHeight * .14, isLast: true},
        ];
        this.focalLength = 200;
        this.isTextPlaying = true;
        
        var config = Config.getInstance();
        var sceneMusic = "ending_music";
        if (config.music === null || sceneMusic !== config.musicName) {
            if (config.music !== null) {
                config.music.stop();
            }
            var musicData = this.assets.playAudioWithGainInfo(this.assets.ending_music, true, config.musicVolume);
            config.music = musicData.source;
            config.musicGain = musicData.gain;
            config.musicName = sceneMusic;
        }
    }
    
    update(deltatime) {
        this.time += deltatime;
        
        if (this.time >= this.timeLimit) {
            this.onChangeSceneCallback("mainscene");
        }
        
        this.heroFromDist += (this.heroToDist - this.heroFromDist) * deltatime;
        if (Math.abs(this.heroToDist - this.heroFromDist) <= 5) {
            this.heroToDist *= -1;
        }
        
        if (this.isTextPlaying) {
            for (let text of this.texts) {
                var ratio = this.focalLength / (this.focalLength + text.z);
                text.z -= 50 * deltatime;
                if (ratio >= 1) {
                    if (text.isLast) {
                        this.isTextPlaying = false;
                        return;
                    }
                    text.x += (this.canvas.width - text.x) * deltatime;
                    text.y += (-(Config.getInstance().canvasHeight * .55) - text.y) * deltatime;
                }
            }
        }
    } 
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        var image = "end";
        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 0, 0, this.canvas.width, this.canvas.height);
        
        this.context.textAlign = "left";
        for (let text of this.texts) {
            var ratio = this.focalLength / (this.focalLength + text.z);
            if (ratio < 3) {
                this.context.fillStyle = "rgba(255, 255, 255, " + ratio + ")";
                var offsetX = 0;
                var offsetY = Config.getInstance().canvasHeight * .44 * ratio;
                this.context.font = (text.size * ratio) + "px joystix";
                this.context.fillText(text.text, text.x + offsetX, text.y + offsetY);
            }
        }
        
        var image = "end_hero";
        var width = Config.getInstance().canvasWidth * .45; 
        var height = width * 1.2375;
        var x = this.canvas.width * 0.5;
        var y = this.canvas.height - height + Config.getInstance().canvasHeight * .06;

        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, x, y + this.heroFromDist, width, height);
    }
}


