export function translateFenNotationToUIGameBoard(gameInFenNotation) {
    const gameBoard = gameInFenNotation.split(" ")[0].split("/");
    //ascii 1-8: 49-56
    //ascii a-h: 97-104
    let twoDGameBoard = [[], [], [], [], [], [], [], []];
    // console.log("init twoDGameBoard:", twoDGameBoard);
    let rowCounter = 0; // we start at the last game board row (located at index zero in this representation)
    let charPosition = 0; // index-based counting
    // loop through gameBoard
    for (const row of gameBoard) {
        for (const piece of row) {
            // console.log("piece in the row:", piece, "charcode:");
            if (row.charCodeAt(charPosition) > 56) {
                // it is an actual ascii letter char
                // push the letter for that piece to 2D game board
                twoDGameBoard[rowCounter].push(piece);
                charPosition++; // move to next char
            } else {
                // it is a number char representing empty game columns
                let numEmptySpaces = parseInt(piece);
                // add empty spaces to the twoDGameBoard as empty strings
                for (let i = 0; i < numEmptySpaces; i++) {
                    twoDGameBoard[rowCounter].push("");
                }
                charPosition++; // move to next char
            }
        }
        //reset the charPosition at the end of the row
        charPosition = 0;
        // increment the rowCounter at the end of row
        rowCounter++;
    }
    console.log("[inside translateFenNotationToUIGameBoard] twoDGameBoard:", twoDGameBoard);
    return twoDGameBoard;
}

export function mapLetterToChessPiece(letter) {
    switch (letter) {
        case "r":
            // black rooke ♜
            return "♜";
        case "n":
            // black knight ♞
            return "♞";
        case "b":
            // black bishop ♝
            return "♝";
        case "q":
            // black queen ♛
            return "♛";
        case "k":
            // black king ♚
            return "♚";
        case "p":
            // black pawn ♟
            return "♟";
        case "R":
            // white rooke ♖
            return "♖";
        case "N":
            // white knight ♘
            return "♘";
        case "B":
            // white bishop ♗
            return "♗";
        case "Q":
            // white queen ♕
            return "♕";
        case "K":
            // white king ♔
            return "♔";
        case "P":
            // white pawn ♙
            return "♙";
    }
}


// this function translate an incrementor from the map function that produces
// the chess game board. It translates the incrementor into a letter representing
// a column in a chess board
export function generateTheCellLocationData(loopIncrement, rowNumber) {
    const asciiCodeForLowerA = 97;

    return (String.fromCharCode(asciiCodeForLowerA + loopIncrement) + rowNumber);
}
