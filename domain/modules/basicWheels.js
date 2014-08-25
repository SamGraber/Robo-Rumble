function BasicWheels(robot) {
	this.robot = robot;
	this.slots = 4;
}

BasicWheels.prototype.getInstructionList = function() {
	return [
		instruction.move1,
		instruction.move2,
		instruction.turnLeft,
		instruction.turnRight,
		instruction.uTurn
	];
};

BasicWheels.prototype.execute = function(action, map) {
	if (action == instruction.move1) {
		map.move(this.robot, this.robot.heading);
	}
};