function Snake() {
  this.size = 50;
  this.windowSize = window.innerHeight.roundTo(this.size);
  this.head = createVector(this.windowSize/2, this.windowSize/2);
  this.body = [];
  this.speed = createVector(0, 0);
  this.score = 0;
  this.count = 0;
  
  this.locateFood = function() {
    var start = this.size;
    var end = width-this.size;
    this.food = createVector(random(start, end).roundTo(this.size), random(start, end).roundTo(this.size));
  };
  this.locateFood();

  
  this.getScore = function(){ 
    return this.score;
  };
  
  this.update = function() {
    if(this.body.length > 0) {
      for(var i = 0; i < this.body.length - 1; i++)
        this.body[i] = this.body[i+1];
      this.body[this.body.length-1] = createVector(this.head.x, this.head.y);
    }
  };
  
  this.moveHead = function() {
    this.head = createVector(this.head.x + this.speed.x * this.size, this.head.y + this.speed.y * this.size);
  };
  
  this.move = function() {
    if(this.hasCollided()) {
      return;
    } else if(this.hasEaten()) {
      this.grow();
    } else {
      this.update();
      this.moveHead();
    }
  };
  
  this.grow = function() {
    this.score++;
    this.body.push(createVector(this.head.x, this.head.y));
    this.moveHead();
    this.locateFood();
  };
  this.grow(); 
  
  this.hasEaten = function() {
    //if(head.distance(food) < size) {
    //  prvarln(head.distance(food));
    //  var a = -1;
    //  while(a-- != 0);
    //}
    var dist = (this.head.x-this.food.x) * (this.head.x-this.food.x) + (this.head.y-this.food.y) * (this.head.y-this.food.y);
    if(dist < this.size * this.size) {
      return true;
    }
    return false;
  };
  
  this.hasCollided = function() {
    if(this.head.x < 0 || this.head.x > width || this.head.y < 0 || this.head.y > height)
      return true;
    if(this.body.length < 2)
      return false;
    if(hasDuplicates(this.body.concat(this.head)))
      return true;
    return false;
  };
  
  this.move = function(dir) {
    if(this.hasCollided()) {
      return;
    } else if(this.hasEaten()) {
      this.grow();
    } else {
      this.update();
      switch(dir) {
        case 'u': 
          this.speed = createVector(0, -1);
          break;
        case 'd': 
          this.speed = createVector(0, 1);
          break;
        case 'l': 
          this.speed = createVector(-1, 0);
          break;
        case 'r': 
          this.speed = createVector(1, 0);
          break;
        case 's': 
          this.speed = createVector(0, 0);
      }
      this.moveHead();
    }
  };
  
  this.drawFood = function() {
    this.count++;
    stroke(200, 0, 100);
    fill(200, 0, 100);
    ellipseMode(CENTER);
    ellipse(this.food.x, this.food.y, this.size*sin(this.count), this.size*sin(this.count));
  };
  
  this.drawSnake = function() {
    stroke(0);
    fill(100, 200, 50);
    rectMode(CENTER);
    rect(this.head.x, this.head.y, this.size, this.size, 20);
    for(var i = 0; i < this.body.length; i++) {
      var x = this.body[i];
      stroke(0);
      fill(180);
      rectMode(CENTER);
      rect(x.x, x.y, this.size, this.size, 7);
    }
  };
  
  this.draw = function() {
    this.drawSnake();
    this.drawFood();
  };
  
  this.reset = function() {
    //this.score = 0;
    //this.head = createVector(width/2, height/2);
    //this.body = [];
    //this.grow();
    return new Snake();
  };
};

function hasDuplicates(arr) {
  var map = {}, i, size;
  for (i = 0, size = arr.length; i < size; i++){
      if (map[arr[i]]){
          return true;
      }
      map[arr[i]] = true;
  }
  return false;
}
