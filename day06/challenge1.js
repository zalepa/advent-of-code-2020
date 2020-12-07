const fs = require('fs');

const parse = (filename) => {
  const file = fs.readFileSync(filename).toString();

  return file
    .split(/\n\n/)                   // break into groups
    .map(g => g.replace(/\n/g, ''))  // flatten letters
    .map(g => g.split(''))           // explode each group into array of letters
    .map(g => new Set(g))            // convert array to Set, removing duplicates
    .map(g => g.size)                // get Set size
    .reduce((a, c) => a + c)         // sum sizes
};




(function main() {
  const answer = parse(__dirname + '/input.txt');
  console.log(answer);
})();