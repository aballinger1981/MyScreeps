var roles = require('roles');

module.exports = {};

StructureSpawn.prototype.queue = function (creepRole, flagName) {
  var priority = roles[creepRole].priority;
  // check if queueList exists in spawn's memory
  // if it doesn't, create an empty array
  if (!this.memory.queueList) this.memory.queueList = [];
  
  // push priority, creepRole, flagName to spawn's queueList array
  this.memory.queueList.push({ creepRole: creepRole, flagName: flagName, priority: priority });
}

StructureSpawn.prototype.spawnNext = function () {
  if (this.spawning !== null) return;
  if (!this.memory.queueList || this.memory.queueList.length === 0) return;
  
  this.memory.queueList.sort(function (a, b) {
    return a.priority - b.priority;
  });
console.log(this.memory.queueList[0].creepRole);
  //.......
  /*for (key in this.memory.queueList[0]) {
    console.log(this.memory.queueList[0][key]);
  }*/
  //

  var body = this.findPossibleBody(roles[this.memory.queueList[0].creepRole].body);
  
  var result = this.createCreep(body, null, { role: this.memory.queueList[0].creepRole, flagName: this.memory.queueList[0].flagName });
  
  if (typeof result === 'string') {
    this.memory.queueList.shift();
    return result;
  }
}

StructureSpawn.prototype.findPossibleBody = function (targetBody) {
  var costs = {
    move: 50,
    work: 100,
    carry: 50,
    attack: 80,
    ranged_attack: 150,
    heal: 250,
    claim: 600,
    tough: 10
  };
  var energyUsed = 0;
  var availableEnergy = this.room.energyCapacityAvailable;
  var finalBody = [];
  for (var i = 0; i < targetBody.length; i++) {
    energyUsed += costs[targetBody[i]];
    if (energyUsed < availableEnergy) {
      finalBody.push(targetBody[i]);
    } else {
      break;
    }
  }

  return finalBody;
}

StructureSpawn.prototype.emergencyCreep = function () {
  this.createCreep([MOVE, CARRY, CARRY, MOVE, CARRY, CARRY], null, { role: 'conveyor', flagName: 'Flag2' });
  return;
}