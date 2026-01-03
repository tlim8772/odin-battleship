import { RIGHT, DOWN, GameBoard } from "./gameBoard.js";
import { Ship } from "./ship.js";

test('gameboard 1', () => {
    const gb = new GameBoard();
    
    gb.placeShip(new Ship(2), RIGHT, [0, 0]);
    for (let i = 0; i < 2; i++) {
        gb.receiveAttack([0, i]);
    }
    expect(gb.allShipsSunk()).toBe(true);

    expect(gb.canPlace(new Ship(2), DOWN, [0, 0])).toBe(false);
    expect(() => gb.placeShip(new Ship(2), DOWN, [0, 0])).toThrow();
    expect(gb.canPlace(new Ship(2), RIGHT, [1, 0])).toBe(false);
    
})

test('gameboard 2', () => {
    const gb = new GameBoard();
    gb.placeRandom();
    console.log(gb.toString());
})
    
test('gameboard 3', () => {
    const gb = new GameBoard();
    gb.placeShip(new Ship(2), RIGHT, [0, 0]);
    expect(gb.canHit([0, 0])).toBe(true);
    expect(gb.receiveAttack([0, 0])).toBe(true);
    expect(gb.canHit([0, 0])).toBe(false);
    
    expect(gb.receiveAttack([9, 9])).toBe(false);
    expect(gb.canHit([9, 9])).toBe(false);
})