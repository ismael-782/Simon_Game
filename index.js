var pattern = [];
var userInput = [];
var level = 1;
var started = 0;

var title = document.querySelector("h1");

// (0, green);
// (1, red);
// (2, yellow);
// (3, blue);

document.addEventListener('keydown', Start);

function Start(event) {
    if (started == 1) {
        return;
    } else {
        started++;
        pattern = [];
        userInput = [];
        level = 1;
        title.textContent = "Level " + level;
        setTimeout(() => {
            generateNewPatter();
        }, 500);
    }
 
}

for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", () => {
        animateButton(document.querySelectorAll(".btn")[i], "pressed");
        playAudio(i);
        userInput.push(i);
        for (let j = 0; j < userInput.length; j++) {
            if (pattern[j] !== userInput[j]) {
                started = 0;
                losing();
                return;
            }
        }
        if (pattern.length == userInput.length) {
            title.textContent = "Level " + ++level;
            userInput = [];
            setTimeout(() => {
                generateNewPatter();
            }, 1000);
        }
    });
}

function losing() {
    title.textContent = "Game Over, Press Any Key to Start Again";
    level = 1;
    var end = new Audio("./sounds/wrong.mp3");
    end.play();
    animateButton(document.querySelector("body"), "game-over");
    userInput = [];
    pattern = [];
    document.addEventListener('keydown', Start);
}

function generateNewPatter() {
    var newPattern = Math.floor(Math.random() * 3 + 1)
    pattern.push(newPattern);
    animateButton(document.querySelectorAll(".btn")[newPattern], "pressed");
    playAudio(newPattern);
    return;
}

function animateButton(btn, properity) {
    btn.classList.toggle(properity);
    setTimeout(() => {
        btn.classList.toggle(properity);
    }, 150);
}

function playAudio(btn) {
    switch (btn) {
        case 0:
            var tom1 = new Audio("./sounds/green.mp3");
            tom1.play();
            break;

        case 1:
            var tom2 = new Audio("./sounds/red.mp3");
            tom2.play();
            break;

        case 2:
            var tom3 = new Audio('./sounds/yellow.mp3');
            tom3.play();
            break;

        case 3:
            var tom4 = new Audio('./sounds/blue.mp3');
            tom4.play();
            break;
        default: console.log(key);
    }
}