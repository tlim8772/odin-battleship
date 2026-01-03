import { Ship } from "./ship.js";

export const R = 10, C = 10;
export const RIGHT = [0, 1], DOWN = [1, 0];

function validPos(r, c) {
    return r >= 0 && r < R && c >= 0 && c < C;
}

export function fromPos(r, c) {
    return r * C + c;
}

class Cell {
    constructor() {
        this.ship = null;
        this.isAttacked = false;
    }

    // return true if a ship is hit, else false
    hit() {
        this.isAttacked = true;
        return this.ship?.hit() ?? false;
    }
}

export class GameBoard {
    constructor() {
        this.board = Array(R).fill(0).map(() => Array(C).fill(0).map(() => new Cell()));
        this.ships = [];
    }

    canPlace(ship, dir, pos) {
        for (let i = 0; i < ship.len; i++) {
            let r = pos[0] + i * dir[0], c = pos[1] + i * dir[1];
            if (!validPos(r, c) || this.board[r][c].ship) return false;
        }
        return true;
    }

    canHit(pos) {
        return !this.board[pos[0]][pos[1]].isAttacked;
    }

    placeShip(ship, dir, pos) {
        if (!this.canPlace(ship, dir, pos)) throw new Error('invalid placement');
        this.ships.push(ship);
        for (let i = 0; i < ship.len; i++) {
            let r = pos[0] + i * dir[0], c = pos[1] + i * dir[1];
            this.board[r][c].ship = ship;
        }
    }

    // return true if a ship is hit, else false
    receiveAttack(pos) {
        return this.board[pos[0]][pos[1]].hit();
    }

    allShipsSunk() {
        return this.ships.every((ship) => ship.isSunk());
    }

    toString() {
        let s = '';
        for (let r = 0; r < R; r++) {
            for (let c = 0; c < C; c++) {
                s += this.board[r][c].ship?.len ?? 0;
            }
            s += '\n';
        }
        return s;
    }

    placeRandom() {
        const shipLens = [4,3,3,2,2,2,1,1,1,1];
        shipLens.forEach((len) => {
            while (true) {
                let pos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
                let dir = (Math.floor(Math.random * 2) == 0) ? RIGHT : DOWN;
                const ship = new Ship(len);
                if (!this.canPlace(ship, dir, pos)) continue;
                
                this.placeShip(ship, dir, pos);
                break;
            }
        })
    }
}
