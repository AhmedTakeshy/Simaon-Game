var userClickedPattern = []

var gamePattern = []

var buttonsColor = ["red", "blue", "green", "yellow"];

var level = 0

// Beginnig-of-new-sequence
function nextSequence() {
    level ++;

    $("h1").text(`Level ${level}`);

    var randomNum = Math.round(Math.random() * 3);

    var randomChosenColor = buttonsColor[randomNum];

    gamePattern.push(randomChosenColor);
  
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    animatePress(randomChosenColor);
}


// Mouse-clicks
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour))
})


// Sound-animation
function playSound(name) {

    var audio = new Audio(`sounds/${name}.mp3`);

    audio.play();
}

// Color-animation
function animatePress(currentColor) {

    $(`#${currentColor}`).addClass("pressed");

    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed")
    }, 100);
}

// First-time-keydown
let key = false;
$(document).keydown(function () {
    if (!key) {
        nextSequence();
        key = true;
    }
    
})

// Checking-the-game
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        let count = 0;
        for (let i = 0; i < gamePattern.length; i++) {
            if (gamePattern[i] === userClickedPattern[i]) {
                count++
            }
        }
        if (count === gamePattern.length) {
            console.log("success");
            
            setTimeout(function () {
            nextSequence()
            }, 1000);
            userClickedPattern = []
    }    
        
        
    } else {
        console.log("wrong")
        
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over")
       
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        
        $("h1").text("Game Over, Press Any Key to Restart")

        startOver()
        
    }
}

// Start-again
function startOver() {
    level = 0;

    gamePattern.length = 0;

    userClickedPattern.length = 0;

    key = false;
}


