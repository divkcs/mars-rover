var DIRECTIONS = require('./directions').out;

module.exports = function(rovers) {
	var output = '';
	var roverid = 0;
	rovers.forEach(function(rover) {
		roverid++;
		var direction = rover.getDirection();
		var position = rover.getPosition();
		output += 'Rover' + roverid + ':' + position.x + ' ' + position.y + ' ' + DIRECTIONS[direction] + '\n';
	});

	return output;
};