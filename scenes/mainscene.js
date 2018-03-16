class MainScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.playButton = new Button(200, 50, "play game", Config.getInstance().canvasWidth * 0.1, Config.getInstance().canvasHeight * 0.8, 60, "#fff", "#ff0000", "#ff00ff");
        this.introText = [
            {text: "The zombie apocalypse has begun. ", color: ""},
            {text: "Your mission, reach the safe zone from the city and survive. ", color: ""},
            {text: "Follow your instincts and good luck on your adventure.", color: ""},
        ];
        
        var zombieWidth = 72 * 4;
        var zombieHeight = 92 * 4;
        this.zombies = [
            {x: canvas.width * 0.8, y: canvas.height - zombieHeight * 0.8, width: zombieWidth, height: zombieHeight, from: 0, to: 20},
            {x: canvas.width * 0.4, y: canvas.height - zombieHeight, width: zombieWidth, height: zombieHeight, from: 0, to: -10},
        ];
    }
    
    update(deltatime) {
        this.playButton.update(deltatime);
        if (this.playButton.isClicked) {
            this.onChangeSceneCallback("gamescene");
        }
        
        for (let zombie of this.zombies) {
            zombie.from += (zombie.to - zombie.from) * deltatime;
            if (Math.abs(zombie.to - zombie.from) <= 5) {
                zombie.to *= -1;
            }
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        var image = "main";
        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 0, 0, Config.getInstance().canvasWidth, Config.getInstance().canvasHeight);
        this.playButton.render(this.context);
        
        var image = "main_zombie";
        for (let zombie of this.zombies) {
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, zombie.x, zombie.y + zombie.from, zombie.width, zombie.height);
        }
    }
}

