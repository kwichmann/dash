var dirt, wall, iron_wall, gem;

var dim_x = 40;
var dim_y = 30;

var tiles = [];

var game_speed = 6;
var timer = 0;

var view_x = 1000;
var view_y = 1000;

var player;

function preload() {
	dirt = loadImage("pics/dirt.png");
	wall = loadImage("pics/wall.png");
	iron_wall = loadImage("pics/iron_wall.png");
	gem = loadImage("pics/gem.png");
}

function setup() {
	createCanvas(800, 600);
		noStroke();

	for (var i = 0; i < dim_x; i++) {
		tile_row = [];
		for (var j = 0; j < dim_y; j++) {
			if (random() > .8) {
				tile_row.push(Math.floor(random(6)));	
			} else {
				tile_row.push(1);
			}				
		}
		tiles.push(tile_row);
	}

	player = new Player(0, 0);
	tiles[0][0] = -1;
}

function draw() {
	background(0);
	push();
	translate(-view_x, -view_y);
	draw_tiles();
	player.draw();
	pop();

	player.update();

	timer += 1;
	if (timer >= game_speed) {
		update_tiles();
		player.move();
		timer = 0;
	}

	var target_x = constrain(player.x * 50 - width * 0.5, -50, (dim_x + 1) * 50 - width);
	var target_y = constrain(player.y * 50 - height * 0.5, -50, (dim_y + 1) * 50 - height);
	view_x = lerp(view_x, target_x, 0.1);
	view_y = lerp(view_y, target_y, 0.1);
}


function tile(x, y) {
	if (x < 0 || x >= dim_x || y < 0 || y >= dim_y) {
		return 2;
	}
	return tiles[x][y];
}

function draw_tiles() {
	// Draw cave
	for (var i = -1; i < dim_x + 1; i++) {
		for (var j = -1; j < dim_y + 1; j++) {
			var x = 50 * i;
			var y = 50 * j;
			switch (tile(i, j)) {
				case 1:
					image(dirt, x, y);
					break;
				case 2:
					image(iron_wall, x, y);
					break;
				case 3:
					image(wall, x, y);
					break;
				case 4:
					fill(100);
					ellipse(x + 25, y + 25, 50, 50);
					fill(255);
					ellipse(x + 12, y + 12, 8, 8);
					break;
				case 5:
					image(gem, x, y);
			}
		}
	}
}

function update_tiles() {
	for (var i = 0; i < dim_x; i++) {
		for (var j = dim_y; j >= 0; j--) {
			var this_tile = tiles[i][j];
			var below = tile(i, j + 1);
			if (this_tile >= 4) {
				if (below === 0) {
					tiles[i][j + 1] = this_tile;
					tiles[i][j] = 0;
				} else if (below >= 3) {
				if (tile(i - 1, j) === 0 && tile(i - 1, j + 1) === 0) {
						tiles[i - 1][j] = this_tile;
						tiles[i][j] = 0;
					} else if (tile(i + 1, j) === 0 && tile(i + 1, j + 1) === 0) {
						tiles[i + 1][j] = this_tile;
						tiles[i][j] = 0;
					} 
				} 
			}
		}
	}	
}