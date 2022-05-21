let GameManager = {
    loadCharSelect: function () {
        getStart = document.querySelector(".start");
        getHeader = document.querySelector(".header");
        getInterface = document.querySelector(".interface");

        getStart.style.display = "none";
        getHeader.innerHTML = '<p>Spiele das beste RPG</p><h2>Wähle dein Charakter</h2>';
        getInterface.innerHTML = document.querySelector(".char-select").innerHTML;
    },
    setGameStart: function (classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },
    resetPlayer: function (classType) {
        switch (classType) {
            case "Kämpfer":
                player = new Player(classType, 200, 0, 200, 100, 50);
                break;
            case "Rouge":
                player = new Player(classType, 100, 0, 100, 150, 200);
                break;
            case "Magier":
                player = new Player(classType, 80, 0, 50, 200, 50);
                break;
            case "Jäger":
                player = new Player(classType, 200, 0, 50, 200, 100);
                break;
        }
        let getInterface = document.querySelector(".interface");
        
        getInterface.innerHTML = '<img src="img/' + classType.toLowerCase() + '.jpg" class="img-avatar"><div><h3> ' + classType + '</h3><p class="health-player">Leben: ' + player.health + '</p><p>Mana: ' + player.mana + '</p><p>Stärke: ' + player.strenght + '</p><p>Geschicklichkeit: ' + player.agility + '</p><p>Geschwindigkeit: ' + player.speed + '</p></div>';
    },
    setPreFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        
        getHeader.innerHTML = '<p>Aufgabe: Gegner finden!</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onClick="GameManager.setFight()">Gegner suchen!</a>';
    },
    setFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getEnemy = document.querySelector(".enemy");
        // Create Enemy
        let enemy00 = new Enemy("Goblin", 100, 0, 50, 100, 100);
        let enemy01 = new Enemy("Troll", 200, 0, 150, 80, 150);

        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(2));
        
        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemy00;
                break;
            case 1:
                enemy = enemy01;
            default:
                break;
        }
        
        getHeader.innerHTML = '<p>Task: Choose your move!</p>'
        getActions.innerHTML = '<a href="#" class="btn-prefight" onClick="PlayerMoves.calcAttack()">Angreifen!</a>'
        getEnemy.innerHTML = '<img src="img/' + enemy.enemyType.toLowerCase() + '.jpg" class="img-avatar"><div><h3> ' + enemy.enemyType + '</h3><p class="health-enemy">Leben: ' + enemy.health + '</p><p>Mana: ' + enemy.mana + '</p><p>Stärke: ' + enemy.strenght + '</p><p>Geschicklichkeit: ' + enemy.agility + '</p><p>Geschwindigkeit: ' + enemy.speed + '</p></div>';

        if (enemy.speed >= player.speed) {
            PlayerMoves.enemyStart();
        }
    }
}