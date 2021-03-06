module.exports = {
  run(creep) {
    const attackFlag = Game.flags.attackFlag;
    const moveFlag = Game.flags.moveFlag;

    if (attackFlag) {
      if (creep.room.name === attackFlag.pos.roomName) {
        const enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (enemy) {
          console.log(enemy);
          console.log(creep.attack(enemy));
          if (creep.attack(enemy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(enemy);
          }
        }

        const enemyLair = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        if (enemy === null && enemyLair) {
          if (creep.attack(enemyLair) === ERR_NOT_IN_RANGE) {
            creep.moveTo(enemyLair);
          }
        }
      } else {
        const exit = creep.room.findExitTo(attackFlag.pos.roomName);
        creep.moveTo(creep.pos.findClosestByPath(exit));
      }
    } else if (moveFlag) {
      creep.moveTo(moveFlag);
    }
  },
};
