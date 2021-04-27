import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import createGame from './public/game-module.js';

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

const game = createGame();
game.start();

game.subscribe((command) => {
    console.log(`> Emiting ${command.type}`);
    sockets.emit(command.type, command);
})

console.log(game.state);

sockets.on('connection', (socket) => {
    const playerId = socket.id;
    console.log(`> Player connected with id ${playerId}`);

    game.addPlayer({ playerId: playerId });

    socket.emit('setup', game.state);

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId });
        console.log(`> Removing ${playerId}`);
    });

    socket.on('move-player', (command) => {
        command.playerId = playerId;
        command.type = 'move-player';

        game.movePlayer(command);
    });

});

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('server linsten on port 3000');
});