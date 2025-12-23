 const gameInput = document.querySelector('[data-ns-test="game-number"]');
    const playBtn = document.querySelector('[data-ns-test="play-game"]');

    const roundsLeftEl = document.querySelector('[data-ns-test="rounds-left"]');
    const userPointsEl = document.querySelector('[data-ns-test="user-points"]');
    const computerPointsEl = document.querySelector('[data-ns-test="computer-points"]');
    const computerChooseEl = document.querySelector('[data-ns-test="computer-choose"]');
    const roundResultEl = document.querySelector('[data-ns-test="round-result"]');
    const gameResultEl = document.querySelector('[data-ns-test="game-result"]');

    const choices = ["ROCK", "PAPER", "SCISSORS"];

    let totalRounds = 0;
    let roundsLeft = 0;
    let userPoints = 0;
    let computerPoints = 0;

    // REQUIRED GLOBAL PROPERTY
    window.computerChoose = 0;

    playBtn.addEventListener("click", () => {
      totalRounds = parseInt(gameInput.value);
      if (!totalRounds || totalRounds <= 0) return;

      roundsLeft = totalRounds;
      userPoints = 0;
      computerPoints = 0;

      roundsLeftEl.textContent = roundsLeft;
      userPointsEl.textContent = userPoints;
      computerPointsEl.textContent = computerPoints;
      computerChooseEl.textContent = "-";
      roundResultEl.textContent = "-";
      gameResultEl.textContent = "-";
    });

    function playRound(userChoice) {
      if (roundsLeft <= 0) return;

      // Computer choice
      window.computerChoose = Math.floor(Math.random() * 3);
      const computerChoiceText = choices[window.computerChoose];
      computerChooseEl.textContent = computerChoiceText;

      let result = "TIE";

      if (userChoice !== window.computerChoose) {
        if (
          (userChoice === 0 && window.computerChoose === 2) ||
          (userChoice === 1 && window.computerChoose === 0) ||
          (userChoice === 2 && window.computerChoose === 1)
        ) {
          result = "WON";
          userPoints++;
        } else {
          result = "LOSE";
          computerPoints++;
        }
      }

      roundsLeft--;

      // Update UI
      roundResultEl.textContent = result;
      roundsLeftEl.textContent = roundsLeft;
      userPointsEl.textContent = userPoints;
      computerPointsEl.textContent = computerPoints;

      if (roundsLeft === 0) {
        if (userPoints > computerPoints) gameResultEl.textContent = "WON";
        else if (userPoints < computerPoints) gameResultEl.textContent = "LOSE";
        else gameResultEl.textContent = "TIE";
      }
    }

    document.querySelector('[data-ns-test="rock"]')
      .addEventListener("click", () => playRound(0));

    document.querySelector('[data-ns-test="paper"]')
      .addEventListener("click", () => playRound(1));

    document.querySelector('[data-ns-test="scissors"]')
      .addEventListener("click", () => playRound(2));