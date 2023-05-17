const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.getElementById("info");
const startCells = ["", "", "", "", "", "", "", "", ""];
const reloadBtn = document.getElementById("reload");

reloadBtn.innerHTML = "Play Again";
reloadBtn.style.display = "none";
let go = "circle";
infoDisplay.textContent = "Circle First";
function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}
createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "It's now " + go + " go";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
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

  winningCombo.forEach((Array) => {
    let circleWins = Array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    if (circleWins) {
      reloadBtn.style.display = "block";
      infoDisplay.innerHTML = "Circle Won The Game";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
  winningCombo.forEach((Array) => {
    let crossWins = Array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (crossWins) {
      reloadBtn.style.display = "block";
      infoDisplay.innerHTML = "Cross Won The Game";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}

reloadBtn.addEventListener("click", () => {
  window.location.reload();
});

window.onbeforeunload = function (e) {
  return "Are You Sure For Quit?";
};

history.replaceState(null, null, "http://127.0.0.1:9001/TicTacToe");
