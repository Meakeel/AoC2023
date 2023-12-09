let count = 0;
let histories = [];

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day09/input.txt')
});

lineReader.on('line', function (line) {
    histories.push({
        history: line.split(' ').map(Number),
        steps: []
    });
});

function calc() {
    for (let i = 0; i < histories.length; i++) {
        process(histories[i], histories[i].history);
    }   
}

function process(row, current) {
    let next = getRowDiff(current);

    row.steps.push(next);

    if (!next.every(x => x === 0)) {
        process(row, next);
    }
}

function getRowDiff(row) {
    let results = [];

    for (let i = 0; i < row.length - 1; i++) {
        results.push(row[i + 1] - row[i]);
    }

    if (results.length === 0) {
        results.push(0);
    }

    return results;
}

function printResult() {
    for (let i = 0; i < histories.length; i++) {
        const totalSum = histories[i].steps.reduce((accumulator, currentValue) => {
            return accumulator + currentValue[currentValue.length -1];
        }, 0);

        count = count + totalSum + histories[i].history[histories[i].history.length - 1];
    }   

    console.log(`total count ${count}`);
}

lineReader.on('close', function () {
    calc();
    printResult();
});