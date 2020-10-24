var sketch = new Sketch(sketchWidth, sketchHeight);
var snake = new Snake(0, 0, 0, 0);



console.log(snake);

document.addEventListener("keydown", keyPush);

sketch.newApple(snake);
//El juego tiene una tasa de refresco de 20 veces por segundo
setInterval(core, 1000/20);
setInterval(clock,1000);

function core(){
	var gamepad = navigator.getGamepads()[0];
	if (gamepad != null){
		gamepadController(gamepad);
		console.log(gamepad);
	}
	

	snake.x = snake.x + snake.xv;
	snake.y = snake.y + snake.yv;

	//Controla que no se salga del tablero 
	//conectando los lados opuestos
	if (snake.x > sketchWidth - 1){
		snake.x = 0;
	}

	if (snake.x < 0){
		snake.x = sketchWidth - 1;
	}

	if (snake.y > sketchHeight - 1){
		snake.y = 0;
	}

	if (snake.y < 0){
		snake.y = sketchHeight - 1;
	}

	//Si la cabeza y la manzana están en la misma posición 
	//se suma un punto
	if(snake.x == sketch.apple.x && snake.y == sketch.apple.y){
		let mySound = new sound("eat.mp3");
		mySound.play();
		snake.grow();
		sketch.newApple(snake);
	}

	//if(snake.lives == 0)

	//Actualiza las posiciones de la serpiente
	snake.update();
	//Redibuja el tablero
	sketch.drawSketch();
	//Actualiza la puntuación
	document.getElementById("info").innerText = "Score: " + snake.score + "\nLives: " + snake.lives;

}


//Trata los eventos de pulsacion de teclas
function keyPush(evt){
	console.log(evt.keyCode);
	switch(evt.keyCode){
		//Movimiento
		case 87: //w    button 12
			snake.xv = 0;
			snake.yv = -1;
			break;
		case 65: //a     button 14
			snake.xv = -1;
			snake.yv = 0;
			break;
		case 83: //s  button 13
			snake.xv = 0;
			snake.yv = 1;
			break;
		case 68: //d    button 15
			snake.xv = 1;
			snake.yv = 0;
			break;


			//Restar una vida
		case 81: //q
			snake.death();
			break;
			//Sumar un punto
		case 69: //e
			snake.grow();
			break;
			//Reubicar la manzana
		case 82: //r
			sketch.newApple(snake);
			break;

			//Cambiar colores de la serpiente
		case 49: //1
			currentColor = 0;
			currentColor1 = green1;
			currentColor2 = green2;
			break;
		case 50: //2
			currentColor = 1;
			currentColor1 = turqoise1;
			currentColor2 = turqoise2;
			break;
		case 51: //3
			currentColor = 2;
			currentColor1 = orange1;
			currentColor2 = orange2;
			break;
		case 52: //4
			currentColor = 3;
			currentColor1 = blue1;
			currentColor2 = blue2;
			break;
		case 53: //5
			currentColor = 4;
			currentColor1 = purple1;
			currentColor2 = purple2;
			break;
		case 54: //6
			currentColor = 5;
			currentColor1 = pink1;
			currentColor2 = pink2;
			break;
	}

}

function gamepadController(gamepad){

	if(gamepad.buttons[12].pressed || (gamepad.axes[1] < -0.3)){	//Flecha arriba   axes 1
		snake.xv = 0;
		snake.yv = -1;
	}else if(gamepad.buttons[14].pressed || (gamepad.axes[0] < -0.3)){	//Flecha izquierda   axes 0
		snake.xv = -1;
		snake.yv = 0;
	}else if(gamepad.buttons[13].pressed || (gamepad.axes[1] > 0.3)){	//Flecha abajo    axes 1
		snake.xv = 0;
		snake.yv = 1;
	}else if(gamepad.buttons[15].pressed || (gamepad.axes[0] > 0.3)){	//Flecha derecha    axes 0
		snake.xv = 1;
		snake.yv = 0;
	}

	if(gamepad.buttons[1].pressed){
		snake.death();
	}

	if(gamepad.buttons[0].pressed){
		snake.grow();
	}

	if(gamepad.buttons[3].pressed){
		sketch.newApple(snake);
	}

	if(gamepad.buttons[2].pressed){
		switchColor();
	}
}

function switchColor(){
	currentColor++;
	currentColor = currentColor % (snakeColors.length/2);

	currentColor1 = snakeColors[currentColor*2];
	currentColor2 = snakeColors[currentColor*2 + 1];
}
//Lleva la cuenta del tiempo transcurrido desde que empezó la partida
function clock(){
	time++;
	document.getElementById("clock").innerText = "Time: " + convertTime(time);
}

//Convierte los segundos indicados a un formato h.m.s.
function convertTime(time){
	let h = Math.floor(time/3600);
	time %= 3600;
	let m = Math.floor(time/60);
	let s = time%60;

	return(h + "h. " + m + "m. " + s + "s.");
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
