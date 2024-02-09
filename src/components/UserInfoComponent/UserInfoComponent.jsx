import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route } from 'react-router-dom';


  //! I need this component to take in props that uniquely identify a user
  //!   This will be an user obj prop. It will then make a DB call to grab that 
  //!   user information
function UserInfoComponent({ userProp }) {
  const [heading, setHeading] = useState('UserInfoComponent Component');
  const user = useSelector((store) => store.user);
  // const dispatchType = user.id === userProp.id ? 'FETCH_THIS_PLAYER_STATS' : 'FETCH_OPPONENT_PLAYER_STATS';

  console.log("[inside UserInfoComponent]")
  // 'SET_THIS_PLAYER' : 'SET_OPPONENT_PLAYER'

  const dispatch = useDispatch();
  console.log("[inside UserInfoComponent] passed in userProp:", userProp);

  useEffect(() => {
    
    dispatch({
      type: 'FETCH_PLAYER_STATS',
      payload: { id: userProp.id , isOpponent: user.id == !userProp.id}
    })
  }, [dispatch]);

  return (
    <div>
      <h2>{heading}</h2>
      <h4>{"user id: "}{user.id}</h4>

    </div>
  );
}

export default UserInfoComponent;