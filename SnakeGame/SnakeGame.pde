Snake snake;
Character keypress = 0;
Integer high = 0;
void setup() {
  frameRate(10);
  size(1000, 1000);
  snake = new Snake(new Point(0, 0));
  background(0);
  stroke(255);
}

void draw() {
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
    text("      Game   Over       ", width/4, height/2 - 100);
    text("Press c to Try Again !! ", width/4, height/2);
    if(keypress == 'c')
      snake.reset();
  } else { 
    if(keypress != 0) {
      snake.move(keypress);
      keypress = 0;
    } else {
      snake.move();
    }
    snake.draw();
  }
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
      keypress = 'u';
    } else if (keyCode == DOWN) {
      keypress = 'd';
    } else if (keyCode == LEFT) {
      keypress = 'l';
    } else if (keyCode == RIGHT) {
      keypress = 'r';
    }
  } else if(key == ' ') {
    keypress = 's';
  } else {
    keypress = key;
  }
}
