const gameBoard = document.getElementById('game');
const messageDiv = document.getElementById('message');
const resetButton = document.getElementById('reset');

let board = Array(9).fill(null);
let gameOver = false;
const human = 'X';
const computer = 'O';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


function createBoard() {
  gameBoard.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.dataset.index = index;
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', onCellClick);
    gameBoard.appendChild(cellDiv);
  });
  messageDiv.textContent = `Your turn (${human}).`;
}

function onCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || gameOver) return; 

  // Human move
  board[index] = human;
  e.target.textContent = human;

  if (checkWinner(human)) {
    messageDiv.textContent = "You win!";
    gameOver = true;
    return;
  }
  
  if (board.every(cell => cell)) {
    messageDiv.textContent = "It's a draw!";
    gameOver = true;
    return;
  }
  
  messageDiv.textContent = "Computer's turn...";
  setTimeout(computerMove, 500);
}

function computerMove() {
  const emptyIndices = board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null);

  if (emptyIndices.length === 0) return; 

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = computer;
  const cellDiv = document.querySelector(`.cell[data-index="${randomIndex}"]`);
  cellDiv.textContent = computer;

  if (checkWinner(computer)) {
    messageDiv.textContent = "Computer wins!";
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    messageDiv.textContent = "It's a draw!";
    gameOver = true;
    return;
  }
  
  messageDiv.textContent = `Your turn (${human}).`;
}

// Check for a winning combination for the given player
function checkWinner(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

// Reset the game
resetButton.addEventListener('click', () => {
  board = Array(9).fill(null);
  gameOver = false;
  createBoard();
});

// Initialize the game
createBoard();
