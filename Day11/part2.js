let map = [];
let galaxies = [];
let totalSteps = 0;
let columnsToExpand = [];
let rowsToExpand = [];

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day11/input.txt')
});


lineReader.on('line', function (line) {
    map.push(line.split(''));
});

function expandUniverse(size) {

    for (let i = 0; i < map.length; i++) {
        let isOnlySpace = true;

        for (let k = 0; k < map[0].length; k++) {
            if (map[i][k] === '#') {
                isOnlySpace = false;
            }
            
        }

        if (isOnlySpace) {
            rowsToExpand.push(i);
        }
        
    }
    
    for (let i = 0; i < map[0].length; i++) {
        let isOnlySpace = true;

        for (let k = 0; k < map.length; k++) {
            if (map[k][i] === '#') {
                isOnlySpace = false;
            }
            
        }

        if (isOnlySpace) {
            columnsToExpand.push(i);
        }
        
    }
}

function getGalaxies() {
    for (let i = 0; i < map.length; i++) {
        for (let k = 0; k < map[i].length; k++) {
            if (map[i][k] === '#') {
                galaxies.push({
                    Y: i,
                    X: k
                });
            }
        }
        
    }
}

function getShortestPaths(padding) {
    let totalCount = 0;

    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let k = 1; k < galaxies.length - i; k++) {
            totalCount++;
            let count = getDistanceBetweenGalaxies(galaxies[i], galaxies[i + k], padding);
            totalSteps = totalSteps + count;

            // console.log(`${galaxies[i].Y},${galaxies[i].X} to ${galaxies[i + k].Y},${galaxies[i + k].X} ${count}`);
            
        }
        // console.log(totalCount);

    }

};

function getDistanceBetweenGalaxies(start, end, padding) {
    let xDiff = Math.abs(start.X - end.X);
    let yDiff = Math.abs(start.Y - end.Y);
    let distance = xDiff + yDiff;

    let rows = rowsToExpand.filter(x => (x > start.Y && x < end.Y) || (x < start.Y && x > end.Y));

    if (rows.length  > 0) {
        distance = distance + (rows.length * padding);
    }

    let columns = columnsToExpand.filter(x => (x > start.X && x < end.X) || (x < start.X && x > end.X));

    if (columns.length > 0) {
        distance = distance + (columns.length * padding);
    }

    return distance;
}

function printResult() {
    console.log(totalSteps);

    
    // const stream = require('fs').createWriteStream('Day11/output.txt');

    // for (let i = 0; i < map.length; i++) {
    //     stream.write(`${map[i].join('')}` + '\n');
    // }

    // stream.end();
}

lineReader.on('close', function () {
    expandUniverse();
    getGalaxies();
    getShortestPaths(999999);
    printResult();
});