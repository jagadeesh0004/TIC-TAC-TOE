// Select DOM elements
const board = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
const statusDiv = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

// Game state variables
let currentPlayer = 'X';
let gameActive = true;
let gameBoard = Array(9).fill(null);
let scores = { X: 0, O: 0 };

// Winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the board
function initBoard() {
    board.innerHTML = ''; // Clear the board
    gameBoard.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });
    updateStatus(`${currentPlayer}'s turn`);
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (!gameActive || gameBoard[index]) return; // Ignore if the game is inactive or cell is occupied

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        updateStatus(`${currentPlayer} wins!`);
        scores[currentPlayer]++;
        updateScores();
        gameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell)) {
        updateStatus('It\'s a tie!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch turns
    updateStatus(`${currentPlayer}'s turn`);
}

// Check for a win
function checkWin() {
    return winningCombos.some(combo => 
        combo.every(index => gameBoard[index] === currentPlayer)
    );
}

// Update scores
function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

// Restart the game
function restartGame() {
    gameBoard = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    initBoard();
}

// Update status message
function updateStatus(message) {
    statusDiv.textContent = message;
}

// Event listener for restart button
restartBtn.addEventListener('click', restartGame);

// Initialize the game on page load
initBoard();
