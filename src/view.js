import { R, C, fromPos } from './gameBoard.js';

const { HumanPlayer, ComputerPlayer } = require("./player");

const title = document.querySelector('.game-run-title');
const playerBoard = document.querySelector('.player-1 .gameboard');
const computerBoard = document.querySelector('.player-2 .gameboard');

let player = new HumanPlayer(), comp = new ComputerPlayer();

function makeComputerCell(hasShip, pos) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (hasShip) cell.classList.add('has-ship');
    
    cell.addEventListener('click', () => {
        if (comp.gameBoard.canHit(pos)) {
            comp.gameBoard.receiveAttack(pos);
            cell.classList.add('hit');
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
}

function initPlayerBoard() {
    player.gameBoard.placeRandom();
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            const hasShip = player.gameBoard.board[r][c].ship;
            const cell = makePlayerCell(hasShip);
            playerBoard.append(cell);
        }
    }
}

function initComputerBoard() {
    comp.gameBoard.placeRandom();
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            const hasShip = comp.gameBoard.board[r][c].ship;
            const cell = makeComputerCell(hasShip, [r, c]);
            computerBoard.append(cell);
        }
    }
}

initPlayerBoard();
initComputerBoard();