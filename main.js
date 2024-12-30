let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let modeSelection = document.querySelector(".mode-selection");
let container = document.querySelector(".container");
let playerVsPlayerBtn = document.querySelector("#player-vs-player");
let playerVsAIBtn = document.querySelector("#player-vs-ai");

let turnO = true; // PlayerO, PlayerX
let count = 0; // To track draw
let isAI = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Reset game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

// AI Move
const aiMove = () => {
  let emptyBoxes = Array.from(boxes).filter((box) => box.innerText === "");
  if (emptyBoxes.length > 0) {
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    count++;
    if (checkWinner()) return;
    if (count === 9) gameDraw();
    turnO = true; // Switch back to player
  }
};

// Box click logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || (isAI && !turnO)) return;
    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    count++;

    if (checkWinner()) return;
    if (count === 9) gameDraw();

    turnO = !turnO;

    if (isAI && !turnO) aiMove();
  });
});

// Show winner
const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Handle draw
const gameDraw = () => {
  msg.innerText = `It's a Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
};

// Mode selection
playerVsPlayerBtn.addEventListener("click", () => {
  isAI = false;
  modeSelection.classList.add("hide");
  container.classList.remove("hide");
});

playerVsAIBtn.addEventListener("click", () => {
  isAI = true;
  modeSelection.classList.add("hide");
  container.classList.remove("hide");
});

// Button event listeners
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);