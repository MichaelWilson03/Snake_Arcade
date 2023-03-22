// Variables
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

let snake = [
  { x: 10, y: 5 }, //head
  { x: 10, y: 6 }, //body
  { x: 10, y: 7 }, //tail
];
let foodX;
let foodY;

const startingSnake = snake.length;
let nextDirection;

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

function createFood() {
  foodY = Math.floor(Math.random() * gameBoard.totalColumns);
  foodX = Math.floor(Math.random() * gameBoard.totalRows);
  if (snake.some((square) => square.x === foodX && square.y === foodY)) {
    createFood();
  }
  drawSquare(foodX, foodY, foodColor);
}

//start game with play button up being first move
playButton.addEventListener("click", function () {
  moveSnake(directions.UP);
  gameStarted = setInterval(moveSnake, FPS, directions.UP);
  axis = "x";
});

// move snake
document.addEventListener("keydown", move);

function moveSnake(direction) {
  removeSnake();
  nextDirection = { ...snake[0] };
  switch (direction) {
    case directions.UP:
      axis = "y";
      nextDirection.y--;
      break;

    case directions.DOWN:
      axis = "y";
      nextDirection.y++;
      break;
    case directions.RIGHT:
      axis = "x";
      nextDirection.x++;
      break;
    case directions.LEFT:
      axis = "x";
      nextDirection.x--;
      break;
  }
  checkGameOver();
  if (!gameStarted) return;
  snake.unshift(nextDirection);
  // if food eaten put food in different position
  if (nextDirection.x === foodX && nextDirection.y === foodY) {
    createFood();

    scoreCounter();
  } else {
    snake.pop();
  }
  drawSnake();

  // continue onto execution
}
function move(event) {
  if (!gameStarted) return;
  switch (event.key) {
    case directions.UP:
      if (axis === "y") return;
      moveSnake(directions.UP);
      clearInterval(gameStarted);
      gameStarted = setInterval(moveSnake, FPS, directions.UP);
      break;
    case directions.DOWN:
      if (axis === "y") return;
      moveSnake(directions.DOWN);
      clearInterval(gameStarted);
      gameStarted = setInterval(moveSnake, FPS, directions.DOWN);
      break;
    case directions.RIGHT:
      if (axis === "x") return;
      moveSnake(directions.RIGHT);
      clearInterval(gameStarted);
      gameStarted = setInterval(moveSnake, FPS, directions.RIGHT);
      break;
    case directions.LEFT:
      if (axis === "x") return;
      moveSnake(directions.LEFT);
      clearInterval(gameStarted);
      gameStarted = setInterval(moveSnake, FPS, directions.LEFT);
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
    alert(`Game Over! Your score was ${pointsEarned}`);
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

function scoreCounter() {
  pointsEarned = snake.length - startingSnake;
  score.innerHTML = `Score : ${pointsEarned}`;
}
let startX, startY;

// Add touch event listeners to the game container
document.addEventListener("touchstart", touchStart);
document.addEventListener("touchmove", touchMove);

function touchStart(e) {
  // Get the starting touch position
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}

function touchMove(e) {
  // Get the current touch position
  let currentX = e.touches[0].clientX;
  let currentY = e.touches[0].clientY;

  // Calculate the distance traveled in the X and Y direction
  let deltaX = currentX - startX;
  let deltaY = currentY - startY;

  // Determine the direction of the swipe
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Swipe in the X direction
    if (deltaX > 0) {
      // Swipe right
      moveSnake(directions.RIGHT);
    } else {
      // Swipe left
      moveSnake(directions.LEFT);
    }
  } else {
    // Swipe in the Y direction
    if (deltaY > 0) {
      // Swipe down
      moveSnake(directions.DOWN);
    } else {
      // Swipe up
      moveSnake(directions.UP);
    }
  }

  // Prevent the default scrolling behavior of the browser
  e.preventDefault();
}

drawBoard();
drawSnake();
createFood();
scoreCounter();
