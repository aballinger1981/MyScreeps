var energyManagement = require('energyManagement');

module.exports = {
  run: function (creep) {

    var flag = Game.flags[creep.memory.flagName];
    if (creep.carry.energy === 0) {
      creep.moveTo(flag);
      var findSource = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
      creep.pickup(findSource);
    }
    else {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    







    /*var sources = creep.room.find(FIND_SOURCES);
    var nearSource = creep.pos.isNearTo(sources[0]);
    var halfFull = creep.carry.energy > 0 && creep.carry.energy < creep.carryCapacity;

    if (creep.carry.energy === 0 || (nearSource && halfFull)) {
      // harvest energy from source if energy is 0 or creep is near source and energy is between 0 and capacity
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    } else {
      // upgrade the room controller
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }*/
  }
}