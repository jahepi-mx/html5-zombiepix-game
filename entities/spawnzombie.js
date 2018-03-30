class SpawnZombie extends Zombie {
    
    constructor(x, y, width, height, map, speed, health, awarenessTime) {
        super(x, y, width, height, map, speed, health, awarenessTime, 1);
        var types = ["new_zombie", "2_new_zombie", "3_new_zombie"];
        this.colorType = Math.floor(Math.random() * 3) + 1;
        this.sprite = types[this.colorType - 1];
        this.damageTime = 0;
        this.damageTimeLimit = 1;
        this.isDamageable = false;
    }
    
    update(deltatime) {
        super.update(deltatime);
        if (this.damageTime >= this.damageTimeLimit) {
            this.isDamageable = true;
        } else {
            this.damageTime += deltatime;
        }
    }
 
    collide(entity) {
        if (this.isDamageable) {
            var width = entity.width / 2 + this.width / 2;
            var height = entity.height / 2 + this.height / 2;
            var xDistance = Math.abs((this.left() + this.width / 2) - (entity.left() + entity.width / 2));
            var yDistance = Math.abs((this.top() + this.height / 2) - (entity.top() + entity.height / 2));
            return xDistance <= width && yDistance <= height;
        }
        return false;
    } 
}


