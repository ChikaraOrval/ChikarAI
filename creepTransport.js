module.exports = {
  run(creep) {
    console.log('transport');

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
        filter: s =>
          s.structureType === STRUCTURE_SPAWN ||
          s.structureType === STRUCTURE_EXTENSION ||
          (s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity),
      });
      if (structure !== null) {
        if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
    } else {
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s =>
          s.structureType === STRUCTURE_CONTAINER &&
          s.store[RESOURCE_ENERGY] > 0,
      });

      if (container !== null) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  },
};
