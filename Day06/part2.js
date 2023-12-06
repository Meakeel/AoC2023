let raceCounts = [];

let testRaces = [
    {
        time: 71530,
        distance: 940200
    }

];

let races = [
    {
        time: 50748685,
        distance: 242101716911252
    }

];     

function calc() {
    for (let i = 0; i < races.length; i++) {
        let raceResults = 0;
        const race = races[i];
        
        for (let j = 1; j < race.time; j++) {
            let runTime = race.time - j;
            let speed = j;

            let distance = runTime * speed;

            if (distance > race.distance) {
                raceResults++;
            }
            
        }

        raceCounts.push(raceResults);
        console.log(`Race ${i} number of wins ${raceResults}`);
    }
}

function printResult() {
    console.log(raceCounts);

    let total = raceCounts.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
    console.log(total);
}

calc();
printResult();