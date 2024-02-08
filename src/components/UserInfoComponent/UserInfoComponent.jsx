import { useState } from 'react';
import {useSelector} from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route } from 'react-router-dom';


// this component will always be the left component for the logged in user
// this component can also become the component that fills the right side
// of the screen when it holds the values of the opponent player.
function UserInfoComponent(props) {
  // const store = useSelector((store) => store);
  const [heading, setHeading] = useState('UserInfoComponent Component');

  const match = useRouteMatch();

   console.log("match object:", match);

    // console.log("props of MainContent:", props);

  return (
    <div>
      <h2>{heading}</h2>

      <Route></Route>
    </div>
  );
}

export default UserInfoComponent;