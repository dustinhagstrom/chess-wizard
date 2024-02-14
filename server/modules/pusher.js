const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
    useTLS: true,
});

const pusherUpdateBoard = async (req, res) => {
    try {
        // send fen data through web socket on channel res.locals.sessionCode
        pusher.trigger(res.locals.sessionCode, "BOARD_UPDATE", res.locals.moveData);
    } catch (error) {
        console.log("error with pusherUpdateBoard trigger function on the web socket");
        console.error(error);
    }
};

const pusherUpdateGameInfo = async (req, res) => {
    try {
        pusher.trigger(req.body.sessionCode, "PLAYER_JOIN", {
            gameId: res.locals.gameId,
            userIdBlack: req.user.id
        });
    } catch (error) {
        console.log("error with pusherUpdateGameInfo trigger function on the web socket");
        console.error(error);
    }
};

const pusherDeleteGame = async (req, res) => {
    try {
        pusher.trigger(res.locals.sessionCode, "DELETE_GAME", {
            type: "DELETE_GAME",
        });
    } catch (error) {
        console.log("error with pusherDeleteGame trigger function on the web socket");
        console.error(error);
    }
};

module.exports = {
    pusherUpdateBoard,
    pusherUpdateGameInfo,
    pusherDeleteGame
};
