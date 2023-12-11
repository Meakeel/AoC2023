let map = [];
let workingSteps = new Set();

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day10/input.txt')
});

lineReader.on('line', function (line) {
    map.push(
        line.split('')
    );
});


function process() {
    let startTile = findStart();
    let possibleStarts = getPossibleFirst(startTile);

    possibleStarts.forEach(possibleStart => {
        if (workingSteps.size > 0) {
            return;
        }

        let count = 0;
        let steps = new Set();
        steps.add(`${startTile.Y},${startTile.X}`);
        let previous = startTile;
        let current = possibleStart;
        let working = true;

        while (working) {
            let nextTile = getNext(current, previous);

            if (nextTile === null) {
                console.log(`${possibleStart.Y},${possibleStart.X} not valid`);
                working = false;
                continue;
            }
            
            if (map[nextTile.Y][nextTile.X] === 'S') {
                steps.add(`${current.Y},${current.X}`);
                console.log(`${possibleStart.Y},${possibleStart.X} found the end`);
                workingSteps = steps;
                return;
            }

            if (steps.has(`${nextTile.Y},${nextTile.X}`)) {
                console.log(`${possibleStart.Y},${possibleStart.X}  not valid in a loop`);
                working = false;
            }

            steps.add(`${current.Y},${current.X}`);
            previous = current;
            current = nextTile;

            count++;
        }


    });
}

function findStart() {
    for (let i = 0; i < map.length; i++) {
        for (let k = 0; k < map[i].length; k++) {
            if (map[i][k] === "S") {
                return {
                    X: k,
                    Y: i
                };
            }
        }

    }
}

function getPossibleFirst(start) {
    return [
        {
            X: start.X,
            Y: start.Y + 1,
        }, {
            X: start.X,
            Y: start.Y - 1,
        }, {
            X: start.X + 1,
            Y: start.Y,

        }, {
            X: start.X - 1,
            Y: start.Y,

        }, {
            X: start.X - 1,
            Y: start.Y - 1,

        }, {
            X: start.X + 1,
            Y: start.Y - 1,

        }, {
            X: start.X - 1,
            Y: start.Y + 1,

        }, {
            X: start.X + 1,
            Y: start.Y + 1,
        }
    ]
}

function getNext(mapYX, previous) {
    let tile = map[mapYX.Y][mapYX.X];
    let nextTile = null;

    switch (tile) {
        case '|':
            // NS
            if (mapYX.Y - previous.Y === 1) {
                nextTile =
                {
                    X: mapYX.X,
                    Y: mapYX.Y + 1
                };
                return nextTile;
            }

            nextTile =
            {
                X: mapYX.X,
                Y: mapYX.Y - 1
            };
            return nextTile;
        case '-':
            // EW
            if (mapYX.X - previous.X === 1) {
                nextTile =
                {
                    X: mapYX.X + 1,
                    Y: mapYX.Y
                };
                return nextTile;
            }

            nextTile =
            {
                X: mapYX.X - 1,
                Y: mapYX.Y
            };
            return nextTile;

        case 'L':
            // NE
            if (mapYX.Y !== previous.Y) {
                nextTile =
                {
                    X: mapYX.X + 1,
                    Y: mapYX.Y
                };
                return nextTile;
            }

            nextTile =
            {
                X: mapYX.X,
                Y: mapYX.Y - 1
            };
            return nextTile;

        case 'J':
            // NW
            if (mapYX.Y !== previous.Y) {
                nextTile =
                {
                    X: mapYX.X - 1,
                    Y: mapYX.Y
                };
                return nextTile;
            }

            nextTile =
            {
                X: mapYX.X,
                Y: mapYX.Y - 1
            };
            return nextTile;
        case '7':
            // SW
            if (mapYX.Y !== previous.Y) {
                nextTile =
                {
                    X: mapYX.X - 1,
                    Y: mapYX.Y
                };
                return nextTile;
            }

            nextTile =
            {
                X: mapYX.X,
                Y: mapYX.Y + 1
            };
            return nextTile;
        case 'F':
            // SE

            if (mapYX.Y !== previous.Y) {
                nextTile =
                {
                    X: mapYX.X + 1,
                    Y: mapYX.Y
                };
                return nextTile;
            }

            nextTile =
            {
                X: mapYX.X,
                Y: mapYX.Y + 1
            };
            return nextTile;
        default:
            return nextTile;
    }
}

function printResult(steps) {
    console.log(`done ${workingSteps.size / 2}`);
}

lineReader.on('close', function () {
    process();
    printResult();
});