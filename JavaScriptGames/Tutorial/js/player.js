let player;

function Player(classType, health, mana, strenght, agility, speed) {
    this.classType = classType;
    this.health = health;
    this.mana = mana;
    this.strenght = strenght;
    this.agility = agility;
    this.speed = speed;
}

let PlayerMoves = {
    calcAttack: function () {    
        // Who attack first?
        let getPlayerSpeed = player.speed;
        let getEnemySpeed = enemy.speed;

        // Player attacks
        let playerAttack = function () {
            let calcBaseDamage;
            if (player.mana > 0) {
                calcBaseDamage = player.strenght * player.mana / 1000;
            } else {
                calcBaseDamage = player.strenght * player.agility / 1000;
            }
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));        
            let calcOutputDamage = calcBaseDamage + offsetDamage;   
            // Number of hits
            let numberOfHits = Math.floor(Math.random() * Math.floor(player.agility / 10) / 2) + 1;
            let attackValues = [calcOutputDamage, numberOfHits];
            return attackValues;
        }
        // Enemy attacks
        let enemyAttack = function () {
            let calcBaseDamage
            if (enemy.mana > 0) {
                calcBaseDamage = enemy.strenght * enemy.mana / 1000;
            } else {
                calcBaseDamage = enemy.strenght * enemy.agility / 1000;
            }
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            let calcOutputDamage = calcBaseDamage + offsetDamage;
            // Number of hits
            let numberOfHits = Math.floor(Math.random() * Math.floor(enemy.agility / 10) / 2) + 1;
            let attackValues = [calcOutputDamage, numberOfHits];
            return attackValues;
        }
        // Get PLayer/Enemy health to change later
        let getPlayerHealth = document.querySelector(".health-player");
        let getEnemyHealth = document.querySelector(".health-enemy");
        
        // Initiate attacks
        if (getPlayerSpeed >= getEnemySpeed) {
            let playerAttackValues = playerAttack();
            
            let totalDamage = playerAttackValues[0] * playerAttackValues[1];
            enemy.health = enemy.health - totalDamage;
        
            alert("Du hast deinem Gegner " + playerAttackValues[1] + " mal " + playerAttackValues[0] + " Schaden hinzugefügt.")
            if (enemy.health <= 0) {
                let playAgain = confirm("Gewonnen! \nNochmal spielen?");
                let changeChar;
                if (playAgain) {
                    changeChar = !confirm("Mit dem gleichem Charakter weiterspielen?")
                }
                getPlayerHealth.innerHTML = 'Leben: '  + player.health;
                getEnemyHealth.innerHTML = 'Health: 0';
                if (playAgain) {
                    if (changeChar) {
                        document.querySelector(".actions").innerHTML = "";
                        document.querySelector(".enemy").innerHTML = "";
                        GameManager.loadCharSelect();
                    } else {
                        document.querySelector(".enemy").innerHTML = "";
                        GameManager.setGameStart(player.classType);
                    }
                } else {
                    location.reload();
                }
            } else {
                getEnemyHealth.innerHTML = 'Leben: ' + enemy.health;
                // Enemy Attacks
                let enemyAttackValues = enemyAttack();
                let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
                player.health = player.health - totalDamage;
            
                alert("Dein Gegner hat dir " + playerAttackValues[1] + " mal " + playerAttackValues[0] + " Schaden hinzugefügt.")
                if (player.health <= 0) {
                    let playAgain = confirm("Verloren! \nNochmal spielen?");
                    let changeChar;
                    if (playAgain) {
                        changeChar = !confirm("Mit dem gleichem Charakter weiterspielen?")
                    }
                    getEnemyHealth.innerHTML = 'Leben: '  + enemy.health;
                    getPlayerHealth.innerHTML = 'Leben: 0';
                    if (playAgain) {
                        if (changeChar) {
                            document.querySelector(".actions").innerHTML = "";
                            document.querySelector(".enemy").innerHTML = "";
                            GameManager.loadCharSelect();
                        } else {
                            document.querySelector(".enemy").innerHTML = "";
                            GameManager.setGameStart(player.classType);
                        }
                    } else {
                        location.reload();
                    }
                } else {
                    getPlayerHealth.innerHTML = 'Leben: ' + player.health;
                }
            }
        } else if (getEnemySpeed >= getPlayerSpeed) {
            let enemyAttackValues = enemyAttack();
            
            let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
            player.health = player.health - totalDamage;
        
            alert("Dein Gegner hat dir " + enemyAttackValues[1] + " mal " + enemyAttackValues[0] + " Schaden hinzugefügt.")
            if (player.health <= 0) {
                let playAgain = confirm("Verloren! \nNochmal spielen?");
                let changeChar;
                if (playAgain) {
                    changeChar = !confirm("Mit dem gleichem Charakter weiterspielen?")
                }
                getPlayerHealth.innerHTML = 'Leben: 0';
                getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
                if (playAgain) {
                    if (changeChar) {
                        document.querySelector(".actions").innerHTML = "";
                        document.querySelector(".enemy").innerHTML = "";
                        GameManager.loadCharSelect();
                    } else {
                        document.querySelector(".enemy").innerHTML = "";
                        GameManager.setGameStart(player.classType);
                    }
                } else {
                    location.reload();
                }
            } else {
                getPlayerHealth.innerHTML = 'Leben: ' + player.health;
                // Player Attacks
                let playerAttackValues = playerAttack();
                let totalDamage = playerAttackValues[0] * playerAttackValues[1];
                enemy.health = enemy.health - totalDamage;
            
                alert("Du hast deinem Gegner " + playerAttackValues[1] + " mal " + playerAttackValues[0] + " Schaden hinzugefügt.")
                if (enemy.health <= 0) {
                    let playAgain = confirm("Gewonnen! \nNochmal spielen?");
                    let changeChar;
                    if (playAgain) {
                        changeChar = !confirm("Mit dem gleichem Charakter weiterspielen?")
                    }
                    getEnemyHealth.innerHTML = 'Leben: 0';
                    getPlayerHealth.innerHTML = 'Leben: ' + player.health;
                    if (playAgain) {
                        if (changeChar) {
                            document.querySelector(".actions").innerHTML = "";
                            document.querySelector(".enemy").innerHTML = "";
                            GameManager.loadCharSelect();
                        } else {
                            document.querySelector(".enemy").innerHTML = "";
                            GameManager.setGameStart(player.classType);
                        }
                    } else {
                        location.reload();
                    }
                } else {
                    getEnemyHealth.innerHTML = 'Leben: ' + enemy.health;
                }
            }
        }
    }
}
