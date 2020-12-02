const fs = require('fs');

// Reads the input file and splits it into lines
function read(filename) {
  return fs.readFileSync(filename).toString().split(/\n/);
}

// Converts the lines of the input into objects representing the
// min, max, letter, and password contents of each line.
function clean(data) {
  return data.map(e => {
    const parts = e.split(' ');

    const [min, max] = parts[0].split('-').map(e => parseInt(e));

    const letter = parts[1].replace(':', '');

    const password = parts[2];

    return {min, max, letter, password};
  })
}

// Iterates through the array of objects, counts the number of *letter* values
// in *password* is between *min* and *max*, inclusive and if so increments
// a *sum* return value.
function count(data) {
  let sum = 0;

  data.forEach(d => {
    const letterCount = (d.password.match(new RegExp(d.letter, 'g')) || []).length;
    if (letterCount >= d.min && letterCount <= d.max) {
      sum += 1
    }
  })

  return sum;
}

(function main() {
  const data = clean(read(__dirname + '/input.txt'));
  console.log(count(data))
})();
