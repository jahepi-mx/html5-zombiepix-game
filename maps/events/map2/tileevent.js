class TileEvent extends Event {
    
    constructor(map) {
        super(map);
        this.tile = this.map.getTile(1, 8);
    }
    
    update(deltatime) {
        if (this.executed === false) {
            if (this.tile.collide(this.map.zombieKiller)) {
                this.executed = this.dispose = true;
                
                var tile = this.map.getTile(7, 8);
                tile.image = "tile17";
                tile.type = 17;
                
                tile = this.map.getTile(7, 7);
                tile.image = "tile17";
                tile.type = 17;
                
                tile = this.map.getTile(8, 7);
                tile.image = "tile17";
                tile.type = 17;
            }
        }
    }
}

