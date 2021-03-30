var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    //var promptFight = "FIGHT";

    // if player chooses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight! Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney -= 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }
  
    // if player chooses to fight, then fight
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth -= playerAttack;
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );
  
    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");

      // award player money for winning
      playerMoney += 20;

      // leave while loop if enemy is dead
      break;
    }
    else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth -= enemyAttack;
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      // leave while loop if player is dead
      break;
    }
    else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
}


var startGame = function() {
  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    // debugger;
    if (playerHealth > 0) {
      // let the player know what round they're in (add 1 to loop counter)
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
      // pick a new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];
  
      // reset enemyHealth before starting new fight
      enemyHealth = 50;
  
      // pass the pickedEnemyName variable's value into the fight function
      fight(pickedEnemyName);
    }
    else {
      window.alert("You have lost your robot in battle!  Game Over!");
      break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
}


var endGame = function() {
  if (playerHealth > 0) {
    // if player is still alive, player wins!
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  }
  else {
    window.alert("You have lost your robot in battle!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

// start the game on page load
startGame();

// welcome the user, prompt for robot name
// start the game loop
  // start the rounds loop
    // give the user the option to skip this round/enemy
    // if fight...
      // play the round (fight();)
    // if the user's robot is not dead at the end of the round (or skip)...
      // give the use the option to visit the shop
      // if visitng shop...
        // give the use the option to REFILL health, UPGRADE attack, or LEAVE without purchasing anything
        // if REFILL...
          // deduct payment from playerMoney and add points to playerHealth
        // else if UPGRADE...
          // deduct payment from playerMoney and add points to playerAttack
        // else leave the shop (do nothing)
    // if the player's robot is dead or all enemies have been defeated...
      // exit the rounds loop
  // if the player's robot is alive (after the loop)...
    // show player wins, game over message
  // else (the player's robot is dead)...
    // show player died, game over message
  // ask if player wants to play again
  // if not...
    // exit the game loop
