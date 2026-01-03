const { GameBoard, fromPos, R, C } = require("./gameBoard");

export class ComputerPlayer {
    constructor() {
        this.misses = new Set();
        this.hits = new Set();
        this.gameBoard = new GameBoard();
    }

    canAttackPos(pos) {
        return !this.misses.has(fromPos(...pos)) && !this.hits.has(fromPos(...pos));
    }

    getAttackPos() {
        while (1) {
            let pos = [Math.floor(Math.random() * R), Math.floor(Math.random() * C)];
            if (!this.canAttackPos(pos)) continue;
            return pos;
        }
    }

    addMiss(pos) {
        this.misses.add(fromPos(...pos));
    }

    addHit(pos) {
        this.hits.add(fromPos(...pos));
    }
}

export class HumanPlayer {
    constructor() {
        this.misses = new Set();
        this.hits = new Set();
        this.gameBoard = new GameBoard();
    }

    canAttackPos(pos) {
        return !this.misses.has(fromPos(...pos)) && !this.hits.has(fromPos(...pos));
    }

    addMiss(pos) {
        this.misses.add(fromPos(...pos));
    }

    addHit(pos) {
        this.hits.add(fromPos(...pos));
    }
}