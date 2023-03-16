//Variables
const scoreCounter = document.getElementById("score");
const playButton = document.getElementById("play");
const restart = document.getElementById("restart");
let FPS = 1000 / 15;
let gameLoop;
const board = document.getElementById("board");
const ctx = board.getContext("2d");
const width = board.width,
  height = board.height;
let gameBoard = {
  totalRows: 17,
  totalColumns: 17,
};
const squareSize = 25;

let boardColor = "green",
  spaceColor = "black";
(headColor = "gray"), (bodyColor = "white"), (foodColor = "red");

//draw board
function drawBoard() {
  ctx.fillStyle = boardColor;
  ctx.fillRect(0, 0, width, height);
}

//draw square
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
  ctx.strokeStyle = spaceColor;
  ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

//draw snake
let snake = [
  { x: 10, y: 5 }, //head
  { x: 10, y: 6 }, //body
  { x: 10, y: 7 }, //tail
];

function drawSnake() {
  snake.forEach((square, i) => {
    const color = i === 0 ? headColor : bodyColor;
    drawSquare(square.x, square.y, color);
  });
}

//draw food
let foodX = Math.floor(Math.random() * gameBoard.totalColumns) * squareSize;
let foodY = Math.floor(Math.random() * gameBoard.totalRows) * squareSize;
function createFood() {
  (ctx.fillStyle = foodColor),
    ctx.fillRect(foodX, foodY, squareSize, squareSize);
  while (snake.some((square) => square.x === foodX && square.y === foodY)) {
    let food = createFood;
  }
  return createFood;
}

//move snake

function frame() {
  drawBoard();

  createFood();

  drawSnake();

  //   if (hitWall() || hitSelf()) {
  //     clearInterval(gameLoop);
  //     gameOver();
  //   }
}
frame();

gameLoop = setInterval(frame, FPS);
