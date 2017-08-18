module.exports = {
  run(creep) {
    if (creep.memory.isUpgrading === false && creep.carry.energy === 0) {
      creep.memory.isUpgrading = true;
    } else if (
      creep.memory.isUpgrading === true &&
      creep.carry.energy === creep.carryCapacity
    ) {
      creep.memory.isUpgrading = false;
    }

    if (creep.memory.isUpgrading === false) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else {
      const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  },
};
