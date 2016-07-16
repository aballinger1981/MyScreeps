var energyManagement = require('energyManagement');

module.exports = {
  run: function (creep) {

    var flag = Game.flags[creep.memory.flagName];
    if (creep.carry.energy === 0) {
      creep.moveTo(creep.room.storage);
      creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
    }
    else {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }
}