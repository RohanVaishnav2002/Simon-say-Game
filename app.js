let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0; // Add a variable to keep track of high score

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            if (level > highScore) {
                highScore = level; // Update the high score if the current level is higher
                displayHighScore();
            }
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpres() {
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn) {
    btn.addEventListener("click", btnpres);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

function displayHighScore() {
    console.log("High Score: ", highScore);
    highScoreDisplay.innerText = "High Score: " + highScore;
}
