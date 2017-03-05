class PlayerTile extends Tile {
	constructor(x, y) {
		super(x, y);
	}
}

// Overwrite show function, to display nothing
PlayerTile.prototype.show = function() {}


class Empty extends Tile {
	constructor(x, y) {
		super(x, y);
		this.empty = true;
		this.fallthrough = true;
		this.enterable = true;
	}
}

// Overwrite show function, to display nothing
Empty.prototype.show = function() {}


class Dirt extends Tile {
	constructor(x, y) {
		super(x, y);
		this.enterable = true;

		this.img = dirt;
	}
}


class Wall extends Tile {
	constructor(x, y) {
		super(x, y);

		this.slippery = true;

		this.img = wall;
	}
}


class IronWall extends Tile {
	constructor(x, y) {
		super(x, y);

		this.explodable = false;

		this.img = iron_wall;
	}
}


class Gem extends Tile{
	constructor(x, y) {
		super(x, y);
		
		this.falls = true;
		this.slippery = true;
		this.enterable = true;

		this.img = gem;
	}
}


class Boulder extends Tile {
	constructor(x, y) {
		super(x, y);

		this.falls = true;
		this.slippery = true;
		this.pushable = true;
	}
}

// Overwrite show function
Boulder.prototype.show = function() {
	var current_x = (this.x + this.vx * timer / game_speed) * 50
	var current_y = (this.y + this.vy * timer / game_speed) * 50
	fill(100);
	ellipse(current_x + 25, current_y + 25, 50, 50);
	fill(255);
	ellipse(current_x + 12, current_y + 12, 8, 8);
}