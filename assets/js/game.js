/* Robot Gladiator! */

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}


var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player picks "skip" confirm and then stop the loop
  if (promptFight.toLowerCase() === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerInfo.money for skipping
      playerInfo.money = playerInfo.money - 10;
      
      // return true if player wants to leave
      return true;
    }
  }

  return false;
}


var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;
  if (Math.random() < 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      // if player chooses to fight, then fight
      // generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
      
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );
    
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money += 20;

        // leave while loop if enemy is dead
        break;
      }
      else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
    }
    else {
      // generate random damage value based on enemy's attack power
      var damage = randomNumber(enemy.attack -3, enemy.attack);

      // remove players's health by subtracting the amount set in the enemy.attack variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while loop if player is dead
        break;
      }
      else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }

    // next turn
    isPlayerTurn = !isPlayerTurn;
  }
};


var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 1 for REFILL, 2 for UPGRADE or 3 for LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};


var startGame = function() {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // let the player know what round they're in (add 1 to loop counter)
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
      // pick a new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];
  
      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      console.log('player ', playerInfo);
      console.log('enemy ', pickedEnemyObj);

      // pass the pickedEnemyName variable's value into the fight function
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over. Visit the store before the next round?");

        // if yes, call the shop function
        if (storeConfirm) {
          shop();
        }
      }
    }
    else {
      window.alert("You have lost your robot in battle!  Game Over!");
      break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};


var endGame = function() {
  if (playerInfo.health > 0) {
    // if player is still alive, player wins!
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You have lost your robot in battle!");
  }

  // fetch the current high score info
  var currentHighScore = window.localStorage.getItem("rgHighScore");
  var currentHighScoreHolder = '<nobody>';
  // if there no current high score, set it to -1
  if (typeof(currentHighScore) == 'undefined') {
    currentHighScore = -1;
  }
  // otherwise, fetch the high score holder's name
  else {
    currentHighScoreHolder = window.localStorage.getItem("rgHighScoreName");
  }
  
  // if the player's score is higher than the current high score, set the new high score info
  if (playerInfo.money > currentHighScore) {
    window.localStorage.setItem("rgHighScore", playerInfo.money);
    window.localStorage.setItem("rgHighScoreName", playerInfo.name);
    window.alert("Congratulations! You set a new HIGH SCORE!");
  }
  else {
    window.alert(playerInfo.name + "'s score of " + playerInfo.money + " did not beat " + currentHighScoreHolder + "'s high score of " + currentHighScore);
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
};


// function to set name
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = window.prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

// initialize variables and start the game on page load
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  }
}

var enemyInfo = [
  {
    name: 'Roborto',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Amy Android',
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];


startGame();
