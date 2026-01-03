import { Ship } from './ship.js';
import  { GameBoardPlace } from './gameBoardPlace.js';
import {
    cruiserHorizontal,
    cruiserVertical,
    destroyerHorizontal,
    destroyerVertical,
    gameBoardPlace,
    skipper,
    body,
    gamePlace
} from './htmlElements.js';
import { RIGHT, toPos, fromPos, R, C } from './gameBoard.js';


let shipToMove = null;
let gbp = new GameBoardPlace();

function getShipElem(len, dir) {
    if (len == 4) {
        return (dir == RIGHT) ? cruiserHorizontal : cruiserVertical;
    } else if (len == 3) {
        return (dir == RIGHT) ? destroyerHorizontal : destroyerVertical;
    } else if (len == 2) {
        return (dir == RIGHT) ? cruiserHorizontal : cruiserVertical;
    } else {
        return skipper;
    }
}

function clearHasShip(len, dir, pos) {
    for (let i = 0; i < len; i++) {
        let npos = [pos[0] + i * dir[0], pos[1] + i * dir[1]];
        gameBoardPlace.children[fromPos(...npos)].classList.remove('has-ship');
    }
}

function addHasShip(len, dir, pos) {
    for (let i = 0; i < len; i++) {
        let npos = [pos[0] + i * dir[0], pos[1] + i * dir[1]];
        gameBoardPlace.children[fromPos(...npos)].classList.add('has-ship');
    }
}

function clearCanPlace(len, dir, pos) {
    for (let i = 0; i < len; i++) {
        let npos = [pos[0] + i * dir[0], pos[1] + i * dir[1]];
        gameBoardPlace.children[fromPos(...npos)].classList.remove('can-place');
    }
}

function addCanPlace(len, dir, pos) {
    for (let i = 0; i < len; i++) {
        let npos = [pos[0] + i * dir[0], pos[1] + i * dir[1]];
        gameBoardPlace.children[fromPos(...npos)].classList.add('can-place');
    }
}

function makeCell(hasShip, pos) {
    const cell = document.createElement('div');
    cell.classList.add('cell3');
    cell.draggable = true;

    if (hasShip) cell.classList.add('has-ship');

    cell.addEventListener('dragover', ev => ev.preventDefault());

    cell.addEventListener('dragstart', ev => {
        const ship = gbp.board[pos[0]][pos[1]];
        if (ship == null) return;
        
        shipToMove = ship;
        const shipElem = getShipElem(ship.len, ship.dir);
        console.log(shipElem);
        ev.dataTransfer.setDragImage(shipElem, 16, 16);
    })

    cell.addEventListener('drop', ev => {
        if (shipToMove == null || !gbp.canPlace(shipToMove, shipToMove.dir, pos)) return;

        clearCanPlace(shipToMove.len, shipToMove.dir, pos);
        clearHasShip(shipToMove.len, shipToMove.dir, shipToMove.pos);
        gbp.removeShip(shipToMove);
        gbp.placeShip(shipToMove, shipToMove.dir, pos);
        addHasShip(shipToMove.len, shipToMove.dir, pos);
    }) 

    cell.addEventListener('dragenter', () => {
        if (shipToMove == null || !gbp.canPlace(shipToMove, shipToMove.dir, pos)) return;
        addCanPlace(shipToMove.len, shipToMove.dir, pos);
    })

    cell.addEventListener('dragleave', () => {
        if (shipToMove == null || !gbp.canPlace(shipToMove, shipToMove.dir, pos)) return;
        clearCanPlace(shipToMove.len, shipToMove.dir, pos);
    })

    return cell;
}

function initGameBoardPlace() {
    gbp.placeRandom();
    const cells = [];
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            const cell = makeCell(gbp.board[r][c] != null, [r, c]);
            cells.push(cell);
        }
    }
    gameBoardPlace.append(...cells);

    body.innerHTML = '';
    body.append(gamePlace);
}

initGameBoardPlace();