const fs = require('fs');


const parse = (filename) => {
  const file = fs.readFileSync(filename).toString();

  const output = file
    .split(/\n\n/)                   // break into groups
    .map(g => {                      // count group size
      const clean = g.replace(/\n$/, '');
      return {
        raw: clean,
        size: (clean.match(/\n/g) || []).length + 1
      }
    })
    .map(g => {                     // parse leters and indices
      const letters = g.raw.replace(/\n/g, '').split('')
      return {...g, 
        letters,
        indicies: new Set(letters) 
      }
    })
    .map(g => {                     // count letters
      const count = {}
      g.indicies.forEach(element => {
        count[element] = g.letters.filter(e => e === element).length;
      });
      return {...g, count}
    })
    .map(g => {                     // validate counts of letters
      let validation = [];
      Object.keys(g.count).map(c => {
        validation.push(g.count[c] === g.size);
      })
      return {...g, validation};
    })
    .map(g => g.validation.filter(e => e).length)
    .reduce((a, c) => a + c)         // sum sizes

  return output;
};




(function main() {
  const answer = parse(__dirname + '/input.txt');
  console.log(answer);
})();