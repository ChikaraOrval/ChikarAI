const creepUpgrade = require('./creepUpgrade');

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
      const constructionSite = creep.pos.findClosestByPath(
        FIND_CONSTRUCTION_SITES
      );
      if (constructionSite !== undefined) {
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite);
        }
      } else {
        creepUpgrade.run(creep);
      }
    } else if (
      Game.spawns.Spawn1.room.energyAvailable ===
      Game.spawns.Spawn1.room.energyCapacityAvailable
    ) {
      const spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: x => x.structureType === STRUCTURE_SPAWN,
      });
      if (creep.withdraw(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    } else {
      const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  },
};
