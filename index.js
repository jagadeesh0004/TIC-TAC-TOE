const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
let gameActive = true;
let currentPlayer = 'X';
let gameState = Array(9).fill("");
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
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
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index');

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < 8; i++) {
        const condition = winningConditions[i];
        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        
        if (a === b && b === c) {
            roundWon = true;
            highlightWinner(condition);
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXDisplay.innerHTML = scoreX;
        } else {
            scoreO++;
            scoreODisplay.innerHTML = scoreO;
        }
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = 'It\'s a Draw!';
        gameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function highlightWinner(condition) {
    condition.forEach(index => {
        const winningCell = board.children[index];
        winningCell.classList.add('winner');
    });
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill("");
    statusDisplay.innerHTML = '';
    board.innerHTML = '';
    createBoard();
}

create
