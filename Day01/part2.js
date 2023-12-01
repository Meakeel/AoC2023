let count = 0;

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input2.txt')
});

function isANumber(input, index) {
    let totalLenth = input.length;

    if (totalLenth - index < 3) {
        return null;
    }

    let threeSub = `${input[index]}${input[index + 1]}${input[index + 2]}`
    switch (threeSub) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'six':
            return 6;
        default:
            break;
    }

    if (totalLenth - index < 4) {
        return null;
    }

    let fourSub = `${input[index]}${input[index + 1]}${input[index + 2]}${input[index + 3]}`
    switch (fourSub) {
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'nine':
            return 9;
        default:
            break;
    }
    
    if (totalLenth - index < 5) {
        return null;
    }

    let fiveSub = `${input[index]}${input[index + 1]}${input[index + 2]}${input[index + 3]}${input[index + 4]}`
    switch (fiveSub) {
        case 'three':
            return 3;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        default:
            break;
    }

    return null;
}

lineReader.on('line', function (line) {
    let first = null;
    let last = 0;

    for (let i = 0; i < line.length; i++) {
        let textNumber = isANumber(line, i);
        if (textNumber != null) {
            if (first == null) {
                first = textNumber;
            }

            last = textNumber;
        }

        let value = parseInt(line[i]);
        if (!isNaN(value)) {
            if (first == null) {
                first = value;
            }

            last = value;
        }
    }

    textValue = `${first}${last}`;

    count = count + parseInt(textValue);
});

function printResult() {
    console.log(count);
}

lineReader.on('close', function () {
    printResult();
});