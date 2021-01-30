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


// let original = [[0, 0, 0, 2, 6, 0, 7, 0, 1],
//                 [6, 8, 0, 0, 7, 0, 0, 9, 0],
//                 [1, 9, 0, 0, 0, 4, 5, 0, 0],
//                 [8, 2, 0, 1, 0, 0, 0, 4, 0],
//                 [0, 0, 4, 6, 0, 2, 9, 0, 0],
//                 [0, 5, 0, 0, 0, 3, 0, 2, 8],
//                 [0, 0, 9, 3, 0, 0, 0, 7, 4],
//                 [0, 4, 0, 0, 5, 0, 0, 3, 6],
//                 [7, 0, 3, 0, 1, 8, 0, 0, 0]];

// let answer = [[4, 3, 5, 2, 6, 9, 7, 8, 1],
//               [6, 8, 2, 5, 7, 1, 4, 9, 3],
//               [1, 9, 7, 8, 3, 4, 5, 6, 2],
//               [8, 2, 6, 1, 9, 5, 3, 4, 7],
//               [3, 7, 4, 6, 8, 2, 9, 1, 5],
//               [9, 5, 1, 7, 4, 3, 6, 2, 8],
//               [5, 1, 9, 3, 2, 6, 8, 7, 4],
//               [2, 4, 8, 9, 5, 7, 1, 3, 6],
//               [7, 6, 3, 4, 1, 8, 2, 5, 9]];

let rows, cols, cellWidth, cellHeight;
let num;
let selectCell = false;
let x, y;
let myCanvas;
let click, complete;
let answer;
let playerGrid;
let original;
let mistakes = 0;

function preload(){
  click = loadSound("assets/click1.wav");
  complete = loadSound("assets/complete.mp3"); //doesn't do anything yet
  original = loadJSON("assets/sudoku1-original.json");
  answer = loadJSON("assets/sudoku1-answer.json"); //used saveJSONArray() but still cannot get length
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
  myCanvas = createCanvas(windowHeight*0.8, windowHeight*0.8);
  myCanvas.position(windowWidth*0.5 - windowHeight*0.8 / 2, windowHeight*0.1);


  rows = arrayLength(original);
  cols = original[0].length;
  cellWidth = width/cols;
  cellHeight = height/rows;

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
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      if (playerGrid[y][x] !== 0){
        textSize(25);
        textFont("VERDANA");
        textAlign(CENTER, CENTER);
        text(playerGrid[y][x], x*cellWidth + cellWidth/2, y*cellHeight + cellHeight/2);
      }

    }
  }
  //draw border 
  strokeWeight(5);
  line(0, 0, myCanvas.width, 0); //top
  line(myCanvas.width-1, myCanvas.width-1, 0, myCanvas.width-1); //bottom
  line(myCanvas.width-1, 0, myCanvas.width-1, myCanvas.width-1); //right
  line(0, 0, 0, myCanvas.width-1); //left

  //draw 3x3 outline
  strokeWeight(2.5);
  line(0, myCanvas.width * 1/3, myCanvas.width-1, myCanvas.width * 1/3); // horiz. top
  line(0, myCanvas.width * 2/3, myCanvas.width-1, myCanvas.width * 2/3); //horiz. bottom
  line(myCanvas.width * 1/3, 0, myCanvas.width * 1/3, myCanvas.width-1); //vert. left
  line(myCanvas.width * 2/3, 0, myCanvas.width * 2/3, myCanvas.width-1); //vert. right
}

function mousePressed(){
  x = Math.floor(mouseX/cellWidth);
  y = Math.floor(mouseY/cellHeight);

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
  textSize(50);
  textFont("VERDANA");
  textAlign(CENTER, CENTER);
  text(mistakesText, 0, myCanvas.height + 10);
}
