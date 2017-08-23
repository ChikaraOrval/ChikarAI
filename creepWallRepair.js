const creepBuild = require('./creepBuild');

module.exports = {
  run(creep) {
    if (creep.memory.isWorking === false && creep.carry.energy === 0) {
      creep.memory.isWorking = true;
    } else if (
      creep.memory.isWorking === true &&
      creep.carry.energy === creep.carryCapacity
    ) {
      creep.memory.isWorking = false;
    }

    if (creep.memory.isWorking === false) {
      let walls = creep.room.find(FIND_STRUCTURES, {
        filter: s =>
          s.structureType === STRUCTURE_WALL ||
          s.structureType === STRUCTURE_RAMPART,
      });

      walls = walls.sort(
        (a, b) => (a.hits > b.hits ? 1 : b.hits > a.hits ? -1 : 0)
      );
      const target = walls[0];

      if (target !== undefined) {
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else {
        creepBuild.run(creep);
      }
    } else {
      creep.getEnergy(true, true);
    }
  },
};
