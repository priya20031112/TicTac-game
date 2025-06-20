document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const gameBoard = document.getElementById('game-board');
    const gameStatus = document.getElementById('game-status');
    const resetBtn = document.getElementById('reset-btn');
    const resetScoreBtn = document.getElementById('reset-score-btn');
    const playerXScore = document.querySelector('#player-x .score');
    const playerOScore = document.querySelector('#player-o .score');
    const playerX = document.getElementById('player-x');
    const playerO = document.getElementById('player-o');
    
    // Game state variables
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let scores = { X: 0, O: 0 };
    
    // Initialize the game board
    function initializeBoard() {
        gameBoard.innerHTML = '';
        board = ['', '', '', '', '', '', '', '', ''];
        
        // Create each cell and add event listeners
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cellElement);
        });
        
        updatePlayerTurn();
    }
    
    // Handle cell click
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.index);
        
        // If cell is already filled or game is inactive, do nothing
        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update board state and UI
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        // Check for win or draw
        if (checkWin()) {
            handleWin();
            return;
        }
        
        if (checkDraw()) {
            handleDraw();
            return;
        }
        
        // Switch player if game continues
        switchPlayer();
    }
    
    // Check for win condition
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // Highlight winning cells
                pattern.forEach(index => {
                    gameBoard.children[index].classList.add('win');
                });
                return true;
            }
            return false;
        });
    }
    
    // Check for draw condition
    function checkDraw() {
        return board.every(cell => cell !== '');
    }
    
    // Handle win scenario
    function handleWin() {
        gameActive = false;
        scores[currentPlayer]++;
        updateScores();
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
    }
    
    // Handle draw scenario
    function handleDraw() {
        gameActive = false;
        gameStatus.textContent = "It's a draw!";
    }
    
    // Switch to the other player
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerTurn();
    }
    
    // Update UI to show current player's turn
    function updatePlayerTurn() {
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        
        // Update active player highlight
        if (currentPlayer === 'X') {
            playerX.classList.add('active');
            playerO.classList.remove('active');
        } else {
            playerO.classList.add('active');
            playerX.classList.remove('active');
        }
    }
    
    // Update score display
    function updateScores() {
        playerXScore.textContent = scores.X;
        playerOScore.textContent = scores.O;
    }
    
    // Reset game board
    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        initializeBoard();
    }
    
    // Reset all scores
    function resetScores() {
        scores = { X: 0, O: 0 };
        updateScores();
        resetGame();
    }
    
    // Event listeners
    resetBtn.addEventListener('click', resetGame);
    resetScoreBtn.addEventListener('click', resetScores);
    
    // Initialize the game when DOM is loaded
    initializeBoard();
});
