document.addEventListener("DOMContentLoaded", function() {
  const btnPlayer1 = document.getElementById("player1");
  const btnPlayer2 = document.getElementById("player2");
  const btn = document.getElementsByClassName("div-1");

  let isPlayer1Turn = true;

  function restartGame() {
    // Clear all classes from cells
    for (let cell of btn) {
      cell.classList.remove("bg", "bgR", "one", "two");
    }
    // Reset turn to Player 1
    isPlayer1Turn = true;
    // Clear player name inputs
    btnPlayer1.value = "";
    btnPlayer2.value = "";
  }

  function checkWinCondition(playerClass) {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of winCombos) {
      if (
        btn[combo[0]].classList.contains(playerClass) &&
        btn[combo[1]].classList.contains(playerClass) &&
        btn[combo[2]].classList.contains(playerClass)
      ) {
        return true;
      }
    }
    return false;
  }

  function isDraw() {
    for (let cell of btn) {
      if (!cell.classList.contains("bg") && !cell.classList.contains("bgR")) {
        return false; // If any cell is empty, game is not a draw
      }
    }
    return true; // All cells are filled, it's a draw
  }

  function cellClickCallback(cell) {
    if (!cell.classList.contains("bg") && !cell.classList.contains("bgR")) {
      if (isPlayer1Turn) {
        cell.classList.add("bg", "one");
      } else {
        cell.classList.add("bgR", "two");
      }

      // Check for win condition after adding classes
      if (checkWinCondition("one")) {
        alert(btnPlayer1.value + " won the match!");
        restartGame();
      } else if (checkWinCondition("two")) {
        alert(btnPlayer2.value + " won the match!");
        restartGame();
      } else if (isDraw()) {
        alert("It's a draw!");
        restartGame();
      }

      isPlayer1Turn = !isPlayer1Turn; // Switch turn after cell click
    }
  }

  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function() {
      cellClickCallback(this);
    });
  }
});