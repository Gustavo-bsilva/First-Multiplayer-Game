import createKeyboardListener from './keyboard-listener.js';

const screen = document.getElementById('screen');
const context = screen.getContext("2d");
const currentPlayerId = 'player1';

function createGame(){

    const state = {
        players: {
        },
        fruits: {
        }
    }

    function addPlayer(command){
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command){
        const playerId = command.playerId;

        delete state.players[playerId];
    }

    function addFruit(command){
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command){
        const fruitId = command.fruitId;

        delete state.fruits[fruitId];
    }

    function movePlayer(command){
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`);

        const acceptedMoves = {
            ArrowUp(player){
                console.log('cu');
                if(player.y - 1 >= 0 ){
                    player.y = player.y - 1;
                }
            },
            ArrowDown(player){
                console.log('cu');
                if( player.y + 1 < 10 ){
                    player.y = player.y + 1;
                }
            },
            ArrowRight(player){
                console.log('cu');
                if( player.x + 1 < 10 ){
                    player.x = player.x + 1;
                }
            },
            ArrowLeft(player){
                console.log('cu');
                if( player.x - 1 >= 0 ){
                    player.x = player.x - 1;
                }
            }
        }

        const player = state.players[currentPlayerId];
        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const moveFunction = acceptedMoves[keyPressed];
        
        
        if(player && moveFunction){
            moveFunction(player);
            checkFruitCollision(playerId);
        }
        return
    
    }

    function checkFruitCollision(playerId){
        const player = state.players[playerId];

        for(const fruitId in state.fruits){
            const fruit = state.fruits[fruitId];

            if(player.x == fruit.x && player.y == fruit.y){
                removeFruit( { fruitId: fruitId } );
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}

const game = createGame();
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

game.addPlayer( { playerId: 'player1', playerX: 0, playerY: 0 } );
game.addFruit( { fruitId: 'fruit1', fruitX: 3, fruitY: 3 } );

/* function createKeyboardListener(){

    const state = {
        observers: []
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction);
    }

    function notifyAll(command){
        console.log(`Notifying ${state.observers.length} observers`);

            for(const observerFunction of state.observers){
                observerFunction(command);
            }
    }

    document.addEventListener('keydown', handleKeyDown);
    function handleKeyDown(event){
        const keyPressed = event.key;

        const command = {
            playerId: 'player1',
            keyPressed
        }

        notifyAll(command);

    }

    return {
        subscribe
    }
} */

renderScreen();

function renderScreen() {
    context.clearRect(0, 0, 10, 10);

    for(const playerId in game.state.players){
        const player = game.state.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for(const fruitId in game.state.fruits){
        const fruit = game.state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(renderScreen);
}