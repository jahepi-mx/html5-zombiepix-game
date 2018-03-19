class Slider {
    
    constructor(x, y, width, height, margin, ratio) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.margin = margin;
        this.cursor = Cursor.getInstance();
        
        this.backWidth = this.margin * 2 + this.width;
        this.backHeight = this.margin * 2 + this.height;
        this.barX = this.x + this.margin;
        this.barY = this.y + this.margin;
        this.buttonWidth = this.margin;
        this.buttonHeight = this.height + 5;
        this.buttonX = this.barX;
        this.buttonY = this.barY + this.height / 2 - this.buttonHeight / 2;
        this.buttonXMin = this.buttonX;
        this.buttonXMax = this.buttonX + this.width - this.buttonWidth;
        this.buttonX += (this.width - this.buttonWidth) * ratio;
        this.diff = 0;
    }
    
    
    update(deltatime) {

        if (this.cursor.isPressed === false) {
            this.diff = 0;
        }
        if (this.cursor.isPressed) {
            if (this.cursor.x >= this.buttonX && this.cursor.x <= this.buttonX + this.buttonWidth
                    && this.cursor.y >= this.buttonY && this.cursor.y <= this.buttonY + this.buttonHeight) {
                if (this.buttonX  < this.buttonXMin) {
                    this.buttonX = this.buttonXMin;
                } else if (this.buttonX > this.buttonXMax) {
                    this.buttonX = this.buttonXMax;
                } else {
                    if (this.diff === 0) {
                        this.diff = this.buttonX - this.cursor.x;
                    }
                    this.buttonX = this.cursor.x + this.diff;
                }
            }  
        }
    }
    
    getRatio() {
        var diff = this.buttonXMax - this.buttonX;
        diff = diff / (this.buttonXMax - this.buttonXMin) * 100;
        return 1 - Math.floor(diff) / 100;
    }
    
    render(context) {
        // Back
        context.fillStyle = "#000";
        context.fillRect(this.x, this.y, this.backWidth, this.backHeight);
        
        // Bar
        context.fillStyle = "#333";
        context.fillRect(this.barX, this.barY, this.width, this.height);
        
        // Button
        context.fillStyle = "#fff";
        context.fillRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);  
    }
}