let enemy;

function Enemy(enemyType, health, strenght, resistance, agility, speed) {
    this.enemyType = enemyType;
    this.health = health;
    this.strenght = strenght;
    this.resistance = resistance;
    this.agility = agility;
    this.speed = speed;
}

let enemyBlocking = [0, 0, 0];
let enemyPowerup = [0, 0, 0, 0, 0, 0, 0];
let enemyPowerupDelay = 0;
 
let EnemyMoves = {
    calcAttack: function () {
        let enemyAttack = function () {
            let calcBaseDamage;
            calcBaseDamage = Math.floor((enemy.strenght * (enemy.agility / 1000) - playerBlocking[0]));
            console.log("NOR: ", calcBaseDamage);
            console.log("NONE: ", calcBaseDamage + playerBlocking[0]);
            //console.log(Math.floor(enemy.strenght * (enemy.agility / 1000)));
            //console.log(Math.floor((enemy.strenght + Math.floor(enemyPowerup[6]) * 1.2) * (enemy.agility / 1000)));
            if (calcBaseDamage < 1) {
                calcBaseDamage = 1;
            }
            calcBaseDamage = Math.floor(calcBaseDamage + Math.floor(enemyPowerup[6]) * 0.5);
            console.log(calcBaseDamage);
            
            
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            console.log(offsetDamage);
            
            let calcOutputDamage = calcBaseDamage + offsetDamage;
            // Number of hits
            let random = Math.min(Math.max(Math.random(), 0.1), 0.75);
            let numberOfHits = Math.max(Math.floor(random * Math.floor(enemy.agility / 15) + Math.floor(enemyPowerup[6] / 10)) / Math.max(playerBlocking[0] * 10, 1), 1);
            if (numberOfHits < 1) {
                console.log(numberOfHits < 1);
                numberOfHits = 1;
            }
            console.log(numberOfHits < 1);
            
            console.log(numberOfHits);
            
            //console.log(Math.floor(random * Math.floor(enemy.agility / 15)));
            //console.log(Math.floor(random * Math.floor(enemy.agility / 15) + Math.floor(enemyPowerup[6] / 10)));
            //console.log(numberOfHits);
            
            
            let attackValues = [calcOutputDamage, numberOfHits];
            console.log(attackValues);
            
            return attackValues;
        }
        // Get PLayer/Enemy health to change later
        let getPlayerHealth = document.querySelector(".health-player");
        
        // Initiate attacks
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
    },
    calcBlock: function (type) {
        let setBlocking = function () {
            enemyBlocking[0] = Math.min(Math.max(Math.max(Math.floor(Math.random() * Math.floor((enemy.agility * enemy.resistance) / 100)), 2), 5), 30);
            enemyBlocking[1] = Math.floor(Math.random() * Math.floor(2)) + 1;
            enemyBlocking[2] = Math.floor(Math.random() * Math.floor(3)) + 1;
            if (!enemyBlocking[1] < enemyBlocking[2]) {
                enemyBlocking[2] = enemyBlocking[1] + 1;
            }
            console.log(enemyBlocking[0]);
            console.log(enemyBlocking[1]);
            console.log(enemyBlocking[2]);
        }
        let manageBlocking = function () {
            enemyBlocking[1]--;
            if (enemyBlocking[2 > 0]) {
                enemyBlocking[2]--;
            }
            if (enemyBlocking[1] <= 0) {
                enemyBlocking[0] = 0;
                enemyBlocking[1] = 0;
            }
        }
        let checkBlocking = function () {
            if (enemyBlocking[2] <= 0) {
                return true;
            } else {
                return false;
            }
        }
        
        switch (type) {
            case "set":
                setBlocking();
                break;
            case "manage":
                manageBlocking();
                break;
            case "check":
                return checkBlocking();
                break;
        }
    },
    calcPowerup: function (type) {
        let createPowerup = function () {
            let enemyPowerupStrenght = Math.floor(Math.random() * Math.floor((enemy.strenght / 8) + (enemy.agility / 5))) + 1;
            let enemyPowerupLenght = Math.floor(Math.random() * Math.floor(enemy.agility / 25)) + 1;
            if (enemyPowerupLenght < 2) {
                enemyPowerupLenght = 2;
            }
            console.log(enemyPowerupStrenght);
            console.log(enemyPowerupLenght);
            

            if (enemyPowerup[0] === 0) {
                enemyPowerup[0] = enemyPowerupStrenght;
                enemyPowerup[3] = enemyPowerupLenght;
                console.log("Powerup 1");
            } else if (enemyPowerup[1] === 0) {
                enemyPowerup[1] = enemyPowerupStrenght;
                enemyPowerup[4] = enemyPowerupLenght;
                console.log("Powerup 2");
            } else if (enemyPowerup[2] === 0) {
                enemyPowerup[2] = enemyPowerupStrenght;
                enemyPowerup[5] = enemyPowerupLenght;
                console.log("Powerup 3");
            } else {
                alert("ERROR")
                location.reload();
            }

            enemyPowerup[6] = enemyPowerup[0] + enemyPowerup[1] + enemyPowerup[2];
            enemyPowerupDelay = 3;
            console.log(enemyPowerupDelay);
            console.log(checkIfCanCreatePowerup());
            
            
        }
        let managePowerup = function () {
            console.log(enemyPowerup);
            
            console.log(enemyPowerupDelay);
            
            console.log("OLD >> " + enemyPowerup);
            if (enemyPowerup[3] !== 0) {
                enemyPowerup[3]--;
                if (enemyPowerup[3] === 0) {
                    enemyPowerup[0] = 0;
                }
            }
            if (enemyPowerup[4] !== 0) {
                enemyPowerup[4]--;
                if (enemyPowerup[4] === 0) {
                    enemyPowerup[1] = 0;
                }
            }
            if (enemyPowerup[5] !== 0) {
                enemyPowerup[5]--;
                if (enemyPowerup[5] === 0) {
                    enemyPowerup[2] = 0;
                }
            }
            if (enemyPowerupDelay !== 0) {
                console.log(enemyPowerup[7]);
                
                enemyPowerupDelay--;
                console.log("?");
                
            }
            enemyPowerup[6] = enemyPowerup[0] + enemyPowerup[1] + enemyPowerup[2];
            console.log("NEW >> " + enemyPowerup);
        }
        let checkIfCanCreatePowerup = function () {
            if (( enemyPowerup[0] === 0 || enemyPowerup[1] === 0 || enemyPowerup[2] === 0 ) && enemyPowerupDelay == 0) {
                console.log('----------------------------');
                console.log(( enemyPowerup[0] === 0 || enemyPowerup[1] === 0 || enemyPowerup[2] === 0 ) && enemyPowerupDelay == 0);
                console.log('----------------------------');
                console.log('Powerup 1: ' + enemyPowerup[0] === 0);
                console.log('Powerup 2: ' + enemyPowerup[1] === 0);
                console.log('Powerup 3: ' + enemyPowerup[2] === 0);
                console.log('Powerup Delay: ' + enemyPowerupDelay === 0);
                console.log('Powerup Delay: ' + enemyPowerupDelay);
                console.log('----------------------------');
                
                return true;
            } else {
                return false;
            }
        }

        switch (type) {
            case "create":
                createPowerup();
                break;
            case "manage":
                managePowerup();
                break;
            case "check":
                return checkIfCanCreatePowerup();
                break;
            default:
                break;
        }
    },
    
    calcMove: function () {
        EnemyMoves.calcPowerup("manage");
        EnemyMoves.calcBlock('manage');

        let maxPlayerDamage = function () {
            let calcBaseDamage;
            // Max Player Damage
            calcBaseDamage = Math.max(Math.floor((player.strenght + Math.floor(playerPowerup[6]) * 1.2) * (player.agility / 1000) - enemyBlocking[0], 1));
            if (calcBaseDamage < 1) {
                calcBaseDamage = 1;
            }
            let offsetDamage = Math.floor(0.9 * Math.floor(10));
            
            let calcOutputDamage = calcBaseDamage + offsetDamage;
            // Number of hits from Enemy
            let random = Math.min(Math.max(0.9, 0.1), 0.75);
            let numberOfHits = Math.max(Math.floor(random * Math.floor(enemy.agility / 15) + Math.floor(enemyPowerup[6] / 10)) / Math.max(enemyBlocking[0] * 10, 1), 1);
            if (numberOfHits < 1) {
                numberOfHits = 1;
            }

            return calcOutputDamage * numberOfHits;
        }
        let minEnemyDamage = function () {
            let calcBaseDamage;
            // Min Enemy Damage
            calcBaseDamage = Math.max(Math.floor((enemy.strenght + Math.floor(enemyPowerup[6]) * 1.2) * (enemy.agility / 1000) - playerBlocking[0], 1));
            if (calcBaseDamage < 1) {
                calcBaseDamage = 1;
            }
            let offsetDamage = Math.floor(0.1 * Math.floor(10));
            
            let calcOutputDamage = calcBaseDamage + offsetDamage;
            // Number of hits from Enemy
            let random = Math.min(Math.max(0.1, 0.1), 0.75);
            let numberOfHits = Math.max(Math.floor(random * Math.floor(enemy.agility / 15) + Math.floor(enemyPowerup[6] / 10)) / Math.max(playerBlocking[0] * 10, 1), 1);
            if (numberOfHits < 1) {
                numberOfHits = 1;
            }
            
            return calcOutputDamage * numberOfHits;
        }   // Calc Max Resistance of Player
            //calcBaseResistance = player.resistance * player.agility / 1000;
            //let offsetResistance = 7;
            //let calcOutputResistance = calcBaseResistance + offsetResistance;
            ///console.log("Enemy: OutputResistance > " + calcOutputResistance);

        let moveAlgo = function (maxPlayerDamage, minEnemyDamage) {            
            if (enemy.health <= maxPlayerDamage - 20) { 
                if (player.health <= minEnemyDamage + 20 && !EnemyMoves.calcBlock('check')) {
                    EnemyMoves.calcAttack();
                    console.log("attack");
                } else {
                    EnemyMoves.calcBlock('set');
                    console.log("block");
                }
            } else if (player.health <= minEnemyDamage) {
                EnemyMoves.calcAttack();
                console.log("attack");
            } else if (enemy.health > maxPlayerDamage * 2 && player.health > minEnemyDamage * 2) {
                if (enemy.health > maxPlayerDamage * 3 && player.health > minEnemyDamage * 3 && EnemyMoves.calcPowerup("check")) {
                    EnemyMoves.calcPowerup("create");
                    console.log(EnemyMoves.calcPowerup("check"));
                    
                    console.log("powerup");
                } else {                    
                    if (!EnemyMoves.calcPowerup("check")) {
                        EnemyMoves.calcAttack();
                        console.log("attack");
                    } else {
                        EnemyMoves.calcPowerup("create");
                        console.log("powerup");
                    }
                }
            } else {
                if (enemy.health > maxPlayerDamage + 150) {
                    EnemyMoves.calcAttack();
                    console.log("attack");
                } else if(EnemyMoves.calcBlock('check')) {
                    EnemyMoves.calcBlock('set');
                    console.log("block");
                } else {
                    EnemyMoves.calcAttack();
                    console.log("attack");
                }
            }
        }

        moveAlgo(maxPlayerDamage(), minEnemyDamage());

        console.log("Player: " + maxPlayerDamage());
        console.log("Enemy: " + minEnemyDamage());
    }
}