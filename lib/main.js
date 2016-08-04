var roles = require('roles');
var flagManagement = require('flagManagement');
var energyManagement = require('energyManagement');
var Spawn = require('Spawn');
require('creep.prototype');
var towerManagement = require('structures');

module.exports.loop = function () {
  for (var key in Memory.flags) {
    if (!Game.flags[key]) Memory.flags[key] = undefined;
  }
  for (var key in Memory.creeps) {
    if (!Game.creeps[key]) Memory.creeps[key] = undefined;
  }


  towerManagement.towerManagement();


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
    if (checkForDeadCreeps() === true && spawn.room.energyAvailable >= 300) {
      spawn.emergencyCreep();
    } else {
    spawn.spawnNext();
    }
  }
}