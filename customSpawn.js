module.exports = function() {
  StructureSpawn.prototype.createBalancedCreep = function(energy, roleName) {
    const body = [];
    while (energy > 0) {
      body.push(MOVE);
      energy -= 50;
      body.push(WORK);
      energy -= 100;
      body.push(CARRY);
      energy -= 50;
      if (energy < 0) {
        body.pop();
      }
    }

    return this.createCreep(body, undefined, {
      role: roleName,
      isWorking: true,
    });
  };

  StructureSpawn.prototype.createHarvester = function(energy) {
    const parts = Math.floor(energy / 150);
    const body = [];
    for (let i = 0; i < parts; i++) {
      body.push(WORK);
      body.push(MOVE);
    }

    return this.createCreep(body, undefined, {
      role: 'harvest',
      isWorking: true,
    });
  };
};
