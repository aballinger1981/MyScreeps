var energyManagement = require('energyManagement');

module.exports = {
  run: function (creep) {
    var flag = Game.flags[creep.memory.flagName];

    if (creep.carry.energy < creep.carryCapacity) {
      creep.moveTo(flag);
      //var droppedEnergy = flag.pos.lookFor(LOOK_RESOURCES);
      var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
      creep.pickup(droppedEnergy);
      //console.log(droppedEnergy);
    } else {
      creep.moveTo(creep.room.storage);
      creep.transfer(creep.room.storage, RESOURCE_ENERGY);
    }
  }
}