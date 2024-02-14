import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { mapLetterToChessPiece } from "../../utils/ChessUIFunctions";

function ChessBoardSpace({
    columnIndex,
    rowOffset,
    cellContents,
    stylingClassName,
    setPieceToMove,
    pieceToMove,
    cellCoord,
}) {
    const [piece, setPiece] = useState("");

    const gameId = useSelector((store) => store.game.gameId);

    const dispatch = useDispatch();

    const handlesClick = () => {
        console.log(
            `you clicked on square ${cellCoord}, cellContents: ${cellContents}`
        );
        console.log("cell coordinate data passed in:", cellCoord);
        console.log(
            "move notation after on click of game square:",
            pieceToMove
        );
        // if there is a target piece, then add target square data
        if (pieceToMove) {
            let moveNotation = pieceToMove + `-${cellCoord}`;

            // console.log("[inside handlesClick in ChessBoardSpace ]dispatch with gameId:", gameId);

            // reset state in parent
            setPieceToMove("");

            dispatch({
                type: "MOVE_PIECE",
                payload: { move: moveNotation, gameId: gameId },
            });
        }

        // if there is a piece on target space
        if (cellContents) {
            setPieceToMove(cellContents + cellCoord);
            // console.log("there is content in this cell!");
        }
    };

    useEffect(() => {
        setPiece(mapLetterToChessPiece(cellContents));
    }, [cellContents]);

    return (
        <div className={stylingClassName} onClick={handlesClick}>
            {piece}
        </div>
    );
}

export default ChessBoardSpace;
