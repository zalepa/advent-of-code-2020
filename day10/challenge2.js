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

    candidate = candidates[0];

    if (candidate !== undefined) {
      sorted.push(candidate);
    }
  }
  

  return sorted;
}

(function main() {
  const lines = helpers.readNumbers(__dirname + '/input.txt')
    .sort((a,b) => a - b);
  
  
  const sorted = parse(lines);

  let inc = 0;
  let paths = 1;

  for (i = 0; i<sorted.length; i++) {
    try {
      if (sorted[i].difference === 1 && sorted[i+1].difference === 1) {
        inc += 1
      } else {
        if (inc >= 1 && inc <= 3) paths *= (2*inc) + Math.floor(Math.log(inc))
        inc = 0;
      }
    } catch {}
  }

  console.log(paths);

})();