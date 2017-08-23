require('./prototypeSpawn');
require('./prototypeCreep');

module.exports.loop = function() {
  Object.keys(Memory.creeps).forEach(creep => {
    if (Game.creeps[creep] === undefined) {
      delete Memory.creeps[creep];
    }
  });

  const towers = _.filter(
    Game.structures,
    s => s.structureType === STRUCTURE_TOWER
  );

  for (const tower of towers) {
    const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target !== null) {
      tower.attack(target);
    }

    const structure = tower.room.find(FIND_STRUCTURES, {
      filter: s =>
        s.hits < s.hitsMax &&
        s.structureType !== STRUCTURE_WALL &&
        s.structureType !== STRUCTURE_RAMPART,
    });
    if (structure) {
      tower.repair(structure[Math.floor(Math.random() * structure.length)]);
    }
  }

  Object.keys(Game.creeps).forEach(creep => {
    Game.creeps[creep].runRole();
  });

  Object.keys(Game.spawns).forEach(spawn => {
    Game.spawns[spawn].spawnCreeps();
  });
};
