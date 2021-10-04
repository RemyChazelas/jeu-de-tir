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

// Creating Weapon Class

class Weapon {
    constructor(x, y, radius, color, velocity, damage) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.damage = damage;
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

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

// Creating HugeWeapon Class

class HugeWeapon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = "rgba(255,0,133,1)";
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 200, canvas.height);
    }

    update() {
        this.draw();
        this.x += 20;
    }
}