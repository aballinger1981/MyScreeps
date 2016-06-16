var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

  var tower = Game.getObjectById('id79370');
  if (tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax
    });
    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  }

  var creepRole = {
    harvester: {
      count: 0,
      target: 2
    },
    upgrader: {
      count: 0,
      target: 1
    },
    builder: {
      count: 0,
      target: 1
    }
  };

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    for (var roleName in creepRole) {
      if (creep.memory.role === roleName) {
        creepRole[roleName].count++;
      }
    }
  }
 
  for (var roleName in creepRole) {
   if (creepRole[roleName].count < creepRole[roleName].target) {
      Game.spawns.Spawn1.createCreep([WORK, MOVE, MOVE, CARRY], null, { role: roleName });
    }
  }

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
  }
}