let count = 0;

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day02/input.txt')
});


lineReader.on('line', function (line) {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    let gameString = line.split(':')[0];
    let gameNumber = parseInt(gameString.split(' ')[1]);

    let startingPosition = line.indexOf(':');
    let rounds = line.substring(startingPosition + 1);

    let groupDraws = rounds.split(';');

    for (let i = 0; i < groupDraws.length; i++) {
        const group = groupDraws[i];

        let draws = group.split(',');

        for (let k = 0; k < draws.length; k++) {
            const draw = draws[k].substring(1);

            let value = parseInt(draw.split(' ')[0]);
            let colour = draw.split(' ')[1];

            switch (colour) {
                case 'red':
                    if (value > maxRed) {
                        maxRed = value;
                    }
                    break;

                case 'green':
                    if (value > maxGreen) {
                        maxGreen = value;
                    }

                    break;

                case 'blue':
                    if (value > maxBlue) {
                        maxBlue = value;
                    }

                    break;

                default:
                    break;
            }
        }

    }

    let powers = maxRed * maxGreen * maxBlue;
    count = count + powers;

});

function printResult() {
    console.log(count);
}

lineReader.on('close', function () {
    printResult();
});