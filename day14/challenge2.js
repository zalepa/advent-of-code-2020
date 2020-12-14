const shared = require('./shared');
const helpers = require('../helpers');

let memory = {};

// let currentMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
let currentMask = '000000000000000000000000000000000000';

const program = helpers.readlines(__dirname + '/input.txt')
  .map(shared.parseCommand)
  .forEach(cmd => {
    switch(cmd.type) {
      case 'mask':
        currentMask = cmd.mask;
        break;
      case 'mem':
        // get permutations of addresses
        const mask = shared.applyMemoryMask(cmd.address, currentMask);
        const addresses = shared.permute(mask).map(shared.toDecimal);
        addresses.forEach(a => {
          memory[a] = cmd.value;
        })
        break;
    }
  });

console.log(Object.values(memory).reduce((acc, v) => acc + v));