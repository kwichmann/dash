function Tile(x, y) {
	// Position
	this.x = x;
	this.y = y;
	
	// Velocity
	this.vx = 0;
	this.vy = 0;

	// Is the tile empty?
	this.empty = false;

	// Is the tile affected by gravity?
	this.falls = false;

	// Is the tile currently falling?
	this.falling = false;

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
// Requires a this.img PImage
Tile.prototype.show = function() {
	image(this.img,
		(this.x + this.vx * timer / game_speed) * 50,
		(this.y + this.vy * timer / game_speed) * 50);
}

Tile.prototype.move = function() {
	if (this.vx !== 0 || this.vy !== 0) {
		var this_x = this.x;
		var this_y = this.y;
		var new_x = this.x + this.vx;
		var new_y = this.y + this.vy;
		next[new_x][new_y] = Object.create(this.constructor.prototype);
		console.log(next[new_x][new_y]);
		next[this_x][this_y] = new Empty(this_x, this_y); 
	}
}

Tile.prototype.fall = function() {
	if (this.falling) {
		var below = tile(this.x, this.y + 1);
		if (below.empty && !(player.x === this.x && player.y === (this.y + 1))) {
			this.vy = 1;
		}
	}
}