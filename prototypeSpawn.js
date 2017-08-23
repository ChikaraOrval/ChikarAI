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
  console.log('in function');
  const room = this.room;
  const roomCreeps = room.find(FIND_MY_CREEPS);

  const currentCreeps = {};
  for (let i = 0; i < listOfRoles; i += 1) {
    currentCreeps[listOfRoles[i]] = _.sum(
      roomCreeps,
      c => c.memory.role === listOfRoles[i]
    );

    console.log(`${listOfRoles[i]} : ${currentCreeps[listOfRoles[i]]}`);
  }

  const roomMaxEnergy = room.energyCapacityAvailable;
  let name;

  if (currentCreeps.harvest === 0 && currentCreeps.transport === 0) {
    console.log('no harvest/transport');
    if (currentCreeps.mine > 0) {
      console.log('have miner');
      name = this.createTransporter(150);
    } else {
      console.log('no miners');
      name = this.createBalancedCreep(room.energyAvailable, 'harvest');
    }
  } else {
    console.log('else loop');
    const sources = room.find(FIND_SOURCES);
    for (let i = 0; i < sources.length; i += 1) {
      if (
        !_.some(
          roomCreeps,
          c => c.memory.role === 'mine' && c.memory.sourceId === sources[i].id
        )
      ) {
        console.log('in else if loop');
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

  console.log(`${name}equals `);

  if (name === undefined) {
    console.log('in undef loop');
    for (let i = 0; i < listOfRoles; i += 1) {
      console.log('1');
      if (currentCreeps[listOfRoles[i]] < this.memory.minCreeps) {
        console.log('2');
        if (listOfRoles[i] === 'transport') {
          console.log('3');
          this.createTransporter(150);
        } else {
          console.log('4');
          this.createBalancedCreep(roomMaxEnergy, listOfRoles[i]);
        }
      }
    }
  }

  if (name !== undefined && _.isString(name)) {
    console.log(`Spawned :${name}`);
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
