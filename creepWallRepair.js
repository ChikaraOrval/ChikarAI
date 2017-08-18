const creepBuild = require('./creepBuild');

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
      let walls = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_WALL,
      });

      walls = walls.sort(
        (a, b) => (a.hits > b.hits ? 1 : b.hits > a.hits ? -1 : 0)
      );
      const target = walls[0];

      if (target !== undefined) {
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else {
        creepBuild.run(creep);
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
