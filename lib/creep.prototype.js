Creep.prototype.shouldGetEnergyAbove = function (minimumEnergy) {
  if (this.halt) return this;

  if (this.carry.energy === 0 && this.room.storage.store.energy > minimumEnergy) {
    this.moveTo(this.room.storage);
    this.withdraw(this.room.storage, RESOURCE_ENERGY);
    this.halt = true;
  }
  return this;
}

Creep.prototype.goToFlagWhenEnergyBelow = function (minimumEnergy) {
  if (this.halt) return this;

  if (this.carry.energy === 0 && this.room.storage.store.energy < minimumEnergy) {
    this.moveTo(Game.flags.Flag1);
    this.halt = true;
  }
  return this;
}

Creep.prototype.repairRamparts = function (structures, minimumHits) {
  if (this.halt) return this;

  var newRamparts = structures.filter(function (structure) {
    if (structure.structureType === STRUCTURE_RAMPART && structure.hits < minimumHits) {
      return true;
    }
  });

  if (newRamparts.length) {
    this.moveTo(newRamparts[0]);
    this.repair(newRamparts[0]);
    this.halt = true;
  }
  return this;
}

Creep.prototype.findAndBuildConstructionSites = function () {
  if (this.halt) return this;

  var constructionSites = this.room.find(FIND_MY_CONSTRUCTION_SITES);

  if (constructionSites.length) {
    this.moveTo(constructionSites[0]);
    this.build(constructionSites[0]);
    this.halt = true;
  }
  return this;
}

Creep.prototype.repairDamagedBuildings = function (structures) {
  if (this.halt) return this;

  var damagedBuildings = structures.filter(function (structure) {
    var isMaintenanceStructure = structure.structureType === STRUCTURE_RAMPART
      || structure.structureType === STRUCTURE_CONTAINER
      || structure.structureType === STRUCTURE_ROAD;
    var isWall = structure.structureType === STRUCTURE_WALL;

    if (isMaintenanceStructure || isWall) {
      return false;
    }

    if (structure.hits < structure.hitsMax) {
      return true;
    }
  });

  if (damagedBuildings.length) {
    this.moveTo(damagedBuildings[0]);
    this.repair(damagedBuildings[0]);
    this.halt = true;
  }
  return this;
}

Creep.prototype.repairBarriers = function (structures, numHits) {
  if (this.halt) return this;

  var damagedBarriers = structures.filter(function (structure) {
    if ((structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART) && structure.hits < numHits) {
      return true;
    }
  });
  if (damagedBarriers.length) {
    this.moveTo(damagedBarriers[0]);
    this.repair(damagedBarriers[0]);
    this.halt = true;
  }
  return this;
}

Creep.prototype.repairRoads = function (structures, numHits) {
  if (this.halt) return this;

  var damagedRoads = structures.filter(function (structure) {
    if (structure.structureType === STRUCTURE_ROAD && structure.hits < numHits) {
      return true;
    }
  });
  if (damagedRoads.length) {
    this.moveTo(damagedRoads[0]);
    this.repair(damagedRoads[0]);
    this.halt = true;
  }
  return this;
}

Creep.prototype.upgradeRoomController = function () {
  if (this.halt) return this;

  if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE) {
    this.moveTo(this.room.controller);
    this.halt = true;
  }
  return this;
}


module.exports = {};