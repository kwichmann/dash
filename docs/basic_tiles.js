function Empty(x, y) {
	Tile.call(this);
	this.fallthrough = true;
	this.enterable = true;	
}

// Overwrite show function, to display nothing
Empty.prototype.show = function() {}


function Dirt(x, y) {
	Tile.call(this);
	this.enterable = true;

	this.img = dirt;
}


function Wall(x, y) {
	Tile.call(this);
	this.slippery = true;

	this.img = wall;
}


function IronWall(x, y) {
	Tile.call(this);
	this.explodable = false;

	this.img = iron_wall;
}


function Gem(x, y) {
	Tile.call(this);
	this.falls = true;
	this.slippery = true;
	this.enterable = true;

	this.img = gem;
}


function Boulder(x, y) {
	Tile.call(this);
	this.falls = true;
	this.slippery = true;
	this.pushable = true;
}

// Overwrite show function
Boulder.prototype.show = function() {
	var current_x = (this.x + this.vx * timer / game_speed) * 50
	var current_y = (this.y + this.vy * timer / game_speed) * 50
	fill(100);
	ellipse(current_x + 25, current_y + 25, 50, 50);
	fill(255);
	ellipse(x + 12, y + 12, 8, 8);
}