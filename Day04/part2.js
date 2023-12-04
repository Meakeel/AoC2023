let count = 0;
let cardNumber = 1;
let cards = [];

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

        if (isNumberMatch) {
            winCount++;
        }
    }

    cards.push({
        number: cardNumber,
        points: winCount,
        copies: 1
    });

    cardNumber++;
});

function calcCopies() {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        if (card. points > 0) {
            for (let j = 0; j < card.copies; j++) {
                for (let k = 0; k < card.points; k++) {
                    let startingPosition = i + k + 1;
                    const futureCard = cards[startingPosition];
                    futureCard.copies = futureCard.copies + 1;
                }
            }
        }
    }
}

function printResult() {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        count = count + card.copies;
    }

    console.log(count);
}

lineReader.on('close', function () {
    calcCopies();
    printResult();
});