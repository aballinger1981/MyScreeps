var energyManagement = require('energyManagement');

module.exports = {
  run: function (creep) {
    if (!creep.pos.isEqualTo(creep.flag)) {
      creep.moveTo(creep.flag);
    } else if (creep.carry.energy < creep.carryCapacity / 4) {
      creep.withdraw(creep.room.linkCategories.controllerLink, RESOURCE_ENERGY);
    } else {
      creep.upgradeController(creep.room.controller);
    }
    // creep
    //   .shouldGetEnergyAbove(5000)
    //   .goToFlagWhenEnergyBelow(5000)
    //   .upgradeRoomController();
  }
}
