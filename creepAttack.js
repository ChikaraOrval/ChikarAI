module.exports = {
  run(creep) {
    const attackFlag = Game.flags.attackFlag;
    const moveFlag = Game.flags.moveFlag;
    if (attackFlag) {
      if (creep.room.name === attackFlag.pos.roomName) {
        const enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemy) {
          if (creep.attack(enemy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(enemy);
          }
        }
      } else {
        const exit = creep.room.findExitTo(attackFlag.pos.roomName);
        creep.moveTo(exit);
      }
    } else if (moveFlag) {
      creep.moveTo(moveFlag);
    }
  },
};