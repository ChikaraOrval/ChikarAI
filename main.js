const creepHarvest = require('./creepHarvest');

module.exports.loop = function() {
  Object.keys(Game.creeps).forEach(creep => {
    creep = Game.creeps[creep];
    if (creep.memory.role === 'harvest') {
      creepHarvest.run(creep);
    }
  });

  const minHarvesters = 4;
  const currentHarvesters = _.sum(
    Game.creeps,
    c => c.memory.role === 'harvest'
  );

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
  }

  if (!(name < 0)) {
    console.log(`Spawned :${name}`);
  }
};
