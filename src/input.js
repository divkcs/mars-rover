var fs = require('fs');
var Q = require('q');
var Map = require('./map');
var Rover = require('./rover');
var DIRECTIONS = require('./directions').in;
var MOVES = require('./moves').in;


function getInput() {
    var deferred = Q.defer();
    fs.readFile('./input.txt', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
            deferred.reject();
        } else {
            try {
                processInput(data, deferred.resolve);
            } catch (error) {
                console.log('error processing input', error);
                deferred.reject();
            }
        }
    });

    return deferred.promise;
}

function processInput(data, callback) {
    var lines = data.trim().split('\n');
    for(let i=0;i<lines.length;i++){
        lines[i] = (lines[i].split(':'))[1];
    }
    var map = setupMap(lines.shift());
    var roverPlans = [];
    while (lines.length > 0) {
        roverPlans.push({
            rover: setupRover(lines.shift()),
            moves: setupMoves(lines.shift())
        });
    }

    callback({
        map: map,
        roverPlans: roverPlans
    });
}

function setupMap(line) {
    var widthHeight = line.split(' ');
    var width = parseInt(widthHeight[0], 10);
    var height = parseInt(widthHeight[1], 10);
    if (isNaN(width) || isNaN(height)) {
        throw new Error('invalid map')
    }
    return new Map(width, height);
}

function setupRover(initialPosition) {
    var position = initialPosition.split(' ');

    var x = parseInt(position[0], 10);
    var y = parseInt(position[1], 10);
    var direction = DIRECTIONS[position[2]];

    if (isNaN(x) || isNaN(y) || typeof direction === 'undefined') {
        throw new Error('invalid rover');
    }
    return new Rover(direction, x, y);
}

function setupMoves(moves) {
    return moves.split('').map(function (move) {
        if (MOVES[move]) {
            return MOVES[move];
        } else {
            throw new Error('invalid move');
        }
    });
}

module.exports = {
    getInput: getInput,
    _processInput: processInput
};