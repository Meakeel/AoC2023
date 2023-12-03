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
    let numbersInLine = [];

    for (let i = 0; i < height; i++) {
        const lineNumbers = getNumbersInLine(map[i], i);
        numbersInLine.push(...lineNumbers);
    }

    for (let i = 0; i < height; i++) {
        for (let k = 0; k < width; k++) {
            const xy = map[i][k];
            if (xy === "*") {
                count = count + getNumbersNextToGear(numbersInLine, { x: i, y: k });
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

function getNumbersNextToGear(numbersInLine, gearXY) {
    let countGears = 0;
    let foundNumbers = [];

    for (let i = 0; i < numbersInLine.length; i++) {
        const number = numbersInLine[i];

        let coordsAroundNumber = search(number);
        let searchNumberForGear = coordsAroundNumber.filter(coord => coord.x == gearXY.x && coord.y == gearXY.y)
        
        if (searchNumberForGear.length > 0) {
            foundNumbers.push(number);
            countGears++;
        }
    }

    if (countGears == 2) {
        return foundNumbers[0].number * foundNumbers[1].number;
    }

    return 0;
}

function search(number) {
    let symbols = [];
    if (topLeft(number) != undefined) {
        symbols.push(topLeft(number));
    }
    if (bottomLeft(number) != undefined) {
        symbols.push(bottomLeft(number));
    }

    if (topRight(number) != undefined) {
        symbols.push(topRight(number));
    }

    if (bottomRight(number) != undefined) {
        symbols.push(bottomRight(number));
    }

    let topValue = top(number);
    if (topValue.length > 0) {
        symbols.push(...topValue);
    }
    let bottomValue = bottom(number);
    if (bottomValue.length > 0) {
        symbols.push(...bottomValue);
    }

    if (left(number) != undefined) {
        symbols.push(left(number));
    }
    if (right(number) != undefined) {
        symbols.push(right(number));
    }

    return symbols;
}

function topLeft(number) {
    if (number.startingPosition > 0 && number.height > 0) {
        return { x: number.height - 1, y: number.startingPosition - 1 };
    }
}

function bottomLeft(number) {
    if (number.startingPosition > 0 && number.height < height - 1) {
        return { x: number.height + 1, y: number.startingPosition - 1 };
    }
}

function topRight(number) {
    if (number.endPosition < width && number.height > 0) {
        return { x: number.height - 1, y: number.endPosition + 1 };
    }
}

function bottomRight(number) {
    if (number.endPosition < width && number.height < height - 1) {
        return { x: number.height + 1, y: number.endPosition + 1 };
    }
}

function top(number) {
    let results = [];
    if (number.height > 0) {
        let start = number.startingPosition;
        let searchArea = number.endPosition - number.startingPosition;

        for (let i = 0; i < searchArea + 1; i++) {
            results.push({ x: number.height - 1, y: start });
            start++;
        }
    }
    return results;
}

function left(number) {
    if (number.startingPosition > 0) {
        return { x: number.height, y: number.startingPosition - 1 };
    }
}

function right(number) {
    if (number.endPosition < width) {
        return { x: number.height, y: number.endPosition + 1 };
    }
}

function bottom(number) {
    let results = [];
    if (number.height < height - 1) {
        let start = number.startingPosition;
        let searchArea = number.endPosition - number.startingPosition;

        for (let i = 0; i < searchArea + 1; i++) {
            results.push({ x: number.height + 1, y: start });
            start++;
        }
    }
    return results;
}

function checkSymbolsForGear(symbols) {
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];

        if (symbol != undefined && isNaN(symbol) && symbol === '*') {
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