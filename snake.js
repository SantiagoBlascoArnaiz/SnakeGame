class Snake {
	constructor(x, y, xv, yv){
		this.x = x;
		this.y = y;
		this.xv = xv;
		this.yv = yv;
		this.tail = [];
		this.score = 1;
		this.lives = 1;
		
		//Añade la cabeza como la primera parte de la cola
		for(let i = 0; i < this.score; i++){
			this.tail.push({x:this.x,y:this.y});
		}
	}
	//Actualiza la posición de cada parte de la cola en base a la posición actual de la cabeza
	//y de la posición previa de cada parte de la cola
	update(){

		for(let i = this.tail.length - 1; i > 0; i--){
			//Si la cabeza se encuentra en la misma posición que una parte de la cola se penaliza
			if(this.tail[i].x == this.x && this.tail[i].y == this.y){
				this.death();
				break;
			}

			this.tail[i].x = this.tail[i-1].x;
			this.tail[i].y = this.tail[i-1].y;
		}
		//Actualiza después los valores de la cabeza para no pisar los datos
		this.tail[0].x = this.x;
		this.tail[0].y = this.y;
	}
	//La serpiente incrementa su cola
	grow(){
		this.score++;
		let lastX = this.tail[this.tail.length - 1].x;
		let lastY = this.tail[this.tail.length - 1].y;
		this.tail.push({x:lastX,y:lastY});
	}
	//Se ha cometido un fallo y se penaliza
	death(){
		this.lives--;
		
		//Si se han acabado las oportunidades se reinicia el juego
		if(this.lives == 0){
			this.score = 1;
			this.lives = 1;
			this.tail = [];
			this.tail.push({x:this.x,y:this.y});
		}

		time = 0;
	}
	//Comprueba que en la posición indicada no se encuentra la serpiente 
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
