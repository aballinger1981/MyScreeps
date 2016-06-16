module.exports = {
  run(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      for (var i = 0; i < sources.length; i++) {
        if (creep.harvest(sources[i]) === ERR_NOT_IN_RANGE && creep.harvest(sources[i]).energy === creep.harvest(sources[i]).energyCapacity) {
          creep.moveTo(sources[i]);
        }
      }
    }
    else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    }
  }
}