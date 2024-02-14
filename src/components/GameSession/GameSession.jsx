import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

import { usePusher } from "../../hooks/PusherContext.jsx";
import ChessBoard from "../ChessBoard/ChessBoard";
import UserInfoComponent from "../UserInfoComponent/UserInfoComponent";
import PersonalizedWelcomeMessage from "../PersonalizedWelcomeMessage/PersonalizedWelcomeMessage";

function GameSession(props) {
    const pusher = usePusher();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const { userIdWhite, userIdBlack, sessionCode, gameId, statusSignal } = useSelector(
        (store) => store.game
    );

    console.log("status signal:", statusSignal);

    // subscribe and unsubscribe to Pusher web sockets
    useEffect(() => {
        const channel = pusher.subscribe(sessionCode); //PUSHER CHANNEL

        channel.bind("BOARD_UPDATE", (data) => {
            console.log("data from board update:", data);
            dispatch({ type: "BOARD_UPDATE", payload: data });
        });

        channel.bind("PLAYER_JOIN", (data) => {
            // console.log("heard the 'PLAYER_JOIN' trigger on the frontend, data:", data);
            dispatch({ type: "PLAYER_JOIN", payload: data });
        });

        channel.bind("DELETE_GAME", (data) => {
            // console.log("heard the 'DELETE_GAME' trigger on the frontend");
            dispatch({ type: "DELETE_GAME" });
        });

        return () => {
            channel.unbind(
                "BOARD_UPDATE",
                () => {
                    dispatch({ type: "BOARD_UPDATE", payload: {} });
                }
            );

            channel.unbind(
                "PLAYER_JOIN",
                () => {
                    dispatch({ type: "PLAYER_JOIN", payload: {} });
                }
            );

            channel.unbind(
                "DELETE_GAME",
                () => {
                    dispatch({ type: "DELETE_GAME" });
                }
            );


        };
    }, []);

    return (
        <div>
            <Typography>{statusSignal}</Typography>
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
