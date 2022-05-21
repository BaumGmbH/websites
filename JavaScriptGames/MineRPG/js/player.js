let player;

function Player(classType, health, strenght, resistance, agility, speed) {
    this.classType = classType;
    this.health = health;
    this.strenght = strenght;
    this.resistance = resistance;
    this.agility = agility;
    this.speed = speed;
}

let playerBlocking = [0, 0, 0];
let playerPowerup = [0, 0, 0, 0, 0, 0, 0];
let playerPowerupDelay = 0;

let PlayerMoves = {
    calcActions: function () {
        let getActions = document.querySelector(".actions");
        console.log("ACTIONS: " + getActions.innerHTML);
        console.log("BLOCKING: " + playerBlocking);
        console.log("POWERUP DELAY: " + playerPowerupDelay);
        if (playerBlocking[2] > 0 && playerPowerupDelay === 0) {
            console.log(1);
            getActions.innerHTML = '<a href="#" onClick="PlayerMoves.runMove(0, 0)">Angreifen</a><br/><a href="#" class="no-click" onClick="PlayerMoves.runMove(1, 0)">Schützen</a><br/><a href="#" onClick="PlayerMoves.runMove(2, 0)">Stärken</a>';
        } else if (playerBlocking[2] === 0 && playerPowerupDelay > 0) {
            console.log(2);
            getActions.innerHTML = '<a href="#" onClick="PlayerMoves.runMove(0, 0)">Angreifen</a><br/><a href="#" onClick="PlayerMoves.runMove(1, 0)">Schützen</a><br/><a href="#" class="no-click" onClick="PlayerMoves.runMove(2, 0)">Stärken</a>';
        } else if (playerBlocking[2] > 0 && playerPowerupDelay > 0) {
            console.log(3);
            getActions.innerHTML = '<a href="#" onClick="PlayerMoves.runMove(0, 0)">Angreifen</a><br/><a href="#" class="no-click" onClick="PlayerMoves.runMove(1, 0)">Schützen</a><br/><a href="#" class="no-click" onClick="PlayerMoves.runMove(2, 0)">Stärken</a>';
            console.log(getActions);
            
        } else {
            console.log(4);
            getActions.innerHTML = '<a href="#" onClick="PlayerMoves.runMove(0, 0)">Angreifen</a><br/><a href="#" onClick="PlayerMoves.runMove(1, 0)">Schützen</a><br/><a href="#" onClick="PlayerMoves.runMove(2, 0)">Stärken</a>';
        }
    },
    calcAttack: function () {    
        // Who attack first?
        let getPlayerSpeed = player.speed;
        let getEnemySpeed = enemy.speed;

        // Player attacks
        let playerAttack = function () {
            let calcBaseDamage;
            calcBaseDamage = Math.max(Math.floor((player.strenght + Math.floor(playerPowerup[6]) * 1.2) * (player.agility / 1000) - enemyBlocking[0], 1));
            console.log("NOR: ", calcBaseDamage);
            console.log("NONE: ", calcBaseDamage + enemyBlocking[0]);
            
            //console.log(Math.floor(player.strenght * (player.agility / 1000)));
            //console.log(Math.floor((player.strenght + Math.floor(playerPowerup[6]) * 1.2) * (player.agility / 1000)));
            if (calcBaseDamage < 1) {
                calcBaseDamage = 1;
            }

            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            //console.log(offsetDamage);
            
            let calcOutputDamage = calcBaseDamage + offsetDamage;
            // Number of hits
            let random = Math.min(Math.max(Math.random(), 0.1), 0.75);
            let numberOfHits = Math.max(Math.floor(random * Math.floor(player.agility / 15) + Math.floor(playerPowerup[6] / 10)) / Math.max(enemyBlocking[0] * 10, 1), 1);
            if (numberOfHits < 1) {
                numberOfHits = 1;
            }
            console.log(numberOfHits < 1);
            
            console.log(numberOfHits);
            
            
            //console.log(Math.floor(random * Math.floor(player.agility / 15)));
            //console.log(Math.floor(random * Math.floor(player.agility / 15) + Math.floor(playerPowerup[6] / 10)));
            
            let attackValues = [calcOutputDamage, numberOfHits];
            console.log(attackValues);
            
            return attackValues;
        }
        // Get PLayer/Enemy health to change later
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
                getEnemyHealth.innerHTML = 'Leben: 0';
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
                getEnemyHealth.innerHTML = "Leben: " + enemy.health;
                this.calcActions();
                this.calcPowerup('manage');
                this.calcBlock('manage');
            }
        } else if (getEnemySpeed >= getPlayerSpeed) {
            this.calcActions();
            this.calcPowerup('manage');
            this.calcBlock('manage');
        }
    },
    calcBlock: function (type) {
        let setBlocking = function () {
            playerBlocking[0] = Math.min(Math.max(Math.max(Math.floor(Math.random() * Math.floor((player.agility * player.resistance) / 100)), 2), 5), 30);
            playerBlocking[1] = Math.floor(Math.random() * Math.floor(2)) + 1;
            playerBlocking[2] = Math.floor(Math.random() * Math.floor(3)) + 1;
            if (!playerBlocking[1] < playerBlocking[2]) {
                playerBlocking[2] = playerBlocking[1] + 1;
            }
            console.log(playerBlocking[0]);
            console.log(playerBlocking[1]);
            console.log(playerBlocking[2]);
        }
        let manageBlocking = function () {
            playerBlocking[1]--;
            if (playerBlocking[2] > 0) {
                playerBlocking[2]--;
            }
            if (playerBlocking[1] <= 0) {
                playerBlocking[0] = 0;
                playerBlocking[1] = 0;
            }
        }

        switch (type) {
            case "set": case 0:
                setBlocking();
                break;
            case "manage": case 1:
                manageBlocking();
                break;
        }

        PlayerMoves.calcActions();
        PlayerMoves.calcPowerup('manage');
    },
    calcPowerup: function (type) {
        let createPowerup = function () {
            let playerPowerupStrenght = Math.floor(Math.random() * Math.floor((player.strenght / 8) + (player.agility / 8))) + 1;
            let playerPowerupLenght = Math.floor(Math.random() * Math.floor(enemy.agility / 25) + 1);
            playerPowerupDelay = Math.floor(Math.random() * Math.floor(4)) + 3; 

            if (playerPowerup[0] === 0) {
                playerPowerup[0] = playerPowerupStrenght;
                playerPowerup[3] = playerPowerupLenght;
            } else if (enemyPowerup[1] === 0) {
                playerPowerup[1] = playerPowerupStrenght;
                playerPowerup[4] = playerPowerupLenght;
            } else if (enemyPowerup[2] === 0) {
                playerPowerup[2] = playerPowerupStrenght;
                playerPowerup[5] = playerPowerupLenght;
            } else {
                alert("ERROR")
                location.reload();
            }
            console.log(playerPowerup);
            playerPowerup[6] = playerPowerup[0] + playerPowerup[1] + playerPowerup[2];
            console.log(playerPowerupDelay);
        }
        let managePowerup = function () {
            console.log("OLD >> " + playerPowerup);
            if (playerPowerup[3] !== 0) {
                playerPowerup[3]--;
                if (playerPowerup[3] === 0) {
                    playerPowerup[0] = 0;
                }
            }
            if (playerPowerup[4] !== 0) {
                playerPowerup[4]--;
                if (playerPowerup[4] === 0) {
                    playerPowerup[1] = 0;
                }
            }
            if (playerPowerup[5] !== 0) {
                playerPowerup[5]--;
                if (playerPowerup[5] === 0) {
                    playerPowerup[2] = 0;
                }
            }

            if (playerPowerupDelay > 0) {
                playerPowerupDelay--;
                console.log("NAGUT");
                
            }
            PlayerMoves.calcActions();
            playerPowerup[6] = playerPowerup[0] + playerPowerup[1] + playerPowerup[2];
            console.log("NEW P>> " + playerPowerup);
        }
        let checkIfCanCreatePowerup = function () {
            if ((playerPowerup[0] === 0 || playerPowerup[1] === 0 || playerPowerup[2] === 0) && playerPowerupDelay === 0) {
                this.calcActions();
                return true;
            } else {
                return false;
            }
        }

        switch (type) {
            case "create": case 0:
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

        PlayerMoves.calcActions();
        console.log("CALC MOVE");
    },
    runMove: function (action, type) {
        switch (action) {
            case "attack": case 0:
                PlayerMoves.calcAttack();
                console.log("Attack");
                break;
            case "block": case 1:
                PlayerMoves.calcBlock(type);
                console.log("Block");
                break;
            case "powerup": case 2:
                PlayerMoves.calcPowerup(type);
                console.log("Powerup");
                break;
        }
        EnemyMoves.calcMove();
    }
}