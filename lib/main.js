var roles = require('roles');
var flagManagement = require('flagManagement');
var energyManagement = require('energyManagement');
var Spawn = require('Spawn');

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
    }
  }


  flagManagement.sourceFlagManage();
  flagManagement.flagCountReset();
  flagManagement.creepsAssignedToFlag();

Game.spawns.Spawn1.memory.queueList = [];

  flagManagement.spawnCreeps();


  /*for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    for (var roleName in creepRole) {
      if (creep.memory.role === roleName) {
        creepRole[roleName].count++;
      }
    }
  }*/

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (!creep.memory.role || !roles[creep.memory.role]) continue;
    roles[creep.memory.role].action(creep);
  }

  for (var spawnName in Game.spawns) {
    var spawn = Game.spawns[spawnName];
    spawn.spawnNext();
  }
}