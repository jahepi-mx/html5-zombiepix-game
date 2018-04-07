let ZOMBYE_TYPE = 1;

class Zombie extends Entity {  
    
    constructor(x, y, width, height, map, speed, health, awarenessTime, colorType) {
        super(x, y, width, height, ZOMBYE_TYPE);
        this.map = map;
        this.zombieKiller = this.map.zombieKiller;
        this.camera = Camera.getInstance();
        
        this.pathfindingTime = 0;
        this.pathfindingTimeLimit = awarenessTime;
        this.visited = [];
        this.parents = [];
        this.vectors = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        this.vectorsPath = [];
        this.toX = this.x;
        this.toY = this.y;
        this.speed = speed;
        this.isNewPosition = true;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.walkAnimation = new Animation(8, 2);
        this.attackAnimation = new Animation(5, 2);
        this.rotation = 0;
        this.health = health;
        this.maxHealth = this.health;
        this.isDead = false;
        this.bodyparts = [];
        this.availableVectors = new Set();
        this.foundZombieKiller = true;
        this.visibilityRatio = Config.getInstance().canvasWidth * Config.getInstance().canvasWidth + Config.getInstance().canvasHeight * Config.getInstance().canvasHeight;
        this.distanceFromZombieKiller = 0;
        //this.searchAvailableVectors(Math.floor(this.x / this.map.tileWidth), Math.floor(this.y / this.map.tileHeight));
        this.minDistance = speed * .05;
        this.attackDistance = (Math.pow(Config.getInstance().tileWidth, 2) + Math.pow(Config.getInstance().tileHeight, 2)) / 2;
        this.minRange = speed * 0.05;
        this.range = this.minRange * 3;
        this.sprite = "new_zombie";
        this.colorType = colorType;
        if (colorType > 1) {
            this.sprite = colorType + "_new_zombie";
        }
        this.queue = new PriorityQueue(function (a, b) {
            return a.priority > b.priority;
        });
    }
    
    update(deltatime) {
        
        var diffX = this.left() - this.zombieKiller.left();
        var diffY = this.top() - this.zombieKiller.top();
        this.distanceFromZombieKiller = diffX * diffX + diffY * diffY;
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            return;
        }
        
        if (this.isDead) {
            for (let bodypart of this.bodyparts) {
                bodypart.update(deltatime);
            }
            return;
        }
        
        this.pathfindingTime += deltatime;
        this.walkAnimation.update(deltatime);
        this.attackAnimation.update(deltatime);
        
        if (this.pathfindingTime >= this.pathfindingTimeLimit) {
            this.pathfindingTime = 0;
            this.vectorsPath = this.pathfinding();
        }

        if (this.vectorsPath.length > 0 && this.isNewPosition) {
            var vector = this.vectorsPath.pop();
            this.toX = (vector % this.map.cols) * this.map.tileWidth + this.map.tileWidth / 2;
            this.toY = Math.floor(vector / this.map.cols) * this.map.tileHeight + this.map.tileHeight / 2;
            //console.log((vector % this.map.cols) + ", " + Math.floor(vector / this.map.cols));
            this.isNewPosition = false;
        }
        
        diffX = this.toX - this.x;
        diffY = this.toY - this.y;
        
        if (Math.abs(diffX) > this.minDistance) {
            if (diffX >= 0) {
                this.x += this.speed * deltatime;
            } else {
                this.x -= this.speed * deltatime;
            }
        }
        
        if (Math.abs(diffY) > this.minDistance) {
            if (diffY >= 0) {
                this.y += this.speed * deltatime;
            } else {
                this.y -= this.speed * deltatime;
            }
        }
        
        if (Math.abs(diffX) <= this.minDistance && Math.abs(diffY) <= this.minDistance) {
            this.isNewPosition = true;
        }
        
