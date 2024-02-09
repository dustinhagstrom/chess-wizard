import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChessBoard from "../ChessBoard/ChessBoard";
import PersonalizedWelcomeMessage from "../PersonalizedWelcomeMessage/PersonalizedWelcomeMessage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NewGameComponent from "../NewGameComponent/NewGameComponent";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import { useRouteMatch } from "react-router-dom";
import FriendsList from "../FriendsList/FriendsList";
import UserInfoComponent from "../UserInfoComponent/UserInfoComponent";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MainContent(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const opponent = useSelector((store) => store.opponent);
    const [heading, setHeading] = useState("MainContent Component");

    // the match object helps with nested routes
    const match = useRouteMatch();
    // console.log("match object:", match);

    // console.log("props of MainContent:", props);

    return (
        <div>
            <h2>{heading}</h2>
            {/* Route Scheme UserPage/CenterPageComponent-any/RightComponent */}
            <ProtectedRoute exact path={match.url + "/newGame"}>
                <NewGameComponent />
            </ProtectedRoute>
            <ProtectedRoute exact path={match.url + "/chessBoard"}>
                <ChessBoard />
                {/* show message when waiting for opponent otherwise show opponent stats */}
               {opponent.id ? <UserInfoComponent userProp={opponent}/> : <PersonalizedWelcomeMessage />} 
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
