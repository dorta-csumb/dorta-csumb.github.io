// global stuff that we need to track
let playerX = 50;
let playerY = 180;

let health = 100;
let hunger = 100;
let thirst = 100;
let xp = 0;

let zombie1X = 245, zombie1Y = 20, zombie1HP = 30, zombie1Alive = true, zombie1Timer = null;
let zombie2X = 430, zombie2Y = 200, zombie2HP = 30, zombie2Alive = true, zombie2Timer = null;
let zombie3X = 240, zombie3Y = 230, zombie3HP = 30, zombie3Alive = true, zombie3Timer = null;

let inventory = [];

// doms help us select elements and stuff
function $(sel) {
    return document.querySelector(sel);
}

function updatePlayerPosition() {
    let p = $("#player");
    p.style.left = playerX + "px";
    p.style.top = playerY + "px";
}

function updateBars() {
    $("#healthBar").style.width = health + "%";
    $("#hungerBar").style.width = hunger + "%";
    $("#thirstBar").style.width = thirst + "%";
    $("#xpBar").style.width = xp + "%";
}

function updateInventory() {
    let list = $("#inventoryList");
    list.textContent = "";
    for (let i = 0; i < inventory.length; i++) {
        let li = document.createElement("li");
        li.textContent = inventory[i];
        list.appendChild(li);
    }
}

function logMessage(msg) {
    let log = $("#log");
    log.textContent += msg + "\n";
    log.scrollTop = log.scrollHeight;
}

// distance and range keep us from repeating code for each zombie
function distance(ax, ay, bx, by) {
    let dx = ax - bx;
    let dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
}

function isZombie1InRange() {
    return distance(playerX, playerY, zombie1X, zombie1Y) < 60 && zombie1Alive;
}
function isZombie2InRange() {
    return distance(playerX, playerY, zombie2X, zombie2Y) < 60 && zombie2Alive;
}
function isZombie3InRange() {
    return distance(playerX, playerY, zombie3X, zombie3Y) < 60 && zombie3Alive;
}

// Zombie attacks: 
// if the player is close, start a timer that damages them every 1.5 seconds. 
// If they move away, stop the timer.
function startZombie1Attack() {
    if (zombie1Timer != null) return;
    zombie1Timer = setInterval(function () {
        health -= 5;
        logMessage("Zombie 1 claws you!");
        updateBars();
        checkPlayerDeath();
    }, 1500);
}
function stopZombie1Attack() {
    if (zombie1Timer == null) return;
    clearInterval(zombie1Timer);
    zombie1Timer = null;
}

function startZombie2Attack() {
    if (zombie2Timer != null) return;
    zombie2Timer = setInterval(function () {
        health -= 5;
        logMessage("Zombie 2 bites at you!");
        updateBars();
        checkPlayerDeath();
    }, 1500);
}
function stopZombie2Attack() {
    if (zombie2Timer == null) return;
    clearInterval(zombie2Timer);
    zombie2Timer = null;
}

function startZombie3Attack() {
    if (zombie3Timer != null) return;
    zombie3Timer = setInterval(function () {
        health -= 5;
        logMessage("Zombie 3 lunges!");
        updateBars();
        checkPlayerDeath();
    }, 1500);
}
function stopZombie3Attack() {
    if (zombie3Timer == null) return;
    clearInterval(zombie3Timer);
    zombie3Timer = null;
}

// zombie proximity check: 
// if the player is close enough to a zombie, start its attack. 
// If not, stop it. We call this every time the player moves.
function checkZombies() {
    if (isZombie1InRange()) startZombie1Attack(); else stopZombie1Attack();
    if (isZombie2InRange()) startZombie2Attack(); else stopZombie2Attack();
    if (isZombie3InRange()) startZombie3Attack(); else stopZombie3Attack();
}

