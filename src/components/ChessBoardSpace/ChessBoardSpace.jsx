import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { mapLetterToChessPiece } from '../../utils/ChessUI';

function ChessBoardSpace({columnIndex, rowOffset, cellContents, stylingClassName, setPieceToMove, pieceToMove, cellCoord}) {
  const [piece, setPiece] = useState('');

  const gameId = useSelector((store) => store.game.gameId);

  const dispatch = useDispatch();

  const handlesClick = () => {
    console.log(`you clicked on square ${cellCoord}, cellContents: ${cellContents}`);
    console.log("cell coordinate data passed in:", cellCoord);
    console.log("move notation after on click of game square:", pieceToMove);
    // if there is already notation stored, then add target square data
    if (pieceToMove) {
      let moveNotation = pieceToMove + `-${cellCoord}`;

      console.log("[inside handlesClick in ChessBoardSpace ]dispatch with gameId:", gameId);
      
      dispatch({
        type: "MOVE_PIECE",
        payload: {move: moveNotation, gameId: gameId}
      })

      setPieceToMove("");
      return;
    }
    // if there is not moveNotation and there is a piece in this cell
    // then set the move notation to be the letter representing the piece
    // and append the cell coordinates
    if (cellContents) {
      setPieceToMove(cellContents + cellCoord)
      console.log("there is content in this cell!");
      return;
    }
  }



  useEffect(() => {
    setPiece(mapLetterToChessPiece(cellContents));
  }, [cellContents])

  return (
    <div className={stylingClassName} onClick={handlesClick}>
      {piece}
      {/* {(columnIndex+1) + "-" + (8-rowOffset)} */}
    </div>
  );
}

export default ChessBoardSpace;
