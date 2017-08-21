require('./customSpawn')();
const creepHarvest = require('./creepHarvest');
const creepUpgrade = require('./creepUpgrade');
const creepBuild = require('./creepBuild');
const creepRepair = require('./creepRepair');
const creepWallRepair = require('./creepWallRepair');

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
  for (let tower of towers) {
    const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target !== undefined) {
      target.attack(target);
    }
  }

  Object.keys(Game.creeps).forEach(creep => {
    creep = Game.creeps[creep];
    if (creep.memory.role === 'harvest') {
      creepHarvest.run(creep);
    } else if (creep.memory.role === 'upgrade') {
      creepUpgrade.run(creep);
    } else if (creep.memory.role === 'build') {
      creepBuild.run(creep);
    } else if (creep.memory.role === 'repair') {
      creepRepair.run(creep);
    } else if (creep.memory.role === 'wallrepair') {
      creepWallRepair.run(creep);
    }
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

    let name;
    const energy = spawn.room.energyCapacityAvailable;

    if (currentHarvesters < spawn.memory.minHarvesters) {
      name = spawn.createBalancedCreep(energy, 'harvest');
      if (name === ERR_NOT_ENOUGH_ENERGY && currentHarvesters === 0) {
        name = spawn.createBalancedCreep(spawn.room.energyAvailable, 'harvest');
      }
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

    if (!(name < 0)) {
      console.log(`Spawned :${name}`);
    }
  });
};
