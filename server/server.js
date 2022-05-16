const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const { newGame, setPiece } = require('./game');
const cors = require('cors');
const console = require('console');
const dotenv = require('dotenv');

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],

    },
});


const rooms = {};
const clientRoomNames = {};


function generateCode(length) {
    var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (let i = 0; i < length; i++) {
        code += alpha.charAt(Math.floor(Math.random() * alpha.length));
    }
    return code;
}

io.on("connection", (socket) => {

    socket.on('new-game', handleNewGame);
    socket.on('join-game', handleJoinGame);
    socket.on('make_move', handleNewMove);

    function handleNewGame() {
        let roomName = generateCode(6);
        clientRoomNames[socket.id] = roomName;
        socket.emit('gameCode', roomName);
        rooms[roomName] = newGame();
        //   console.log(clientRoomNames);
        socket.join(roomName);
        socket.number = 1;
        socket.emit('init', 1);
        socket.emit('gameBoard', rooms[roomName]);
        socket.emit('active', false);

    }

    function handleJoinGame(roomName) {

        const room = io.sockets.adapter.rooms.get(roomName);
        // console.log(room);
        // console.log(room.size)


        let numClients = 0;

        if (room) {
            numClients = room.size;
        }

        //   console.log(numClients);

        if (numClients === 0) {
            socket.emit('unknownCode');
            return;
        }
        else if (numClients > 1) {
            socket.emit('roomFull');
            return;
        }
        else {
            socket.emit('gameCode', roomName);
        }

        clientRoomNames[socket.id] = roomName;
        // console.log(clientRoomNames);
        socket.join(roomName);
        socket.number = 2;
        socket.emit('init', 2);
        socket.emit('gameBoard', rooms[roomName]);
        socket.emit('active', false);
        socket.broadcast.to(roomName).emit('active', true);


    }

    function handleNewMove(data) {
        roomName = clientRoomNames[socket.id];

        new_coord = setPiece(data[0], rooms[roomName].currBoard, rooms[roomName].currColumns, data[1]) //will return id so we can set in the front end

        socket.emit('new_move', [new_coord, 'm']);
        socket.broadcast.to(roomName).emit('new_move', [new_coord, 'o']);
        socket.emit('active', false);
        socket.broadcast.to(roomName).emit('active', true);

        if (new_coord[2] === "v") {
            socket.emit("winner");
            socket.broadcast.to(roomName).emit("loser");

        }
        else if (new_coord[2] === "d") {
            socket.emit("draw");
            socket.broadcast.to(roomName).emit("draw");
        }

    }



});


server.listen(process.env.PORT || 5000, () => {
    console.log("server is running");
})
