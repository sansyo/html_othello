const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const blackCountDisplay = document.getElementById("blackCount");
const whiteCountDisplay = document.getElementById("whiteCount");
let currentPlayer = "black";

function updateCounts() {
  let blackCount = 0;
  let whiteCount = 0;

  cells.forEach((cell) => {
    if (cell.dataset.cell === "black") {
      blackCount++;
    } else if (cell.dataset.cell === "white") {
      whiteCount++;
    }
  });

  blackCountDisplay.textContent = `Black: ${blackCount}`;
  whiteCountDisplay.textContent = `White: ${whiteCount}`;
}

function updateCurrentPlayerDisplay() {
  currentPlayerDisplay.textContent =
    `Current player: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}`;
}


function handleCellClick(e) {
  const cell = e.target;

  if (cell.dataset.cell) return;

  cell.dataset.cell = currentPlayer;
  currentPlayer = currentPlayer === "black" ? "white" : "black";
  currentPlayer = currentPlayer === "black" ? "white" : "black";
  updateCurrentPlayerDisplay();
  updateCounts();
}

function flipStones(x, y, color) {
  const directions = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],          [1,  0],
    [-1,  1], [0,  1], [1,  1]
  ];

  directions.forEach(([dx, dy]) => {
    let flippedStones = [];
    let [cx, cy] = [x + dx, y + dy];

  while (cx >= 0 && cx < 8 && cy >= 0 && cy < 8) {
    const cell = cells[cy * 8 + cx];

      if (!cell.dataset.cell) break;

      if (cell.dataset.cell === color) {
        flippedStones.forEach(([fx, fy]) => {
          cells[fy * 8 + fx].dataset.cell = color;
        });
        break;
      }

      flippedStones.push([cx, cy]);
      cx += dx;
      cy += dy;
    }
  });
}

function isValidMove(x, y, color) {
  if (cells[y * 8 + x].dataset.cell) return false;

  const directions = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],          [1,  0],
    [-1,  1], [0,  1], [1,  1]
  ];

  let valid = false;

  directions.forEach(([dx, dy]) => {
    let flippedStones = [];
    let [cx, cy] = [x + dx, y + dy];

    while (cx >= 0 && cx < 8 && cy >= 0 && cy < 8) {
      const cell = cells[cy * 8 + cx];

      if (!cell.dataset.cell) break;

      if (cell.dataset.cell === color) {
        if (flippedStones.length) valid = true;
        break;
      }

      flippedStones.push([cx, cy]);
      cx += dx;
      cy += dy;
    }
  });

  return valid;
}


function handleCellClick(e) {
  const cell = e.target;

  if (cell.dataset.cell) return;

  const index = Array.from(cells).indexOf(cell);
  const x = index % 8;
  const y = Math.floor(index / 8);

if (!isValidMove(x, y, currentPlayer)) return;

cell.dataset.cell = currentPlayer;
flipStones(x, y, currentPlayer);

currentPlayer = currentPlayer === "black" ? "white" : "black";
updateCurrentPlayerDisplay();
updateCounts();
}

function restartGame() {
currentPlayer = "black";
cells.forEach((cell) => {
cell.dataset.cell = "";
});
updateCurrentPlayerDisplay();
updateCounts();
}

function setInitialPosition() {
cells[27].dataset.cell = "black";
cells[28].dataset.cell = "white";
cells[35].dataset.cell = "white";
cells[36].dataset.cell = "black";
}

setInitialPosition();
board.addEventListener("click", handleCellClick);
restartButton.addEventListener("click", restartGame);