module.exports = {
  run: function (creep) {

    var flag = Game.flags[creep.memory.flagName];
    creep.moveTo(flag);
    var findSource = creep.pos.findClosestByRange(FIND_SOURCES);
    //var foundSource = creep.room.lookForAt(LOOK_SOURCES, findSource);
    creep.harvest(findSource);
    /*if (creep.carry.energy === 0 || halfFull) {
      for (var i = 0; i < sources.length; i++) {
        if (creep.pos.inRangeTo(sources[i], 50)) {
          creep.harvest(sources[i]);
        }
      }
    }

    else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: function (structure) {
          return (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });
      if (targets.length > 0) {
        console.log(targets[0]);
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
      else {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
    }*/
  }
}
