// player choosing new game, default round is 5 rounds
// user click play button to start the game
let isUserChoseButton = false;
let currentRound = 1;
let maxRound = 10;
let userChoice = "";
let canPlay = false;
let gameStatistic = [];
let lastUserChoice = "";
let lastComputerChoice = "";

const playerScoreDisplay = document.querySelector(".player-score");
const computerScoreDisplay = document.querySelector(".computer-score");
const winStatus = document.querySelector(".win-status");
const playButton = document.querySelector(".play-button");

playButton.addEventListener("click", event => {
    if (currentRound >= 1 && currentRound <= maxRound) {
        canPlay = true;
        if (currentRound === 1) {
            // reset display scores
            playerScoreDisplay.innerText = 0;
            computerScoreDisplay.innerText = 0;

            event.target.innerText = `round ${currentRound}`;
        }
        if (lastUserChoice !== "") {
            document.querySelector(`.left-player .${lastUserChoice}`).classList.remove("selected");
        }

        if (lastComputerChoice !== "") {
            document.querySelector(`.right-player .${lastComputerChoice}`).classList.remove("selected");
        }

        // reset win-status
        winStatus.innerText = "";
    }
})


// user choosing rock or paper or scissor

//const winStatus = document.querySelector(".win-status");
const leftPlayer = document.querySelector(".left-player");

leftPlayer.addEventListener("click", event => {
    if (canPlay && currentRound <= maxRound) {

        if (lastUserChoice !== "") {
                document.querySelector(`.left-player .${lastUserChoice}`).classList.remove("selected");
        }

        if (event.target.closest(".rock") !== null 
        && event.target.closest(".rock").matches(".rock")) {
            userChoice = "rock";

            event.target.closest(".rock").classList.add("selected");
            lastUserChoice = "rock";
            console.info(userChoice);
        } else if (event.target.closest(".paper") !== null
        && event.target.closest(".paper").matches(".paper")) {
            userChoice = "paper";

            event.target.closest(".paper").classList.add("selected");
            lastUserChoice = "paper";
            console.info(userChoice);
        } else if (event.target.closest(".scissor") !== null
        && event.target.closest(".scissor").matches(".scissor")) {
            userChoice = "scissor";

            event.target.closest(".scissor").classList.add("selected");
            lastUserChoice = "scissor";
            console.info(userChoice);
        }

        // remove selected style from last selected element by computer
        if (lastComputerChoice !== "") {
            let tempLastSelectedElement = document.querySelector(`.right-player .${lastComputerChoice}`);
            tempLastSelectedElement.classList.remove("selected");
        }
        let computerChoice = generateComputerChoice();
        let tempWinStatus = compareUserAndComputer(userChoice, computerChoice);

        gameStatistic.push(tempWinStatus);
        document.querySelector(`.right-player .${computerChoice}`).classList.add("selected");
        lastComputerChoice = computerChoice;

        if (tempWinStatus === "win") playerScoreDisplay.innerText++;
        else if (tempWinStatus === "lose") computerScoreDisplay.innerText++;

        console.log(currentRound);

        document.querySelector(".play-button").innerText = `round ${currentRound+1}`;

        currentRound++;

        // add logic when last round if completed
        if (currentRound === maxRound + 1) {
            console.log("debug: " + currentRound);
            document.querySelector(".play-button").innerText = "play again";
            canPlay = false;
            currentRound = 1;
            if (playerScoreDisplay.innerText > computerScoreDisplay.innerText) {
                winStatus.innerText = "You win";
            } else if (playerScoreDisplay.innerText < computerScoreDisplay.innerText) {
                winStatus.innerText = "You lose";
            } else {
                winStatus.innerText = "Draw";
            }
        }
    }
})

// computer auto generate rock or paper or scissor
function generateComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;

    if (randomNumber === 1) return "rock";
    else if (randomNumber === 2) return "paper";
    else if (randomNumber === 3) return "scissor";
}

// compare both and select the winner
function compareUserAndComputer(userChoice, computerChoice) {
    if (userChoice === "rock") {
        if (computerChoice === "scissor") return "win";
        else if (computerChoice === "paper") return "lose";
        else return "draw";
    } else if (userChoice === "paper") {
        if (computerChoice === "rock") return "win";
        else if (computerChoice === "scissor") return "lose";
        else return "draw";
    } else if (userChoice === "scissor") {
        if (computerChoice === "paper") return "win";
        else if (computerChoice === "rock") return "lose";
        else return "draw";
    }
}