import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function FriendsList(props) {
  const [heading, setHeading] = useState('FriendsList Component');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default FriendsList;
