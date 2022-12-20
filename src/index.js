const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const elementsBtn = document.querySelectorAll(".elements");
const computerScore = document.querySelector(".computer-score");
const playerScore = document.querySelector(".player-score");
const gameResult = document.querySelector(".game-result");
const finalResult = document.querySelector(".final-result");
const restartMessage = document.querySelector(".restart-message");
const numberOfRounds = document.querySelector(".total-number-of-rounds");
const actualRound = document.querySelector(".actual-round");

// Ask the player to confirm whther to start the game and how many rounds to play and then initialize the game with the total number of rounds and the current number of round starts at 1

// @ts-ignore
let hasStartbtnBeenClicked = false;
let totalRounds;
// @ts-ignore
startBtn.addEventListener("click", () => {
  // Check if the start button was clicked once and if true then alert a message preventing the user to start the game again as the game is already running

  if (hasStartbtnBeenClicked) {
    alert(
      "The game is already running! Press the RESTART button to initialize a new game."
    );
  }

  // Once the start button has been clicked and the game initialized, enable the restart, rock, paper and scissors button

  while (!hasStartbtnBeenClicked) {
    // A simple validation to check if the user type yes to start the game and then allow the user to input the number of rounds. If the suer's input is no or other string that is not === to yes/y then display a message saying to input yes/y and the number of rounds and that the number of rounds should be a number and that it shound not be less than or === to 0 or an empty string

    // @ts-ignore
    let confirmation = prompt("Start the game? (yes/y)").toLowerCase();
    if (confirmation === "yes" || confirmation === "y") {
      totalRounds = prompt("How many rounds do you want to play?");
    }
    let actualNumberOfRound = 1;
    // @ts-ignore
    if (
      // @ts-ignore
      isNaN(totalRounds) === false &&
      totalRounds !== "" &&
      !(totalRounds <= 0)
    ) {
      // Initialize the game and set the total number of rounds and the current round and enable the rock, paper and scissors button

      // @ts-ignore
      alert(`Inititalizing the game...
Game started!`);

      // @ts-ignore
      restartBtn.removeAttribute("disabled");
      // @ts-ignore
      numberOfRounds.textContent = "Total Rounds: " + totalRounds;
      // @ts-ignore
      actualRound.textContent = "Actual Round: " + actualNumberOfRound;
      elementsBtn.forEach((btn) => btn.removeAttribute("disabled"));
      hasStartbtnBeenClicked = true;
    } else {
      alert(
        "Type (yes/y) and the number of rounds (Number of rounds should be greater than 0) to start the game."
      );
    }
  }
});

// Restart the game by reloading the page

// @ts-ignore
restartBtn.addEventListener("click", () => {
  // @ts-ignore
  let confirmation = prompt(
    "Are you sure you want to restart the game? (yes/y)"
  ).toLowerCase();

  if (confirmation === "yes" || confirmation === "y") {
    // @ts-ignore
    alert(`Restarting...
Done!`);
    window.location.reload();
  }
});

// get the player choice ny retrieving the name of the button when it's clicked

elementsBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // @ts-ignore
    game(event.target.name);
  });
});

// get the computer's choice by generating random numbers between 0 and 2 and return the corresponding choice based on the number obtained

