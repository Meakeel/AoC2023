let count = 0;
let records = [];

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day12/input.txt')
});


lineReader.on('line', function (line) {
    let conditions = line.split(' ')[0];
    // let brokenGroupCounts = line.split(' ')[1].split(',').map(Number);

    records.push({
        original: conditions,
        conditions: conditions,
        brokenGroupCounts: line.split(' ')[1],
        combinations: []
    });
});

function calculateCombinations() {
    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        record.combinations = calculateCombinationsForRecord(record.conditions);
    }
}

function replaceCharAt(input, index, replacement) {
    return input.substring(0, index) + replacement + input.substring(index + replacement.length);
}

function calculateCombinationsForRecord(record) {
    let results = [record];
    let processing = true;

    while (processing) {
        let anyMatch = false;

        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            for (let k = 0; k < result.length; k++) {
                if (result[k]=== '?') {

                    let newRecord = JSON.parse(JSON.stringify(result));
                    let newRecord2 = JSON.parse(JSON.stringify(result));

                    newRecord = replaceCharAt(newRecord, k, '.');
                    newRecord2 = replaceCharAt(newRecord2, k, '#');

                    results.splice(i, 1);

                    results.push(newRecord);
                    results.push(newRecord2);
                    anyMatch = true;
                    break;
                }
            }

            if (anyMatch) {
                break;
            }
        }


        if (anyMatch === false) {
            processing = false;
        }
    }

    return results;
}

function searchForMatches() {
    for (let i = 0; i < records.length; i++) {
        let recordCount = 0;
        const record = records[i];
        record.combinations = calculateCombinationsForRecord(record.conditions);

        for (let k = 0; k < record.combinations.length; k++) {
            const combination = record.combinations[k];

            let groupings = getGroupings(combination);
            let brokenGroups = groupings.filter(x => x[0] === '#');
            const groupCounts = brokenGroups.map(group => group.length);
            const result = groupCounts.join(',');
            
            if (result == record.brokenGroupCounts) {
                    count++;
                    recordCount++;
            }
            
            // let isMatch = matchesPattern(combination, record.brokenGroupCounts);
            // if (isMatch) {
            //     count++;
            //     recordCount++;
            // }
        }

        console.log(`${record.original} has ${recordCount}`)
    }
}

function getGroupings(record) {
    // Regular expression to match consecutive '#' or '.' characters
    const regex = /#+|\.+/g;
    return record.match(regex);
}

function matchesPattern(record, patternParts) {
    let currentIndex = 0;
    let currentCount = 0;

    for (let i = 0; i < patternParts.length; i++) {
        let part = patternParts[i];

        while (currentIndex < record.length && currentCount < part) {
            if (record[currentIndex] === '#') {
                currentCount++;
            } else if (currentCount > 0 && record[currentIndex] === '.') {
                break; // Break if we find a '.' after starting a '#' group
            }
            currentIndex++;
        }

        // Check if the current part of the pattern is matched
        if (currentCount !== part) {
            return false; // Pattern does not match
        }

        // Reset for the next part of the pattern
        currentCount = 0;
    }

    return true;
}


function printResult() {
    console.log(count);
}

lineReader.on('close', function () {
    calculateCombinations();
    searchForMatches();
    printResult();
});