import React, { useState } from 'react';
import {useSelector} from 'react-redux';

//! This component will be used to display a personalized welcome to app message
//! And this component will be rendered when a user hosts a game, but is waiting
//! on the other player to show up. Without web sockets, both this.player and
//! opponent.player display this component
function PersonalizedWelcomeMessage(props) {
  const [heading, setHeading] = useState('PersonalizedWelcomeMessage Component');


  //! it would be cool to integrate this free api into this page
  //! https://docs.zenquotes.io/zenquotes-documentation/#use-limits
  return (
    <>
      <h2>{heading}</h2>
    </>
  );
}

export default PersonalizedWelcomeMessage;
