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
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div className="number-div">
              {  [ 1, 2, 3, 4 ,5 ,6, 7, 8 ].reverse().map( label => (
                  <div className='vertical-label'>{ label }</div>
              ))}
            </div>
            <div className="chessboard">
                {board.map((row, rowOffset) => {
                    return row.map((cell, columnIndex) => {
                        return (
                            <ChessBoardSpace
                                className='chess-board-div'
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
          </div>
          <div className="letter-div">
            { [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ].map( label => (
                <div className='vertical-label'>{ label }</div> 
            ))}
          </div>
          <Button onClick={abortGame}>KILL SWITCH</Button>
        </div>
    );
}

export default ChessBoard;
