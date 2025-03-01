const buttons = document.querySelectorAll('.board button');

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.score = 0;
}

const gameController = (function () {
  const gameBoard = [];
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
  const players = [];
  let turn = 0;
  const playerTurn = function (position) {
    if (turn % 2 === 0) {
      gameBoard[position] = 'X';
    } else {
      gameBoard[position] = 'O';
    }
    //gameBoard[position] = player.marker;
    turn++;
    displayController.draw(gameBoard);
  };
  const checkGameOver = function () {
    winningPos.forEach((pos) => {});
  };
  return { playerTurn };
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

const p1 = new Player('Fran', 'X');
const p2 = new Player('Evil Fran', 'O');
