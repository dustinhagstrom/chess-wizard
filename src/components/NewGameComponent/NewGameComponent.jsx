import React, { useState } from 'react';
import { Button, Typography } from "@mui/material";
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function NewGameComponent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const store = useSelector((store) => store);
  const [heading, setHeading] = useState('NewGameComponent Component');
  const history = useHistory();

  const handlesHostGame = () => {
    // this will set this player to be the white player
    // using a dispatch. It will also trigger going to the game route
    // and it will trigger a code generated that can be shared with
    // a friend. The friendslist will be shown when we travel to a game
    // instance, where we can message a friend our code. When they join the game
    // this friendslist will be replaced with the opponents stats.
  }

  const handlesJoinGame = () => {
    // this will cause another window to open where we can put a game
  }

  return (
    <div>
      <h2>{heading}</h2>
      <Button onClick={handlesHostGame}>Host Game</Button>
      <Button onClick={handlesJoinGame}>Join Game</Button>
    </div>
  );
}

export default NewGameComponent;
