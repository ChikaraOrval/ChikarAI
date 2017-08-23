require('./customSpawn')();
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
  }

  Object.keys(Game.creeps).forEach(creep => {
    Game.creeps[creep].runRole();
  });

  Object.keys(Game.spawns).forEach(spawn => {
    spawn = Game.spawns[spawn];
    const roomCreeps = spawn.room.find(FIND_MY_CREEPS);

    const currentHarvesters = _.sum(
      roomCreeps,
      c => c.memory.role === 'harvest'
    );
    const currentUpgraders = _.sum(
      roomCreeps,
      c => c.memory.role === 'upgrade'
    );
    const currentBuilders = _.sum(roomCreeps, c => c.memory.role === 'build');
    const currentRepairers = _.sum(roomCreeps, c => c.memory.role === 'repair');
    const currentWallRepairers = _.sum(
      roomCreeps,
      c => c.memory.role === 'wallrepair'
    );
    const currentMiners = _.sum(roomCreeps, c => c.memory.role === 'mine');
    const currentTransporters = _.sum(
      roomCreeps,
      c => c.memory.role === 'transport'
    );

    let name;
    const energy = spawn.room.energyCapacityAvailable;

    if (currentHarvesters === 0 && currentTransporters === 0) {
      if (currentMiners > 0) {
        name = spawn.createTransporter(150);
      } else {
        name = spawn.createBalancedCreep(spawn.room.energyAvailable, 'harvest');
      }
    } else {
      const sources = spawn.room.find(FIND_SOURCES);
      for (let i = 0; i < sources.length; i += 1) {
        if (
          !_.some(
            roomCreeps,
            c => c.memory.role === 'mine' && c.memory.sourceId === sources[i].id
          )
        ) {
          const containers = sources[i].pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType === STRUCTURE_CONTAINER,
          });
          if (containers.length > 0) {
            name = spawn.createMiner(sources[i].id);
            break;
          }
        }
      }
    }

    if (name === undefined) {
      if (currentHarvesters < spawn.memory.minHarvesters) {
        name = spawn.createBalancedCreep(energy, 'harvest');
      } else if (currentTransporters < spawn.memory.minTransporters) {
        name = spawn.createTransporter(150);
      } else if (currentUpgraders < spawn.memory.minUpgraders) {
        name = spawn.createBalancedCreep(energy, 'upgrade');
      } else if (currentBuilders < spawn.memory.minBuilders) {
        name = spawn.createBalancedCreep(energy, 'build');
      } else if (currentRepairers < spawn.memory.minRepairers) {
        name = spawn.createBalancedCreep(energy, 'repair');
      } else if (currentWallRepairers < spawn.memory.minWallRepairers) {
        name = spawn.createBalancedCreep(energy, 'wallrepair');
      } else {
        name = -1;
      }
    }

    if (!(name < 0)) {
      console.log(`Spawned :${name}`);
    }
  });
};
