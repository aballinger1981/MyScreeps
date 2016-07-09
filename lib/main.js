var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHauler = require('role.hauler');
var flagManagement = require('flagManagement');
var energyManagement = require('energyManagement');

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

  var creepRole = {
    harvester: {
      body: [],
      action: roleHarvester.run
    },
    upgrader: {
      body: [],
      action: roleUpgrader.run
    },
    builder: {
      body: [],
      action: roleBuilder.run
    },
    hauler: {
      body: [],
      priority: 0,
      max: 16,
      action: roleHauler.run
    }
  };

    

  flagManagement.sourceFlagManage();
  flagManagement.flagCountReset();
  flagManagement.creepsAssignedToFlag();
  energyManagement.bodyParts(creepRole);
  flagManagement.spawnCreeps(creepRole);
  
  
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
    if (!creep.memory.role) continue;
    creepRole[creep.memory.role].action(creep);
  }
}