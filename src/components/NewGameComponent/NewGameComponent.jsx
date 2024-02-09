import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GenericModal from "../GenericModal/GenericModal";

function NewGameComponent(props) {
    // game.sessionCode is the value that this represents in state.
    // sessionCode holds the state of the code that joining player is inputing
    const [sessionCode, setSessionCode] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const game = useSelector((store) => store.game);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log("game obj from store:", game);
    console.log("session code:", sessionCode);

    const handlesHostGame = () => {
        // this will set this player to be the white player
        // using a dispatch. It will also trigger going to the game route
        // and it will trigger a code generated that can be shared with
        // a friend. The friendslist will be shown when we travel to a game
        // instance, where we can message a friend our code. When they join the game
        // this friendslist will be replaced with the opponents stats.

        dispatch({
            type: "HOST_GAME",
        });
    };

    const handlesJoinGame = () => {
        // this will cause another window to open where we can put a game
        setOpenModal(true);
        
    };

    const closeModal = () => {
      
      //! dispatch to join a game
      dispatch({
        type: "JOIN_GAME_SESSION",
        payload: {
          sessionCode: sessionCode,
          // could put a function here setOpenModal(), this could handle
          // shutting the modal upon success || it could handle some
          // alternative action if the sessionCode was enterred incorrectly
        }
      })

      setOpenModal(false)

      history.push("/user/chessBoard");
    }

    return (
        <div>
            <Button onClick={handlesHostGame}>Host Game</Button>
            <Button onClick={handlesJoinGame}>Join Game</Button>
            <GenericModal
                isOpenModal={openModal}
                message="Enter the Game Session Code!"
                input={sessionCode}
                inputHandlerFunction={setSessionCode}
                closeModalHandler={() => closeModal()}
            ></GenericModal>
        </div>
    );
}

export default NewGameComponent;
