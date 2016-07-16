module.exports = {
  run: function (creep) {
    if (creep.carry.energy === 0) {
      creep.moveTo(creep.room.storage);
      creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
    } else {
      var emptyExtensionsAndSpawns = creep.room.find(FIND_MY_STRUCTURES)
        .filter(function (structure) {
          if (!structure.structureType === STRUCTURE_SPAWN && !structure.structureType === STRUCTURE_EXTENSION) {
            return false;
          }

          return structure.energy < structure.energyCapacity;
        });
      creep.moveTo(emptyExtensionsAndSpawns[0]);
      creep.transfer(emptyExtensionsAndSpawns[0], RESOURCE_ENERGY);
    }
  }
};