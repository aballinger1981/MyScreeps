var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHauler = require('role.hauler');
var flagManagement = require('flagManagement');
var energyManagement = require('energyManagement');

module.exports.loop = function () {

  for (const key in Memory.flags) {
    if (!Game.flags[key]) Memory.flags[key] = undefined;
  }
  for (const key in Memory.creeps) {
    if (!Game.creeps[key]) Memory.creeps[key] = undefined;
  }
  /*var tower = Game.getObjectById('id79370');
  if (tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function (structure) {
        return structure.hits < structure.hitsMax;
      }
    });
    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  }*/

  var creepRole = {
    harvester: {
      body: []
      //body: [WORK, WORK, MOVE, CARRY]
    },
    upgrader: {
      body: [WORK, MOVE, MOVE, CARRY, CARRY]
    },
    builder: {
      body: [WORK, MOVE, MOVE, CARRY, CARRY]
    },
    hauler: {
      body: []
      //body: [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
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
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role === 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role === 'hauler') {
      roleHauler.run(creep);
    }
  }
}