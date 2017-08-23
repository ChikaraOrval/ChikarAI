module.exports = function() {
  Creep.prototype.getEnergy = function(useContainer, useEnergySource) {
    let container;
    if (useContainer) {
      container = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: x =>
          x.structureType ===
            (STRUCTURE_CONTAINER || x.structureType === STRUCTURE_STORAGE) &&
          x.store[RESOURCE_ENERGY] > 0,
      });

      if (container !== null) {
        if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.moveTo(container);
        }
      }
    }

    if (container === undefined && useEnergySource) {
      const source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (this.harvest(source) === ERR_NOT_IN_RANGE) {
        this.moveTo(source);
      }
    }
  };
};
