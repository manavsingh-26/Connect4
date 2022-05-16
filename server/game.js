const rows = 6;
const columns = 7;


module.exports = {
    newGame,
    setPiece,
    checkWinner,
}

function newGame() {

    const rows = 6;
    const columns = 7;
    const board = [];
    const currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let currRow = [];
        for (let c = 0; c < columns; c++) {
            currRow.push(0);
        }
        board.push(currRow);
    }

    return {
        players: ["red", "yellow"],
        currBoard: board,
        currColumns: currColumns,

    };

}

function checkWinner(board) {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== 0) {
                if (board[r][c] === board[r][c + 1] && board[r][c + 1] === board[r][c + 2] && board[r][c + 2] === board[r][c + 3]) {

                    return [r, c, "v"];
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== 0) {
                if (board[r][c] === board[r + 1][c] && board[r + 1][c] === board[r + 2][c] && board[r + 2][c] === board[r + 3][c]) {

                    return [r, c, "v"];
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== 0) {
                if (board[r][c] === board[r + 1][c + 1] && board[r + 1][c + 1] === board[r + 2][c + 2] && board[r + 2][c + 2] === board[r + 3][c + 3]) {

                    return [r, c, "v"];
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== 0) {
                if (board[r][c] === board[r - 1][c + 1] && board[r - 1][c + 1] === board[r - 2][c + 2] && board[r - 2][c + 2] === board[r - 3][c + 3]) {

                    return [r, c, "v"];
                }
            }
        }
    }
    let count = 0;
    for (let c = 0; c < columns; c++) {
        if (board[0][c] !== 0)
            count++;

    }
    if (count === columns) {

        return [r, c, "d"];
    }
    return "play";
}

function setPiece(id, board, currColumns, player) {
    // if (gameOver) {
    //     return;
    // }

    //get coords of that tile clicked
    let coords = id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c];

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = player; //update JS board

    //console.log(board);
    //update the row height for that column
    currColumns[c] = r - 1; //update the array

    let winner = checkWinner(board)

    if (winner == "play")
        return [r, c, 'p'];
    else
        return winner;




}

