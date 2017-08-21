module.exports = function() {
  StructureSpawn.prototype.createBalancedCreep = function(energy, roleName) {
    const parts = Math.floor(energy / 200);
    const body = [];
    for (let i = 0; i < parts; i += 1) {
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
    for (let i = 0; i < parts; i += 1) {
      body.push(WORK);
      body.push(MOVE);
    }

    return this.createCreep(body, undefined, {
      role: 'harvest',
      isWorking: true,
    });
  };

  StructureSpawn.prototype.createMiner = function(sourceId) {
    return this.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE], undefined, {
      role: 'mine',
      sourceId,
    });
  };

  StructureSpawn.prototype.createTransporter = function(energy) {
    const parts = Math.floor(energy / 150);
    const body = [];
    for (let i = 0; i < parts; i += 1) {
      body.push(CARRY);
      body.push(CARRY);
      body.push(MOVE);
    }

    return this.createCreep(body, undefined, {
      role: 'transport',
      isWorking: true,
    });
  };
};
