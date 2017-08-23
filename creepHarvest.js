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
      const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s => s.energy < s.energyCapacity,
      });

      if (structure !== undefined) {
        if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
    } else {
      creep.getEnergy(false, true);
    }
  },
};
