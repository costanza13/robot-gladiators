var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyNames = ['Roberto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
  window.alert("Welcome to Robot Gladiators!");

  var promtFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  
  // if player chooses to fight, then fight
  if (promtFight === "fight" || promtFight === "FIGHT") {
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth -= playerAttack;
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );
  
    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
    }
    else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    playerHealth -= enemyAttack;
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
    }
    else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }

  // if player chooses to skip
  } else if (promtFight === "skip" || promtFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight! Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney -= 2;
    }
    // if no (false), ask question again by running fight() again
    else {
      fight();
    }

  } else {
    window.alert("You need to choose a valid option.  Try again!");
  }

}

for (var i = 0; i < enemyNames.length; i++) {
  fight(enemyNames[i]);
}