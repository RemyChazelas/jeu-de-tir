// Basic Environment Setup

const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
const lightWeaponDamage = 10;
const heavyWeaponDamage = 20;
let difficulty = 2;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
let playerScore = 0;

// Event Listener for Difficulty form
// document.querySelector("input").addEventListener("click", (e) => {
//     e.preventDefault();

// making form invisible
form.style.display = "none";

// making scoreBoard visble
scoreBoard.style.display = "block";

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

// -------------------------------------------------Main Logic Here -------------------------------------------

// Creating Player Object, Weapons Array, Enemy Array, Etc Array
const remy = new Player(playerPosition.x, playerPosition.y, 15, "white");

// ------------------------------------------------Creating Animation Function ---------------------------------------

let animationId;
function animation() {
    // Making Recursion
    animationId = requestAnimationFrame(animation);

    // Updating Player Score in Score board in html
    scoreBoard.innerHTML = `Score : ${playerScore}`;

    // Clearing canvas on each frame
    context.fillStyle = "rgba(49, 49, 49,0.2)";

    context.fillRect(0, 0, canvas.width, canvas.height);

    // Drawing Player
    remy.draw();

    // Generating Particles
    particles.forEach((particle, particleIndex) => {
        if (particle.aplha <= 0) {
            particles.splice(particleIndex, 1);
        } else {
            particle.update();
        }
    });

    // Generating Huge Weapon
    hugeWeapons.forEach((hugeWeapon, hugeWeaponIndex) => {
        if (hugeWeapon.x > canvas.width) {
            hugeWeapons.splice(hugeWeaponIndex, 1);
        } else {
            hugeWeapon.update();
        }
    });
    //   Generating Bullets
    weapons.forEach((weapon, weaponIndex) => {
        weapon.update();

        // Removing Weapons if they are off screen
        if (
            weapon.x + weapon.radius < 1 ||
            weapon.y + weapon.radius < 1 ||
            weapon.x - weapon.radius > canvas.width ||
            weapon.y - weapon.radius > canvas.height
        ) {
            weapons.splice(weaponIndex, 1);
        }
    });

    //  Generating enemies
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();

        // Finding Distance between player and enemy
        const distanceBetweenPlayerAndEnemy = Math.hypot(
            remy.x - enemy.x,
            remy.y - enemy.y
        );

        // Stoping Game if enemy hit player
        if (distanceBetweenPlayerAndEnemy - remy.radius - enemy.radius < 1) {
            cancelAnimationFrame(animationId);
            gameOverSound.play();
            hugeWeaponSound.pause();
            shootingSound.pause();
            heavyWeaponSound.pause();
            killEnemySound.pause();
            return gameoverLoader();
        }

        hugeWeapons.forEach((hugeWeapon) => {
            // Finding Distance between Huge weapon and enemy
            const distanceBetweenHugeWeaponAndEnemy = hugeWeapon.x - enemy.x;

            if (
                distanceBetweenHugeWeaponAndEnemy <= 200 &&
                distanceBetweenHugeWeaponAndEnemy >= -200
            ) {
                // increasing player Score when killing one enemy
                playerScore += 10;
                setTimeout(() => {
                    killEnemySound.play();
                    enemies.splice(enemyIndex, 1);
                }, 0);
            }
        });
        weapons.forEach((weapon, weaponIndex) => {
            // Finding Distance between weapon and enemy
            const distanceBetweenWeaponAndEnemy = Math.hypot(
                weapon.x - enemy.x,
                weapon.y - enemy.y
            );

            if (distanceBetweenWeaponAndEnemy - weapon.radius - enemy.radius < 1) {
                killEnemySound.play();

                // Reducing Size of enemy on hit
                if (enemy.radius > weapon.damage + 8) {
                    gsap.to(enemy, {
                        radius: enemy.radius - weapon.damage,
                    });
                    setTimeout(() => {
                        weapons.splice(weaponIndex, 1);
                    }, 0);
                }
                // Removing enemy on hit if they are below 18
                else {
                    for (let i = 0; i < enemy.radius * 3; i++) {
                        particles.push(
                            new Particle(weapon.x, weapon.y, Math.random() * 2, enemy.color, {
                                x: (Math.random() - 0.5) * (Math.random() * 7),
                                y: (Math.random() - 0.5) * (Math.random() * 7),
                            })
                        );
                    }
                    // increasing player Score when killing one enemy
                    playerScore += 10;

                    // Rendering player Score in scoreboard html element
                    scoreBoard.innerHTML = `Score : ${playerScore}`;
                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1);
                        weapons.splice(weaponIndex, 1);
                    }, 0);
                }
            }
        });
    });
}