import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import ChessBoardSpace from "../ChessBoardSpace/ChessBoardSpace";

import {
    translateFenNotationToUIGameBoard,
    generateTheCellLocationData,
} from "../../utils/ChessUIFunctions";

import "./ChessBoard.css";
function ChessBoard({gameId}) {
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState("");
    const [pieceToMove, setPieceToMove] = useState("");
    const [playerColor, setPlayerColor] = useState("");

    const gameFen = useSelector((store) => store.game.fen);
    console.log("[inside ChessBoard component] gameFen:", gameFen, "turn:", turn === "b" ? "Black" : "White");

    const dispatch = useDispatch();

    const abortGame = () => {
        dispatch({
            type: "ABORT_GAME",
            payload: gameId,
        });
    };

    // run the board setup function asap
    useEffect(() => {
        let [boardData, turnData] = translateFenNotationToUIGameBoard(gameFen);
        setBoard(boardData);
        setTurn(turnData);
    }, [gameFen]);

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
                {board.map((row, rowOffset) => {
                    return row.map((cell, columnIndex) => {
                        return (
                            <ChessBoardSpace
                                setPieceToMove={setPieceToMove}
                                cellCoord={generateTheCellLocationData(
                                    columnIndex,
                                    8 - rowOffset
                                )}
                                key={generateTheCellLocationData(
                                    columnIndex,
                                    8 - rowOffset
                                )}
                                cellContents={cell}
                                columnIndex={columnIndex}
                                rowOffset={rowOffset}
                                stylingClassName={
                                    (columnIndex + 1 + rowOffset) % 2 === 0
                                        ? "light"
                                        : "dark"
                                }
                                pieceToMove={pieceToMove}
                            />
                        );
                    });
                })}
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
