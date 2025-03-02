const buttons = document.querySelectorAll('.board button');
const newgameBtn = document.querySelector('.newgame');
const resetBtn = document.querySelector('.reset');
const cancelBtn = document.querySelector('.cancel');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.score = 0;
}

const gameController = (function () {
  const gameBoard = [];
  let p1, p2;
  let turn = 0;

  const startGame = function (player1, player2) {
    [p1, p2] = [player1, player2];
  };

  const playerTurn = function (position) {
    if (turn % 2 === 0) {
      gameBoard[position] = p1.marker;
    } else {
      gameBoard[position] = p2.marker;
    }
    turn++;
    displayController.draw(gameBoard);
    checkGameOver();
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
          console.log(`gano el jugador ${player.name}`);
        }
      });
    });
  };

  return { playerTurn, startGame };
})();

const displayController = (function () {
  const clear = function () {
    buttons.forEach((btn) => (btn.textContent = ''));
  };
  const draw = function (boardArray) {
    clear();
    for (let i = 0; i < 9; i++) {
      buttons[i].textContent = boardArray[i];
    }
  };

  return { draw };
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
