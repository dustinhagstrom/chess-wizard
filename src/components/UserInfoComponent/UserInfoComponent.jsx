import { useState } from 'react';
import {useSelector} from 'react-redux';

// this component will always be the left component for the logged in user
// this component can also become the component that fills the right side
// of the screen when it holds the values of the opponent player.
function UserInfoComponent(props) {
  // const store = useSelector((store) => store);
  const [heading, setHeading] = useState('UserInfoComponent Component');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default UserInfoComponent;