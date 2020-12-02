const helpers = require('../helpers');

// Converts the lines of the input into objects representing the
// min, max, letter, and password contents of each line.
function clean(data) {
  return data.map(e => {
    const pattern = /^(\d*)-(\d*) ([a-z]*): ([a-z]*)$/;
    const [_, min, max, letter, password] = e.match(pattern);
    return {min, max, letter, password};
  });
}

function countLetters(letter, str) {
  const pattern = new RegExp(letter, 'g');
  return (str.match(pattern) || []).length;
}

// Iterates through the array of objects, counts the number of *letter* values
// in *password* is between *min* and *max*, inclusive and if so increments
// a *sum* return value.
function count(data) {
  return data.map(d => {
    const count = countLetters(d.letter, d.password);
    return (count >= d.min && count <= d.max) ? 1 : 0;
  }).reduce((a, b) => a + b);
}

(function main() {
  const data = clean(helpers.readlines(__dirname + '/input.txt'));
  console.log(count(data))
})();
