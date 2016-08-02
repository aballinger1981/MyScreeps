var energyManagement = require('energyManagement');

module.exports = {
  run: function (creep) {

creep
  .shouldGetEnergyAbove(5000)
  .goToFlagWhenEnergyBelow(5000)
  .upgradeRoomController();
  }
}