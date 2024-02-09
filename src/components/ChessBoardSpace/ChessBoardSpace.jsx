import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function ChessBoardSpace(props) {
  const [heading, setHeading] = useState('ChessBoardSpace Component');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default ChessBoardSpace;
