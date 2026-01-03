export class Ship {
    constructor(len, pos = null, dir = null) {
        this.len = len;
        this.hitTimes = 0;
        this.pos = pos;
        this.dir = dir;
    }

    hit() {
        this.hitTimes = Math.min(this.hitTimes + 1, this.len);
        return true;
    }

    isSunk() {
        return this.hitTimes === this.len;
    }
}