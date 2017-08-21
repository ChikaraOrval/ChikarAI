module.exports = {
  run(creep) {
    const source = Game.getObjectById(creep.memory.sourceId);
    const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType === STRUCTURE_CONTAINER,
    });
    console.log('mine 1');
    if (creep.pos.isEqualTo(container.pos)) {
      console.log('mine 2');

      creep.harvest(source);
    } else {
      console.log('mine 3');

      creep.moveTo(container);
    }
  },
};
