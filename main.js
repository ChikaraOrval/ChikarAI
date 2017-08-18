const creepHarvest = require('./creepHarvest');
const creepUpgrade = require('./creepUpgrade');

module.exports.loop = function() {
  Object.keys(Game.creeps).forEach(creep => {
    creep = Game.creeps[creep];
    if (creep.memory.role === 'harvest') {
      creepHarvest.run(creep);
    } else if (creep.memory.role === 'upgrade') {
      creepUpgrade.run(creep);
    }
  });

  const minHarvesters = 4;
  const minUpgraders = 2;

  const currentHarvesters = _.sum(
    Game.creeps,
    c => c.memory.role === 'harvest'
  );
  const currentUpgraders = _.sum(Game.creeps, c => c.memory.role === 'upgrade');

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
  }

  if (!(name < 0)) {
    console.log(`Spawned :${name}`);
  }
};
