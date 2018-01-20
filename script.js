(function() {
    //Update UI
    //Set Result Message, Updates Scores
    function updateState(result) {
        switch (result.roundResult) {
            case 0:
                result.lastRoundMessage = "Something went wrong :(";
                break;
            case 1:
                gameState.player++;
                result.lastRoundMessage = `${capFirstLetter(result.computerResponse)} vs. ${capFirstLetter(result.playerResponse)}. You <span class="win">Won!</span>`;
                updateHistory(result.lastRoundMessage);
                break;
            case 2:
                gameState.cpu++;
                result.lastRoundMessage = `${capFirstLetter(result.computerResponse)} vs. ${capFirstLetter(result.playerResponse)}. You <span class="lose">Lost!</span>`;
                updateHistory(result.lastRoundMessage);
                break;
            case 3:
                result.lastRoundMessage = `${capFirstLetter(result.computerResponse)} vs. ${capFirstLetter(result.playerResponse)}. <strong>Tie!</strong>`;
                updateHistory(result.lastRoundMessage);
                break;
        }
    }

    //Post to history log
    function updateHistory(message) {
        const history = document.querySelector(".round-history");
        const p = document.createElement("p");
        p.innerHTML = message;
        history.insertBefore(p, history.firstChild);
    }

    //Clear children of History Section
    function clearHistory() {
        const history = document.querySelector(".round-history");
        history.innerHTML = "";
    }

    function capFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //Updates the SCores/Round Result Message
    function updateScores(response) {
        playerScore.innerHTML = gameState.player;
        cpuScore.innerHTML = gameState.cpu;
        if(response) {
            result.innerHTML = response.lastRoundMessage;
        }
    }

    //starts the round, taking in the player and CPU choices.
    function beginRound(playerPrompt, computerTurn) {

        let response = {
            playerResponse: playerPrompt,
            computerResponse: computerTurn,
            roundResult: null,
            lastRoundMessage: ""
        };

        //gets the round result and adds it to responseObject
        response.roundResult = evaluateRound(playerPrompt, computerTurn);

        //passes result to update gameState
        updateState(response);

        //update scores
        updateScores(response);

        //checks for victory conditions if previous round was NOT a tie
        if (response.roundResult !== 3) {
            handleVictory();
        }
    }

    //Returns 0 (invalid input), 1 (player wins), 2 (cpu wins), 3 (tie)
    function evaluateRound(playerTurn, computerTurn) {
        switch (playerTurn) {
            case computerTurn: //TIE
                return 3;
            case "rock":
                return computerTurn == "scissors" ? 2 : 1;
            case "paper":
                return computerTurn == "scissors" ? 2 : 1;
            case "scissors":
                return computerTurn == "rock" ? 2 : 1;
            default: //invalid input, not Rock, Paper, or Scissors.
                return 0;
        }
    }

    //Randomly Generates Rock, Paper, or Scissors for the CPU.
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

        if (anyDisabledButtons) {
            toggleButtons();
        }

        clearHistory();

        gameState.player = 0;
        gameState.cpu = 0;
        result.innerHTML = initialResultText;
    }

    //Checks for victory conditions.
    function handleVictory() {
        if (gameState.player == gameState.victoryLimit) {
            //player won
            result.textContent = "You won the game :D";
            toggleButtons();
            updateHistory(`<strong>${result.textContent}</strong>`);
        } else if (gameState.cpu == gameState.victoryLimit) {
            //CPU won
            result.textContent = "You lost the game :(";
            toggleButtons();
            updateHistory(`<strong>${result.textContent}</strong>`);
        }
    }

    //Toggles player-button states between enabled/disabled
    function toggleButtons() {
        playerButtons.forEach((button) => {
            if (button.value !== "reset") {
                button.disabled = !button.disabled;
            }
        });
    }

    window.onload = function() {
        //add victory score to FE
        victoryScore.textContent = gameState.victoryLimit;

        //adding event listener for buttons
        playerButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                if (event.currentTarget.value === "reset") {
                    resetGame();
                    updateScores();
                } else {
                    let computer = opponentResponse();
                    beginRound(event.currentTarget.value, computer);
                }
            });
        });
    };

    const playerScore = document.querySelector("#player-score");
    const cpuScore = document.querySelector("#cpu-score");
    const result = document.querySelector("#round-result");
    const victoryScore = document.querySelector("#victory-score");
    const playerButtons = Array.from(document.querySelectorAll(".play-button"));
    const initialResultText = result.textContent;

    //setting gamestate
    let gameState = {
        player: 0,
        cpu: 0,
        victoryLimit: 5
    }
})();
