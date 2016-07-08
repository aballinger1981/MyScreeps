module.exports = {
  run: function (creep) {

    var flag = Game.flags[creep.memory.flagName];
    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
    }
    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
    }

    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
      else {
        var redFlag = creep.room.find(FIND_FLAGS, { color: COLOR_RED, secondaryColor: COLOR_RED });
        creep.moveTo(redFlag[0]);
      }
    }
    else {
      creep.moveTo(flag);
      var findEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
      creep.pickup(findEnergy);
    }
  }
}