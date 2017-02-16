function Player(x, y) {
	this.x = x;
	this.y = y;

	this.blinking = false;
	this.eyelids = 0;
	this.eyelids_speed = 0;

	this.move_left = false;
	this.move_right = false;
	this.move_up = false;
	this.move_down = false;

	this.feet = 0;
	this.feet_speed = 1;

	this.update = function() {
		this.blink();
		this.input();
	}

	this.blink = function() {		
		if (this.blinking) {
			this.eyelids += this.eyelids_speed;
			if (this.eyelids <= 0) {
				this.blinking = false;
				this.eyelids = 0;
				}
			if (this.eyelids >= 12) {
				this.eyelids_speed *= -1;
				}
			} else {
				if (random() < 0.01) {
					this.blinking = true;
					this.eyelids_speed = 1.5;
				}
			}
		}

	this.input = function() {
		if (keyIsDown(LEFT_ARROW)) {
			this.move_left = true;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.move_right = true;
		}
		if (keyIsDown(UP_ARROW)) {
			this.move_up = true;
		}
		if (keyIsDown(DOWN_ARROW)) {
			this.move_down = true;
		}
	}

	this.move = function() {
		
		// Calculate new tile (if any)
		var delta_x = 0;
		var delta_y = 0;

		if (this.move_left) {
			delta_x -= 1;
		}
		if (this.move_right) {
			delta_x += 1;
		}
		if (this.move_up) {
			delta_y -= 1;
		}
		if (this.move_down) {
			delta_y += 1;
		}

		// No diagonal moves
		if (delta_x !== 0) {
			delta_y = 0;
		}

		// Get new tile position
		var new_x = this.x + delta_x;
		var new_y = this.y + delta_y;
		
		// Check edges and get new tile
		if (new_x >= 0 && new_x < dim_x && new_y >= 0 && new_y < dim_y) {
			var new_tile = tiles[new_x][new_y];	
		} else {
			var new_tile = 2;
		}
		

		// Is movement allowed?
		var move_possible = (new_tile !== 2 && new_tile !== 3 && new_tile !== 4);

		if (move_possible) {
			tiles[new_x][new_y] = 0;
		}

		if (move_possible && !keyIsDown(32)) {
			this.x = new_x;
			this.y = new_y;
		}
		
		this.move_left = false;
		this.move_right = false;
		this.move_up = false;
		this.move_down = false;
		this.input();
	}

	this.draw = function() {
		translate(this.x * 50, this.y * 50);

		// Draw body
		fill(0, 255, 0);
		ellipse(25, 25, 30, 35);

		var feet_yoffset = 0;
		if (this.move_left || this.move_right || this.move_down || this.move_up) {
			feet_yoffset = this.feet;
			this.feet += this.feet_speed;
			if (this.feet === 3 || this.feet === -3) {
				this.feet_speed *= -1;
			}
		} else {
			this.feet = 0;
		}

		// Draw feet
		fill(0, 0, 255);
		ellipse(10, 42 + feet_yoffset, 12, 10);
		ellipse(40, 42 - feet_yoffset, 12, 10);

		// Draw head
		fill(255, 0, 0);
		ellipse(25, 12, 45, 20);

		var eye_xoffset = 0;
		if (this.move_left) {
			eye_xoffset -= 4;
		}if (this.move_right) {
			eye_xoffset += 4;
		}

		// Draw eyes
		fill(255);
		ellipse(20 + eye_xoffset, 10, 8, 12);
		ellipse(30 + eye_xoffset, 10, 8, 12);

		// Draw pupils
		fill(0);
		ellipse(20 + eye_xoffset, 10, 2, 4);
		ellipse(30 + eye_xoffset, 10, 2, 4);

		// Draw eyelids
		fill(255, 0, 0);
		rect(15 + eye_xoffset, 4, 20, this.eyelids);
	}
}