module.exports = {
  towerManagement: towerManagement
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
          towers[i].attack(closestHostile[0]);
        } else {
          var damagedRoads = roomName.find(FIND_STRUCTURES).filter(structure =>
            structure.structureType === STRUCTURE_ROAD && structure.hits < 2000
          );

          if (damagedRoads.length && towers[i].energy > 900) {
            towers[i].repair(damagedRoads[0]);
          }
        }
      }
    }
  }
  return;
}