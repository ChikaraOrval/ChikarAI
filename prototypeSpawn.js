const listOfRoles = [
  'harvest',
  'upgrade',
  'build',
  'repair',
  'wallrepair',
  'mine',
  'transport',
];

StructureSpawn.prototype.spawnCreeps = function() {
  const room = this.room;
  const roomCreeps = room.find(FIND_MY_CREEPS);

  const currentCreeps = {};
  for (let i = 0; i < listOfRoles.length; i += 1) {
    currentCreeps[listOfRoles[i]] = _.sum(
      roomCreeps,
      c => c.memory.role === listOfRoles[i]
    );
  }

  const roomMaxEnergy = room.energyCapacityAvailable;
  let name;

  if (currentCreeps.harvest === 0 && currentCreeps.transport === 0) {
    if (currentCreeps.mine > 0) {
      name = this.createTransporter(150);
    } else {
      name = this.createBalancedCreep(room.energyAvailable, 'harvest');
    }
  } else {
    const sources = room.find(FIND_SOURCES);
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
          name = this.createMiner(sources[i].id);
          break;
        }
      }
    }
  }

  if (name === undefined) {
    for (let i = 0; i < listOfRoles.length; i += 1) {
      if (
        currentCreeps[listOfRoles[i]] < this.memory.minCreeps[listOfRoles[i]]
      ) {
        if (listOfRoles[i] === 'transport') {
          name = this.createTransporter(150);
        } else {
          name = this.createBalancedCreep(roomMaxEnergy, listOfRoles[i]);
        }
      }
    }
  }

  //  const currLongDistance = {};
  //  if (name === undefined) {
  //    // count the number of long distance harvesters globally
  //    for (const roomName in this.memory.minLongDistance) {
  //      currLongDistance[roomName] = _.sum(
  //        Game.creeps,
  //        c => c.memory.role === 'longdistance' && c.memory.target === roomName
  //      );
  //
  //      if (currLongDistance[roomName] < this.memory.minLongDistance[roomName]) {
  //        name = this.createLongDistance(200, room.name, roomName, 0);
  //      }
  //    }
  //  }

  //  const currLongDistance = {};
  //  if (name === undefined) {
  //    for (const roomName in this.memory.minLongDistance) {
  //      currLongDistance[roomName] = _.sum(
  //        Game.creeps,
  //        c =>
  //          c.memory.role === 'longdistance' && c.memory.targetRoom === roomName
  //      );
  //      if (currLongDistance[roomName] < this.memory.minLongDistance[roomName]) {
  //        name = this.createLongDistance(200, room.name, roomName, 0);
  //      }
  //    }
  //  }

  if (name !== undefined && _.isString(name)) {
    console.log(
      `${this.name} spawned new creep: ${name} (${Game.creeps[name].memory
        .role})`
    );
    for (const role of listOfRoles) {
      console.log(`${role}: ${currentCreeps[role]}`);
    }
  }
};

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

StructureSpawn.prototype.createLongDistance = function(
  energy,
  mainRoom,
  targetRoom,
  sourceIndex
) {
  const parts = Math.floor(energy / 200);
  const body = [];
  for (let i = 0; i < parts; i += 1) {
    body.push(WORK);
    body.push(CARRY);
    body.push(MOVE);
  }

  return this.createCreep(body, undefined, {
    role: 'longdistance',
    mainRoom,
    targetRoom,
    sourceIndex,
    isWorking: true,
  });
};
