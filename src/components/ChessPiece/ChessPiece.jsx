import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function ChessPiece(props) {
  const [heading, setHeading] = useState('ChessPiece Component');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default ChessPiece;
