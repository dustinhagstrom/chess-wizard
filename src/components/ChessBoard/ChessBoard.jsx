import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Button } from "@mui/material";

function ChessBoard(props) {
  const [heading, setHeading] = useState('ChessBoard Component');
  const game = useSelector((store) => store.game);

  const dispatch = useDispatch();

  const abortGame = () => {
    // without a web socket, this will not work for the host of the game session
    dispatch({
      type: "ABORT_GAME",
      payload: game.gameId
    })
  }

  return (
    <div>
      <h2>{heading}</h2>
      <Button onClick={abortGame}>KILL SWITCH</Button>
    </div>
  );
}

export default ChessBoard;
