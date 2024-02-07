import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// This component will hold the right side component dependent of the
// current React route that we are on right now.
function RightPageComponent(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('RightPageComponent Component');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default RightPageComponent;