import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePusher } from "../../hooks/PusherContext.jsx";

import ChessBoard from "../ChessBoard/ChessBoard";
import UserInfoComponent from "../UserInfoComponent/UserInfoComponent";
import PersonalizedWelcomeMessage from "../PersonalizedWelcomeMessage/PersonalizedWelcomeMessage";

function GameSession(props) {
    const pusher = usePusher();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const { userIdWhite, userIdBlack, sessionCode } = useSelector(
        (store) => store.game
    );
    const [heading, setHeading] = useState("GameSession Component");

    // subscribe and unsubscribe to Pusher web sockets
    useEffect(() => {
        const channel = pusher.subscribe(sessionCode); //PUSHER CHANNEL

        channel.bind("BOARD_UPDATE", (data) => {
            dispatch({ type: "BOARD_UPDATE", payload: data });
        });

        return () => {
            channel.unbind(
                "BOARD_UPDATE",
                () => {
                    dispatch({ type: "BOARD_UPDATE", payload: {} });
                } /* dispatch or call function here */
            );
        };
    }, []);

    return (
        <div>
            <h2>{heading}</h2>
            <ChessBoard />

            {userIdWhite && userIdBlack ? (
                <UserInfoComponent
                    userId={userIdBlack == user.id ? userIdWhite : userIdBlack}
                />
            ) : (
                <PersonalizedWelcomeMessage />
            )}
        </div>
    );
}

export default GameSession;