        if (this.collide(this.zombieKiller)) {
            this.zombieKiller.damage();
        }
    }
    
    damage() {
        if (this.health % 3 === 0) {
            this.map.blood.push(new Blood(this.left(), this.top(), this.width, this.height, this.zombieKiller));
        }
        if (--this.health <= 0) {
            this.kill(false);
        }
    }
    
    kill(fromExplosion) {
        this.health = 0;
        this.isDead = true;
        for (var a = 0; a < 4; a++) {
            var type = Math.floor(Math.random() * 17) + 1;
            var image = "new_bodypart_" + type;
            if (this.colorType > 1) {
                image = this.colorType + "_" + image;
            }
            var bodypart = new ZombieBodyPart(this.left(), this.top(), this.width, this.height, this.map, image);
            if (fromExplosion) {
                bodypart.velocityX = Config.getInstance().tileWidth * 11.25;
                bodypart.velocityY = Config.getInstance().tileWidth * 11.25;
            }
            this.bodyparts.push(bodypart);
        }
        this.map.blood.push(new Blood(this.left(), this.top(), this.width, this.height, this.zombieKiller));
    }
    
    pathfinding() {
        this.queue.clear();
        this.visited = [];
        this.parents = [];
        var targetX = this.zombieKiller.currentX();
        var targetY = this.zombieKiller.currentY();
        
        if (!this.foundZombieKiller) {
            this.searchAvailableVectors(Math.floor(this.x / this.map.tileWidth), Math.floor(this.y / this.map.tileHeight));
            var rand = Math.floor(this.availableVectors.size * Math.random());
            var index = 0;
            for (let vector of this.availableVectors){
                if (index++ >= rand) {
                    targetX = vector % this.map.cols;
                    targetY = Math.floor(vector / this.map.cols);
                    break;
                }
            }
        }
        
        this.foundZombieKiller = false;
        var currentX = Math.floor(this.x / this.map.tileWidth);
        var currentY = Math.floor(this.y / this.map.tileHeight);
        //console.log("curr: " + currentX + "," + currentY);
        var startVector = currentY * this.map.cols + currentX;
        var heuristic = Math.abs(this.zombieKiller.left() - this.x) + Math.abs(this.zombieKiller.top() - this.y);
        if (currentX === targetX && currentY === targetY) {
            this.foundZombieKiller = true;
        } else {
            this.visited[startVector] = 1;      
            this.queue.add(startVector, heuristic);
        }
        
        while (!this.queue.isEmpty()) {
            var vector = this.queue.remove().object;
            var x = vector % this.map.cols;
            var y = Math.floor(vector / this.map.cols);
            for (let vector of this.vectors) {
                var newX = vector[0] + x;
                var newY = vector[1] + y;
                var tile = this.map.getTile(newX, newY);
                if (tile !== null && this.visited[newY * this.map.cols + newX] === undefined) {
                    this.visited[newY * this.map.cols + newX] = 1;
                    if (tile.isWalkable()) { 
                        this.parents[newY * this.map.cols + newX] = y * this.map.cols + x;
                        if (targetX === newX && targetY === newY) {
                            this.foundZombieKiller = true;
                            return this.path(newY * this.map.cols + newX);
                        }
                        heuristic = Math.abs(this.zombieKiller.left() - (newX * this.map.tileWidth + this.map.tileWidth / 2)) + Math.abs(this.zombieKiller.top() - (newY * this.map.tileHeight + this.map.tileHeight / 2));
                        this.queue.add(newY * this.map.cols + newX, heuristic);
                    }
                }
            }
        }
        
        return [];
    }
    
    path(vector) {
        var stack = [];
        stack.push(vector);
        var x = vector % this.map.cols;
        var y = Math.floor(vector / this.map.cols);
        //console.log(x + "," + y);
        while (this.parents[vector] !== undefined) {
            vector = this.parents[vector];
            x = vector % this.map.cols;
            y = Math.floor(vector / this.map.cols);
            stack.push(vector);
            //console.log(x + "," + y);
        }
        return stack;
    }
    
    searchAvailableVectors(x, y) {
        this.availableVectors.add(y * this.map.cols + x);
        for (let vector of this.vectors) {
            var newX = x + vector[0];
            var newY = y + vector[1];
            var tile = this.map.getTile(newX, newY);
            if (tile !== null && tile.isWalkable() && !this.availableVectors.has(newY * this.map.cols + newX)) {
                this.searchAvailableVectors(newX, newY);
            }
        }
    }
    
    render(context) {
        
        if (this.distanceFromZombieKiller > this.visibilityRatio) {
            return;
        }
        
        if (this.isDead) {
            for (let bodypart of this.bodyparts) {
                bodypart.render(context);
            }
            return;
        }
        
        context.fillStyle = "#ff0000";
        var width = this.health / this.maxHealth * this.width * 0.7;
        var height = this.height * .05;
        context.fillRect(this.x + this.camera.offsetX - width / 2, this.top() + this.camera.offsetY - height, width, height);
        
        var diffX = this.toX - this.x;
        var diffY = this.toY - this.y;
        
        var image = "";
        if (Math.abs(diffY) <= this.range && Math.abs(diffX) >= this.range) {
            this.rotation = diffX >= 0 ? 0 : 180;
        }
        if (Math.abs(diffX) <= this.range && Math.abs(diffY) >= this.range) {
            this.rotation = diffY >= 0 ? 270 : 90;
        }
        if (Math.abs(diffX) <= this.minRange && Math.abs(diffY) <= this.minRange) {
            if (this.distanceFromZombieKiller <= this.attackDistance) {
                image = this.sprite + "_attack_" + this.rotation + "_" + (this.attackAnimation.getFrame() + 1);          
            } else {
                image = this.sprite + "_" + this.rotation;
            }
        } else {         
            image = this.sprite + "_walk_" + this.rotation + "_" + (this.walkAnimation.getFrame() + 1);
        }      
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x + this.camera.offsetX - this.width / 2, this.y + this.camera.offsetY - this.height / 2, this.width, this.height);
    }
    
    left() {
        return this.x - this.width / 2;
    }
    
    top() {
        return this.y - this.height / 2;
    }
}

