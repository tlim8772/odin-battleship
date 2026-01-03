import { GameBoardPlace } from './gameBoardPlace.js'
import { RIGHT, DOWN } from './gameBoard.js'
import { Ship } from './ship.js';

test('game board 1', () => {
    const gbp = new GameBoardPlace();
    expect(gbp.isAdjacent([0, 0])).toBe(false);
    expect(gbp.canPlace(new Ship(5), RIGHT, [0, 0])).toBe(true);

    expect(() => gbp.placeShip(new Ship(5), RIGHT, [0, 0])).not.toThrow();
    expect(gbp.isAdjacent([1, 0])).toBe(true);
    expect(gbp.canPlace(new Ship(5), RIGHT, [1, 0])).toBe(false);
    expect(gbp.canPlace(new Ship(2), RIGHT, [0, 5])).toBe(false);
    expect(gbp.ships[0].pos).toEqual([0, 0]);
    expect(gbp.ships[0].dir).toEqual([0, 1]);
})

test('game board 2', () => {
    const gbp = new GameBoardPlace();
    gbp.placeRandom();
    console.log(gbp.toString());
})