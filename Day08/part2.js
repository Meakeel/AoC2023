let testInstructionsText = 'LR';
let instructionsText = 'LRLRLRLLRRLRRLRRRLRRLRLLRRRLRRRLRRLLLLRRRLRLLRRLRRLRRLLLRRRLRRRLRRLRLRRLRLRLRLLRRRLRRRLLRRRLRRRLRRRLRLLLRRLRLRRRLRLRRRLLRRRLRLLRLRRRLRLRRRLRRLLRLRLRRLRLRLRRLRLRLRRRLRRLRLLRRLRRRLRRRLRRLRRRLRRLRLRRRLLRRRLLRRLRLRRRLRRRLLRRRLRLRRLRLRLRRLRLLRRLRLRLRRLRRRLRRRLRLRRLRRLLLRRRLLRLRRRLLRRRR';
let maps = new Map();
let positions = new Map();
let positionStepCounts = [];

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day08/input.txt')
});


lineReader.on('line', function (line) {
    let start = line.split(' = (')[0];
    let leftOrRight = line.split(' = ')[1];
    let goLeft = leftOrRight.split(', ')[0].replace('(', '');
    let goRight = leftOrRight.split(', ')[1].replace(')', '');
    let leftEnd = goLeft[2] === 'Z';
    let rightEnd = goRight[2] === 'Z';

    maps.set(start, {
        left: goLeft,
        right: goRight,
        isLeftEnd: leftEnd,
        isRightEnd: rightEnd
    });

    if (start[2] === 'A') {
        positions.set(start, maps.get(start));
    }
});

function processMap() {
    let steps = instructionsText.split('');

    positions.forEach((value, key) => {
        let stepCount = 0;
        let foundEnd = false;
        let position = maps.get(key);

        while (foundEnd === false) {
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];

                let target = null;
                if (step === 'L') {
                    target = position.left;
                } else {
                    target = position.right;
                }

                position = maps.get(target);
                stepCount++;

                if (target[2] == 'Z') {
                    foundEnd = true;
                }
            }
        }

        positionStepCounts.push(stepCount);
    });
}

function greatestCommonDivisor(a, b) {
    if (b === 0) {
        return a;
    } else {
        return greatestCommonDivisor(b, a % b);
    }
}

function leastCommonMultiple(a, b) {
    return (a / greatestCommonDivisor(a, b)) * b;
}

function printResult() {
    console.log(positionStepCounts.reduce(leastCommonMultiple, 1));
}

lineReader.on('close', function () {
    processMap();
    printResult();
});