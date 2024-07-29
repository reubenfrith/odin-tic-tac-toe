const initialGameArray = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentGameArray = JSON.parse(JSON.stringify(initialGameArray));
let currentPlayer = "X";
let gameOver = false;

const displayGameArray = (gameArray) => {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    if (cell) {
      const row = Math.floor(i / 3);
      const column = i % 3;
      cell.textContent = gameArray[row][column];
      cell.onclick = () => handleCellClick(row, column);
    }
  }
};

const handleCellClick = (row, column) => {
  if (!gameOver && currentGameArray[row][column] === "") {
    currentGameArray[row][column] = currentPlayer;
    displayGameArray(currentGameArray);
    if (checkWinner(currentGameArray, currentPlayer)) {
      displayMessage(`The winner is ${currentPlayer}`);
      gameOver = true;
    } else if (checkDraw(currentGameArray)) {
      displayMessage("The game is a draw");
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
};

const checkWinner = (gameArray, player) => {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if (gameArray[i][0] === player && gameArray[i][1] === player && gameArray[i][2] === player) {
      return true;
    }
    if (gameArray[0][i] === player && gameArray[1][i] === player && gameArray[2][i] === player) {
      return true;
    }
  }
  // Check diagonals
  if (gameArray[0][0] === player && gameArray[1][1] === player && gameArray[2][2] === player) {
    return true;
  }
  if (gameArray[0][2] === player && gameArray[1][1] === player && gameArray[2][0] === player) {
    return true;
  }
  return false;
};

const checkDraw = (gameArray) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameArray[i][j] === "") return false;
    }
  }
  return true;
};

const displayMessage = (message) => {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
};

const resetGame = () => {
  currentGameArray = JSON.parse(JSON.stringify(initialGameArray));
  currentPlayer = "X";
  gameOver = false;
  displayMessage("");
  displayGameArray(currentGameArray);
};

document.getElementById("reset-button").onclick = resetGame;

displayGameArray(currentGameArray);
