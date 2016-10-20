module.exports = {
  towerManagement: towerManagement,
  linkManagement: linkManagement
}

function towerManagement() {
  for (var names in Game.rooms) {
    var roomName = Game.rooms[names];
    var towers = roomName.find(FIND_MY_STRUCTURES).filter(function (structure) {
      if (structure.structureType === STRUCTURE_TOWER) {
        return true;
      }
      return false;
    });

    if (towers.length) {
      for (var i = 0; i < towers.length; i++) {
        var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
          towers[i].attack(closestHostile);
        } else {
          var damagedRoads = roomName.find(FIND_STRUCTURES).filter(structure =>
            structure.structureType === STRUCTURE_ROAD && structure.hits < 2001
          );

          if (damagedRoads.length && towers[i].energy > 700) {
            towers[i].repair(damagedRoads[0]);
          }
        }
      }
    }
  }
  return;
}

function linkManagement() {
  for (var name in Game.rooms) {
    var room = Game.rooms[name];

    room.linkCategories.harvesterLinks.forEach(link => {
      var controllerLink = room.linkCategories.controllerLink;
      if (controllerLink && controllerLink.energy > controllerLink.energyCapacity / 2) {
        link.transferEnergy(room.linkCategories.storageLink);
      } else {
        link.transferEnergy(room.linkCategories.controllerLink);
      }
    });
  }
}

Object.defineProperty(StructureLink.prototype, 'linkType', {
  get: function linkType() {
    if (this.pos.inRangeTo(this.room.storage, 3)) {
      return 'storageLink';
    } else if (this.pos.inRangeTo(this.room.controller, 3)) {
      return 'controllerLink';
    } else {
      return 'harvesterLinks';
    }
  },
});

Object.defineProperty(Room.prototype, 'linkCategories', {
  get: function linkCategories() {
    if (this.cachedLinkCategories) return this.cachedLinkCategories;

    var links = this.find(FIND_MY_STRUCTURES).filter(structure =>
      structure.structureType === STRUCTURE_LINK
    );

    var storageLink = links.find(function (link) {
      return link.linkType === 'storageLink';
    });

    var controllerLink = links.find(function (link) {
      return link.linkType === 'controllerLink';
    });

    var harvesterLinks = links.filter(function (link) {
      return link.linkType === 'harvesterLinks';
    });

    this.cachedLinkCategories = {
      storageLink: storageLink,
      controllerLink: controllerLink,
      harvesterLinks: harvesterLinks
    };

    return this.cachedLinkCategories;
  }
});