class Zombie extends Entity {  
    
    constructor(x, y, width, height, map, zombieKiller) {
        super(x, y, width, height);
        this.map = map;
        this.zombieKiller = zombieKiller;
        this.camera = Camera.getInstance();
        
        this.pathfindingTime = 0;
        this.pathfindingTimeLimit = 10;
        this.visited = [];
        this.parents = [];
        this.vectors = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        this.vectorsPath = [];
        this.toX = this.x;
        this.toY = this.y;
        this.speed = 50;
        this.isNewPosition = true;
                
        this.queue = new PriorityQueue(function (a, b) {
            return a.priority > b.priority;
        });
    }
    
    update(deltatime) {
        
        this.pathfindingTime += deltatime;
        
        if (this.pathfindingTime >= this.pathfindingTimeLimit) {
            this.pathfindingTime = 0;
            this.vectorsPath = this.pathfinding();
        }

        if (this.vectorsPath.length > 0 && this.isNewPosition) {
            var vector = this.vectorsPath.pop();
            this.toX = (vector % this.map.cols) * this.map.tileWidth;
            this.toY = Math.floor(vector / this.map.cols) * this.map.tileHeight;
            console.log((vector % this.map.cols) + ", " + Math.floor(vector / this.map.cols));
            this.isNewPosition = false;
        }
        
        var diffX = (this.toX + this.map.tileWidth / 2 - this.width / 2) - this.x;
        var diffY = (this.toY + this.map.tileHeight / 2 - this.height / 2) - this.y;
        
        if (diffX >= 0) {
            this.x += this.speed * deltatime;
        } else {
            this.x -= this.speed * deltatime;
        }
        
        if (diffY >= 0) {
            this.y += this.speed * deltatime;
        } else {
            this.y -= this.speed * deltatime;
        }
        
        if (Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1) {
            this.isNewPosition = true;
        }
    }
    
    pathfinding() {
        this.queue.clear();
        this.visited = [];
        this.parents = [];
        var targetX = this.zombieKiller.currentX();
        var targetY = this.zombieKiller.currentY();
        console.log("target: " + targetX + "," + targetY);
        
        var currentX = Math.floor(this.x / this.map.tileWidth);
        var currentY = Math.floor(this.y / this.map.tileHeight);
        console.log("curr: " + currentX + "," + currentY);
        var startVector = currentY * this.map.cols + currentX;
        this.visited[startVector] = 1;
        var heuristic = Math.abs(this.zombieKiller.left() - this.x) + Math.abs(this.zombieKiller.top() - this.y);
        this.queue.add(startVector, heuristic);
        
        out: while (!this.queue.isEmpty()) {
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
                            this.debug();
                            return this.path(newY * this.map.cols + newX);
                            break out;
                        }
                        heuristic = Math.abs(this.zombieKiller.left() - newX * this.map.tileWidth) + Math.abs(this.zombieKiller.top() - newY * this.map.tileHeight);
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
    
    debug() {
        console.log("-----------------");
        for (var a = 0; a < this.parents.length; a++) {
            if (this.parents[a] !== undefined) {
                var s1 = a % this.map.cols + ", " + Math.floor(a / this.map.cols);
                var s2 = this.parents[a] % this.map.cols + ", " + Math.floor(this.parents[a] / this.map.cols);
                console.log(s1 + " <-> " + s2);
            }
        }
    }
    
    render(context) {
        context.fillStyle = "#0000ff";
        context.fillRect(this.x + this.camera.offsetX, this.y  + this.camera.offsetY, this.width, this.height);
    }
}

