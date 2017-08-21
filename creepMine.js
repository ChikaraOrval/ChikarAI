module.exports = {
  run(creep) {
    const source = Game.getObjectById(creep.memory.sourceId);
    const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType === STRUCTURE_CONTAINER,
    })[0];
    if (creep.pos.isEqualTo(container)) {
      creep.harvest(source);
    } else {
      creep.moveTo(container);
    }
  },
};
