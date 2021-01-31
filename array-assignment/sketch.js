// 2D Grid Assignment
// Amy Lu
// January 26, 2021
//
// Extra for Experts:
// - 

//Things to Do:
//Highlight row and box of selected number
//Startscreen
//Add music
//Number size ratio
//Add completion sound when finished row/col or square
//Add buttons for level reset and start screen
//Re-organize keyPressed()

let rows, cols, cellWidth, cellHeight;
let addNum = false;
let highlightNum = false;
let selectNum = "";
let x, y;
let click, complete, error;
let answer;
let playerGrid;
let original;
let mistakes = 0;
let sidePadding, topPadding, gridSize;
let sideEdge, vertEdge, bottomEdge;
let cellX, cellY;

function preload(){
  click = loadSound("assets/click1.wav");
  complete = loadSound("assets/complete.mp3"); //doesn't do anything yet
  error = loadSound("assets/error.wav");
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
  background(195, 217, 197);
  drawGrid();
  displayMistakes();
  displayRules();
}

function drawGrid(){
  for (let y=0; y<rows; y++){
    for (let x=0; x<cols; x++){
      strokeWeight(0.5);
      fill(242, 239, 216);
      if (addNum && x === cellX && y === cellY || highlightNum && int(playerGrid[y][x]) === selectNum){ //highlights square
        fill(219, 218, 191);
      }
      rect(x*cellWidth + sidePadding, y*cellHeight + topPadding, cellWidth, cellHeight);
      if (playerGrid[y][x] !== 0){
        fill("black");
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
  highlightNum = false;
  addNum = false;
  x = Math.floor((mouseX - sidePadding)/cellWidth);
  y = Math.floor((mouseY - topPadding)/cellHeight);

  if (int(playerGrid[y][x]) !== 0){
    highlightNum = true; 
    selectNum = int(playerGrid[y][x]);
  }

  else if (original[y][x] === 0) { //check if trying to select original number
    addNum = true;
    cellX = x;
    cellY = y;
  }

  else { //highlights all occurances of selected number
    highlightNum = true;
    selectNum = original[y][x];
  }
}

function keyPressed(){
  if (addNum === true){

    if (keyCode >= 49 && keyCode <= 57){ //user can only enter numbers 1-9
      playerGrid[y][x] = key;
      click.play();
      addNum = false;

      if (int(playerGrid[y][x]) !== answer[y][x]){ //checks to see if correct
        mistakes++;
        error.play();
      }
    }
  }

  //clean this up!!!
  else if (original[y][x] === 0){ //deletes selected number 
    if (keyCode === BACKSPACE){ 
      click.play();
      playerGrid[y][x] = 0;
      addNum = false;
    }

    else if (keyCode >= 49 && keyCode <= 57){
      playerGrid[y][x] = key;
      if (int(playerGrid[y][x]) !== answer[y][x]){ //checks to see if correct
        mistakes++;
        error.play();
      }
      else {
        click.play();
      }
    }
  }
}

function displayMistakes(){
  let mistakesText = "Mistakes: " + mistakes;
  fill("black");
  textSize(30);
  textFont("DIDOT");
  textAlign(RIGHT, CENTER);
  text(mistakesText, sideEdge, 45);
}

function displayRules(){
  let rulesTitle = "HOW TO PLAY:";
  fill("black");
  textSize(25);
  textFont("DIDOT");
  textAlign(LEFT);
  text(rulesTitle, 20, 30);

  let point1 = "- Fill in the numbers 1 to 9 exactly once   in every row, column, and 3x3 square   outlined in the grid.";
  textSize(20);
  text(point1, 20, 70, sidePadding - 100);

  let point2 = "- Click on an empty square and use your keyboard to fill in the number.";
  text(point2, 20, 160, sidePadding - 100);

  let point3 = "- Click on a number to highlight all       occurances of that number in the grid.";
  text(point3, 20, 230, sidePadding - 100);

  let point4 = "- Click on a number you wish to erase   and hit BACKSPACE";
  text(point4, 20, 300, sidePadding - 100);
}
