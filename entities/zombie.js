class Zombie extends Entity {  
    
    constructor(x, y, width, height, map, zombieKiller) {
        super(x, y, width, height);
        this.map = map;
        this.zombieKiller = zombieKiller;
        this.camera = Camera.getInstance();
        
        this.pathfindingTime = 600;
        this.pathfindingTimeLimit = 600;
        this.visited = [];
        this.vectors = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        
        this.queue = new PriorityQueue(function (a, b) {
            return a.priority > b.priority;
        });
    }
    
    update(deltatime) {
        
        this.pathfindingTime += deltatime;
        
        if (this.pathfindingTime >= this.pathfindingTimeLimit) {
            this.pathfindingTime = 0;
            this.pathfinding();
        }
    }
    
    pathfinding() {
        
        var targetX = Math.floor(this.zombieKiller.left() / this.map.tileWidth);
        var targetY = Math.floor(this.zombieKiller.top() / this.map.tileHeight);
        console.log("target: " + targetX + "," + targetY);
        
        var currentX = Math.floor(this.x / this.map.tileWidth);
        var currentY = Math.floor(this.y / this.map.tileHeight);
        console.log("curr: " + currentX + "," + currentY);
        this.visited[currentY * this.map.cols + currentX] = 1;
        var heuristic = Math.abs(this.zombieKiller.left() - this.x) + Math.abs(this.zombieKiller.top() - this.y);
        this.queue.add(currentY * this.map.cols + currentX, heuristic);
        
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
                        if (targetX === newX && targetY === newY) {
                            console.log("path reached");
                            break out;
                        }
                        heuristic = Math.abs(this.zombieKiller.left() - newX * this.map.tileWidth) + Math.abs(this.zombieKiller.top() - newY * this.map.tileHeight);
                        this.queue.add(newY * this.map.cols + newX, heuristic);
                    }
                }
            }
        } 
    }
    
    render(context) {
        context.fillStyle = "#0000ff";
        context.fillRect(this.x + this.camera.offsetX, this.y  + this.camera.offsetY, this.width, this.height);
    }
}

