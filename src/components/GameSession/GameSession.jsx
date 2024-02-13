import React, { useState } from "react";
import { useSelector } from "react-redux";

import ChessBoard from "../ChessBoard/ChessBoard";
import UserInfoComponent from "../UserInfoComponent/UserInfoComponent";
import PersonalizedWelcomeMessage from "../PersonalizedWelcomeMessage/PersonalizedWelcomeMessage";

function GameSession(props) {
      const user = useSelector((store) => store.user);
      const {userIdWhite, userIdBlack, sessionCode} = useSelector((store) => store.game);
    const [heading, setHeading] = useState("GameSession Component");

    return (
        <div>
            <h2>{heading}</h2>
            <ChessBoard />

            {userIdWhite && userIdBlack ? <UserInfoComponent
                userId={userIdBlack == user.id ? userIdWhite : userIdBlack}
            /> : <PersonalizedWelcomeMessage />}
            
        </div>
    );
}

export default GameSession;
