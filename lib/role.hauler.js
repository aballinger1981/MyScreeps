var energyManagement = require('energyManagement');

module.exports = {
  run: function (creep) {
    var flag = Game.flags[creep.memory.flagName];
    //check to see if the spawn energy is less than capacity
    var checkSpawnEnergy = energyManagement.spawnEnergy();
    //if creep's energy is not 0 and the spawn is full, look for structures and transfer energy to them
    var structureEnergy = energyManagement.findStructures();
    if (creep.carry.energy !== 0 && checkSpawnEnergy === false) {
      if (structureEnergy.length) {
        creep.moveTo(structureEnergy[0]);
        creep.transfer(structureEnergy[0], RESOURCE_ENERGY);
      }
      else {
        creep.moveTo(flag);
        var findEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        creep.pickup(findEnergy);
      }
    }
    // else, tansfer energy to a storage container
    //---------------

    //if creep's energy is not 0 and the spawn's energy is not full, transfer energy to spawn
    else if (creep.carry.energy !== 0 && checkSpawnEnergy === true) {
      creep.moveTo(Game.spawns.Spawn1);
      creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY);
    }
    //Go to the flag and pick up energy 
    else {
      creep.moveTo(flag);
      var findEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
      creep.pickup(findEnergy);
    }
  }
}