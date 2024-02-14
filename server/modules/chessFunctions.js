const { Chess } = require("chess.js");

const chessGenerator = () => {
    return new Chess();
};

const theGameIsOver = (chessGameInstance) => {
    if (chessGameInstance.isGameOver()) {
        // CHECK WHY THE GAME IS OVER
        // Draws
        if (chessGameInstance.isDraw()) {
            // draw
            if (chessGameInstance.isThreefoldRepetition()) {
                // three fold repetition
                return {
                    type: "THREE_FOLD_REPETITION",
                    fen: chessGameInstance.fen(),
                };
            }
            // else it is insufficient material
            return {
                type: "INSUFFICIENT_MATERIAL",
                fen: chessGameInstance.fen(),
            };
        }

        // Tie
        else if (chessGameInstance.isStalemate()) {
            // stalemate
            return { type: "STALEMATE", fen: chessGameInstance.fen() };
            // Someone won
        } else {
            // else checkmate
            return { type: "CHECKMATE", fen: chessGameInstance.fen() };
        }
    }
    return false;
};

const undoLastMove = (chessGameInstance) => {
    // returns a move object if successful, returns null otherwise
    return chessGameInstance.undo();
};

const whoseTurnIsIt = (chessGameInstance) => {
    // returns a 'b' for black and a 'w' for white
    return chessGameInstance.turn();
};

/**
 *
 * @param {Chess} chessGameInstance
 * @param {String} moveNotation
 *    moveNotation === {piece: UC_letter, from_file: lc_letter, from_rank: integer, dash, to_file: lc_letter, to_rank: integer }
 *                     { moveNotation: "Re3-e5"}
 *
 * @returns an object that has data about the move tried, or the moved after it was success
 *          it can contain the reason why the game is over. returns a type of 'INVALID'
 *          if the move just tried is invalid.
 */
//! this function leverages the built-in error handling of the chess.js api
const chessMoveHandler = (chessGameInstance, moveNotation) => {

    console.log("[inside chessMoveHandler] chessFunctions.js, chessGameInstance:", chessGameInstance);
    try {
        //! the move method returns an exception or a move object
        const gameMoveObject = chessGameInstance.move(moveNotation);

        //! check if the game is over
        if (theGameIsOver(chessGameInstance)) {
            // this returns a message for the game over
            return theGameIsOver(chessGameInstance);
        }
        //! Check if a king is in check
        if (chessGameInstance.inCheck()) {
            // the result of previous move caused check
            return { type: "CHECK", fen: chessGameInstance.fen() };
        }
        // return false to signify the game is not over and not in check
        return { type: "VALID", fen: chessGameInstance.fen() };
    } catch (error) {
        // tell them that they can't do that move
        console.log("Illegal Move error caught, signalled error to client");
        console.error(error);
        return { type: "INVALID", fen: chessGameInstance.fen() };
    }
};


module.exports = {
    chessMoveHandler,
    undoLastMove,
    chessGenerator,
    whoseTurnIsIt,
};
