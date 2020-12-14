const helpers = require('../helpers');

(function main() {
  const lines = helpers.readlines(__dirname + '/input.txt');

  let t = parseInt(lines[0]);

  const busses = lines[1].split(',').filter(l => l !== 'x').map(l => parseInt(l));

  
  let earliest = null;
  let i = t;
  let matchTime = null;

  while (earliest === null) {
    

    let out = "";
    busses.forEach(b => {
      if (i % b === 0) {
        earliest = b;
        matchTime = i;
      }
    });
    i++;
  }

  console.log((matchTime - t) * earliest);
})();