class Snake {
	constructor(x, y, xv, yv){
		this.x = x;
		this.y = y;
		this.xv = xv;
		this.yv = yv;
		this.tail = [];
		this.score = 1;
		this.lives = 1;

		for(let i = 0; i < this.score; i++){
			this.tail.push({x:this.x,y:this.y});
		}
	}

	actualize(){

		for(let i = this.tail.length - 1; i > 0; i--){
			if(this.tail[i].x == this.x && this.tail[i].y == this.y){
				this.death();
				break;
			}

			this.tail[i].x = this.tail[i-1].x;
			this.tail[i].y = this.tail[i-1].y;
		}

		this.tail[0].x = this.x;
		this.tail[0].y = this.y;
	}

	grow(){
		this.score++;
		let lastX = this.tail[this.tail.length - 1].x;
		let lastY = this.tail[this.tail.length - 1].y;
		this.tail.push({x:lastX,y:lastY});
	}

	death(){
		this.lives--;

		if(this.lives == 0){
			this.score = 1;
			this.lives = 1;
			this.tail = [];
			this.tail.push({x:this.x,y:this.y});
		}

		time = 0;
	}

	empty(x, y){
		let empty = true;

		for(let i = 0; i < this.tail.length; i++){
			if(this.tail[i].x == x && this.tail[i].y == y){
				empty = false;
			}
		}
		return empty;
	}
}