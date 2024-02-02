/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    // Constant Variables
        var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;

        var BOARD_HEIGHT = $('#board').height();
        var BOARD_WIDTH = $('#board').width();

        var obj1 = factoryFunction("#topRectangle");
        var obj2 = factoryFunction("#bottomRectangle");
        var obj3 = factoryFunction("#circle");

        obj3.speedX = 5;
        obj3.speedY = 5;

        var firstPoints = 0;
        var secondPoints = 0;

    // Game Item Objects
        var letter = {
            "Left": 65,
            "Right": 68,
        }

        var arrow = {
            "Left": 37,
            "Right": 39,
        }

    // one-time setup
        var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
        $(document).on('keydown', handleKeyDown);                       
        $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    /* 
    On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
    by calling this function and executing the code inside.
    */

        function newFrame() {
            redrawRectangles();
            repositionRectangles();

            moveCircle();
            redrawCircle();
            repositionCircle();

            borderCrash(obj1);
            borderCrash(obj2);
            borderCrash(obj3);

            bounce();
            handleNewVictor()
        }

    /* 
    Called in response to events.
    */
        function handleNewVictor() {

            endGame();
        }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

        function factoryFunction(id){
            var obj = {};

            obj.id = id;
            obj.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
            obj.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
            obj.width = $(id).width();
            obj.height = $(id).height();
            obj.speedX = 0;
            obj.speedY = 0;
            
            return obj;
        }

        function bounce() {
            if (obj3.x > obj1.width || obj3.x < obj2.width) {
            obj3.speedX -= obj3.speedX;
            }

            else if (obj3.x < 0 || obj3.x > 0 ) {
            obj3.speedX -= obj3.speedX;
            }
        }

    // Collision

        function borderCrash(obj) {
            if (obj.x >= BOARD_WIDTH) {
                obj.speedX = Math.random();
                obj.x = BOARD_WIDTH - 150;
            }

            else if (obj.x + 150 <= 0){
                obj.speedX = Math.random();
                obj.x = 0;
            }

            if (obj.y >= BOARD_HEIGHT) {
                obj.speedY = Math.random();
                obj.y = BOARD_HEIGHT - 150;
                secondPoints += 2;
                $('#secondScore').text(secondPoints);
            }

            else if (obj.y + 150 <= 0){
                obj.speedY = Math.random();
                obj.y = 0;
                firstPoints += 2;
                $('#firstScore').text(firstPoints);
            }
        }

    // Reposition Rectangles

        function repositionRectangles() {
            obj1.x += obj1.speedX;
            obj2.x += obj2.speedX;
        }

    //Redrawing Both Rectangles

        function redrawRectangles() {
            $("#topRectangle").css("top", obj1.y);
            $("#topRectangle").css("left", obj1.x);

            $("#bottomRectangle").css("top", obj2.y);
            $("#bottomRectangle").css("left", obj2.x);
        }

    // Moving Rectangles

        function handleKeyDown(event) {
            // First Player
                if (event.which === letter.Left) {
                obj1.speedX -= 5;
                }
                else if (event.which === letter.Right) {
                obj1.speedX += 5;
                }

            // Second Player
                if (event.which === arrow.Left) {
                obj2.speedX -= 5;
                }
                else if (event.which === arrow.Right) {
                obj2.speedX += 5;
                }
        }

    // Stopping Rectangles

        function handleKeyUp(event) {
            // First Player
                if (event.which === letter.Left) {
                obj1.speedX = 0;
                }
                else if (event.which === letter.Right) {
                obj1.speedX = 0;
                }

            // Second Player
                if (event.which === arrow.Left) {
                obj2.speedX = 0;
                }
                else if (event.which === arrow.Right) {
                obj2.speedX = 0;
                }       
        }

    // Circle

        function moveCircle() {
            obj3.y += obj3.speedY;
        }

        function redrawCircle() {
            $('#circle').css("left", obj3.x);
            $('#circle').css("top", obj3.y);
        }

        function repositionCircle() {
            if (obj3.y > BOARD_WIDTH) {
            obj3.speedX -= obj3.speedX;
            }

            else if (obj3.y < 0) {
            obj3.speedX -= obj3.speedX;
            }

            else if (obj3.y > BOARD_HEIGHT) {
            obj3.speedY -= obj3.speedY;
            }

            else if (obj3.y < 0) {
            obj3.speedY -= obj3.speedY;
            }
        }

    // Updating rounds

        // function score(){
        //     if ( BOARD_HEIGHT){

        //     }

        //     else if ( BOARD_HEIGHT){
                
        //     }
        // }

    // Ending Game

        function endGame() {
            if (firstPoints === 10  || secondPoints === 10){
                // stop the interval timer
                    clearInterval(interval);
                // turn off event handlers
                    $(document).off();
            }
        }
}

/*
Up score when ball goes outside the border
*/