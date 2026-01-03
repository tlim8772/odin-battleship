const { ComputerPlayer } = require("./player")

test('computer player 1', () => {
    const comp = new ComputerPlayer();
    comp.addHit([0, 0]);
    comp.addMiss([0, 1]);
    expect(comp.canAttackPos([1, 2])).toBe(true);
    expect(comp.canAttackPos([0, 0])).toBe(false);
    expect(comp.canAttackPos([0, 1])).toBe(false);
    console.log(comp.getAttackPos());
})