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
      if (constructionSite !== null && constructionSite !== undefined) {
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite);
        }
      } else {
        creepUpgrade.run(creep);
      }
    } else {
      creep.getEnergy(true, true);
    }
  },
};
