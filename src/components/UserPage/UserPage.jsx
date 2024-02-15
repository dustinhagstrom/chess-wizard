import React from 'react';
import UserInfoComponent from '../UserInfoComponent/UserInfoComponent';
import {useSelector} from 'react-redux';
import MainContent from '../MainContent/MainContent';

function UserPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <div style={{ display: 'flex', flexDirection:'row', justifyContent: 'space-between' }}>
        <UserInfoComponent userId={user.id} style={{ width: '20%' }}/>
        <MainContent style={{ display: 'flex', flexDirection:'row', width: '70%' }}/>

      </div>
    </div>
  );
}

export default UserPage;
