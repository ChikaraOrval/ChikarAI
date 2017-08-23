module.exports = {
  run(creep) {
    const attackFlag = Game.flags.attackFlag;
    const moveFlag = Game.flags.moveFlag;

    if (attackFlag) {
      console.log('attack flag found');
      if (creep.room.name === attackFlag.pos.roomName) {
        console.log('found');
        const enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemy) {
          if (creep.attack(enemy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(enemy);
          }
        }
      } else {
        console.log('not found');
        const exit = creep.room.findExitTo(attackFlag.pos.roomName);
        console.log(exit);
        const exit2 = creep.room.findExitTo(attackFlag);
        console.log(exit2);
        creep.moveTo(exit);
      }
    } else if (moveFlag) {
      creep.moveTo(moveFlag);
    }
  },
};
