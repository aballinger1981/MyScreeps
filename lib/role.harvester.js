module.exports = {
  run: function (creep) {

    if (!creep.pos.isEqualTo(creep.flag)) {
      creep.moveTo(creep.flag);
      return;
    }

    if (creep.carry.energy < creep.energyCapacity - 12) {
      var source = creep.pos.findClosestByRange(FIND_SOURCES);
      creep.harvest(source);
    }
    
    var link = findNearbyLinkFrom(creep, creep.room.linkCategories.harvesterLinks);
    creep.transfer(link, RESOURCE_ENERGY);
  }
}

function findNearbyLinkFrom(creep, links) {
  if (!Array.isArray(links)) return null;

  links.find(link => creep.pos.isNearTo(link));
}
