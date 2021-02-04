// 2D Grid Assignment
// Amy Lu
// January 26, 2021
//
// Extra for Experts:
// - Selecting a number would highlight all occurances of that number

//Things to Do:
//Make wrong number red
//Add different levels

//let newGrid = Object.values(playerGrid);

let rows, cols, cellWidth, cellHeight;
let addNum = false;
let highlightNum = false;
let selectNum = "";
let x, y;
let click, complete, error, buttonSound; //sounds
let answer, playerGrid, original; //grids
let mistakes = 0;
let sidePadding, topPadding, gridSize;
let sideEdge, vertEdge, bottomEdge;
let cellX, cellY;
let gamePlay = false;
let backgroundMusic;
// let wrongNumber = false;
let point1;
let spacedText;

function preload(){
  click = loadSound("assets/click1.wav");
  complete = loadSound("assets/complete.mp3"); //doesn't do anything yet
  error = loadSound("assets/error.wav");
  buttonSound = loadSound("assets/button.flac");
  // backgroundMusic = loadSound("assets/music.ogg"); 
  original = loadJSON("assets/sudoku1-original.json");
  answer = loadJSON("assets/sudoku1-answer.json"); 
  playerGrid = loadJSON("assets/sudoku1-player.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // backgroundMusic.loop();

  //center the grid
  gridSize = windowWidth*0.38;
  sidePadding = (windowWidth - gridSize)/2;
  topPadding = (windowHeight - gridSize)/2;

  //These two variables are just to make the rest of the code shorter as these values are commonly used
  sideEdge = sidePadding + gridSize;
  vertEdge = topPadding + gridSize;

  rows = 9;
  cols = 9;
  cellWidth = gridSize/cols;
  cellHeight = gridSize/rows;
}

function draw() {
  background(195, 217, 197);
  if (gamePlay === true){
    drawGrid();
    displayMistakes();
    displayRules();
    displayClearButton();
    displayHomeButton();
    displayRevealButton();
  }

  else {
    displayTitle();
    displayPlayButton();
  }
 
}

function drawGrid(){
  for (let y=0; y<rows; y++){
    for (let x=0; x<cols; x++){
      strokeWeight(0.5);
      fill(242, 239, 216);
      if (addNum && x === cellX && y === cellY ||
         highlightNum && int(playerGrid[y][x]) === selectNum){ //highlights square
        fill(219, 218, 191);
      }
      rect(x*cellWidth + sidePadding, y*cellHeight + topPadding, cellWidth, cellHeight);
      if (playerGrid[y][x] !== 0){
        // if (wrongNumber === true && x === cellX && y === cellY){
        //   fill("red");
        // }
        // else{
        //   fill("black");
        // }
        fill("black");
        textSize(30);
        textFont("DIDOT");
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

  //draw 3x3 outlines
  strokeWeight(2.5);
  line(sidePadding, topPadding + (gridSize * 1/3), sideEdge, topPadding + (gridSize * 1/3)); // horiz. top
  line(sidePadding, topPadding + (gridSize * 2/3), sideEdge, topPadding + (gridSize * 2/3)); //horiz. bottom
  line(sidePadding + (gridSize * 1/3), topPadding, sidePadding + (gridSize * 1/3), vertEdge); //vert. left
  line(sidePadding + (gridSize * 2/3), topPadding, sidePadding + (gridSize * 2/3), vertEdge); //vert. right
}

function mousePressed(){
  if (gamePlay === true){
    //click within grid
    highlightNum = false;
    addNum = false;
    x = Math.floor((mouseX - sidePadding)/cellWidth);
    y = Math.floor((mouseY - topPadding)/cellHeight);
  
    if (int(playerGrid[y][x]) !== 0){ //if there is a number there, highlight all occurances
      highlightNum = true; 
  
      if (original[y][x] !== 0){
        selectNum = original[y][x];
      }
      else{
        selectNum = int(playerGrid[y][x]);
      }
    }
  
    if (original[y][x] === 0) { //is the square you selected able to be changed?
      addNum = true;
      cellX = x;
      cellY = y;
    }
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
        // wrongNumber = true; 
        error.play();
      }
    }

    if (keyCode === BACKSPACE){ 
      click.play();
      playerGrid[y][x] = 0;
      addNum = false;
    }
    highlightNum = false; 
  }
}

//separate from mousePressed() to ensure that the buttons don't interfere with the gameplay
function mouseClicked(){
  //clear button
  if (mouseX > sidePadding && mouseX < sidePadding + 100 && 
    mouseY > vertEdge + 10 && mouseY < vertEdge + 10 + 35) {
    mistakes = 0;
    for (let y = 0; y<rows; y++){
      for (let x = 0; x<cols; x++){
        playerGrid[y][x] = original[y][x];
      }
    }
    buttonSound.play();
  }

  //home button
  if (mouseX > sidePadding + gridSize - 100 && mouseX < sidePadding + gridSize && 
    mouseY > vertEdge + 10 && mouseY < vertEdge + 45) { 
    for (let y = 0; y<rows; y++){
      for (let x = 0; x<cols; x++){
        playerGrid[y][x] = original[y][x];
      }
    }
    gamePlay = false;
    mistakes = 0;
    buttonSound.play();
  }

  //play button
  if (gamePlay === false){
    if (mouseX > windowWidth/2 - 175/2 && mouseX < windowWidth/2 + 175/2 &&
      mouseY > windowHeight/2 + 75 && mouseY < windowHeight/2 + 125){
      gamePlay = true;
      buttonSound.play();
    }
  }

  //reveal answer button
  if (mouseX > windowWidth/2 - 175/2 && mouseX < windowWidth/2 - 175/2 + 175 &&
    mouseY > vertEdge + 10 && mouseY < vertEdge + 45){
    revealAnswer();
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

  point1 = ["- Fill ", "in ", "the ", "numbers ", "1 ", "to ", "9 ", "exactly ", "once ", "in ", "every ", "row, ", "column, ", "and ", "3x3 ", "square ", "outlined ", "in ", "the ", "grid. "];
  textSize(20);
  spacedText = textLengthCheck(point1);
  text(spacedText, 20, 70, sidePadding - sidePadding*0.2);

  // let point2 = "- Click on an empty square and use your \n\t keyboard to fill in the number.";
  // text(point2, 20, 160, sidePadding - 100);

  // let point3 = "- Click on a number to highlight all occurances of that number in the grid.";
  // text(point3, 20, 230, sidePadding - 100);

  // let point4 = "- Click on a number you wish to erase and hit BACKSPACE";
  // text(point4, 20, 300, sidePadding - 100);
}

function textLengthCheck(theText){
  let textStr = "";
  let totalLength = 0;
  for (let i = 0; i<theText.length; i++){
    totalLength += textWidth(theText[i]);
    if (totalLength > sidePadding - sidePadding*0.2){
      textStr = textStr.concat("\n\t");
      totalLength = 0;
    }
    textStr = textStr.concat(theText[i]);
  }
  // console.log(textStr);
  return textStr;

}

function displayClearButton(){
  fill(219, 218, 191);
  rect(sidePadding, vertEdge + 10, 100, 35, 10);
  let clearText = "Clear";
  fill("black");
  textSize(25);
  text(clearText, sidePadding + 20, vertEdge + 27);
}

function displayHomeButton(){
  fill(219, 218, 191);
  rect(sidePadding + gridSize - 100, vertEdge + 10, 100, 35, 10);
  let homeText = "Home";
  fill("black");
  textSize(25);
  text(homeText, sidePadding + gridSize - 80, vertEdge + 27);
}

function displayRevealButton(){
  fill(219, 218, 191);
  rect(windowWidth/2 - 175/2, vertEdge + 10, 175, 35, 10);
  let revealText = "Reveal Answer";
  fill("black");
  textSize(25);
  text(revealText, windowWidth/2 - 155/2, vertEdge + 27);
}

function revealAnswer(){
  for (let y = 0; y<rows; y++){
    for (let x = 0; x<cols; x++){
      playerGrid[y][x] = answer[y][x];
    }
  }
  if (checkCompletion()){ // need to alter so that it will play when the user wins too
    complete.play();
  }
}

function displayTitle(){
  let title = "SUDOKU";
  textAlign(CENTER, CENTER);
  textSize(75);
  textFont("DIDOT");
  text(title, windowWidth/2, windowHeight/2 - 100);
}

function displayPlayButton(){
  fill(219, 218, 191);
  rect(windowWidth/2 - 175/2, windowHeight/2 + 75, 175, 50, 20);
  let playText = "PLAY";
  fill("black");
  textSize(35);
  textAlign(CENTER, CENTER);
  text(playText, windowWidth/2, windowHeight/2 + 100);
}

function checkCompletion(){
  for (let y = 0; y<rows; y++){
    for (let x = 0; x<cols; x++){
      if (playerGrid[y][x] !== answer[y][x]){
        return false;
      }
    }
  }
  return true;
}


