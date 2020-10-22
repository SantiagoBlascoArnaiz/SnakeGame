var sketch = new Sketch(sketchWidth, sketchHeight);
var snake = new Snake(0, 0, 0, 0);
console.log(snake);

document.addEventListener("keydown", keyPush);
sketch.newApple(snake);
//El juego tiene una tasa de refresco de 20 veces por segundo
setInterval(core, 1000/20);
setInterval(clock,1000);

function core(){
	snake.x = snake.x + snake.xv;
	snake.y = snake.y + snake.yv;
	console.log(snake.lives);

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
		snake.grow();
		sketch.newApple(snake);
	}

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
		case 87: //w
			snake.xv = 0;
			snake.yv = -1;
			break;
		case 65: //a
			snake.xv = -1;
			snake.yv = 0;
			break;
		case 83: //s
			snake.xv = 0;
			snake.yv = 1;
			break;
		case 68: //d
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
			currentColor1 = green1;
			currentColor2 = green2;
			break;
		case 50: //2
			currentColor1 = turqoise1;
			currentColor2 = turqoise2;
			break;
		case 51: //3
			currentColor1 = orange1;
			currentColor2 = orange2;
			break;
		case 52: //4
			currentColor1 = blue1;
			currentColor2 = blue2;
			break;
		case 53: //5
			currentColor1 = purple1;
			currentColor2 = purple2;
			break;
		case 54: //6
			currentColor1 = pink1;
			currentColor2 = pink2;
			break;
	}

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


