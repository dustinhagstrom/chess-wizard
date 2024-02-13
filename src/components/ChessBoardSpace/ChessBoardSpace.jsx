import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';

import { mapLetterToChessPiece } from '../../utils/ChessUI';

function ChessBoardSpace({columnIndex, rowOffset, cellContents, stylingClassName, setMoveNotation, cellCoord}) {
  const [piece, setPiece] = useState('');

  const handlesClick = () => {
    console.log(`you clicked on square ${columnIndex} - ${rowOffset}, cellContents:, ${cellContents}`);
    console.log("cell coordinate data passed in:", cellCoord);
    if (cellContents) {
      // setMoveNotation(cellContents + "-")
      console.log("there is content in this cell!");
    }
  }

  useEffect(() => {
    setPiece(mapLetterToChessPiece(cellContents));
  }, [])

  return (
    <div className={stylingClassName} onClick={handlesClick}>
      {piece}
      {(columnIndex+1) + "-" + (8-rowOffset)}
    </div>
  );
}

export default ChessBoardSpace;
