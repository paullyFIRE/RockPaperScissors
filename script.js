//Update UI
//Set Result Message, Updates Scores
function updateState(result) {
   switch (result.roundResult) {
       case 0:
           gameState.lastRoundMessage = "Play Nice! Pick one of the options.";
           break;
       case 1:
           gameState.player++;
           gameState.lastRoundMessage = `They played ${result.computerResponse}. You Won!`;
           break;
       case 2:
           gameState.cpu++;
           gameState.lastRoundMessage = `They played ${result.computerResponse}. You Lost!`;
           break;
       case 3:
           gameState.lastRoundMessage = `They played ${result.computerResponse}. It was a Tie!`;
           break;
   }
}

function updateFE() {
    playerScore.textContent = gameState.player;
    cpuScore.textContent = gameState.cpu;
    result.textContent = gameState.lastRoundMessage;
}

//Function
//Returns Obj
//   playerResponse: rock/paper/scissors,
//      computerResponse: rock/paper/scissors,
//      roundResult: 0 (invalid input), 1 (player wins), 2 (cpu wins), 3 (tie)
function play(playerPrompt, computerTurn) {

   let response = {
       playerResponse: playerPrompt,
       computerResponse: computerTurn,
       roundResult: null
   };

   response.roundResult = evaluateRound(playerPrompt, computerTurn);

   updateState(response);
}

//Returns 0 (invalid input), 1 (player wins), 2 (cpu wins), 3 (tie)
function evaluateRound(playerTurn, computerTurn) {
   switch (playerTurn) {
       case computerTurn: //TIE
           return 3;
           break;
       case "rock":
           switch (computerTurn) {
               case "paper":
                   return 2;
                   break;
               case "scissors":
                   return 1;
                   break;
           }
           break;
       case "paper":
           switch (computerTurn) {
               case "scissors":
                   return 2;
                   break;
               case "rock":
                   return 1;
                   break;
           }
           break;
       case "scissors":
           switch (computerTurn) {
               case "rock":
                   return 2;
                   break;
               case "paper":
                   return 1;
                   break;
           }
           break;
       default: //invalid input, not Rock, Paper, or Scissors.
           return 0;
           break;
   }
}

//Random Generates Rock, Paper, or Scissors for the CPU.
function opponentResponse() {
   let response = Math.floor(Math.random() * 3 + 1);
   switch (response) {
       case 1:
           response = "rock";
           break;
       case 2:
           response = "paper";
           break;
       case 3:
           response = "scissors";
           break;
   }
   return response;
}

function resetGame() {
    let anyDisabledButtons = playerButtons.some(function(button) {
     return button.disabled; 
    });

    if(anyDisabledButtons) {
        toggleButtons();
    }
    
    gameState.player = 0;
    gameState.cpu = 0;
    gameState.lastRoundMessage = initialResultText;

}

function handleVictory() {
   if(gameState.player == gameState.victoryLimit) {
        //player won
        result.textContent = "You won the game :D";
        toggleButtons();
   } else if(gameState.cpu == gameState.victoryLimit) {
        //CPU won
        result.textContent = "You lost the game :(";
        toggleButtons();
   }
}

function toggleButtons() {
    playerButtons.forEach(button => {
        if(button.value !== 'reset') {
            button.disabled = !button.disabled;
        }
    });
}

window.onload = function () {
    //adding event listener for buttons
    playerButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            if(event.srcElement.value === "reset") {
                resetGame();
                updateFE();
            } else {
                let computer = opponentResponse();
                let round = play(event.srcElement.value, computer);
                updateFE();
                handleVictory();
            }
        });
    }); 
};

const playerScore = document.querySelector('#player-score');
const cpuScore = document.querySelector('#cpu-score');
const result = document.querySelector('#round-result');
const victoryScore = document.querySelector('#victory-score');
const playerButtons = Array.from(document.querySelectorAll('.play-button'));

const initialResultText = result.textContent;

//setting gamestate

var gameState = {
   player: 0,
   cpu: 0,
   victoryLimit: 5,
   lastRoundMessage: ""
}

victoryScore.textContent = gameState.victoryLimit;