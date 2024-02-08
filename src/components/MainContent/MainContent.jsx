import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChessBoard from "../ChessBoard/ChessBoard";
import PersonalizedWelcomeMessage from "../PersonalizedWelcomeMessage/PersonalizedWelcomeMessage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NewGameComponent from "../NewGameComponent/NewGameComponent";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import GameOverMessage from "../GameOverMessage/GameOverMessage";
import { useRouteMatch } from "react-router-dom";
import FriendsList from "../FriendsList/FriendsList";
import UserInfoComponent from "../UserInfoComponent/UserInfoComponent";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MainContent(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    // const store = useSelector((store) => store);
    const [heading, setHeading] = useState("MainContent Component");

    // the match object helps with nested routes
    const match = useRouteMatch();
    // console.log("match object:", match);

    // console.log("props of MainContent:", props);

    return (

        // LOOK INTO THE NAVIGATE COMPONENT FROM REACT ROUTER
        <div>
            <h2>{heading}</h2>
            {/* Route Scheme UserPage/CenterPageComponent-any/RightComponent */}
            <ProtectedRoute exact path={match.url + "/newGame"}>
                <NewGameComponent />
                <FriendsList />
            </ProtectedRoute>
            <ProtectedRoute exact path={match.url + "/chessBoard"}>
                <ChessBoard />
                <UserInfoComponent />
            </ProtectedRoute>
            <ProtectedRoute exact path={match.url + "/gameOver"}>
                <GameOverMessage />
                <UserInfoComponent />
            </ProtectedRoute>
            <ProtectedRoute path={match.url + "/"} >
                <PersonalizedWelcomeMessage />
                <LeaderBoard />
            </ProtectedRoute>
        </div>
    );
}

export default MainContent;
