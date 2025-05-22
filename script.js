const board = document.getElementById("board");
const statusBar = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Create board cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("data-index", i);
  cell.addEventListener("click", handleCellClick);
  board.appendChild(cell);
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusBar.textContent = "Player " + currentPlayer + " Wins!";
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    statusBar.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusBar.textContent = "Player " + currentPlayer + "'s Turn";
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  return winningCombos.some((combo) => {
    return combo.every((index) => gameBoard[index] === currentPlayer);
  });
}

function checkDraw() {
  return gameBoard.every((cell) => cell !== "");
}

resetBtn.addEventListener("click", () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusBar.textContent = "Player X's Turn";

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
});
