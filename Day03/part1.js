let count = 0;
let map = [];
let width = 0;
let height = 0;

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day03/input.txt')
});


lineReader.on('line', function (line) {
    map.push(line.split(''));
});

function processMap() {
    width = map[0].length;
    height = map.length;

    for (let i = 0; i < height; i++) {
        const numbersInLine = getNumbersInLine(map[i], i);

        for (let k = 0; k < numbersInLine.length; k++) {
            const symbolsNextToNumber = getAdjacentToNumber(numbersInLine[k]);

            let checkResult = checkSymbols(symbolsNextToNumber);
            if (checkResult) {
                count = count + numbersInLine[k].number;
                console.log(`${numbersInLine[k].number} found match from ${symbolsNextToNumber}`);
            } else {
                console.log(`${numbersInLine[k].number} no match from ${symbolsNextToNumber}`);
            }

        }
    }
}

function getNumbersInLine(line, lineHeight) {
    let numbers = [];
    let startingPosition = 0;
    let currentNumberString = '';
    let isCurrentNumber = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (isCurrentNumber) {
            if (!isNaN(char)) {
                currentNumberString = currentNumberString + char;
            } else {
                isCurrentNumber = false;

                numbers.push({
                    startingPosition: startingPosition,
                    endPosition: i - 1,
                    height: lineHeight,
                    number: parseInt(currentNumberString)
                });

            }
        } else {
            if (!isNaN(char)) {
                isCurrentNumber = true;
                currentNumberString = char;
                startingPosition = i;
            }
        }
    }

    if (isCurrentNumber) {
        numbers.push({
            startingPosition: startingPosition,
            endPosition: line.length,
            height: lineHeight,
            number: parseInt(currentNumberString)
        });
    }

    return numbers;
}


function getAdjacentToNumber(number) {
    let symbols = [];
    symbols.push(topLeft(number));
    symbols.push(bottomLeft(number));
    symbols.push(topRight(number));
    symbols.push(bottomRight(number));

    let topValue = top(number);
    symbols.push(...topValue);
    let bottomValue = bottom(number);
    symbols.push(...bottomValue);
    symbols.push(left(number));
    symbols.push(right(number));
    return symbols;
}

function topLeft(number) {
    if (number.startingPosition > 0 && number.height > 0) {
        return map[number.height  - 1][number.startingPosition - 1];
    }
}

function bottomLeft(number) {
    if (number.startingPosition > 0 && number.height < height - 1) {
        return map[number.height  + 1][number.startingPosition - 1];
    }
}

function topRight(number) {
    if (number.endPosition < width && number.height > 0) {
        return map[number.height  - 1][number.endPosition + 1];
    }
}

function bottomRight(number) {
    if (number.endPosition < width && number.height < height - 1) {
        return map[number.height  + 1][number.endPosition + 1];
    }
}

function top(number) {
    if (number.height > 0) {
        let line = map[number.height  - 1];
        return line.slice(number.startingPosition, number.endPosition + 1);
    }
    return [];
}

function left(number) {
    if (number.startingPosition > 0) {
        return map[number.height][number.startingPosition - 1];
    }
}

function right(number) {
    if (number.endPosition < width) {
        return map[number.height][number.endPosition + 1];
    }
}

function bottom(number) {
    if (number.height < height - 1) {
        let line = map[number.height  + 1];
        return line.slice(number.startingPosition, number.endPosition + 1);
    }
    return [];
}

function checkSymbols(symbols) {
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        
        if (symbol != undefined && isNaN(symbol) && symbol !== '.') {
            return true;
        }
    }

    return false;
}

function printResult() {
    console.log(count);
}

lineReader.on('close', function () {
    processMap();
    printResult();
});