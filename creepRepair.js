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
      const structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.hits < 2000000 && s.structureType === STRUCTURE_RAMPART,
      });

      if (structure !== null) {
        if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      } else {
        creepBuild.run(creep);
      }
    } else {
      creep.getEnergy(true, true);
    }
  },
};
