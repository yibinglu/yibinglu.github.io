// 2D Grid Assignment
// Amy Lu
// January 26, 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];

let rows, cols, cellWidth, cellHeight;
let num;
let selectCell;
let cellX;
let cellY;

function setup() {
  let myCanvas = createCanvas(windowHeight*0.8, windowHeight*0.8);
  myCanvas.position(windowWidth*0.5 - (windowHeight*0.8 / 2), windowHeight*0.1);

  rows = grid.length;
  cols = grid[0].length;
  cellWidth = width/cols;
  cellHeight = height/rows;

}

function draw() {
  background(220);
  drawGrid();
}

function drawGrid(){
  for (let y=0; y<rows; y++){
    for (let x=0; x<cols; x++){
      strokeWeight(2);
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      num = grid[y][x];
      textSize(20);
      textFont('VERDANA');
      textAlign(CENTER, CENTER);
      text(num, x*cellWidth + cellWidth/2, y*cellHeight + cellHeight/2);

    }
  }
}

function mousePressed(){
  cellX = Math.floor(mouseX/cellWidth);
  cellY = Math.floor(mouseY/cellHeight);

  selectCell = true;
}

function keyIsPressed(){
  if (selectCell === true);
}