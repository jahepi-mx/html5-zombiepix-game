class EnemyEvent extends Event {
    
    constructor(map) {
        super(map);
        this.tile = this.map.getTile(5, 5);
    }
    
    update(deltatime) {
        if (this.executed === false) {
            if (this.tile.collide(this.map.zombieKiller)) {
                this.executed = this.dispose = true;
                var zombieSize = this.map.tileWidth * 0.8;
                this.map.enemies.push(new Zombie(6 * this.map.tileWidth + this.map.tileWidth / 2 - zombieSize / 2, 6 * this.map.tileHeight + this.map.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this.map, 100));
                this.map.enemies.push(new Zombie(6 * this.map.tileWidth + this.map.tileWidth / 2 - zombieSize / 2, 7 * this.map.tileHeight + this.map.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this.map, 120));
            }
        }
    }
}
