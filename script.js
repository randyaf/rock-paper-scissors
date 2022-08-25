// player choosing new game, default round is 5 rounds
// user click play button to start the game
let isUserChoseButton = false;
let currentRound = 1;
let maxRound = 10;
let userChoice = "";
let canPlay = false;
let gameStatistic = [];

const playerScoreDisplay = document.querySelector(".player-score");
const computerScoreDisplay = document.querySelector(".computer-score");

const playButton = document.querySelector(".play-button");
playButton.addEventListener("click", event => {
    if (currentRound >= 1 && currentRound < maxRound) {
        canPlay = true;
        if (currentRound === 1) {
            playerScoreDisplay.innerText = 0;
            computerScoreDisplay.innerText = 0;
        }
        // todo click event
    }
})
// user choosing rock or paper or scissor

//const winStatus = document.querySelector(".win-status");
const leftPlayer = document.querySelector(".left-player");



let lastUserChoice = "";
let lastComputerChoice = "";

leftPlayer.addEventListener("click", event => {
    if (canPlay && currentRound <= maxRound) {

        if (lastUserChoice !== "") {
                document.querySelector(`.left-player .${lastUserChoice}`).classList.remove("selected");
        }


        if (event.target.closest(".rock") !== null 
        && event.target.closest(".rock").matches(".rock")) {
            userChoice = "rock";

            // if (lastUserChoice !== "") {
            //     document.querySelector(`.left-player .${lastUserChoice}`).classList.remove("selected");
            // }

            event.target.closest(".rock").classList.add("selected");
            lastUserChoice = "rock";
            console.info(userChoice);
        } else if (event.target.closest(".paper") !== null
        && event.target.closest(".paper").matches(".paper")) {
            userChoice = "paper";

            // if (lastUserChoice !== "") {
            //     document.querySelector(`.left-player .${lastUserChoice}`).classList.remove("selected");
            // }

            event.target.closest(".paper").classList.add("selected");
            lastUserChoice = "paper";
            console.info(userChoice);
        } else if (event.target.closest(".scissor") !== null
        && event.target.closest(".scissor").matches(".scissor")) {
            userChoice = "scissor";

            // if (lastUserChoice !== "") {
            //     document.querySelector(`.left-player .${lastUserChoice}`).classList.remove("selected");
            // }

            event.target.closest(".scissor").classList.add("selected");
            lastUserChoice = "scissor";
            console.info(userChoice);
        }

        //todo set result status
        // remove selected style from last selected element by computer
        // for user


        if (lastComputerChoice !== "") {
            let tempLastSelectedElement = document.querySelector(`.right-player .${lastComputerChoice}`);
            tempLastSelectedElement.classList.remove("selected");
        }
        let computerChoice = generateComputerChoice();
        let tempWinStatus = compareUserAndComputer(userChoice, computerChoice);

        gameStatistic.push(tempWinStatus);
        //winStatus.innerText = `You ${tempWinStatus}`;
        document.querySelector(`.right-player .${computerChoice}`).classList.add("selected");
        lastComputerChoice = computerChoice;

        

        if (tempWinStatus === "win") playerScoreDisplay.innerText++;
        else if (tempWinStatus === "lose") computerScoreDisplay.innerText++;

        console.log(currentRound);

        currentRound++;
        if (currentRound === maxRound + 1) {
            canPlay = false;
            currentRound = 1;
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
// repeat to step 2


// when round reach 5, count the total and select the winner with biggest score
// if player win display "user win", else display "user lose"
