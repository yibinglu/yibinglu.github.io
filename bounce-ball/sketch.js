// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBalls[];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function mousePressed(){
  let ball = {
    x: mouseX,
    y: mouseY,
    diameter: random(25, 100),
    dx: random(-5, 5),
    dy: random(-5, 5),
    theColor: color(random(255), random(255),random(255),random(255))
  };
  theBalls.push(ball);
}

function moveBall(){
  for (let ball of theBalls){
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    //check bounce
    if (ball.x + ball.diameter/2 >= width || ball.x + ball.diameter/2 <= 0){
        ball.dx *= -1;
    }
  
    if (ball.y + ball.diameter/2 >= height || ball.y + ball.diameter/2 <= 0){
      ball.dy *= -1;
    }
  }
}

function dispalyBall(){
  for(let i = 0; i<theBalls.length; i++) {
    noStroke();
    fill(theBalls[i].theColor);
    ellipse(theBalls[i].x, theBalls[i].y, theBalls[i].diameter, theBalls[i].diameter)
  }
}
