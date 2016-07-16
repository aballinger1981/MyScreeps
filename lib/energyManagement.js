module.exports = {
  spawnEnergy: spawnEnergy,
  findEmptyStructures: findEmptyStructures
}

function spawnEnergy() {
  return Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity;
}

function findEmptyStructures() {
  var structureList = [];
  for (var structureName in Game.structures) {
    var structure = Game.structures[structureName];
    if (structure.energy < structure.energyCapacity) {
      structureList.push(structure);
    }
  }
  return structureList;
}