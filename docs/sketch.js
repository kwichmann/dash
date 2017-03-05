var dirt, wall, iron_wall, gem, explosion;

var dim_x = 40;
var dim_y = 30;

var tiles = [];
var next;

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
	explosion = loadImage("pics/explosion.png");
}

function setup() {
	createCanvas(800, 600);
		noStroke();

	for (var i = 0; i < dim_x; i++) {
		tile_row = [];
		for (var j = 0; j < dim_y; j++) {
			if (random() > .8) {
				switch (Math.floor(random(5))) {
					case 0:
						tile_row.push(new Empty(i, j));
						break;
					case 1:
						tile_row.push(new Wall(i, j));
						break;
					case 2:
						tile_row.push(new IronWall(i, j));
						break;
					case 3:
						tile_row.push(new Boulder(i, j));
						break;
					case 4:
						tile_row.push(new Gem(i, j));
						break;
				}	
			} else {
				tile_row.push(new Dirt(i, j));
			}				
		}
		tiles.push(tile_row);
	}

	player = new Player(0, 0);
	tiles[0][0] = new PlayerTile(0, 0);
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

	var target_x = constrain((player.x + player.dx * timer / game_speed) * 50 - width * 0.5, -50, (dim_x + 1) * 50 - width);
	var target_y = constrain((player.y + player.dy * timer / game_speed) * 50 - height * 0.5, -50, (dim_y + 1) * 50 - height);
	view_x = lerp(view_x, target_x, 0.1);
	view_y = lerp(view_y, target_y, 0.1);
}


function tile(x, y) {
	if (x < 0 || x >= dim_x || y < 0 || y >= dim_y) {
		return new IronWall(x, y);
	}
	return tiles[x][y];
}

function draw_tiles() {
	// Draw cave
	for (var i = -1; i < dim_x + 1; i++) {
		for (var j = -1; j < dim_y + 1; j++) {
			tile(i, j).show();
		}
	}
}

function update_tiles() {
	for (var i = 0; i < dim_x; i++) {
		for (var j = dim_y - 1; j >= 0; j--) {
			var this_tile = tiles[i][j];
			this_tile.move();
			if (this_tile.falls) {
				this_tile.fall();
			}

/*			var below = tile(i, j + 1);
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
			}*/
		}
	}	
}