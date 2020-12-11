const helpers = require('../helpers');

const parse = (lines) => {

  let counts = {one: 0, three: 1};
  
  let currentVoltage = 0;

  let sorted = [];
  
  let candidate = {joltage: 0};

  while (candidate !== undefined) {
    
    currentVoltage = candidate.joltage;

    let candidates = lines.filter(l => {
      return (l - currentVoltage <= 3) && (l > currentVoltage)
    }).map(l => {
      return {
        joltage: l,
        difference: l - currentVoltage
      }
    }).sort((a,b) => {
      return a.difference - b.difference
    })

    console.log(candidates);
    
    candidate = candidates[0];

    if (candidate === undefined) break;
    if (candidate.difference === 1) counts.one += 1
    else if (candidate.difference === 3) counts.three += 1
    
    sorted.push(candidate);
  }
  
  console.log(counts.one * counts.three);

  return sorted;
}

(function main() {
  const lines = helpers.readNumbers(__dirname + '/input.txt')
    .sort((a,b) => a - b);
  
  
  parse(lines);


})();