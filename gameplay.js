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

function gameTurn(currentBoard, player, playColumn) {
  playColumn--;
  const nextSpace = currentBoard[playColumn].indexOf(0);
  console.log(nextSpace);
  if (nextSpace === -1) {
    return "Invalid move. Column is full";
  } else {
    currentBoard[playColumn][nextSpace] = player;
    return currentBoard;
  }
}

let board = initializeArray(10, 3);
console.log(board);
board = gameTurn(board, 1, 3);
console.log(board);
board = gameTurn(board, 2, 7);
console.log(board);
board = gameTurn(board, 1, 7);
console.log(board);

board = gameTurn(board, 2, 7);
console.log(board);

board = gameTurn(board, 1, 7);
console.log(board);
