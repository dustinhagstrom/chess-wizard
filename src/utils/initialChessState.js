
const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const columnNum = ["A", "B", "C", "D", "E", "F", "G", "H"];

// this array represents the grid of a chess board
// it holds the color of the chess board
// 1 === white && 0 === black
const chessBoardColors = [
//   a b c d e f g h
    [1,0,1,0,1,0,1,0], // 8
    [0,1,0,1,0,1,0,1], // 7
    [1,0,1,0,1,0,1,0], // 6
    [0,1,0,1,0,1,0,1], // 5
    [1,0,1,0,1,0,1,0], // 4
    [0,1,0,1,0,1,0,1], // 3
    [1,0,1,0,1,0,1,0], // 2
    [0,1,0,1,0,1,0,1]  // 1
];

// these are the actual pieces in the starting
// configuration of chess
const chessPieces = [
    //   a b c d e f g h
    ["♜","♞","♝","♚","♛","♝","♞","♜"], // 8
    ["♟","♟","♟","♟","♟","♟","♟","♟"], // 7
    [" "," "," "," "," "," "," "," "], // 6
    [" "," "," "," "," "," "," "," "], // 5
    [" "," "," "," "," "," "," "," "], // 4
    [" "," "," "," "," "," "," "," "], // 3
    ["♙","♙","♙","♙","♙","♙","♙","♙"], // 2
    ["♖","♘","♗","♔","♕","♗","♘","♖"]  // 1
];

