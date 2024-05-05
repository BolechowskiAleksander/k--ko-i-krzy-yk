const squares = document.querySelectorAll('.board__item');
const result = document.querySelector('.page__result');
const playerModeButtons = document.querySelectorAll('.page__player-mode-button');
let currentPlayer = 'X'; 
let againstComputer = false;

const checkWinner = () => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a].innerText && squares[a].innerText === squares[b].innerText && squares[a].innerText === squares[c].innerText) {
            return squares[a].innerText;
        }
    }
    return null;
}

const squareClick = (e) => {
    const square = e.target;
    if (square.innerText !== '' || checkWinner() || (againstComputer && currentPlayer === 'O')) {
        return;
    }
    square.innerText = currentPlayer;
    const winner = checkWinner();
    if (winner) {
        result.innerText = 'Zwycięzca: ' + winner;
        return;
    }
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    if (againstComputer && currentPlayer === 'O' && !winner) {
        const emptySquare = getRandomEmptySquare();
        if (emptySquare) {
            setTimeout(() => {
                emptySquare.innerText = 'O'; 
                const computerWinner = checkWinner();
                if (computerWinner) {
                    result.innerText = 'Zwycięzca: ' + computerWinner;
                }
            }, 500);
            if (currentPlayer === 'X') {
                currentPlayer = 'O';
            } else {
                currentPlayer = 'X';
            }
        } else {
            result.innerText = 'Remis!';
        }
    }
}

const getRandomEmptySquare = () => {
    const emptySquares = Array.from(squares).filter(square => square.innerText === '');
    if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        return emptySquares[randomIndex];
    } else {
        return null;
    }
}

const resetGame = () => {
    squares.forEach(square => square.innerText = '');
    result.innerText = '...';
    currentPlayer = 'X';
}

squares.forEach((square) => {
    square.addEventListener('click', squareClick);
});

playerModeButtons.forEach(button => {
    button.addEventListener('click', () => {
        playerModeButtons.forEach(button => button.classList.remove('active'));
        button.classList.add('active');
        againstComputer = button.textContent.includes('komputerowi');
        resetGame();
    });
});

