const score = document.getElementById("score");
const playButton = document.getElementById("play");
const highScore = document.getElementById("high_score");
let FPS = 1000 / 5;
let gameLoop;
const board = document.getElementById("board");
const ctx = board.getContext("2d");
let gameBoard = {
  totalRows: 18,
  totalColumns: 16,
};
const squareSize = 25;
board.width = gameBoard.totalRows * squareSize;
board.height = gameBoard.totalColumns * squareSize;
let gameStarted = false;
let axis;

const boardColor = "green";
const spaceColor = "black";
const headColor = "gray";
const bodyColor = "white";
const foodColor = "red";

let directions = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};
let pointsEarned = 0;

//draw board
function drawBoard() {
  ctx.fillStyle = boardColor;
  ctx.fillRect(0, 0, board.width, board.height);
}

//draw square
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

//draw snake
let snake = [
  { x: 10, y: 5 }, //head
  { x: 10, y: 6 }, //body
  { x: 10, y: 7 }, //tail
];
let nextDirection;

function drawSnake() {
  snake.forEach((square, i) => {
    const color = i === 0 ? headColor : bodyColor;
    drawSquare(square.x, square.y, color);
  });
}

function removeSnake() {
  snake.forEach((square) => drawSquare(square.x, square.y, boardColor));
}

//draw food

let foodX;
let foodY;

function createFood() {
  foodY = Math.floor(Math.random() * gameBoard.totalColumns);
  foodX = Math.floor(Math.random() * gameBoard.totalRows);
  if (snake.some((square) => square.x === foodX && square.y === foodY)) {
    createFood();
  }
  drawSquare(foodX, foodY, foodColor);
}

// move snake
function moveSnake(event) {
  if (!gameStarted) return;
  nextDirection = { ...snake[0] };
  removeSnake();
  switch (event.key) {
    case directions.UP:
      nextDirection.y--;
      snake.unshift(nextDirection);
      break;
    case directions.DOWN:
      nextDirection.y++;
      snake.unshift(nextDirection);
      break;
    case directions.LEFT:
      nextDirection.x--;
      snake.unshift(nextDirection);
      break;
    case directions.RIGHT:
      nextDirection.x++;
      snake.unshift(nextDirection);
      break;
  }
  if (nextDirection.x === foodX && nextDirection.y === foodY) {
    createFood();
  } else {
    snake.pop();
  }
  drawSnake();
}

document.addEventListener("keydown", move);
playButton.addEventListener("click", function () {
  // moveRight();
  gameStarted = setInterval(moveUp, FPS);
  axis = "x";
});

function moveRight() {
  removeSnake();
  nextDirection = { ...snake[0] };
  nextDirection.x++;
  checkGameOver();
  if (!gameStarted) return;
  snake.unshift(nextDirection);
  if (nextDirection.x === foodX && nextDirection.y === foodY) {
    createFood();
  } else {
    snake.pop();
  }
  drawSnake();
  axis = "x";
}

function moveLeft() {
  removeSnake();
  nextDirection = { ...snake[0] };
  nextDirection.x--;
  checkGameOver();
  if (!gameStarted) return;
  snake.unshift(nextDirection);
  if (nextDirection.x === foodX && nextDirection.y === foodY) {
    createFood();
  } else {
    snake.pop();
  }
  drawSnake();
  axis = "x";
}

function moveUp() {
  removeSnake();
  nextDirection = { ...snake[0] };
  nextDirection.y--;
  checkGameOver();
  if (!gameStarted) return;
  snake.unshift(nextDirection);
  if (nextDirection.x === foodX && nextDirection.y === foodY) {
    createFood();
  } else {
    snake.pop();
  }
  drawSnake();
  axis = "y";
}

function moveDown() {
  removeSnake();
  nextDirection = { ...snake[0] };
  nextDirection.y++;
  checkGameOver();
  if (!gameStarted) return;
  snake.unshift(nextDirection);
  if (nextDirection.x === foodX && nextDirection.y === foodY) {
    createFood();
  } else {
    snake.pop();
  }
  drawSnake();
  axis = "y";
}

function move(event) {
  if (!gameStarted) return;
  switch (event.key) {
    case directions.UP:
      if (axis === "y") return;
      moveUp();
      clearInterval(gameStarted);
      gameStarted = setInterval(moveUp, FPS);
      break;
    case directions.DOWN:
      if (axis === "y") return;
      moveDown();
      clearInterval(gameStarted);
      gameStarted = setInterval(moveDown, FPS);
      break;
    case directions.RIGHT:
      if (axis === "x") return;
      moveRight();
      clearInterval(gameStarted);
      gameStarted = setInterval(moveRight, FPS);
      break;
    case directions.LEFT:
      if (axis === "x") return;
      moveLeft();
      clearInterval(gameStarted);
      gameStarted = setInterval(moveLeft, FPS);
      break;
  }
}

function checkGameOver() {
  let snakeBody = snake.slice(1);
  if (
    nextDirection.x >= gameBoard.totalRows ||
    nextDirection.x < 0 ||
    nextDirection.y >= gameBoard.totalColumns ||
    nextDirection.y < 0 ||
    snakeBody.some(
      (part) => part.y === nextDirection.y && part.x === nextDirection.x
    )
  ) {
    clearInterval(gameStarted);
    gameStarted = false;
    axis = "";

    {
    }
    alert(`Game Over!`);
    snake = [
      { x: 10, y: 5 }, //head
      { x: 10, y: 6 }, //body
      { x: 10, y: 7 }, //tail
    ];
    drawBoard();
    drawSnake();
    createFood();
  }
}
// pointsEarned
const startingSnake = snake.length;
function scoreCounter() {
  pointsEarned = snake.length - startingSnake;
  score.innerHTML = `Score : ${pointsEarned}`;
}

drawBoard();
drawSnake();
createFood();
scoreCounter();
