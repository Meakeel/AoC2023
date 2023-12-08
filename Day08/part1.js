let stepCount = 0;
let testInstructionsText = 'LLR';
let instructionsText = 'LRLRLRLLRRLRRLRRRLRRLRLLRRRLRRRLRRLLLLRRRLRLLRRLRRLRRLLLRRRLRRRLRRLRLRRLRLRLRLLRRRLRRRLLRRRLRRRLRRRLRLLLRRLRLRRRLRLRRRLLRRRLRLLRLRRRLRLRRRLRRLLRLRLRRLRLRLRRLRLRLRRRLRRLRLLRRLRRRLRRRLRRLRRRLRRLRLRRRLLRRRLLRRLRLRRRLRRRLLRRRLRLRRLRLRLRRLRLLRRLRLRLRRLRRRLRRRLRLRRLRRLLLRRRLLRLRRRLLRRRR';
let maps = new Map();

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day08/input.txt')
});


lineReader.on('line', function (line) {
    let start = line.split(' = (')[0];
    let leftOrRight  = line.split(' = ')[1];
    let goLeft = leftOrRight.split(', ')[0].replace('(', '');
    let goRight = leftOrRight.split(', ')[1].replace(')', '');

    maps.set(start, { left: goLeft, right: goRight });
});

function processMap() {
    let steps = instructionsText.split('');

    let position = maps.get('AAA');

    let foundEnd = false;

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

            if (target === 'ZZZ') {
                foundEnd = true;
            }
        }
    }
}

function printResult() {
    console.log(stepCount);
}

lineReader.on('close', function () {

    processMap();
    printResult();
});