function getComputerChoice() {
  let computerChoice = Math.floor(Math.random() * 3);
  if (computerChoice === 0) {
    return "rock";
  } else if (computerChoice === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

// play a round of rock, paper, scissors by checking if the computer's choice is the same as the user's choice or the if the computer or the player win then return a number between 0 and 2 which will be used in the game function to display the correct result for the round

function playRound(computerSelection, playerSelection) {
  if (computerSelection === playerSelection) {
    return 0;
  } else if (
    (computerSelection === "rock" && playerSelection === "scissors") ||
    (computerSelection === "paper" && playerSelection === "rock") ||
    (computerSelection === "scissors" && playerSelection === "paper")
  ) {
    return 1;
  } else {
    return 2;
  }
}

// Returns the result of the rounds

let scoreOfComputer = 0;
let scoreOfPlayer = 0;
let numOfActualRound = 1;

function game(getPlayerChoice) {
  // Play a round by taking the computer's choice and the player's choice

  let result = playRound(getComputerChoice(), getPlayerChoice);

  // Checking whether the current round is the less than the total number of rounds if so we keep playing until they are both ===

  if (numOfActualRound < totalRounds) {
    // Enable the rock, paper, scissors button

    setTimeout(() => {
      // @ts-ignore
      actualRound.textContent = `Actual Round: ${numOfActualRound}`;
      // @ts-ignore
      gameResult.textContent = "";
      elementsBtn.forEach((btn) => {
        btn.removeAttribute("disabled");
      });
    }, 3000);
    numOfActualRound++;
    // @ts-ignore

    // Using the value returned by the playround function to check who wins and display it as the result for the round

    if (result === 0) {
      // @ts-ignore
      computerScore.textContent = `Computer Score: ${scoreOfComputer}`;
      // @ts-ignore
      playerScore.textContent = `Player Score: ${scoreOfPlayer}`;
      // @ts-ignore
      gameResult.textContent = "It's a tie! No winner for this round.";
    } else if (result === 1) {
      scoreOfComputer++;
      // @ts-ignore
      computerScore.textContent = `Computer Score: ${scoreOfComputer}`;
      // @ts-ignore
      gameResult.textContent = "Computer win this round!";
    } else {
      scoreOfPlayer++;
      // @ts-ignore
      playerScore.textContent = `Player Score: ${scoreOfPlayer}`;
      // @ts-ignore
      gameResult.textContent = "You win this round!";
    }

    // Disable the rock, paper, scissors button temporarily until there's nothing on the screen so that the user needs to wait until the result on the screen disappears first then can click again to play the next round

    // @ts-ignore
    if (gameResult.textContent !== "") {
      elementsBtn.forEach((btn) => {
        btn.setAttribute("disabled", "");
      });
    }
  } else {
    // Display a message for the winner of the round and another one saying that the computer win and then disable the rock, paper, scissors button so that the user can no longer play again as it's the end of the game

    if (result === 1) {
      setTimeout(() => {
        elementsBtn.forEach((btn) => {
          btn.setAttribute("disabled", "");
        });

        if (scoreOfComputer > scoreOfPlayer) {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "Computer Win!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        } else if (scoreOfComputer < scoreOfPlayer) {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "You Win!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        } else {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "No winner this time!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        }
      }, 3000);

      scoreOfComputer++;
      // @ts-ignore
      computerScore.textContent = `Computer Score: ${scoreOfComputer}`;
      // @ts-ignore
      gameResult.textContent = "Computer win this round!";

      // @ts-ignore
      if (gameResult.textContent !== "") {
        elementsBtn.forEach((btn) => {
          btn.setAttribute("disabled", "");
        });
      }
    } else if (result === 2) {
      // The same happens here but instead of displaying a message for the computer, it will be for the player

      // @ts-ignore
      setTimeout(() => {
        elementsBtn.forEach((btn) => {
          btn.setAttribute("disabled", "");
        });
        if (scoreOfComputer > scoreOfPlayer) {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "Computer Win!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        } else if (scoreOfComputer < scoreOfPlayer) {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "You Win!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        } else {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "No winner this time!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        }
      }, 3000);

      scoreOfPlayer++;
      // @ts-ignore
      playerScore.textContent = `Player Score: ${scoreOfPlayer}`;
      // @ts-ignore
      gameResult.textContent = "You win this round!";

      // @ts-ignore
      if (gameResult.textContent !== "") {
        elementsBtn.forEach((btn) => {
          btn.setAttribute("disabled", "");
        });
      }
    } else {
      // Same but this time if neither the computer nor the player win

      // @ts-ignore
      setTimeout(() => {
        elementsBtn.forEach((btn) => {
          btn.setAttribute("disabled", "");
        });
        if (scoreOfComputer > scoreOfPlayer) {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "Computer Win!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        } else if (scoreOfComputer < scoreOfPlayer) {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "You Win!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        } else {
          // @ts-ignore
          gameResult.textContent = "Game Over!";
          // @ts-ignore
          finalResult.textContent = "No winner this time!";

          // @ts-ignore
          restartMessage.textContent =
            "Press the RESTART button to initialize a new game.";
        }
      }, 3000);
      // @ts-ignore
      computerScore.textContent = `Computer Score: ${scoreOfComputer}`;
      // @ts-ignore
      playerScore.textContent = `Player Score: ${scoreOfPlayer}`;
      // @ts-ignore
      gameResult.textContent = "It's a tie! No winner for this round.";

      // @ts-ignore
      if (gameResult.textContent !== "") {
        elementsBtn.forEach((btn) => {
          btn.setAttribute("disabled", "");
        });
      }
    }
  }
}
