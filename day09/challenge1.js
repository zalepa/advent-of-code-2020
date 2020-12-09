const helpers = require('../helpers');

const findInvalidNumber = (lines, preambleSize) => {
  for (let i = preambleSize; i < lines.length; i++) {
    let operandSet = lines.slice(i - preambleSize, i);
    let target = lines[i];
    
    let match = null;

    for (let j = 0; j < operandSet.length; j++) {
      for (let k = 0; k < operandSet.length; k++) {
        if (j !== k) {
          let candidateSum = operandSet[j] + operandSet[k];
          if (candidateSum === target) {
            match = candidateSum;
            break;
          }
        }
      }
    }

    if (!match) {
      return target;
    }
  }
};


(function main() {
  const lines = helpers.readlines(__dirname + '/input.txt')
    .map(l => parseInt(l));
  
  console.log(findInvalidNumber(lines, 25));
}());