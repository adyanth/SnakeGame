import java.util.*;
import java.awt.Point;

class Snake {
  private Point head;
  private List<Point> body;
  private Point food;
  private Point speed;
  private final Integer size = 50;
  //private final Float vel = 0.1;
  private Integer score;
  
  private int count = 0;
  Snake(Point s) {
    body = new ArrayList<Point>();
    head = new Point(width/2, height/2);
    speed = s;
    score = 0;
    grow();
  }
  
  void locateFood() {
    food = new Point(int(random(size/2, width-size/2)/size) * size, int(random(size/2, height-size/2)/size) * size);
  }
  
  private void grow() {
    score++;
    body.add(new Point(head.x, head.y));
    moveHead();
    locateFood();
  }
  
  Integer getScore(){ 
    return score;
  }
  
  private void update() {
    if(body.size() > 0) {
      for(int i = 0; i < body.size() - 1; i++)
        body.set(i, body.get(i+1));
      body.set(body.size()-1, new Point(head.x, head.y));
      
    }
  }
  void moveHead() {
    head.translate(int(speed.x * size), int(speed.y * size));
  }
  void move() {
    if(hasCollided()) {
      return;
    } else if(hasEaten()) {
      grow();
    } else {
      update();
      moveHead();
    }
  }
  
  boolean hasEaten() {
    //if(head.distance(food) < size) {
    //  println(head.distance(food));
    //  int a = -1;
    //  while(a-- != 0);
    //}
    if(head.distance(food) < size) {
      return true;
    }
    return false;
  }
  
  boolean hasCollided() {
    if(head.x < 0 || head.x > width || head.y < 0 || head.y > height)
      return true;
    if(body.size() < 2)
      return false;
    List<Point> test = new ArrayList<Point>();
    test.addAll(body);
    test.add(head);
    if(hasDuplicates(test))
      return true;
    return false;
  }
  
  void move(Character dir) {
    if(hasCollided()) {
      return;
    } else if(hasEaten()) {
      grow();
    } else {
      update();
      switch(dir) {
        case 'u': 
          speed.move(0, -1);
          break;
        case 'd': 
          speed.move(0, 1);
          break;
        case 'l': 
          speed.move(-1, 0);
          break;
        case 'r': 
          speed.move(1, 0);
          break;
        case 's': 
          speed.move(0, 0);
      }
      moveHead();
    }
  }
  
  private void drawFood() {
    count++;
    stroke(200, 0, 100);
    fill(200, 0, 100);
    ellipseMode(CENTER);
    ellipse(food.x, food.y, size*sin(count), size*sin(count));
  }
  
  private void drawSnake() {
    //println("Head : " + head);
    stroke(0);
    fill(100, 200, 50);
    rectMode(CENTER);
    rect(head.x, head.y, size, size, 20);
    for(Point x : body) {
      //println("Body : " + x);
      stroke(0);
      fill(180);
      rectMode(CENTER);
      rect(x.x, x.y, size, size, 7);
    }
  }
  
  void draw() {
    drawSnake();
    drawFood();
  }
  
  void reset() {
    score = 0;
    head = new Point(width/2, height/2);
    body.clear();
    grow();
  }
  
  
  private boolean hasDuplicates(List<Point> body) {
    List<Point> x = new ArrayList<Point>();
    for(Point p : body) {
      if(x.contains(p))
        return true;
      x.add(p);
    }
    return false;
  }
}
