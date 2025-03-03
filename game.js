const buttons = document.querySelectorAll('.board button');
const newgameBtn = document.querySelector('.newgame');
const resetBtn = document.querySelector('.reset');
const cancelBtn = document.querySelector('.cancel');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

const name1 = document.querySelector('.name1');
const name2 = document.querySelector('.name2');
const score1 = document.querySelector('.p1score');
const score2 = document.querySelector('.p2score');

const header = document.querySelector('h1');

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.score = 0;
}

const gameController = (function () {
  let gameBoard = [];
  let p1, p2, turn;
  let gameActive = false;

  const startGame = function (player1, player2) {
    [p1, p2] = [player1, player2];
    turn = 0;
    gameBoard = [];
    displayController.draw(gameBoard);
    gameActive = true;
    displayController.updatePlayers(p1, p2);
  };

  const playerTurn = function (position) {
    if (!gameActive || gameBoard[position] !== undefined) return;
    gameBoard[position] = turn % 2 === 0 ? p1.marker : p2.marker;
    turn++;
    checkGameOver();
    displayController.draw(gameBoard);
  };

  const winningPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkGameOver = function () {
    [p1, p2].forEach((player) => {
      winningPos.forEach((pos) => {
        if (gameBoard[pos[0]] === player.marker && gameBoard[pos[1]] === player.marker && gameBoard[pos[2]] === player.marker) {
          displayController.updatePlayers(p1, p2);
          gameOver(player);
        }
      });
    });
    if (turn === 9) {
      displayController.updateHeader('Draw! New round');
      startGame(p1, p2);
    }
  };

  const gameOver = function (player) {
    gameActive = false;
    displayController.updateHeader(`${player.name} won in ${turn} turns.`);
    player.score++;
    startGame(p1, p2);
  };

  return { playerTurn, startGame };
})();

const displayController = (function () {
  const clear = function () {
    buttons.forEach((btn) => (btn.textContent = ''));
  };

  const updatePlayers = function (player1, player2) {
    name1.textContent = player1.name;
    score1.textContent = player1.score;
    name2.textContent = player2.name;
    score2.textContent = player2.score;
  };

  const updateHeader = function (text) {
    header.textContent = text;
  };

  const draw = function (boardArray) {
    clear();
    for (let i = 0; i < 9; i++) {
      buttons[i].textContent = boardArray[i];
    }
  };

  return { draw, updatePlayers, updateHeader };
})();

for (let i = 0; i < 9; i++) {
  buttons[i].addEventListener('click', gameController.playerTurn.bind(null, i));
}

newgameBtn.addEventListener('click', () => {
  dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const p1name = formData.get('p1name');
  const p1marker = formData.get('p1marker');
  const p2name = formData.get('p2name');
  const p2marker = formData.get('p2marker');
  const p1 = new Player(p1name, p1marker);
  const p2 = new Player(p2name, p2marker);
  gameController.startGame(p1, p2);
  dialog.close();
});
