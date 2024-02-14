const Pusher = require("pusher");
const { findSessionCodeByGameId } = require("./gameData");

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
    useTLS: true,
});

const pusherUpdateBoard = async (req, res) => {
    try {
        // send fen data through web socket on channel req.body.gameId
        pusher.trigger(findSessionCodeByGameId(req.body.gameId), "BOARD_UPDATE", {
            type: "BOARD_UPDATE",
            fen: res.locals.fen,
        });
    } catch (error) {
        console.log("error with pusherUpdateBoard trigger function on the web socket");
        console.error(error);
    }
};

const pusherUpdateGameInfo = async (req, res) => {
    try {
        // send fen data through web socket on channel req.body.gameId
        pusher.trigger(req.body.sessionCode, "PLAYER_JOIN", {
            type: "PLAYER_JOIN",
            gameId: res.locals.gameId,
            userIdBlack: req.user.id
        });
    } catch (error) {
        console.log("error with pusherUpdateGameInfo trigger function on the web socket");
        console.error(error);
    }
};

module.exports = {
    pusherUpdateBoard,
    pusherUpdateGameInfo
};
