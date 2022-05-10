/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
//
let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push([]);
    for (let j = 0; j < WIDTH; j++) {
      board[i][j] = null;
    }
  }
};

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  playingGame = true;
  const htmlBoard = document.querySelector('#board');
  // TODO: add comment for this code
  const top = document.createElement("tr"); //creates a table row element
  top.setAttribute("id", "column-top"); //adds id,'column-top' to the table row
  top.classList.add('p1');
  top.addEventListener("click", handleClick); //makes the top rows clickable and when it's clicked handleClick function fires

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td"); //creates table data cells
    headCell.setAttribute("id", x); //sets id 'x' to the cells created
    top.append(headCell); //places the table data cells to the table row element
  }
  htmlBoard.append(top); //places the table row element to the board table

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //creates table rows
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //creates table data cells
      cell.setAttribute("id", `${y}-${x}`); //sets id to the table data cells
      row.append(cell); //places the cells to the table rows
    }
    htmlBoard.append(row); //places the table rows to the board table
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const div = document.createElement('div');
  div.classList.add('piece');
  div.classList.add(`p${currPlayer}`);
  const top = document.querySelector('#column-top');
  top.classList.toggle('p1');
  // top.classList.add(`p${currPlayer}`);
  top.classList.toggle('p2');
  const cellForDiv = document.getElementById(`${y}-${x}`);
  cellForDiv.appendChild(div);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(function () {
    alert(msg);
  }, 10);
  // top.removeEventListener("click", handleClick);
  playingGame = false;
  restart();
};

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  if(playingGame === true){
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(arr => arr.every(el => el !== null))){
  return endGame("It's a tie!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
      y >= 0 &&
      y < HEIGHT &&
      x >= 0 &&
      x < WIDTH &&
      board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //checks if the three cells that are neightbor to the cell that was just played was also played by the owner of the cell
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3]
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x]
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3]
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3]
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function restart() {
  const restartBtn = document.createElement('button');
  const restartContainer = document.querySelector('#restart-container');
  restartBtn.setAttribute("id", "restart-btn");
  restartBtn.setAttribute("type", "button");
  restartContainer.append(restartBtn);
  restartBtn.innerText = 'Restart';
  restartBtn.addEventListener('click', function(){
    location.reload();
  });
};

makeBoard();
makeHtmlBoard();