import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import ChessBoardSpace from "../ChessBoardSpace/ChessBoardSpace";

import { translateFenNotationToUIGameBoard, generateTheCellLocationData } from "../../utils/ChessUI";

import "./ChessBoard.css";
function ChessBoard(props) {
    const [heading, setHeading] = useState("ChessBoard Component");
    const [moveNotation, setMoveNotation] = useState("");

    const game = useSelector((store) => store.game);

    const dispatch = useDispatch();

    const abortGame = () => {
        // without a web socket, this will not work for the host of the game session
        dispatch({
            type: "ABORT_GAME",
            payload: game.gameId,
        });
    };

    console.log("chess game info from ChessBoard.js:", game);

    // console.log("chess board data:", game.fen);
    return (
        <div className="game-board-container">
            <div className="row-counter">
                <div>8</div>
                <div>7</div>
                <div>6</div>
                <div>5</div>
                <div>4</div>
                <div>3</div>
                <div>2</div>
                <div>1</div>
            </div>
            <div className="chessboard">
                {translateFenNotationToUIGameBoard(game.fen).map((row, rowOffset) => {
                    return row.map((cell, columnIndex) => {
                        return (
                            <ChessBoardSpace
                                setMoveNotation
                                cellCoord={generateTheCellLocationData(
                                  columnIndex + 1,
                                    8 - rowOffset
                                )}
                                key={generateTheCellLocationData(columnIndex, 8 - rowOffset)}
                                cellContents={cell}
                                columnIndex={columnIndex}
                                rowOffset={rowOffset}
                                stylingClassName={
                                    (columnIndex + 1 + rowOffset) % 2 === 0 ? "light" : "dark"
                                }
                            />
                        );
                    });
                })}
                {/* {translateFenNotationToUIGameBoard(game.fen).map((row, j) => {
                    return row.map((cell, i) => {
                        return (
                            <ChessBoardSpace
                                setMoveNotation
                                key={i + "-" + j}
                                cellContents={cell}
                                i={i}
                                j={j}
                                stylingClassName={
                                    (i + 1 + j) % 2 === 0 ? "light" : "dark"
                                }
                            />
                        );
                    });
                })} */}
            </div>
            <div className="column-counter">
                <div>a</div>
                <div>b</div>
                <div>c</div>
                <div>d</div>
                <div>e</div>
                <div>f</div>
                <div>g</div>
                <div>h</div>
            </div>
            <Button onClick={abortGame}>KILL SWITCH</Button>
        </div>
    );
}

export default ChessBoard;
