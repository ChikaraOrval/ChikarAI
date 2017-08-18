require('./customSpawn')();
const creepHarvest = require('./creepHarvest');
const creepUpgrade = require('./creepUpgrade');
const creepBuild = require('./creepBuild');
const creepRepair = require('./creepRepair');

module.exports.loop = function() {
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
    }
  });

  const minHarvesters = 2;
  const minUpgraders = 1;
  const minBuilders = 2;
  const minRepairers = 1;

  const currentHarvesters = _.sum(
    Game.creeps,
    c => c.memory.role === 'harvest'
  );
  const currentUpgraders = _.sum(Game.creeps, c => c.memory.role === 'upgrade');
  const currentBuilders = _.sum(Game.creeps, c => c.memory.role === 'build');
  const currentRepairers = _.sum(Game.creeps, c => c.memory.role === 'repair');

  let name;
  const energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

  if (currentHarvesters < minHarvesters) {
    name = Game.spawns.Spawn1.createBalancedCreep(energy, 'harvest');
    if (name === ERR_NOT_ENOUGH_ENERGY && currentHarvesters === 0) {
      name = Game.spawns.Spawn1.createBalancedCreep(
        Game.spawns.Spawn1.room.energyAvailable,
        'harvest'
      );
    }
  } else if (currentUpgraders < minUpgraders) {
    name = Game.spawns.Spawn1.createBalancedCreep(energy, 'upgrade');
  } else if (currentBuilders < minBuilders) {
    name = Game.spawns.Spawn1.createBalancedCreep(energy, 'build');
  } else if (currentRepairers < minRepairers) {
    name = Game.spawns.Spawn1.createBalancedCreep(energy, 'repair');
  } else {
    name = -1;
  }

  if (!(name < 0)) {
    console.log(`Spawned :${name}`);
  }
};
