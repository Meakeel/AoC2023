let count = 0;

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {
    let first = null;
    let last = 0;

    for (let i = 0; i < line.length; i++) {
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