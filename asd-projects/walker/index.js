/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }
  // Game Item Objects
  var walker = {
    "x": 1,
    "y": 1,
    "speedX": 0,
    "speedY": 0,
    "width": 50,
    "height": 50,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()
    handleWallCollision()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      console.log(event.which + " pressed")
      walker.speedY = -5 
    }
    if (event.which === KEY.DOWN) {
      console.log(event.which + " pressed")
      walker.speedY = 5 
    }
    if (event.which === KEY.LEFT) {
      console.log(event.which + " pressed")
      walker.speedX = -5 
    }
    if (event.which === KEY.RIGHT) {
      console.log(event.which + " pressed")
      walker.speedX = 5 
    }
  }
    function handleKeyUp(event) {
      if (event.which === KEY.UP || event.which === KEY.DOWN){
        walker.speedY = 0
      }
      if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
        walker.speedX = 0
      }
    }

    function handleWallCollision(){
      if (walker.x <= 0){
        endGame()
      }
      if (walker.y <= 0){
        endGame()
      }
      if (walker.x + walker.width >= $("#board").width()){
        endGame()
      }
      if (walker.y + walker.height >= $("#board").height()){
        endGame()
      }
    }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  

  function repositionGameItem(){
    walker.x += walker.speedX
    walker.y += walker.speedY
  }

  function redrawGameItem(){
    $("#Walker").css("left", walker.x)
    $("#Walker").css("top", walker.y)

  }
}
