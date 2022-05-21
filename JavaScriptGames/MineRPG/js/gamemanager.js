let GameManager = {
    loadCharSelect: function () {
        getHeader = document.querySelector(".header");
        getInterface = document.querySelector(".interface");
        getChatSelect = document.querySelector(".char-select").innerHTML;

        getHeader.innerHTML = '<h1>MineRPG</h1><p>Ein RPG Karten Spiel mit Minecraft</p><h2>Wähle einen Charakter!</h2>';
        getInterface.innerHTML = getChatSelect;
        getInterface.classList.remove('start')
        getInterface.classList.add('char-select')
    },
    setGameStart: function (classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },
    resetPlayer: function (classType) {
        playerBlocking = [0, 0, 0];
        enemyBlocking = [0, 0, 0];
        playerPowerup = [0, 0, 0, 0, 0, 0, 0];  
        enemyPowerup = [0, 0, 0, 0, 0, 0, 0];
        switch (classType) {
            case "Creeper":
                player = new Player(classType, 12000, 80, 60, 150, 130);
                break;
        
            default:
                break;
        }
        let getInterface = document.querySelector(".interface");

        getInterface.innerHTML = '<img src="img/' + classType.toLowerCase() + '.png"><div><h3>' + classType + '</h3><p><p class="health-player">Leben: ' + player.health + '</p><p>Stärke: ' + player.strenght + '</p><p>Resistenz: ' + player.resistance +  '</p><p>Geschicklichkeit: ' + player.agility + '</p><p>Geschwindigkeit: ' + player.speed + '</p></div>';
    },
    setPreFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");

        getHeader.innerHTML = '<h2>Aufgabe: Finde einen Gegner</h2>';
        getActions.innerHTML = '<a href="#" onClick="GameManager.setFight()">Gegner suchen!</a>';
    },
    setFight: function () {
        let getHeader = document.querySelector(".header");  
        let getActions = document.querySelector(".actions");
        let getEnemy = document.querySelector(".enemy");

        // Create Enemy //

        let enemyZombie = new Enemy("Zombie", 17000, 70, 80, 90, 100);
        enemy = enemyZombie;
        /*let chooseRandomEnemy = Math.floor(Math.random * Math.floor(2))

        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemyZombie;
                break
            case 1:
                enemy = enemy...;
        }*/

        getHeader.innerHTML = '<h2>Wähle eine Aktions!</h2>';
        getActions.innerHTML = '<a href="#" onClick="PlayerMoves.runMove(0, 0)">Angreifen</a><br/><a href="#" onClick="PlayerMoves.runMove(1, 0)">Schützen</a><br/><a href="#" onClick="PlayerMoves.runMove(2, 0)">Stärken</a>';
        getEnemy.innerHTML = '<img src="img/' + enemy.enemyType.toLowerCase() + '.png"><div><h3>' + enemy.enemyType + '</h3><p><p class="health-enemy">Leben: ' + enemy.health + '</p><p>Stärke: ' + enemy.strenght + '</p><p>Resistenz: ' + enemy.resistance +  '</p><p>Geschicklichkeit: ' + enemy.agility + '</p><p>Geschwindigkeit: ' + enemy.speed + '</p></div>';
    }
}