var structures = require('structures');

module.exports = {
  run: function (creep) {

    var structures = creep.room.find(FIND_STRUCTURES);

    creep
      .shouldGetEnergyAbove(10000)
      .goToFlagWhenEnergyBelow(10000)
      .repairRamparts(structures, 5000)
      .findAndBuildConstructionSites()
      .repairDamagedBuildings(structures)
      .repairBarriers(structures, 50000);
      //.repairRoads(structures, 2000);

  }
}


