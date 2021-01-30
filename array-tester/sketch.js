// 2D Grid Assignment
// Amy Lu
// January 26, 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Things to Do:
//Outline selected numbers
//Highlight row and box of selected number
//Startscreen
//Add music
//Number size ratio

let rows, cols, cellWidth, cellHeight;
// let num;
let selectCell = false;
let x, y;
// let myCanvas;
let click, complete;
let answer;
let playerGrid;
let original;
let mistakes = 0;
let sidePadding, topPadding, gridSize;
let sideEdge, vertEdge, bottomEdge;

function preload(){
  click = loadSound("assets/click1.wav");
  complete = loadSound("assets/complete.mp3"); //doesn't do anything yet
  original = loadJSON("assets/sudoku1-original.json");
  answer = loadJSON("assets/sudoku1-answer.json"); //tried saveJSONArray() but still cannot get length
  playerGrid = loadJSON("assets/sudoku1-player.json");
}

//find length of JSON file
function arrayLength(grid){
  let length = 0;
  for (let i in grid){ //json file is an object? 
    length++;
  }
  return length;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //center the grid
  gridSize = windowWidth*0.38;
  sidePadding = (windowWidth - gridSize)/2;
  topPadding = (windowHeight - gridSize)/2;

  sideEdge = sidePadding + gridSize;
  vertEdge = topPadding + gridSize;

  rows = arrayLength(original);
  cols = original[0].length;
  cellWidth = gridSize/cols;
  cellHeight = gridSize/rows;
}

function draw() {
  background(220);
  drawGrid();
  displayMistakes();
}

function drawGrid(){
  for (let y=0; y<rows; y++){
    for (let x=0; x<cols; x++){
      strokeWeight(0.5);
      // if (selectCell){ only fill if x and y are equal to the saved position of selected cell
      //   fill(242, 239, 216);
      // }
      rect(x*cellWidth + sidePadding, y*cellHeight + topPadding, cellWidth, cellHeight);
      if (playerGrid[y][x] !== 0){
        textSize(25);
        textFont("VERDANA");
        textAlign(CENTER, CENTER);
        text(playerGrid[y][x], x*cellWidth + sidePadding + (cellWidth/2), y*cellHeight + topPadding + (cellHeight/2));
      }
    }
  }
  drawGridOutline();
}

function drawGridOutline(){
  //draw border 
  strokeWeight(2.5);
  line(sidePadding, topPadding, sideEdge, topPadding); //top
  line(sidePadding, topPadding + gridSize, sideEdge, vertEdge); //bottom
  line(sideEdge, topPadding, sideEdge, vertEdge); //right
  line(sidePadding, topPadding, sidePadding, vertEdge); //left

  //draw 3x3 outline
  strokeWeight(2.5);
  line(sidePadding, topPadding + (gridSize * 1/3), sideEdge, topPadding + (gridSize * 1/3)); // horiz. top
  line(sidePadding, topPadding + (gridSize * 2/3), sideEdge, topPadding + (gridSize * 2/3)); //horiz. bottom
  line(sidePadding + (gridSize * 1/3), topPadding, sidePadding + (gridSize * 1/3), vertEdge); //vert. left
  line(sidePadding + (gridSize * 2/3), topPadding, sidePadding + (gridSize * 2/3), vertEdge); //vert. right
}

function mousePressed(){
  x = Math.floor((mouseX - sidePadding)/cellWidth);
  y = Math.floor((mouseY - topPadding)/cellHeight);

  // save position of selected cell
  if (original[y][x] === 0) { //check if trying to select original number
    selectCell = true;
  }

}

function keyPressed(){
  if (selectCell === true){

    if (keyCode >= 49 && keyCode <= 57){ //user can only enter numbers 1-9
      playerGrid[y][x] = key;
      click.play();
      selectCell = false;

      if (playerGrid[y][x] !== answer[y][x]){ //checks to see if correct
        mistakes++;
      }
    }

    if (keyCode === BACKSPACE){ //deletes selected number
      click.play();
      playerGrid[y][x] = 0;
      selectCell = false;
    }
  }
}

function displayMistakes(){
  let mistakesText = "Mistakes: " + mistakes;
  textSize(20);
  textFont("VERDANA");
  textAlign(CENTER, CENTER);
  text(mistakesText, windowWidth - 100, 30);
}
