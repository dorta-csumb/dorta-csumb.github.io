

let hp = 10, hunger = 6, thirst = 6, kills = 0, turnsLeft = 8, zombieHP = 2, gameOver = false;

// Arrays (rubric)
let inv = [];
let loot = ["cloth", "water", "snack", "metal"];

// these are DOM elements
let hpSpan = document.querySelector("#hp");
let hungerSpan = document.querySelector("#hunger");
let thirstSpan = document.querySelector("#thirst");
let killsSpan = document.querySelector("#kills");
let turnsSpan = document.querySelector("#turnsLeft");
let logP = document.querySelector("#log");
let invList = document.querySelector("#invList");
let sceneImg = document.querySelector("#sceneImg");

let punchBtn = document.querySelector("#punchBtn");
let lootBtn = document.querySelector("#lootBtn");
let drinkBtn = document.querySelector("#drinkBtn");
let eatBtn = document.querySelector("#eatBtn");
let craftBtn = document.querySelector("#craftBtn");
let resetBtn = document.querySelector("#resetBtn");

// Images
let imgStart = "image/classroom-zombie.png";
let imgFight = "image/fight.png";
let imgLoot  = "image/loot.png";
let imgCraft = "image/craft.png";
let imgWin   = "image/win.png";
let imgLose  = "image/lose.png";

function updateScreen() {
  hpSpan.textContent = hp;
  hungerSpan.textContent = hunger;
  thirstSpan.textContent = thirst;
  killsSpan.textContent = kills;
  turnsSpan.textContent = turnsLeft;

  hpSpan.style.color = (hp <= 3) ? "red" : "lightgreen";
  hungerSpan.style.color = (hunger <= 1) ? "orange" : "lightgreen";
  thirstSpan.style.color = (thirst <= 1) ? "orange" : "lightgreen";

  // the below doesn't need to be a loop, but it is easier to read and extend if we want to add more inventory items later
  if (inv.length == 0) {
    invList.innerHTML = '<li class="emptyInv">Empty</li>'; // show "Empty" if no items.
  } else {
    let html = "";
    for (let i = 0; i < inv.length; i++) {
      html += "<li>" + inv[i] + "</li>";
    }
    invList.innerHTML = html;
  }
}

function writeLog(msg) {
  logP.textContent = msg;
}

function randLoot() {
  let i = Math.floor(Math.random() * loot.length);
  return loot[i];
}

function hasItem(name) {
  return inv.indexOf(name) != -1;
}

function removeItem(name) {
  let i = inv.indexOf(name);
  if (i != -1) inv.splice(i, 1);
}

function setImg(primary) {
  // If the optional image doesn't exist, just show the start image
  sceneImg.onerror = function () { sceneImg.src = imgStart; };
  sceneImg.src = primary;
}

function disablePlayButtons() {
  punchBtn.disabled = true;
  lootBtn.disabled = true;
  drinkBtn.disabled = true;
  eatBtn.disabled = true;
  craftBtn.disabled = true;
}

function endTurn() {
  turnsLeft--;
  hunger--;
  thirst--;

  if (hunger < 0) hunger = 0;
  if (thirst < 0) thirst = 0;

  if (hunger == 0) hp -= 1;
  if (thirst == 0) hp -= 2;

  // End checks
  if (kills >= 3) {
    gameOver = true;
    setImg(imgWin);
    writeLog("YOU WIN! You defeated 3 zombies and escape!");
    disablePlayButtons();
  } else if (hp <= 0) {
    gameOver = true;
    setImg(imgLose);
    writeLog("GAME OVER! You ran out of HP.");
    disablePlayButtons();
  } else if (turnsLeft <= 0) {
    gameOver = true;
    setImg(imgLose);
    writeLog("GAME OVER! You ran out of time.");
    disablePlayButtons();
  }

  updateScreen();
}

// actions 

function punchZombie() {
  if (gameOver) return;

  setImg(imgFight);

  // 70% hit
  if (Math.random() < 0.70) {
    zombieHP--;

    if (zombieHP == 0) {
      kills++;
      zombieHP = 2;

      let drop = randLoot();
      inv.push(drop);

      writeLog("You punch the zombie jerk!\nZombie defeated!\nIt drops: " + drop);
    } else {
      writeLog("You hit the zombie jerk! Zombie HP left: " + zombieHP);
    }
  } else {
    hp--;
    writeLog("You miss! The jerk zombie hits you back! (-1 HP)");
  }

  endTurn();
}

function lootDesk() {
  if (gameOver) return;

  setImg(imgLoot);

  let found = randLoot();
  inv.push(found);

  if (Math.random() < 0.25) {
    hp--;
    writeLog("You loot a desk and find: " + found + "\nA zombie scratches you! (-1 HP)");
  } else {
    writeLog("You loot a desk and find: " + found);
  }

  endTurn();
}

function drinkWater() {
  if (gameOver) return;

  if (hasItem("water")) {
    removeItem("water");
    thirst += 3;
    if (thirst > 6) thirst = 6;
    writeLog("You drink water. (+3 Thirst)");
  } else {
    writeLog("You have no water.");
  }

  endTurn();
}

function eatSnack() {
  if (gameOver) return;

  if (hasItem("snack")) {
    removeItem("snack");
    hunger += 3;
    if (hunger > 6) hunger = 6;
    writeLog("You eat a snack. (+3 Hunger)");
  } else {
    writeLog("You have no snack.");
  }

  endTurn();
}

function craftBandage() {
  if (gameOver) return;

  setImg(imgCraft);

  if (hasItem("cloth") && hasItem("metal")) {
    removeItem("cloth");
    removeItem("metal");
    inv.push("bandage");
    writeLog("You craft a bandage (cloth + metal).");
  } else if (hasItem("bandage")) {
    removeItem("bandage");
    hp += 3;
    if (hp > 10) hp = 10;
    writeLog("You use a bandage. (+3 HP)");
  } else {
    writeLog("Craft needs cloth + metal.\nOr use a bandage if you have one.");
  }

  endTurn();
}

function resetGame() {
  hp = 10; hunger = 6; thirst = 6; kills = 0; turnsLeft = 8; zombieHP = 2; gameOver = false;
  inv = [];

  punchBtn.disabled = false;
  lootBtn.disabled = false;
  drinkBtn.disabled = false;
  eatBtn.disabled = false;
  craftBtn.disabled = false;

  setImg(imgStart);
  writeLog("You wake up in a wrecked classroom. A zombie is between you and the door.");
  updateScreen();
}

// Event listeners
punchBtn.addEventListener("click", punchZombie);
lootBtn.addEventListener("click", lootDesk);
drinkBtn.addEventListener("click", drinkWater);
eatBtn.addEventListener("click", eatSnack);
craftBtn.addEventListener("click", craftBandage);
resetBtn.addEventListener("click", resetGame);

// Start
setImg(imgStart);
updateScreen();