var roles = require('roles');
var flagManagement = require('flagManagement');
var energyManagement = require('energyManagement');
var Spawn = require('Spawn');
require('creep.prototype');

module.exports.loop = function () {
  for (var key in Memory.flags) {
    if (!Game.flags[key]) Memory.flags[key] = undefined;
  }
  for (var key in Memory.creeps) {
    if (!Game.creeps[key]) Memory.creeps[key] = undefined;
  }

  var tower = Game.getObjectById('577dfc7ad64a98327262d963');
  if (tower) {
    /*var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function (structure) {
        return structure.hits < structure.hitsMax;
      }
    });
    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }*/

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
      return;
    }

    var damagedRoads = tower.room.find(FIND_STRUCTURES).filter(structure =>
      structure.structureType === STRUCTURE_ROAD
    );

    if (damagedRoads.length) {
      tower.repair(damagedRoads[0]);
    }
  }


  flagManagement.sourceFlagManage();
  flagManagement.flagCountReset();
  flagManagement.creepsAssignedToFlag();

  Game.spawns.Spawn1.memory.queueList = [];

  flagManagement.spawnCreeps();

function checkForDeadCreeps () {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    return false;
  }
  return true;
}

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (!creep.memory.role || !roles[creep.memory.role]) continue;
    roles[creep.memory.role].action(creep);
  }


  for (var spawnName in Game.spawns) {
    var spawn = Game.spawns[spawnName];
    if (checkForDeadCreeps() === true && spawn.energy === spawn.energyCapacity) {
      spawn.emergencyCreep();
    } else {
    spawn.spawnNext();
    }
  }
}