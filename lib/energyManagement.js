module.exports = {
  spawnEnergy: spawnEnergy,
  findStructures: findStructures,
  bodyParts: bodyParts
}

function spawnEnergy() {
  return Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity;
}

function findStructures() {
  var structureList = [];
  for (var structureName in Game.structures) {
    var structure = Game.structures[structureName];
    if ((structure.structureType === STRUCTURE_EXTENSION ||
      structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_ROAD || structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART || structure.structureType === STRUCTURE_STORAGE || structure.structureType === STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity) {
      structureList.push(structure);
    }
  }
  return structureList;
}

function bodyParts(creepRole) {
  var numExtensions = 0;
  for (var structureName in Game.structures) {
    var structure = Game.structures[structureName];
    if (structure.structureType === STRUCTURE_EXTENSION && structure.energy === structure.energyCapacity) {
      numExtensions++;
    }
  }
  var energyLevel = ((numExtensions * 50) + 300);
  for (var roleName in creepRole) {
    if (roleName === 'harvester') {
      var workEnergy = energyLevel - 100;
      var workParts = Math.trunc(workEnergy / 100);
      for (var i = 0; i < workParts; i++) {
        creepRole[roleName].body.push(WORK);
      }
      creepRole[roleName].body.push(MOVE);
      creepRole[roleName].body.push(CARRY);
    }
    if (roleName === 'hauler') {
      var numBodyParts = energyLevel / 50;
      var numCarryParts = Math.ceil(numBodyParts / 2);
      var numMoveParts = Math.trunc(numBodyParts - numCarryParts);
      for (var i = 0; i < numCarryParts; i++) {
        creepRole[roleName].body.push(CARRY);
      }
      for (var i = 0; i < numMoveParts; i++) {
        creepRole[roleName].body.push(MOVE);
      }
    }
    //console.log(creepRole[roleName].body);
  }
}