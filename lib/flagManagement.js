module.exports = {
  flagCountReset: flagCountReset,
  sourceFlagManage: sourceFlagManage,
  findYellowFlags: findYellowFlags,
  creepsAssignedToFlag: creepsAssignedToFlag,
  spawnCreeps: spawnCreeps
}

function flagCountReset() {
  for (var flagName in Game.flags) {
    var flag = Game.flags[flagName];
    for (var roleName in flag.memory.roles) {
      var role = flag.memory.roles[roleName];
      role.count = 0;
    }
  }
}

function sourceFlagManage() {
  for (var flagName in Game.flags) {
    var flag = Game.flags[flagName];
    if (flag.color === COLOR_YELLOW && flag.secondaryColor === COLOR_YELLOW) {
      if (!flag.memory.roles) flag.memory.roles = {};
      if (!flag.memory.roles.harvester) flag.memory.roles.harvester = {};
      if (!flag.memory.roles.hauler) flag.memory.roles.hauler = {};
      flag.memory.roles.harvester.target = 1;
      flag.memory.roles.hauler.target = 1;
    }
    if (flag.color === COLOR_PURPLE && flag.secondaryColor === COLOR_PURPLE) {
      if (!flag.memory.roles) flag.memory.roles = {};
      if (!flag.memory.roles.upgrader) flag.memory.roles.upgrader = {};
      flag.memory.roles.upgrader.target = 1;  
    }
    if (flag.color === COLOR_BLUE && flag.secondaryColor === COLOR_BLUE) {
      if (!flag.memory.roles) flag.memory.roles = {};
      if (!flag.memory.roles.builder) flag.memory.roles.builder = {};
      flag.memory.roles.builder.target = 1;  
    }
   /* if (!flag.memory.sourceId) {
        //look for source
      }*/
  }
}

function findYellowFlags() {
  var yellowFlags = [];
  for (var flagName in Game.flags) {
    var flag = Game.flags[flagName];
    if (flag.color === COLOR_YELLOW && flag.secondaryColor === COLOR_YELLOW) {
      yellowFlags.push(flag);
    }
  }
  return yellowFlags;
}

function creepsAssignedToFlag() {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.flagName) {
      var flag = Game.flags[creep.memory.flagName];
      flag.memory.roles[creep.memory.role].count++;
    }
  }
}

function spawnCreeps(creepRole) {
  for (var flagName in Game.flags) {
    var flag = Game.flags[flagName];
    if (flag.memory.roles) {
      for (var roleName in flag.memory.roles) {
        console.log(creepRole[roleName].body);
        if (flag.memory.roles[roleName].count < flag.memory.roles[roleName].target) {
          Game.spawns.Spawn1.createCreep(creepRole[roleName].body, null, { role: roleName, flagName: flag.name });
        }
      }
    }
  }
}