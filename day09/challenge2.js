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

const findRange = (lines, target) => {
  let range = [];

  for (let i = 0; i < lines.length; i++) {

    if (lines[i] === target) continue;    
    let sum = 0;
    let j = i;

    
    while (sum < target) {
      sum += lines[j]
      if (sum === target) {
        range = [i, j];
        break;
      }
      j += 1;
    }

    
    
  }
  
  const set = lines.slice(range[0], range[1] + 1)

  let sortedSet = set.sort()

  return sortedSet[0] + sortedSet[sortedSet.length - 1];
};


(function main() {
  const lines = helpers.readlines(__dirname + '/input.txt')
    .map(l => parseInt(l));
  
  const invalidNumber = findInvalidNumber(lines, 25);

  
  console.log(findRange(lines, invalidNumber));
}());