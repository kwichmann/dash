function Tile(x, y) {
	// Position
	this.x = x;
	this.y = y;
	
	// Velocity
	this.vx = 0;
	this.vy = 0;

	// Is the tile affected by gravity?
	this.falls = false;

	// Can other tiles affected by gravity enter the tile?
	this.fallthrough = false;

	// Does other, gravity-affected tiles roll off the tile?
	this.slippery = false;

	// Can the tile be blown up?
	this.explodeable = true;

	// Can the player push the tile?
	this.pushable = false;

	// Can the player enter the square of the tile?
	this.enterable = false;

	// Will contact with the tile result in player death?
	this.deadly = false;
}

// Generic show function
// This requires a this.img PImage
Tile.prototype.show = function() {
	image(this.img,
		(this.x + this.vx * timer / game_speed) * 50,
		(this.y + this.vy * timer / game_speed) * 50);
}