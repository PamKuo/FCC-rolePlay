let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const imageContainer = document.querySelector("#imageContainer");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

//新增SVG圖案
const images ={
  "town square": `<svg width="200" height="200" viewBox="0 0 200 200">
    <rect x="0" y="0" width="200" height="200" fill="#87CEEB"/>
    <rect x="0" y="150" width="200" height="50" fill="#228B22"/>
    <rect x="50" y="80" width="100" height="100" fill="#8B4513"/>
    <polygon points="50,80 100,20 150,80" fill="#A52A2A"/>
    <rect x="80" y="130" width="40" height="50" fill="#DEB887"/>
    <circle cx="30" cy="130" r="20" fill="#228B22"/>
    <circle cx="170" cy="130" r="20" fill="#228B22"/>
  </svg>`,
  "store": `<svg width="200" height="200" viewBox="0 0 200 200">
    <rect x="40" y="60" width="120" height="100" fill="#A0522D"/>
    <rect x="60" y="90" width="30" height="40" fill="#FFDAB9"/>
    <rect x="110" y="90" width="30" height="40" fill="#FFDAB9"/>
    <rect x="85" y="140" width="30" height="20" fill="#8B4513"/>
  </svg>`,
  "cave": `<svg width="200" height="200" viewBox="0 0 200 200">
    <path d="M20,180 Q100,60 180,180 Z" fill="#555"/>
    <circle cx="60" cy="140" r="10" fill="#FFF" opacity="0.2"/>
    <circle cx="130" cy="160" r="8" fill="#FFF" opacity="0.2"/>
  </svg>`,
  "fight": `<svg width="200" height="200" viewBox="0 0 200 200">
    <line x1="30" y1="170" x2="170" y2="30" stroke="#000" stroke-width="10"/>
    <polygon points="170,30 140,30 170,60" fill="#000"/>
  </svg>`,
  "health": `<svg width="200" height="200" viewBox="0 0 200 200">
    <rect x="60" y="40" width="80" height="120" fill="#FF69B4"/>
    <rect x="80" y="20" width="40" height="20" fill="#FF1493"/>
    <text x="100" y="120" font-size="40" text-anchor="middle" fill="#FFF">+</text>
  </svg>`,
  "weapon": `<svg width="200" height="200" viewBox="0 0 200 200">
    <path d="M100,10 L90,190 L110,190 Z" fill="#C0C0C0"/>
    <rect x="85" y="20" width="30" height="40" fill="#8B4513"/>
    <circle cx="100" cy="20" r="15" fill="#DAA520"/>
  </svg>`,
  "slime": `<svg width="200" height="200" viewBox="0 0 200 200">
    <ellipse cx="100" cy="150" rx="80" ry="40" fill="#0F0"/>
    <circle cx="80" cy="130" r="10" fill="#FFF"/>
    <circle cx="120" cy="130" r="10" fill="#FFF"/>
  </svg>`,
  "fanged beast": `<svg width="200" height="200" viewBox="0 0 200 200">
    <path d="M50,100 Q100,50 150,100 Q100,150 50,100 Z" fill="#8B4513"/>
    <circle cx="80" cy="90" r="10" fill="#FF0000"/>
    <circle cx="120" cy="90" r="10" fill="#FF0000"/>
    <path d="M90,120 Q100,130 110,120" stroke="#000" stroke-width="3" fill="none"/>
  </svg>`,
  "dragon": `<svg width="200" height="200" viewBox="0 0 200 200">
  <path d="M100,180 Q130,120 160,180 Q130,160 100,180 Q70,160 40,180 Q70,120 100,180 Z" fill="#FF4500"/>
  <path d="M100,180 Q120,140 140,180 Q120,165 100,180 Q80,165 60,180 Q80,140 100,180 Z" fill="#FFA500"/>
  <path d="M100,180 Q110,160 120,180 Q110,170 100,180 Q90,170 80,180 Q90,160 100,180 Z" fill="#FFFF00"/>
</svg>`
};

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;

  //更新圖案
  imageContainer.innerHTML = images[location.name] || "";
}

function goTown() {
  update(locations[0]);
  imageContainer.innerHTML = images["town square"];
}

window.onload = goTown; //一進入畫面就有圖案

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You have bought health.";
    imageContainer.innerHTML = images["health"];
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      imageContainer.innerHTML = images["weapon"];
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  imageContainer.innerHTML = images[monsters[fighting].name.toLowerCase()];
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}