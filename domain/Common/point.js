function Point(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Point.prototype.toVector = function(relativePoint) {
	var vector = new Vector();
	vector.origin = this;
	vector.offset = relativePoint;
	return vector;
};

Point.prototype.add = function(relativePoint) {
	return new Point(this.x + relativePoint.x
					, this.y + relativePoint.y
					, this.z + relativePoint.z);
};

Point.prototype.inverse = function() {
	var inverse;
	inverse.x = invert(this.x);
	inverse.y = invert(this.y);
	inverse.z = invert(this.z);
		
	function invert(num) {
		if (num !== 0) {
			return 1 / num;
		}
		else {
			return Number.POSITIVE_INFINITY;
		}
	}
	
	return inverse;
};