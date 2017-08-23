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
      if (creep.room.name === creep.memory.mainRoom) {
        let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: s =>
            (s.structureType === STRUCTURE_SPAWN ||
              s.structureType === STRUCTURE_EXTENSION ||
              s.structureType === STRUCTURE_TOWER) &&
            s.energy < s.energyCapacity,
        });

        if (structure === null) {
          structure = creep.room.storage;
        }

        if (structure !== null && structure !== undefined) {
          if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
          }
        }
      } else {
        const exit = creep.room.findExitTo(creep.memory.mainRoom);
        creep.moveTo(creep.pos.findClosestByPath(exit));
      }
    } else if (creep.room.name === creep.memory.targetRoom) {
      const source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else {
      const exit = creep.room.findExitTo(creep.memory.targetRoom);
      creep.moveTo(creep.pos.findClosestByPath(exit));
    }
  },
};
