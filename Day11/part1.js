let map = [];
let galaxies = [];
let totalSteps = 0;

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('Day11/input.txt')
});


lineReader.on('line', function (line) {
    map.push(line.split(''));
});

function expandUniverse() {
    let columnsToExpand = [];
    let rowsToExpand = [];

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

    let columnExpandCount = 0;
    for (let i = 0; i < columnsToExpand.length; i++) {
        for (let k = 0; k < map.length; k++) {
            map[k].splice(columnsToExpand[i]  + columnExpandCount, 0, '.');
            
        }
        columnExpandCount++;
    }

    let rowExpandCount = 0;

    let newRow = Array.from({ length: 1 }, () => Array(map[0].length).fill('.'));

    for (let i = 0; i < rowsToExpand.length; i++) {
        map.splice(rowsToExpand[i]  + rowExpandCount, 0, newRow[0]);
        rowExpandCount++;
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

function getShortestPaths() {
    let totalCount = 0;

    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let k = 1; k < galaxies.length - i; k++) {
            totalCount++;
            let count = getDistanceBetweenGalaxies(galaxies[i], galaxies[i + k]);
            totalSteps = totalSteps + count;
        }
    }

};

function getDistanceBetweenGalaxies(start, end) {
    let xDiff = Math.abs(start.X - end.X);
    let yDiff = Math.abs(start.Y - end.Y);

    return xDiff + yDiff;
}

function printResult() {
    console.log(totalSteps);
}

lineReader.on('close', function () {
    expandUniverse();
    getGalaxies();
    getShortestPaths();
    printResult();
});