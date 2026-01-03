export class Ship {
    constructor(len) {
        this.len = len;
        this.hitTimes = 0;
    }

    hit() {
        this.hitTimes = Math.min(this.hitTimes + 1, this.len);
    }

    isSunk() {
        return this.hitTimes === this.len;
    }
}