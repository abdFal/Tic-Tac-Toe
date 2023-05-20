const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.getElementById("info");
const startCells = ["", "", "", "", "", "", "", "", ""];
const reloadBtn = document.getElementById("reload");
let allSquares;

reloadBtn.innerHTML = "Play Again";
reloadBtn.style.display = "none";
let go = "circle";
infoDisplay.textContent = "Circle First";

function createBoard() {
  gameBoard.innerHTML = ""; // Mengosongkan konten dalam gameBoard sebelum membuat kotak-kotak baru
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.appendChild(cellElement);
  });
  allSquares = document.querySelectorAll(".square"); // Mengupdate allSquares setelah membuat kotak-kotak baru
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.appendChild(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "It's now " + go + "'s turn";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let circleWins = false;
  let crossWins = false;
  let tied = false;

  winningCombo.forEach((array) => {
    const circleWon = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWon) {
      circleWins = true;
      return;
    }

    const crossWon = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWon) {
      crossWins = true;
      return;
    }
  });

  tied = Array.from(allSquares).every((square) => square.firstChild !== null);

  if (circleWins) {
    reloadBtn.style.display = "block";
    infoDisplay.innerHTML = "Circle Won The Game";
    allSquares.forEach((square) => {
      square.removeEventListener("click", addGo);
    });
  } else if (crossWins) {
    reloadBtn.style.display = "block";
    infoDisplay.innerHTML = "Cross Won The Game";
    allSquares.forEach((square) => {
      square.removeEventListener("click", addGo);
    });
  } else if (tied) {
    reloadBtn.style.display = "block";
    infoDisplay.innerHTML = "The game is tied";
    allSquares.forEach((square) => {
      square.removeEventListener("click", addGo);
    });
  }
}

function clearBoard() {
  allSquares.forEach((square) => {
    square.innerHTML = "";
    square.classList.remove("circle", "cross");
  });
  reloadBtn.style.display = "none";
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.innerHTML = "The Last Player Turn";
  createBoard();
}

reloadBtn.addEventListener("click", () => {
  clearBoard();
});

window.onbeforeunload = function (e) {
  return alert("Are You Sure For Quit?");
};

history.replaceState(null, null, "http://127.0.0.1:9001/TicTacToe");
