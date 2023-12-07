let games = [];

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day07/input.txt')
});

lineReader.on('line', function (line) {
    let game = {
        cards: line.split(' ')[0].split(''),
        value: parseInt(line.split(' ')[1])
    };

    for (let i = 0; i < game.cards.length; i++) {
        const card = game.cards[i];

        if (isNaN(card)) {
            if (card === 'T') {
                game.cards[i] = 10;
            }

            if (card === 'J') {
                game.cards[i] = 11;
            }

            if (card === 'Q') {
                game.cards[i] = 12;
            }

            if (card === 'K') {
                game.cards[i] = 13;
            }

            if (card === 'A') {
                game.cards[i] = 14;
            }
        } else {
            game.cards[i] = parseInt(card);
        }

    }

    games.push(game);
});

function process() {
    let fiveOfAKind = games.filter(isFiveOfAKind);
    fiveOfAKind.sort(compareCards);

    let fourOfAKind = games.filter(isFourOfAKind);
    fourOfAKind.sort(compareCards);

    let fullhouse = games.filter(isFullHouse);
    fullhouse.sort(compareCards);

    let threeOfAKind = games.filter(isThreeOfAKind);
    threeOfAKind.sort(compareCards);

    let twoPair = games.filter(isTwoPair);
    twoPair.sort(compareCards);

    let onePair = games.filter(isPair);
    onePair.sort(compareCards);

    let highcard = games.filter(isHighCard);
    highcard.sort(compareCards);

    let rank = 1;
    let score = 0;

    highcard.forEach(game => {
        score = score + (game.value * rank);
        rank++;
    });

    onePair.forEach(game => {
        score = score + (game.value * rank);
        rank++;
    });

    twoPair.forEach(game => {
        score = score + (game.value * rank);
        rank++;
    });

    threeOfAKind.forEach(game => {
        score = score + (game.value * rank);
        rank++;
    });

    fullhouse.forEach(game => {
        score = score + (game.value * rank);
        rank++;
    });

    fourOfAKind.forEach(game => {
        score = score + (game.value * rank);
        rank++;
    });

    fiveOfAKind.forEach(game => {
        score = score + (game.value * rank);
        rank++;
    });

    console.log(`ending rank: ${rank}`);
    console.log(`total winnings: ${score}`);
}

function compareCards(a, b) {
    for (let i = 0; i < a.cards.length; i++) {
        const handOneCard = a.cards[i];
        const handTwoCard = b.cards[i];

        if (handOneCard === handTwoCard) {
            continue;
        }

        if (handOneCard > handTwoCard) {
            return 1;
        } else {
            return -1;
        }
    }

    return 0;
}

function isFiveOfAKind(cards) {
    let cardCount = cards.cards.filter(x => x === cards.cards[0]).length;

    return cardCount === 5;
}

function isFourOfAKind(cards) {
    let uniqueCards = [...new Set(cards.cards)];
    
    if (uniqueCards.length != 2) {
        return false;
    }

    let cardCountOne = cards.cards.filter(x => x === uniqueCards[0]);
    let cardCountTwo = cards.cards.filter(x => x === uniqueCards[1]);

    let countArray = [
        cardCountOne.length, cardCountTwo.length
    ];

    let singleCardCount = countArray.filter(x => x === 1).length;
    let fourCount = countArray.filter(x => x === 4).length;

    return fourCount === 1 && singleCardCount === 1;
}

function isFullHouse(cards) {
    let uniqueCards = [...new Set(cards.cards)];

    if (uniqueCards.length != 2) {
        return false;
    }

    let cardCountOne = cards.cards.filter(x => x === uniqueCards[0]);
    let cardCountTwo = cards.cards.filter(x => x === uniqueCards[1]);

    let countArray = [
        cardCountOne.length, cardCountTwo.length
    ];

    let pairCount = countArray.filter(x => x === 2).length;
    let threeCount = countArray.filter(x => x === 3).length;

    return threeCount === 1 && pairCount === 1;
}

function isThreeOfAKind(cards) {
    let uniqueCards = [...new Set(cards.cards)];

    if (uniqueCards.length != 3) {
        return false;
    }

    let cardCountOne = cards.cards.filter(x => x === uniqueCards[0]);
    let cardCountTwo = cards.cards.filter(x => x === uniqueCards[1]);
    let cardCountThree = cards.cards.filter(x => x === uniqueCards[2]);

    let countArray = [
        cardCountOne.length, cardCountTwo.length, cardCountThree.length
    ];

    let singleCardCount = countArray.filter(x => x === 1).length;
    let theeofAKindCount = countArray.filter(x => x === 3).length;

    return theeofAKindCount === 1 && singleCardCount === 2;
}

function isTwoPair(cards) {
    let uniqueCards = [...new Set(cards.cards)];

    if (uniqueCards.length != 3) {
        return false;
    }

    let cardCountOne = cards.cards.filter(x => x === uniqueCards[0]);
    let cardCountTwo = cards.cards.filter(x => x === uniqueCards[1]);
    let cardCountThree = cards.cards.filter(x => x === uniqueCards[2]);

    let countArray = [
        cardCountOne.length, cardCountTwo.length, cardCountThree.length
    ];

    let singleCardCount = countArray.filter(x => x === 1).length;
    let pairCount = countArray.filter(x => x === 2).length;

    return pairCount === 2 && singleCardCount === 1;
}

function isPair(cards) {
    let uniqueCards = [...new Set(cards.cards)];

    if (uniqueCards.length != 4) {
        return false;
    }

    let cardCountOne = cards.cards.filter(x => x === uniqueCards[0]);
    let cardCountTwo = cards.cards.filter(x => x === uniqueCards[1]);
    let cardCountThree = cards.cards.filter(x => x === uniqueCards[2]);
    let cardCountFour = cards.cards.filter(x => x === uniqueCards[3]);

    let countArray = [
        cardCountOne.length, cardCountTwo.length, cardCountThree.length, cardCountFour.length
    ];

    let singleCardCount = countArray.filter(x => x === 1).length;
    let pairCount = countArray.filter(x => x === 2).length;

    return pairCount === 1 && singleCardCount === 3;
}

function isHighCard(cards) {
    let uniqueCards = [...new Set(cards.cards)];

    if (uniqueCards.length === 5) {
        return true;
    }

    return false;
}


lineReader.on('close', function () {
    process();
});