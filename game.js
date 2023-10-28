let score = 0;
const scoreDisplay = document.getElementById('score');
const holes = document.querySelectorAll('.hole');
let lastHole;
let timeUp = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function showMole(hole) {
    const mole = hole.querySelector('.mole');
    mole.style.bottom = '0';
    hole.classList.add('up');
}

function hideMole(hole) {
    const mole = hole.querySelector('.mole');
    mole.style.bottom = '-70px';
    hole.classList.remove('up');
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function hitMole(mole) {
    mole.classList.add('hit');
    setTimeout(() => mole.classList.remove('hit'), 400);
}

holes.forEach(hole => hole.addEventListener('click', () => {
    if (hole.classList.contains('up')) {
        score++;
        scoreDisplay.textContent = score;
        const mole = hole.querySelector('.mole');
        hitMole(mole);
        hideMole(hole);
    }
}));

const timeDisplay = document.getElementById('timeLeft');
let timeLeft = 10;

function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        timeUp = true;
        clearInterval(timerInterval);
        showGameOverModal();
    }
}

function peep() {
    const time = randomTime(400, 1000);
    const hole = randomHole(holes);
    showMole(hole);
    setTimeout(() => {
        hideMole(hole);
        if (!timeUp) peep();
    }, time);
}

let timerInterval;

function startGame() {
    clearInterval(timerInterval); 
    
    score = 0;
    timeLeft = 10;
    timeUp = false;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    timerInterval = setInterval(updateTimer, 1000);
    peep();
}

function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.textContent = score;
    modal.style.display = "block";
}

document.getElementById('playAgainFromModal').addEventListener('click', function() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = "none";
    startGame();
});

document.querySelector('.close-modal').addEventListener('click', function() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = "none";
});

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);

