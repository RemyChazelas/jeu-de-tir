// Basic Environment Setup

const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);

// ------------------- Creating Player, Enemy, Weapon, Etc Classes-----------------------------------

// Setting player position to center
playerPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

// Creating Player Class
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.radius,
            (Math.PI / 180) * 0,
            (Math.PI / 180) * 360,
            false
        );
        context.fillStyle = this.color;

        context.fill();
    }
}