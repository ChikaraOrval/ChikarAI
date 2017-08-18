module.exports = {
  run(creep) {
    if (creep.memory.isMining === false && creep.carry.energy === 0) {
      creep.memory.isMining = true;
    } else if (
      creep.memory.isMining === true &&
      creep.carry.energy === creep.carryCapacity
    ) {
      creep.memory.isMining = false;
    }

    if (creep.memory.isMining === true) {
      const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s => s.energy < s.energyCapacity,
      });

      if (structure !== undefined) {
        if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
    } else {
      const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  },
};
