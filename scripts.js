const Gameboard = (() => {
    let board = []; // create a 3x3 board
    const rows = 3; 
    const columns = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = '';
        }
    }
    const getBoard = () => board;
    return {getBoard};
})();

const DOM = (() => {  
    let row;
    let col; 
    const startButton = document.querySelector('#start-game');
    const player = document.querySelector('#current-player');
    // handle click event
    startButton.addEventListener('click', () => {     
        GameController();
    });
    return {
        startButton, 
        player
    };
})();

function Player(name, marker) {
    return {
        name, 
        marker
    };
}

function GameController() {
    const board = Gameboard.getBoard();
    function getCells(board) {
        const cells = Array.from(document.querySelectorAll('.cell'));
        return cells;
    }

   const getCell = (() => {
        const cells = getCells();
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                if(cell.textContent === '') {
                    row = parseInt(cell.getAttribute('data-row'));
                    col = parseInt(cell.getAttribute('data-column'));
                    const clickedCell = e.target;
                    const index = [row, col];
                    makeMove(clickedCell, index);
                    return {
                        row, 
                        col, 
                        index, 
                        clickedCell
                    };
                } 
            }); 
        }); 
    })();

    let players = [];

    let playerOne = Player('Player 1', 'O');
    let playerTwo = Player('Player 2', 'X');

    players.push(playerOne);
    players.push(playerTwo);

    let currentPlayer = playerOne;

    const playerName = () => currentPlayer['name'];
    const getMarker = () => currentPlayer['marker'];
  
    DOM.player.textContent = playerName();

    function switchPlayer() {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne; 
        return currentPlayer;
    }

    function updateBoard(row, col) {
        marker = getMarker();
        board[row][col] = marker;
        checkWinner();
        if (checkWinner()) {
            alert(`${playerName()} wins!`);
        }
        else if (!checkWinner()) {
            checkDraw();
        }
        switchPlayer();
        return board;
     }

    function makeMove(cell, index) {
        let marker = getMarker();
        cell.textContent = marker;
       // checkWinner();
        DOM.player.textContent = playerName();
        updateBoard(row, col);
    }

    function checkDraw() {
        console.log('checkDraw');
        const isDraw = board.every(row => row.every(cell => cell !== ''));
        if (isDraw) {
            alert('It\'s a draw!');
        }
    }

    function checkWinner() {
        const board = Gameboard.getBoard();
        let winner = false;

        let winningCombos = [
            [board[0][0], board[0][1], board[0][2]],// rows
            [board[1][0], board[1][1], board[1][2]], // rows
            [board[2][0], board[2][1], board[2][2]], // rows
            [board[0][0], board[1][0], board[2][0]], // colums
            [board[0][1], board[1][1], board[2][1]], // columns
            [board[0][2], board[1][2], board[2][2]], // columns
            [board[0][0], board[1][1], board[2][2]], // diagonals
            [board[0][2], board[1][1], board[2][0]], // diagonals
        ];
        
        winningCombos.forEach(win => {
            const a = win[0];
            const b = win[1];
            const c = win[2];
            
            let combo = [a, b, c];
            console.log(combo);
            board.forEach(combo => {
                if (a === 'X' && b === 'X' && c === 'X') {
                    winner = true;
                }
                else if (a === 'O' && b === 'O' && c === 'O') {
                    winner = true;
                }
            });
        });
        return winner;
    }
};
