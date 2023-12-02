let count = 0;
let redCount = 12;
let greenCount = 13;
let blueCount = 14;

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day02/input.txt')
});


lineReader.on('line', function (line) {
    let gameString = line.split(':')[0];
    let gameNumber = parseInt(gameString.split(' ')[1]);

    let startingPosition = line.indexOf(':');
    let rounds = line.substring(startingPosition + 1);

    let groupDraws = rounds.split(';');
    let validGame = true;

    for (let i = 0; i < groupDraws.length; i++) {
        const group = groupDraws[i];

        let draws = group.split(',');

        for (let k = 0; k < draws.length; k++) {
            const draw = draws[k].substring(1);

            let value = parseInt(draw.split(' ')[0]);
            let colour = draw.split(' ')[1];
            let targetValue = 0;

            switch (colour) {
                case 'red':
                    targetValue = redCount;
                    break;

                case 'green':

                    targetValue = greenCount;
                    break;

                case 'blue':
                    targetValue = blueCount;

                    break;

                default:
                    break;
            }

            if (value > targetValue) {
                validGame = false;
            }

        }

    }

    if (validGame) {
        count = count + gameNumber;
    }
});

function printResult() {
    console.log(count);
}

lineReader.on('close', function () {
    printResult();
});