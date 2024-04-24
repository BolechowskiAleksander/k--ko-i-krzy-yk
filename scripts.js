const squares = document.querySelectorAll('.board__item');
const resetButton = document.querySelector('.page__reset-button');
const result = document.querySelector('.page__result');
let currentPlayer = 'X'; 


function checkWinner() {
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


function squareClick(e) {
    const square = e.target;
    if (square.innerText !== '' || checkWinner()) {
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
}
squares.forEach((square) => {
    square.addEventListener('click', squareClick);
});


function resetGame() {
    squares.forEach(function(square) {
        square.innerText = '';
    });
    result.innerText = '...';
    currentPlayer = 'X';
}
resetButton.addEventListener('click', resetGame);



