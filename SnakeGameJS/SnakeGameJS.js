var snake;
var keypress = [];
var keypressed = 0;
var high = 0;
function setup() {
  frameRate(10);
  snake = new Snake();
  createCanvas(snake.windowSize, snake.windowSize);
  background(0);
  stroke(255);
}

function draw() {
  background(0);
  if(high < snake.getScore()) high = snake.getScore();
  textSize(24);
  fill(255, 0, 0);
  text("Score : " + snake.getScore(), width/2 - 70, 24);
  fill(0, 255, 255);
  text("High  : " + high, width/2 - 70, 48);
  fill(255, 0, 0);
  if(snake.hasCollided()) {
    textSize(48);
    text("      Game   Over       ", width/2 - 12*20, height/2 - 100);
    text("Press c to Try Again !! ", width/2 - 12*20, height/2);
    if(keypressed == "c") {
      snake = snake.reset();
      keypressed = 0;
    }
  } else { 
    if(keypress.length != 0) {
      snake.move(keypress[0]);
      keypress = keypress.slice(1);
    } else {
      snake.move();
    }
    snake.draw();
  }
}

onkeydown = function(key) {
  keypressed = 0;
  key = key || window.event;
  if (key.key == "ArrowUp") {
    keypress.push('u');
  } else if (key.key == "ArrowDown") {
    keypress.push('d');
  } else if (key.key == "ArrowLeft") {
    keypress.push('l');
  } else if (key.key == "ArrowRight") {
    keypress.push('r')
  } else if(key.key == ' ') {
    keypress.push('s')
  } else {
    keypressed = key.key;
  }
}

Number.prototype.roundTo = function(num) {
    var resto = this%num;
    if (resto < (num/2)) { 
        return this-resto;
    } else {
        return this+num-resto;
    }
}
