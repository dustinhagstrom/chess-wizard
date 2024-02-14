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
    const user = useSelector((store) => store.user);

    // const opponent = useSelector((store) => store.opponent);
    const sessionCode = useSelector((store) => store.game.sessionCode);
    const [heading, setHeading] = useState("MainContent Component");

    const match = useRouteMatch();

    console.log(
        "[inside MainContent Component], component LOADED; sessionCode:",
        sessionCode
    );

    // console.log("match object:", match);
    // console.log("props of MainContent:", props);

    return (
        <div>
            <h2>{heading}</h2>

            <ProtectedRoute exact path={match.url + "/chessBoard"}>
                {sessionCode ? (
                    <PusherProvider>
                        <GameSession />
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
