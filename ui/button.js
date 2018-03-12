class Button {
    
    constructor(width, height, text, x, y, fontSize, blinkColor1, blinkColor2, onColor) {
        this.width = width;
        this.height = height;
        this.text = text;
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.blinkColor1 = blinkColor1;
        this.blinkColor2 = blinkColor2;
        this.onColor = onColor;
        this.cursor = Cursor.getInstance();
        this.blinkTime = 0;
        this.blinkTimeLimit = 0.1;
        this.blink = 0;
        this.isClicked = false;
        this.visible = true;
    }
    
    update(deltatime) {
        this.isClicked = false;
        
        if (!this.visible) {
            return;
        }
        
        if (this.isCursorOnButton()) {
            this.isClicked = this.cursor.isPressed;
        }
        
        this.blinkTime += deltatime;
        if (this.blinkTime >= this.blinkTimeLimit) {
            this.blink ^= 1;
            this.blinkTime = 0;
        }
    }
    
    render(context) {
        if (!this.visible) {
            return;
        }
        if (this.isCursorOnButton()) {
            if (!this.isClicked) {
                context.font = this.fontSize + "px joystix";
                context.fillStyle = this.onColor;
                context.textAlign = "left";
                context.fillText(this.text, this.x, this.y);
            }         
        } else {
            context.font = this.fontSize + "px joystix";
            context.fillStyle = this.blink === 1 ? this.blinkColor1 : this.blinkColor2;
            context.textAlign = "left";
            context.fillText(this.text, this.x, this.y);
        }
    }
    
    isCursorOnButton() {
        return this.cursor.x >= this.x && this.cursor.x <= this.x + this.width && 
                this.cursor.y >= this.y - this.height && this.cursor.y <= this.y + this.height;
    }
}

