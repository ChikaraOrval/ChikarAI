const creepUpgrade = require('./creepUpgrade');

module.exports = {
  run(creep) {
    if (creep.memory.isBuilding === false && creep.carry.energy === 0) {
      creep.memory.isBuilding = true;
    } else if (
      creep.memory.isBuilding === true &&
      creep.carry.energy === creep.carryCapacity
    ) {
      creep.memory.isBuilding = false;
    }

    if (creep.memory.isBuilding === false) {
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
    } else {
      const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  },
};
