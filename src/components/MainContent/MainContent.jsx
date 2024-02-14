import React, { useState } from "react";
import { useSelector } from "react-redux";
// import ChessBoard from "../ChessBoard/ChessBoard";
import PersonalizedWelcomeMessage from "../PersonalizedWelcomeMessage/PersonalizedWelcomeMessage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NewGameComponent from "../NewGameComponent/NewGameComponent";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import { useRouteMatch } from "react-router-dom";
import FriendsList from "../FriendsList/FriendsList";
import GameSession from "../GameSession/GameSession";
// import UserInfoComponent from "../UserInfoComponent/UserInfoComponent";
import { Redirect } from "react-router-dom";
import { PusherProvider } from "../../hooks/PusherContext";

function MainContent(props) {
    const sessionCode = useSelector((store) => store.game.sessionCode);
    const match = useRouteMatch();

    // console.log(
    //     "[inside MainContent Component], component LOADED; sessionCode:",
    //     sessionCode
    // );

    return (
        <div>
            <ProtectedRoute exact path={match.url + "/chessBoard"}>
                {sessionCode ? (
                    <PusherProvider>
                        <GameSession sessionCode={sessionCode}/>
                    </PusherProvider>
                ) : (
                    <NewGameComponent />
                )}
            </ProtectedRoute>

            <ProtectedRoute exact path={match.url + "/friends"}>
                <FriendsList />
                <LeaderBoard />
            </ProtectedRoute>
            <ProtectedRoute exact path={match.url + "/"}>
                <PersonalizedWelcomeMessage />
            </ProtectedRoute>
        </div>
    );
}

export default MainContent;
