module.exports = function() {
  StructureSpawn.prototype.createBalancedCreep = function(energy, roleName) {
    const parts = Math.floor(energy / 200);
    const body = [];
    for (let i = 0; i < parts; i++) {
      body.push(WORK);
      body.push(CARRY);
      body.push(MOVE);
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
