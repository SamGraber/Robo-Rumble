function Scheduler(map) {
	this.map = map;
	this.phase = 0;
}

//the scheduler runs each of the robot turns, followed by the npcs, and finally the board elements.
//then optionally the robots and npcs get another chance to take an end-of-turn action.
//the scheduler has four public functions, newTurn, initPhase, runNext and runAll.

Scheduler.prototype.newTurn = function() {
	this.phase = 0;
};

Scheduler.prototype.initPhase = function() {
	if (this.phase <= this.map.game.phasesPerTurn)
	{
		//reinitialize the enumerators each phase, in order to sort by priority
		this.phase++;
		var sortedRobotList = _.sortBy(this.map.getRobots(), function(robot) { return -robot.priorities[this.phase]; }, this);	//reverse the sort order so highest priorities are placed first in the list
		this.robotEnumerator = new ArrayEnumerator(sortedRobotList);
		this.npcEnumerator = new ArrayEnumerator(this.map.getNPCs());
		this.boardElementEnumerator = new ArrayEnumerator(sortedRobotList);	//enumerates robots to activate the board elements nearby
		return true;
	}
	else
	{
		return false;
	}
};

Scheduler.prototype.runAll = function() {
	var endOfTurn = !this.runNext();
	
	while (endOfTurn === false)
	{
		endOfTurn = !this.runNext();
	}
};

Scheduler.prototype.runNext = function() {
	if (this.robotEnumerator.moveNext())
	{
		this.takeRobotTurn(this.robotEnumerator.current());
	}
	else if (this.npcEnumerator.moveNext())
	{
		this.takeNPCTurn(this.npcEnumerator.current());
	}
	else if (this.boardElementEnumerator.moveNext())
	{
		this.takeBoardElementTurn(this.boardElementEnumerator.current());
	}
	else
	{
		return false;
	}
	
	return true;
};

//
// Private methods
//

Scheduler.prototype.takeRobotTurn = function(robot) {
	robot.executePhase(this.phase, this.map);	//the map needs to get to the executing modules somehow. This may not be the best way to do it, but it'll work for now.
};

Scheduler.prototype.takeNPCTurn = function(npc) {

};

Scheduler.prototype.takeBoardElementTurn = function(boardElement) {

};