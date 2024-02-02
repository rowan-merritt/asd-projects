$(document).ready(function() {

    /////////////////////////////////////////////////
    /////////////////// SETUP ///////////////////////
    /////////////////////////////////////////////////

        var BOARD_WIDTH = $('#board').width();
        var positionX = 0;
        var speedX = 10;
        var points = 0;

        setInterval(update, 50);
        $('#box').on('click', handleBoxClick);

    /////////////////////////////////////////////////
    //////////////// CORE LOGIC /////////////////////
    /////////////////////////////////////////////////

        function update() {
            positionChange();
            redrawBox();
            moveBox();
        }

        function handleBoxClick() {
            increaseScore();
            increaseSpeed();
            ResetPosition();
        }

    /////////////////////////////////////////////////
    ////////////// HELPER FUNCTIONS /////////////////
    /////////////////////////////////////////////////

        function increaseScore(){
            // increase the score and update the number on the box
                points += 1;
                $('#box').text(points);
        }
        function increaseSpeed(){
            // increase the speed
                if (speedX >= 0) {
                    speedX += 3;
                } 
                else if (speedX < 0) {
                    speedX -= 3;
                }  
        }
        function ResetPosition(){
            // reset the position of the box
                positionX = 0;
        }



        function positionChange(){
            // change the box's position
                positionX += speedX;
        }

        function redrawBox(){
            // Redraw the box in the new position
                $('#box').css("left", positionX);
        }

        function moveBox(){
            // Check to see if the box has moved beyond the left or right boundary. If it has, change the direction of the box by multiplying the speed by -1.
                if (positionX > BOARD_WIDTH) {
                speedX = -speedX;
                }
                else if (positionX < 0) {
                speedX = -speedX;
                }
        }
});