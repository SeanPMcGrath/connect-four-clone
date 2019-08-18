function initializeArray(x, y) {
  //Initialize x by y array with zeroes
  //x = height / number of rows
  //y = width / number of columns
  //for connect four purposes board is sideways. Seems easier to work with the array this way.
  let builtArray = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (j === 0) {
        builtArray[i] = [0];
      } else {
        builtArray[i].push(0);
      }
    }
  }
  return builtArray;
}

function gameTurn(currentBoard, boardWidth, boardHeight, player, playColumn) {
  playColumn--;
  const nextSpace = currentBoard[playColumn].indexOf(0);
  if (nextSpace === -1) {
    return "Invalid move. Column is full";
  } else {
    currentBoard[playColumn][nextSpace] = player;
    if (
      winCheck(
        currentBoard,
        boardWidth,
        boardHeight,
        player,
        playColumn,
        nextSpace
      )
    ) {
      return "WIN!";
    }
    return currentBoard;
  }
}

function winCheck(gameBoard, boardWidth, boardHeight, player, column, row) {
  //Supply 0-indexed column and row
  //Supply 1-indexed boardWidth and boardHeight
  boardWidth--;
  boardHeight--;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        !(i === 0 && j === 0) &&
        validBoardPoint(boardWidth, boardHeight, column + i, row + j)
      ) {
        // console.log("i = " + i);
        // console.log("j = " + j);
        if (gameBoard[column + i][row + j] === player) {
          //Check next location in that direction
          if (
            sequenceCheck(
              gameBoard,
              boardWidth,
              boardHeight,
              column + 2 * i,
              row + 2 * j,
              i,
              j,
              player,
              2
            )
          ) {
            return true;
          }
        }
      }
    }
  }
  //If no win is found
  return false;
}

function validBoardPoint(boardWidth, boardHeight, column, row) {
  //All inputs 0-indexed
  if (column >= 0 && column < boardWidth && row >= 0 && row < boardHeight) {
    return true;
  } else {
    return false;
  }
}

function sequenceCheck(
  gameBoard,
  boardWidth,
  boardHeight,
  column,
  row,
  xChange,
  yChange,
  player,
  sequenceCount
) {
  console.log("sequenceCount = " + sequenceCount);
  console.log(
    "validBoardPoint inputs = " + [boardWidth, boardHeight, column, row]
  );
  if (!validBoardPoint(boardWidth, boardHeight, column, row)) {
    console.log("sequenceCheck invalid point");
    return false;
  } else if (gameBoard[column][row] === player) {
    sequenceCount++;
    console.log("sequenceCount in sequenceCheck = " + sequenceCount);
    if (sequenceCount === 4) {
      return true;
    } else {
      //Check next spot in sequence
      console.log("Running sequence check again...");
      return sequenceCheck(
        gameBoard,
        boardWidth,
        boardHeight,
        column + xChange,
        row + yChange,
        xChange,
        yChange,
        player,
        sequenceCount
      );
    }
  } else {
    console.log("sequenceCheck fallback false");
    return false;
  }
}

let width = 10;
let height = 8;
let board = initializeArray(width, height);
console.log(board);
board = gameTurn(board, width, height, 1, 3);
console.log(board);
board = gameTurn(board, width, height, 2, 7);
console.log(board);
board = gameTurn(board, width, height, 2, 7);
console.log(board);

board = gameTurn(board, width, height, 2, 7);
console.log(board);

board = gameTurn(board, width, height, 2, 7);
console.log(board + " 4th piece");
