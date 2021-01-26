// 2D Grid Assignment
// Amy Lu
// January 26, 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [[0,0,0,0,0,0,0,0,0]
            [0,0,0,0,0,0,0,0,0]
            [0,0,0,0,0,0,0,0,0]
            [0,0,0,0,0,0,0,0,0]
            [0,0,0,0,0,0,0,0,0]
            [0,0,0,0,0,0,0,0,0]
            [0,0,0,0,0,0,0,0,0]
            [0,0,0,0,0,0,0,0,0]
            [0,0,0,0,0,0,0,0,0]];

let rows, cols, cellWidth, cellHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
}

function draw() {
  background(220);
  drawGrid();
}

function drawGrid(){
  for (let y=0; y<rows; y++){
    for (let x=0; x<cols; x++){
      if (grid[y][x] === 0){
        fill("white");
      }
      else{
        fill("black");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

