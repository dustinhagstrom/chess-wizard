import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Button } from "@mui/material";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
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
