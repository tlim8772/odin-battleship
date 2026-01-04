import { R, C, fromPos } from './gameBoard.js';

const { HumanPlayer, ComputerPlayer } = require("./player");
import { title, playerBoard, computerBoard } from './htmlElements.js';

let win = false;
let player = new HumanPlayer(), comp = new ComputerPlayer();

function makeComputerCell(hasShip, pos) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (hasShip) cell.classList.add('has-ship');
    
    cell.addEventListener('click', () => {
        if (win) return;
        
        if (comp.gameBoard.canHit(pos)) {
            comp.gameBoard.receiveAttack(pos);
            cell.classList.add('hit');
            if (gameEnd()) return;
            
            computerAttack();
        }
    })

    return cell;
}

function makePlayerCell(hasShip) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (hasShip) cell.classList.add('has-ship');
    
    return cell;
}

function computerAttack() {
    const pos = comp.getAttackPos();
    const cell = playerBoard.children[fromPos(...pos)];
    const res = player.gameBoard.receiveAttack(pos);

    if (res) {
        comp.addHit(pos);
    } else {
        comp.addMiss(pos);
    }

    cell.classList.add('hit');

    if (gameEnd()) return;
}

export function initPlayerBoard(ships) {
    playerBoard.innerHTML = '';
    player.gameBoard.resetBoard();
    
    ships.forEach(ship => player.gameBoard.placeShip(ship, ship.dir, ship.pos));
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            const hasShip = player.gameBoard.board[r][c].ship;
            const cell = makePlayerCell(hasShip);
            playerBoard.append(cell);
        }
    }
}

export function initComputerBoard() {
    computerBoard.innerHTML = '';
    comp.gameBoard.resetBoard();
    
    comp.gameBoard.placeRandom();
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            const hasShip = comp.gameBoard.board[r][c].ship;
            const cell = makeComputerCell(hasShip, [r, c]);
            computerBoard.append(cell);
        }
    }
}

function gameEnd() {
    if (player.gameBoard.allShipsSunk()) {
        win = true;
        title.textContent = 'Computer wins';
        return true;
    } else if (comp.gameBoard.allShipsSunk()) {
        win = true;
        title.textContent = 'Player wins'
        return true;
    }
    return false;
}

//initPlayerBoard();
//initComputerBoard();