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
import { Redirect } from "react-router-dom";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MainContent(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const user = useSelector((store) => store.user);
    // const opponent = useSelector((store) => store.opponent);
    const game = useSelector((store) => store.game);
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
                {/* if there isn't a game.sessionCode then redirect to '/newGame'*/}
                {game.sessionCode ? <ChessBoard /> : <Redirect to={match.url + "/newGame"} />}
                
                {/* show message when waiting for opponent otherwise show opponent stats */}
               <UserInfoComponent userId={game.userIdBlack == user.id ? game.userIdWhite : game.userIdBlack}/>
               <PersonalizedWelcomeMessage />
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
