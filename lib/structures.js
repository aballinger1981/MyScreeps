module.exports = {
  findDamagedStructures: findDamagedStructures
}

function findDamagedStructures() {
  var damagedStructures = [];
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role === 'builder') {
      var structures = creep.room.find(FIND_STRUCTURES, {
        filter: function (structure) {
          if (structure.hits < structure.hitsMax) {
            damagedStructures.push(structure);
          }
        }
      });
    }  
  }
  return damagedStructures;
}