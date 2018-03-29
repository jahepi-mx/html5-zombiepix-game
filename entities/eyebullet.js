class EyeBullet extends Bullet {
    
    constructor(x, y, width, height, radians, map, sound, speed) {
        super(x, y, width, height, radians, map, sound, speed);
    }
    
    render(context) {
        if (this.collided) {
            var image = "enemy_bullet_explo_" + (this.animation.getFrame() + 1);
            var width = this.width * 6;
            var height = this.height * 6;
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX - width / 2 + this.width / 2, this.top() + this.camera.offsetY - height / 2 + this.height / 2, width, height);
        } else {
            var image = "enemy_bullet";
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.left() + this.camera.offsetX, this.top() + this.camera.offsetY, this.width, this.height);
        }
    } 
}


