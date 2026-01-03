import { R, C, RIGHT, DOWN, validPos, DIRS, toggleDir } from './gameBoard.js';
import { Ship } from './ship.js';

export class GameBoardPlace {
    constructor() {
        this.board = Array(R).fill(0).map(() => Array(C).fill(null));
        this.ships = [];
    }

    isAdjacent(pos) {
        for (const d of DIRS) {
            let npos = [pos[0] + d[0], pos[1] + d[1]];
            if (validPos(...npos) && this.board[npos[0]][npos[1]]) return true;
        }
        return false;
    }

    // we can overlap with our own ship (that we have placed)
    canPlace(ship, dir, pos) {
        for (let i = 0; i < ship.len; i++) {
            let npos = [pos[0] + i * dir[0], pos[1] + i * dir[1]];
            if (!validPos(...npos) || (this.board[npos[0]][npos[1]] != null && this.board[npos[0]][npos[1]] != ship)) return false;
        }
        return true;
    }

    // ship must be placed in the board and have dir and pos
    canRotate(ship) {
        if (ship.dir == null || ship.pos == null) throw new Error('ship not in board');
        const dir = toggleDir(ship.dir);
        return this.canPlace(ship, dir, ship.pos);
    }

    placeShip(ship, dir, pos) {
        if (!this.canPlace(ship, dir, pos)) throw new Error('cannot place ship here');
        
        ship.pos = pos;
        ship.dir = dir;
        this.ships.push(ship);
        
        for (let i = 0; i < ship.len; i++) {
            let npos = [pos[0] + i * dir[0], pos[1] + i * dir[1]];
            this.board[npos[0]][npos[1]] = ship;
        }
    }

    existShip(ship) {
        if (ship.pos == null || ship.dir == null) return false;
        for (let i = 0; i < ship.len; i++) {
            let npos = [ship.pos[0] + i * ship.dir[0], ship.pos[1] + i * ship.dir[1]];
            if (!validPos(...npos) || this.board[npos[0]][npos[1]] != ship) return false;
        }
        return true;
    }

    removeShip(ship) {
        if (!this.existShip(ship)) throw new Error('ship does not exist');
        for (let i = 0; i < ship.len; i++) {
            let npos = [ship.pos[0] + i * ship.dir[0], ship.pos[1] + i * ship.dir[1]];
            this.board[npos[0]][npos[1]] = null;
        }
    }

    placeRandom() {
        const shipLens = [4,3,3,2,2,2,1,1,1,1];
        shipLens.forEach(len => {
            // dont insert the ship into the board first, so canPlace will run correctly
            const ship = new Ship(len);
            while (1) {
                let pos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                let dir = (Math.floor(Math.random() * 2)) ? DOWN : RIGHT;
                if (!this.canPlace(ship, dir, pos)) continue;
                this.placeShip(ship, dir, pos);
                break;
            }
        })
    }

    toString() {
        let s = '';
        for (let r = 0; r < R; r++) {
            for (let c = 0; c < C; c++) {
                s += this.board[r][c]?.len ?? 0;
            }
            s += '\n';
        }
        return s;
    }


}