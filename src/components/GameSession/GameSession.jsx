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
    const { userIdWhite, userIdBlack, sessionCode, gameId } = useSelector(
        (store) => store.game
    );
    const [heading, setHeading] = useState("GameSession Component");

    // subscribe and unsubscribe to Pusher web sockets
    useEffect(() => {
        const channel = pusher.subscribe(sessionCode); //PUSHER CHANNEL

        channel.bind("BOARD_UPDATE", (data) => {
            dispatch({ type: "BOARD_UPDATE", payload: data });
        });

        channel.bind("PLAYER_JOIN", (data) => {
            console.log("heard the 'PLAYER_JOIN' trigger on the frontend, data:", data);
            dispatch({ type: "PLAYER_JOIN", payload: data });
        });

        channel.bind("DELETE_GAME", (data) => {
            console.log("heard the 'DELETE_GAME' trigger on the frontend");
            dispatch({ type: "DELETE_GAME" });
        });

        return () => {
            channel.unbind(
                "BOARD_UPDATE",
                () => {
                    dispatch({ type: "BOARD_UPDATE", payload: {} });
                } /* dispatch or call function here */
            );

            channel.unbind(
                "PLAYER_JOIN",
                () => {
                    dispatch({ type: "PLAYER_JOIN", payload: {} });
                } /* dispatch or call function here */
            );

            channel.unbind(
                "DELETE_GAME",
                () => {
                    dispatch({ type: "DELETE_GAME" });
                } /* dispatch or call function here */
            );


        };
    }, []);

    return (
        <div>
            <h2>{heading}</h2>
            <ChessBoard gameId={gameId}/>

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
