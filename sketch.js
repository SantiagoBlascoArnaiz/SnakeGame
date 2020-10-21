class Sketch{
	constructor(){

		let sketchCanvas = document.createElement('canvas');
		sketchCanvas.id = "sketchCanvas";
		sketchCanvas.style.position = "relative";
		sketchCanvas.style.zIndex = 0;
		let gameDiv = document.getElementById("gameDiv");
		gameDiv.appendChild(sketchCanvas);

		gameDiv.style.width = sketchWidth * scale + "px";
		gameDiv.style.height = sketchHeight * scale + "px";




		this.sketch = document.getElementById("sketchCanvas");
		this.ctx = this.sketch.getContext("2d");


		this.ctx.canvas.width = sketchWidth * scale;
		this.ctx.canvas.height = sketchHeight * scale;
		this.ctx.canvas.style.left = "0px";
		this.ctx.canvas.style.top = "0px";


		this.ctx.fillStyle = sketchColor;
		this.ctx.fillRect(0, 0, sketchWidth * scale, sketchHeight * scale);

		this.apple = {x:1, y:1};
	}
	
	drawSquare(x, y, color){

		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * scale, y * scale, scale, scale);
	}

	drawSketch(){

		this.ctx.fillStyle = sketchColor;
		this.ctx.fillRect(0, 0, sketchWidth * scale, sketchHeight * scale);

		for(let i = 0; i < snake.tail.length; i++){
			if(i%2 == 0){
				this.drawSquare(snake.tail[i].x, snake.tail[i].y, currentColor1);
			}else{
				this.drawSquare(snake.tail[i].x, snake.tail[i].y, currentColor2);
			}
			
		}

		this.drawSquare(this.apple.x, this.apple.y, appleColor);
	}

	newApple(snake){

		let empty = false;

		while(empty == false){
			var x = Math.floor(Math.random() * sketchWidth);
			var y = Math.floor(Math.random() * sketchHeight);
			empty = snake.empty(x, y);
		}

		this.apple.x = x;
		this.apple.y = y;

	}
}