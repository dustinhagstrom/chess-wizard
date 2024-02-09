import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
    const user = useSelector((store) => store.user);
    const game = useSelector((store) => store.game);

    const gameInProgress = game?.sessionCode ? true : false;
    console.log(gameInProgress);

    return (
        <div className="nav">
            <Link to="/home">
                {/* this routes to "/user" if logged in, "/home" otherwise */}
                <h2 className="nav-title">Prime Solo Project</h2>
            </Link>
            <div>
                {/* If no user is logged in, show these links */}
                {!user.id && (
                    // If there's no user, show login/registration links
                    <Link className="navLink" to="/login">
                        Login / Register
                    </Link>
                )}

                {/* If a user is logged in and there is a game in progress, show these links */}
                {user.id && (
                    <>
                        <Link className="navLink" to="/user">
                            ⌂
                        </Link>
                        {/* //! If there is a game in state then go to "/chessBoard" */}
                        {gameInProgress ? (
                            <Link className="navLink" to="/user/chessBoard">
                                ♛
                            </Link>
                        ) : (
                            <Link className="navLink" to="/user/newGame">
                                ♛
                            </Link>
                        )}
                        <Link className="navLink" to="/user">
                            👥
                        </Link>

                        <Link className="navLink" to="/info">
                            {/* make this an information icon */}
                            {/* this will hold the technology information, etc. */}
                            Info Page
                        </Link>

                        <LogOutButton className="navLink" />
                    </>
                )}

                <Link className="navLink" to="/about">
                    {/* this is the 'about this app' page */}
                    About
                </Link>
            </div>
        </div>
    );
}

export default Nav;
