let game = {
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'X',
  winner: null,
};

document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.block');
  const resetButton = document.getElementById('reset-button');
  const winnerElement = document.getElementById('winner');

  blocks.forEach((block) => {
      block.addEventListener('click', (e) => {
          const cellId = parseInt(e.target.id.split('-')[1]);
          if (game.board[cellId] === '' && game.winner === null) {
              game.board[cellId] = game.currentPlayer;
              block.classList.add(game.currentPlayer);
              block.innerText = game.currentPlayer;
              checkWin();
              switchPlayer();
          }
      });
  });

  resetButton.addEventListener('click', () => {
      game.board = ['', '', '', '', '', '', '', '', ''];
      game.currentPlayer = 'X';
      game.winner = null;
      blocks.forEach((block) => {
          block.classList.remove('X', 'O');
          block.innerText = '';
      });
      winnerElement.innerText = '';
  });
});

function checkWin() {
  const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      if (game.board[condition[0]] === game.board[condition[1]] && game.board[condition[1]] === game.board[condition[2]] && game.board[condition[0]]!== '') {
          game.winner = game.board[condition[0]];
          announceWinner();
          return;
      }
  }

  if (!game.board.includes('')) {
      announceDraw();
  }
}

function switchPlayer() {
  game.currentPlayer = game.currentPlayer === 'X'? 'O' : 'X';
}

function announceWinner() {
  const winnerElement = document.getElementById('winner');
  winnerElement.innerText = `Player ${game.winner} wins!`;
}

function announceDraw() {
  const winnerElement = document.getElementById('winner');
  winnerElement.innerText = `It's a draw!`;
}