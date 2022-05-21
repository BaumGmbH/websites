function CalcRandom(amount) {
    let less = 0;
    let evenLess = 0;
    let tooLess = 0;
    let between = 0;
    let more = 0;
    let evenMore = 0;
    let tooMore = 0;

    for (let i = 0; i < amount; i++) {
        let random = Math.random();
        if (random < 0.1) {
            console.log("LESS | " + random);
            less++;
            if (random < 0.01) {
                console.log("EVEN LESS | " + random)
                less--;
                evenLess++;
                if (random < 0.001) {
                    console.log("TOO LESS | " + random);
                    evenLess--;
                    tooLess++;
                }
            }
        } else if (random > 0.9) {
            console.log("MORE | " + random);
            more++;
            if (random > 0.99) {
                console.log("EVEN MORE | " + random)
                more--;
                evenMore++;
                if (random > 0.999) {
                    console.log("TOO MORE | " + random);
                    evenMore--;
                    tooMore++;
                }
            }
        } else {
            console.log("BETWEEN | " + random);
            between++;
        }
    }

    console.log("-----------------------------------");

    console.log("Less > " + less);
    console.log("EvenLess > " + evenLess );
    console.log("TooLess > " + tooLess);
    console.log("Between > " + between);
    console.log("More > " + more);
    console.log("EvenMore > " + evenMore);
    console.log("TooMore > " + tooMore);
}
function CalcRandomSilent(amount) {
    let less = 0;
    let evenLess = 0;
    let tooLess = 0;
    let between = 0;
    let more = 0;
    let evenMore = 0;
    let tooMore = 0;

    for (let i = 0; i < amount; i++) {
        let random = Math.random();
        if (random < 0.1) {
            less++;
            if (random < 0.01) {
                less--;
                evenLess++;
                if (random < 0.001) {
                    evenLess--;
                    tooLess++;
                }
            }
        } else if (random > 0.9) {
            more++;
            if (random > 0.99) {
                more--;
                evenMore++;
                if (random > 0.999) {
                    evenMore--;
                    tooMore++;
                }
            }
        } else {
            between++;
        }

        if (random > 0.999999999 || random < 0.000000001) {
            console.log("IMPOSSIBEL >>> " + random);
        } else if (random > 0.99999 || random < 0.00001) {
            console.log("NEAR IMPOSSIBEL >>> " + random);
        }
    }

    console.log("Less > " + less);
    console.log("EvenLess > " + evenLess );
    console.log("TooLess > " + tooLess);
    console.log("Between > " + between);
    console.log("More > " + more);
    console.log("EvenMore > " + evenMore);
    console.log("TooMore > " + tooMore);
}
function CalcImpossible(amount) {
    for (let i = 0; i < amount; i++) {
        if (Math.random > 0.999999999 || Math.random < 0.000000001) {
            console.log("IMPOSSIBEL >>> " + random);
        }
    }
}
function CalcImpossibleInfinit(amount) {
    let minRandom = 5;
    let minRuns = 0;
    let minRandomArray = new Array;
    let minRunsArray = new Array;

    for (let i = 0; i < amount; i++) {
        do {
            minRandom = Math.random();
            minRuns++;
        } while (!(minRandom < 0.01));
        console.log("DONE | " + minRuns + " | " + minRandom);

        minRandomArray = ArrayMethod(minRandom, minRandomArray, "add");
        minRunsArray = ArrayMethod(minRuns, minRunsArray, "add");
    }

    minRandom = ArrayMethod(minRandom, minRandomArray, "cross");
    minRuns = ArrayMethod(minRuns, minRunsArray, "cross");

    let maxRandom = 5;
    let maxRuns = 0;
    let maxRandomArray = new Array;
    let maxRunsArray = new Array;

    for (let i = 0; i < amount; i++) {
        do {
            maxRandom = Math.random();
            maxRuns++;
        } while (!(maxRandom > 0.99));
        console.log("DONE | " + maxRuns + " | " + maxRandom);

        maxRandomArray = ArrayMethod(maxRandom, maxRandomArray, "add");
        maxRunsArray = ArrayMethod(maxRuns, maxRunsArray, "add");
    }

    maxRandom = ArrayMethod(maxRandom, maxRandomArray, "cross");
    maxRuns = ArrayMethod(maxRuns, maxRunsArray, "cross");

    console.log("Usualy Min >>> " + minRandom + " in >>> " + Math.floor(minRuns));
    console.log("Usualy Max >>> " + maxRandom + " in >>> " + Math.floor(maxRuns));
}
function ArrayMethod(item, array, type) {
    if (type === "add") {
        array[array.length] = item;
        
        return array;
    } else if (type === "cross") {
        let crossNumber = 0;
        array.forEach(function (eachItem) {
            crossNumber = crossNumber + eachItem;
        });
        return crossNumber / array.length;
    }
}
function CalcImpossibleInfinitSilent(amount) {
    let minRandom = 5;
    let minRuns = 0;
    let minRandomArray = new Array;
    let minRunsArray = new Array;

    for (let i = 0; i < amount; i++) {
        do {
            minRandom = Math.random();
            minRuns++;
        } while (!(minRandom < 0.01));

        minRandomArray = ArrayMethod(minRandom, minRandomArray, "add");
        minRunsArray = ArrayMethod(minRuns, minRunsArray, "add");
    }

    minRandom = ArrayMethod(minRandom, minRandomArray, "cross");

    let maxRandom = 5;
    let maxRuns = 0;
    let maxRandomArray = new Array;
    let maxRunsArray = new Array;

    for (let i = 0; i < amount; i++) {
        do {
            maxRandom = Math.random();
            maxRuns++;
        } while (!(maxRandom > 0.99));

        maxRandomArray = ArrayMethod(maxRandom, maxRandomArray, "add");
        maxRunsArray = ArrayMethod(maxRuns, maxRunsArray, "add");
    }

    maxRandom = ArrayMethod(maxRandom, maxRandomArray, "cross");

    console.log("Usualy Min >>> " + minRandom + " in >>> " + Math.floor(minRuns));
    console.log("Usualy Max >>> " + maxRandom + " in >>> " + Math.floor(maxRuns));
}
function ArrayMethod(item, array, type) {
    if (type === "add") {
        array[array.length] = item;
        
        return array;
    } else if (type === "cross") {
        let crossNumber = 0;
        array.forEach(function (eachItem) {
            crossNumber = crossNumber + eachItem;
        });
        return crossNumber / array.length;
    }
}