// kill zombies: 
// hide them, give xp, log a message, and update bars. 
// Called when a zombie's HP hits 0.
function killZombie1() {
    zombie1Alive = false;
    $("#zombie1").style.display = "none";
    xp += 20;
    logMessage("Zombie 1 down!");
    updateBars();
    checkWin(); // check if all zombies are dead after killing one
}
function killZombie2() {
    zombie2Alive = false;
    $("#zombie2").style.display = "none";
    xp += 20;
    logMessage("Zombie 2 down!");
    updateBars();
    checkWin(); // check if all zombies are dead after killing one
}
function killZombie3() {
    zombie3Alive = false;
    $("#zombie3").style.display = "none";
    xp += 20;
    logMessage("Zombie 3 down!");
    updateBars();
    checkWin(); // check if all zombies are dead after killing one
}

// Player movement: straigtforward WASD to move. 
// After moving, update position and check zombies.
document.addEventListener("keydown", function (event) {
    if (event.key == "w") playerY -= 10;
    if (event.key == "s") playerY += 10;
    if (event.key == "a") playerX -= 10;
    if (event.key == "d") playerX += 10;
    updatePlayerPosition();
    checkZombies();
});

// attack button: 
// if a zombie is in range, damage it.
// `$` exactly means "select element". We check each zombie, and if we hit one, we log a message.
// so when `$` is used on an element (in this case, the attack button), 
// it means "select the attack button element from the DOM".
// we use `$` instead of `document.querySelector` precisely 
// because what it does is shorthand for selecting elements by their CSS selectors.
// which is super convenient and makes the code cleaner and easier to read.
$("#attackBtn").addEventListener("click", function () {
    hunger -= 3;
    thirst -= 3;
    let hit = false;

    if (isZombie1InRange()) {
        zombie1HP -= 10;
        hit = true;
        if (zombie1HP <= 0 && zombie1Alive) killZombie1();
    }
    if (isZombie2InRange()) {
        zombie2HP -= 10;
        hit = true;
        if (zombie2HP <= 0 && zombie2Alive) killZombie2();
    }
    if (isZombie3InRange()) {
        zombie3HP -= 10;
        hit = true;
        if (zombie3HP <= 0 && zombie3Alive) killZombie3();
    }

    if (hit) logMessage("You swing your weapon!");
    else logMessage("You swing at empty air...");

    updateBars();
    checkPlayerDeath();
});



// Loot containers: 
// when clicked, add an item to inventory, log a message, and update the inventory display.
// `$` is used to select the container elements by their IDs 
// (desk, fridge, trash) and attach click event listeners to them.
$("#desk").addEventListener("click", function () {
    inventory.push("carrots");
    logMessage("You found carrots.");
    updateInventory();
});
$("#fridge").addEventListener("click", function () {
    inventory.push("water");
    logMessage("You found water.");
    updateInventory();
});
$("#trash").addEventListener("click", function () {
    inventory.push("metal scrap");
    logMessage("You found metal scrap.");
    updateInventory();
});

// craft button:
// if the player has the right items, log a crafting message. 
// If not, log a failure message.
$("#craftBtn").addEventListener("click", function () {
    let hasMetal = inventory.indexOf("metal scrap") != -1;
    let hasCarrots = inventory.indexOf("carrots") != -1;
    if (hasMetal && hasCarrots) {
        logMessage("You wrap metal around a bat. Club crafted.");
    } else {
        logMessage("You don't have the right parts.");
    }
});

// reset button: 
// reloads the page to start fresh.
$("#resetBtn").addEventListener("click", function () {
  location.reload();
});



// player death, bro: 
// when health hits 0, log a death message and stop the game.
function checkPlayerDeath() {
    if (health <= 0) {
        health = 0;
        updateBars();
        logMessage("You died. Refresh to try again.");
    }
}

function checkWin() { 
    if (!zombie1Alive && !zombie2Alive && !zombie3Alive) { 
        logMessage("All zombies defeated! You win!"); 
    } 
}

// initial setup: 
// this runs when the page loads. 
// We set player position, update bars and inventory, and log a starting message.
updatePlayerPosition();
updateBars();
updateInventory();
logMessage("Use W A S D to move. Click containers to loot. Attack when close.");
