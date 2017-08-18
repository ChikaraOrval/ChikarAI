const creepHarvest = require('./creepHarvest');
const creepUpgrade = require('./creepUpgrade');
const creepBuild = require('./creepBuild');

module.exports.loop = function() {
  Object.keys(Game.creeps).forEach(creep => {
    creep = Game.creeps[creep];
    if (creep.memory.role === 'harvest') {
      creepHarvest.run(creep);
    } else if (creep.memory.role === 'upgrade') {
      creepUpgrade.run(creep);
    } else if (creep.memory.role === 'build') {
      creepBuild.run(creep);
    }
  });

  const minHarvesters = 3;
  const minUpgraders = 2;
  const minBuilders = 2;

  const currentHarvesters = _.sum(
    Game.creeps,
    c => c.memory.role === 'harvest'
  );
  const currentUpgraders = _.sum(Game.creeps, c => c.memory.role === 'upgrade');
  const currentBuilders = _.sum(Game.creeps, c => c.memory.role === 'build');

  let name;
  if (currentHarvesters < minHarvesters) {
    name = Game.spawns.Spawn1.createCreep(
      [WORK, WORK, CARRY, MOVE],
      undefined,
      {
        role: 'harvest',
        isMining: true,
      }
    );
  } else if (currentUpgraders < minUpgraders) {
    name = Game.spawns.Spawn1.createCreep(
      [WORK, CARRY, MOVE, MOVE],
      undefined,
      {
        role: 'upgrade',
        isUpgrading: true,
      }
    );
  } else if (currentBuilders < minBuilders) {
    name = Game.spawns.Spawn1.createCreep(
      [WORK, CARRY, MOVE, MOVE],
      undefined,
      {
        role: 'build',
        isBuilding: true,
      }
    );
  } else {
    name = -1;
  }

  if (!(name < 0)) {
    console.log(`Spawned :${name}`);
  }
};
