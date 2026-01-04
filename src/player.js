const { GameBoard, fromPos, toPos, R, C } = require("./gameBoard");

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
        const alreadyHit = this.misses.union(this.hits);
        const left = Array(R * C).fill(0).map((v, i) => i).filter(v => !alreadyHit.has(v));
        const i = Math.floor(Math.random() * left.length);
        return toPos(left[i]);
    }

    addMiss(pos) {
        this.misses.add(fromPos(...pos));
    }

    addHit(pos) {
        this.hits.add(fromPos(...pos));
    }

    reset() {
        this.misses.clear();
        this.hits.clear();
        this.gameBoard.resetBoard();
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

    reset() {
        this.misses.clear();
        this.hits.clear();
        this.gameBoard.resetBoard();
    }
}