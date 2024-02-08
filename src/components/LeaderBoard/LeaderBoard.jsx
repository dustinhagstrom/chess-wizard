import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// This component will make a dispatch to the database to get the top ten players
// in the system, it will then display:
// RANK # | username | wins | losses | stalemates
function LeaderBoard(props) {
    //! Local state
    const [heading, setHeading] = useState("LeaderBoard Component");
    //! global state
    const leaderBoard = useSelector((store) => store.leaderBoard);
    const dispatch = useDispatch();

    // console.log("leaderBoard:", leaderBoard);

    useEffect(() => {
        dispatch({
            type: "FETCH_USER_LEADERBOARD",
        });
    }, [dispatch]);

    return (
        <div>
            <h2>{heading}</h2>
        </div>
    );
}

export default LeaderBoard;
