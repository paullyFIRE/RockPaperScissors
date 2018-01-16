	const playerScore = document.querySelector('#player-score');
        const cpuScore = document.querySelector('#cpu-score');
        const result = document.querySelector('#round-result');

        let gameState = {
            player: 0,
            cpu: 0,
            victoryLimit: 0,
            lastRoundMessage: ""
        }

        let round = playRound();
        updateState(round);

        //Update UI
        //Set Result Message, Updates Scores
        function updateState(round) {
            switch (round.roundResult) {
                case 0:
                    gameState.lastRoundMessage = "Play Nice! Pick one of the options.";
                    break;
                case 1:
                    gameState.player++;
                    gameState.lastRoundMessage = "You won";
                    break;
                case 2:
                    gameState.cpu++;
                    gameState.lastRoundMessage = "You Lost";
                    break;
                case 3:
                    gameState.lastRoundMessage = "It was a Tie!";
                    break;
            }

            playerScore.textContent = gameState.player;
            cpuScore.textContent = gameState.cpu;
            result.textContent = gameState.lastRoundMessage;
        }

        //Function
        //Returns Obj
        //	playerResponse: rock/paper/scissors,
        //      computerResponse: rock/paper/scissors,
        //      roundResult: 0 (invalid input), 1 (player wins), 2 (cpu wins), 3 (tie)
        function playRound(playerChoice) {
            let playerPrompt;

            if (!playerChoice) {
                playerPrompt = prompt("Rock, Paper, or Scissors?");
                playerPrompt = playerPrompt.toLowerCase();
            } else {
                playerPrompt = playerChoice;
            }

            let computer = opponentResponse();

            let response = {
                playerResponse: playerPrompt,
                computerResponse: computer,
                roundResult: null
            };

            response.roundResult = evaluateRound(playerPrompt, computer);

            return response;
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
