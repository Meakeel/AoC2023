let count = 0;

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day04/input.txt')
});


lineReader.on('line', function (line) {
    let trimmedText = line.replace(/\s+/g, ' ');
    let cardText = trimmedText.split(':')[0];
    let winnerGroup = trimmedText.split(':')[1].split('|')[0];
    let winnerNumbers = new Set(winnerGroup.trim().split(' ').map(Number));

    let yourNumberGroup = trimmedText.split(':')[1].split('|')[1];
    let yourNumberNumbers = new Set(yourNumberGroup.trim().split(' ').map(Number));

    let winCount = 0;

    for (const winnerNumber of winnerNumbers) {
        let isNumberMatch = false;


        for (const yourNumber of yourNumberNumbers) {
            if (yourNumber === winnerNumber) {
                isNumberMatch = true;
                break;
            }
        }

        if (isNumberMatch && winCount === 0) {
            winCount = 1;
        } else if (isNumberMatch) {
            winCount = winCount + winCount;
        }

    }

    // for (let i = 0; i < winnerNumbers.size; i++) {
    //     const winnerNumber = winnerNumbers[i];

    //     for (let k = 0; k < yourNumberNumbers.size; k++) {
    //         const yourNumber = yourNumberNumbers[k];

    //         if (yourNumber === winnerNumber) {
    //             isNumberMatch = true;
    //             break;
    //         }
    //     }

    //     if (isNumberMatch && winCount === 0) {
    //         winCount = 1;
    //     } else if (isNumberMatch) {
    //         winCount = winCount + winCount;
    //     }
    // }

    if (winCount > 0) {
        console.log(`${cardText} has ${winCount} wins adding to ${count}`)
        count = count + winCount;
    }
});

function printResult() {
    console.log(count);
}

lineReader.on('close', function () {
    printResult();
});