const helpers = require('../helpers');

// Converts the lines of the input into objects representing the
// first index, second index, letter, and password contents of each line.
function clean(data) {
  return data.map(e => {
    const pattern = /^(\d*)-(\d*) ([a-z]*): ([a-z]*)$/;
    const [_, index1, index2, letter, password] = e.match(pattern);
    return {index1: index1, index2, letter, password};
  })
}

// Iterates through the array of objects, computes a *sum* of the number of
// *password* values where the characters at *index1* or *index2* (but not both)
// are equal to *letter. Returns the *sum*.
function count(data) {
  return data.map(d => {
    const match1  = d.password[d.index1 - 1] === d.letter;
    const match2  = d.password[d.index2 - 1] === d.letter;
    const valid   = match1 || match2;
    const invalid = match1 && match2;
    return (valid && !invalid) ? 1 : 0;
  }).reduce((a,b) => a + b);
}

(function main() {
  const data = clean(helpers.readlines(__dirname + '/input.txt'));
  console.log(count(data))
})();
