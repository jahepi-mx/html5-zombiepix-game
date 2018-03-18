class MainScene extends Scene {
    
    constructor(canvas, context, onChangeSceneCallback) {
        super(canvas, context, onChangeSceneCallback);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.playButton = new Button(200, 20, "play game", this.canvas.width * 0.1, this.canvas.height * 0.8, 60, "#fff", "#ff0000", "#ff00ff");
        this.settingsButton = new Button(100, 20, "settings", this.canvas.width * 0.1, this.canvas.height * 0.95, 40, "#ffff00", "#ffff00", "#fff");
        this.introText = [
            {text: "The zombie apocalypse has begun. ", color: "#dab600"},
            {text: "Your mission, reach the safe zone", color: "#e9d700"},
            {text: "from the city and survive. ", color: "#f8ed62"},
            {text: "Follow your instincts and", color: "#fff9ae"},
            {text: "good luck on your adventure.", color: "#fffde6"},
        ];
        
        var zombieWidth = 72 * 4;
        var zombieHeight = 92 * 4;
        this.zombies = [
            {x: canvas.width * 0.8, y: canvas.height - zombieHeight * 0.8, width: zombieWidth, height: zombieHeight, yFrom: 0, yTo: 20, xFrom: 0, xTo: 0, xToTmp: this.canvas.width * 0.03},
            {x: canvas.width * 0.4, y: canvas.height - zombieHeight, width: zombieWidth, height: zombieHeight, yFrom: 0, yTo: -10, xFrom: 0, xTo: 0, xToTmp: this.canvas.width * 0.1},
        ];
        
        this.startIntro = false;
        this.startIntroTime = 0;
        this.startIntroTimeLimit = 5;
    }
    
    update(deltatime) {
        this.playButton.update(deltatime);
        this.settingsButton.update(deltatime);
        
        if (this.playButton.isClicked) {
            if (!this.startIntro) {
                for (let zombie of this.zombies) {
                    zombie.xTo = zombie.xToTmp;
                }
            }
            this.startIntro = true;
        }
        
        if (this.startIntro) {
            this.startIntroTime += deltatime;
        }
        
        for (let zombie of this.zombies) {
            zombie.yFrom += (zombie.yTo - zombie.yFrom) * deltatime;
            zombie.xFrom += (zombie.xTo - zombie.xFrom) * deltatime;
            if (Math.abs(zombie.yTo - zombie.yFrom) <= 5) {
                zombie.yTo *= -1;
            }
        }
        
        if (this.startIntroTime >= this.startIntroTimeLimit) {
            this.onChangeSceneCallback("gamescene");
        }
        
        if (this.settingsButton.isClicked) {
            this.onChangeSceneCallback("settingscene");
        }
    }
    
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        var image = "main";
        this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, 0, 0, this.canvas.width, this.canvas.height);
        var image = "main_zombie";
        for (let zombie of this.zombies) {
            this.context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, zombie.x + zombie.xFrom, zombie.y + zombie.yFrom, zombie.width, zombie.height);
        }
        
        if (!this.startIntro) {
            this.playButton.render(this.context);
            this.settingsButton.render(this.context);
        } else {
            this.context.font = "40px joystix";
            this.context.textAlign = "left";
            var x = this.canvas.width * 0.04;
            var y = this.canvas.height * 0.08;
            for (let text of this.introText) {
                this.context.fillStyle = text.color;
                this.context.fillText(text.text, x, y);
                y += 45;
            }
        }
    }
}

