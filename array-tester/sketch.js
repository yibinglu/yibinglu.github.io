// 2D Grid Assignment
// Amy Lu
// January 26, 2021
//
// Extra for Experts:
// - Selecting a number would highlight all occurances of that number
// - The lines of text in the rules wil start a new line if the next word does not fit
// - The spacing between each line of text remains consistent regardless of window size

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
let numArray = [];
let isComplete = false;

let startLine1 = 70, startLine2, startLine3, startLine4;

function preload(){
  click = loadSound("assets/click1.wav");
  complete = loadSound("assets/complete.mp3");
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

  //These variables make the rest of the code shorter because they are commonly used
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

    //check if complete and play sound once
    if (checkCompletion() && isComplete === false){ 
      complete.play();
      isComplete = true;
    }
  }

  else {
    displayTitle();
    displayPlayButton();
    numberBounce();
  }
}

function drawGrid(){
  for (let y=0; y<rows; y++){
    for (let x=0; x<cols; x++){
      strokeWeight(0.5);
      fill(242, 239, 216);

      //highlights square
      if (addNum && x === cellX && y === cellY ||
         highlightNum && int(playerGrid[y][x]) === selectNum){
        fill(219, 218, 191);
      }
      rect(x*cellWidth + sidePadding, y*cellHeight + topPadding, cellWidth, cellHeight);

      //displays wrong numbers red and correct numbers black
      if (playerGrid[y][x] !== 0){
        if (int(playerGrid[y][x]) !== answer[y][x]){
          fill("red");
        }
        else{
          fill("black");
        }
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

    //if there is a number there, highlight all occurances
    if (int(playerGrid[y][x]) !== 0){ 
      highlightNum = true; 
  
      if (original[y][x] !== 0){
        selectNum = original[y][x];
      }
      else{
        selectNum = int(playerGrid[y][x]);
      }
    }
  
    //check if square selected is able to be changed
    if (original[y][x] === 0) { 
      addNum = true;
      cellX = x;
      cellY = y;
    }
  }

  //numbers bouncing on home screen
  else if (gamePlay === false && mouseX < windowWidth/2 - 175/2 || mouseX > windowWidth/2 + 175/2 || mouseY < windowHeight/2 + 75 || mouseY > windowHeight/2 + 125){
    let theNum = new Num(mouseX, mouseY);
    numArray.push(theNum);
    buttonSound.play();
  }
}

function keyPressed(){
  if (addNum === true){ 

    //user can only enter numbers 1-9
    if (keyCode >= 49 && keyCode <= 57){ 
      playerGrid[y][x] = key;
      click.play();
      addNum = false;

      //checks to see if correct
      if (int(playerGrid[y][x]) !== answer[y][x]){ 
        mistakes++;
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
  if (gamePlay === true){
    //clear button
    if (mouseX > sidePadding && mouseX < sidePadding + 100 && 
      mouseY > vertEdge + 10 && mouseY < vertEdge + 10 + 35) {
      mistakes = 0;
      isComplete = false;
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
      isComplete = false;
      mistakes = 0;
      buttonSound.play();
    }

    //reveal answer button
    if (mouseX > windowWidth/2 - 175/2 && mouseX < windowWidth/2 - 175/2 + 175 && mouseY > vertEdge + 10 && mouseY < vertEdge + 45){
      revealAnswer();
    }
  }

  else {
    //play button
    if (mouseX > windowWidth/2 - 175/2 && mouseX < windowWidth/2 + 175/2 &&
      mouseY > windowHeight/2 + 75 && mouseY < windowHeight/2 + 125){
      gamePlay = true;
      numArray = [];
      buttonSound.play();
    }
  }
}

function displayMistakes(){
  let mistakesText = "Mistakes: " + mistakes;
  fill("black");
  textSize(30);
  textFont("DIDOT");
  textAlign(RIGHT, CENTER);
  text(mistakesText, sideEdge, topPadding - 20);
}

function displayRules(){
  let rulesTitle = "HOW TO PLAY:";
  fill("black");
  textSize(25);
  textFont("DIDOT");
  textAlign(LEFT);
  text(rulesTitle, 20, 30);

  let letterSize = 20;

  let point1 = ["- Fill ", "in ", "the ", "numbers ", "1 ", "to ", "9 ", "exactly ", "once ", "in ", "every ", "row, ", "column, ", "and ", "3x3 ", "square ", "outlined ", "in ", "the ", "grid."];
  textSize(letterSize);
  let point1Spaced = textLengthCheck(point1);
  text(point1Spaced, 20, startLine1, sidePadding - sidePadding*0.2);
  let point1Lines = point1Spaced.match(/\n/g).length +1;
  let point1Height = point1Lines * letterSize + 70;
  startLine2 = point1Height + 30;

  let point2 = ["- Click ", "on ", "an ", "empty ", "sqaure ", "and ", "use ", "your ", "keyboard ", "to ", "fill ", "in ", "the ", "number. "];
  // textSize(20);
  let point2Spaced = textLengthCheck(point2);
  text(point2Spaced, 20, startLine2, sidePadding - sidePadding*0.2);
  let point2Lines = point2Spaced.match(/\n/g).length +1;
  let point2Height = point2Lines * letterSize;
  startLine3 = startLine2 + point2Height + 30;


  let point3 = ["- Click ", "on ", "a ", "number ", "to ", "highlight ", "all ", "occurances ", "of ", "that ", "number ", "in ", "the ", "grid. "];
  // textSize(20);
  let point3Spaced = textLengthCheck(point3);
  text(point3Spaced, 20, startLine3, sidePadding - sidePadding*0.2);
  let point3Lines = point3Spaced.match(/\n/g).length +1;
  let point3Height = point2Lines * letterSize;
  startLine4 = startLine3 + point3Height + 30;

  let point4 = ["- Click ", "on ", "an ", "number ", "you ", "wish ", "to ", "erase ", "and ", "hit ", "BACKSPACE. "];
  // textSize(20);
  let point4Spaced = textLengthCheck(point4);
  text(point4Spaced, 20, startLine4, sidePadding - sidePadding*0.2);
  // let point4Lines = point4Spaced.match(/\n/g).length +1;
  // let point4Height = point2Lines * letterSize;
}

function textLengthCheck(theText){
  let textStr = "";
  let totalLength = 0;
  for (let i = 0; i<theText.length; i++){
    totalLength += textWidth(theText[i]);
    if (totalLength > sidePadding - sidePadding*0.2){
      textStr = textStr.concat("\n");
      textStr = textStr.concat(theText[i]);
      totalLength = textWidth(theText[i]);
    }
    else {
      textStr = textStr.concat(theText[i]);
    }
  }
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
}

function displayTitle(){
  let title = "SUDOKU";
  textAlign(CENTER, CENTER);
  textSize(75);
  textFont("DIDOT");
  fill("black");
  text(title, windowWidth/2, windowHeight/2 - 100);

  let boringScreen = "(this home screen looks a little boring to me...)";
  textSize(20);
  text(boringScreen, windowWidth/2, windowHeight/2);
}

function displayPlayButton(){
  strokeWeight(2);
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
      if (int(playerGrid[y][x]) !== answer[y][x]){
        return false;
      }
    }
  }
  return true;
}

function numberBounce(){
  for (let i=0; i<numArray.length; i++) {     
    numArray[i].move();
    numArray[i].display();
  }
}

class Num {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-4, 4);
    this.dy = random(-4, 4);
    this.chosenNum = Math.round(random(1, 9));
    this.fontSize = random(35, 60);
  }

  display() {
    textSize(this.fontSize);
    text(this.chosenNum, this.x, this.y);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    //bounce on walls
    if (this.x - this.fontSize < 0 || this.x + this.fontSize > width) {
      this.dx *= -1;
    }
    if (this.y - this.fontSize < 0 || this.y + this.fontSize > height) {
      this.dy *= -1;
    }
  }
}
