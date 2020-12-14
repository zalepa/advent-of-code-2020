const shared = require('./shared');
const helpers = require('../helpers');

let memory = {};

let currentMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const program = helpers.readlines(__dirname + '/input.txt')
  .map(shared.parseCommand)
  .forEach(cmd => {
    switch (cmd.type) {
      case 'mask':
        currentMask = cmd.mask;
        break;
      case 'mem':
        memory[cmd.address] = shared.applyMask(cmd.value, currentMask);
        break;
    }
    
  })

console.log(Object.values(memory).reduce((acc, v) => acc + v));