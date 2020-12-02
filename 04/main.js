const fs = require('fs');

// Reads the input file and splits it into lines
function read(filename) {
  return fs.readFileSync(filename).toString().split(/\n/);
}

// Converts the lines of the input into objects representing the
// first index, second index, letter, and password contents of each line.
function clean(data) {
  return data.map(e => {
    const parts = e.split(' ');

    const [index1, index2] = parts[0].split('-').map(e => parseInt(e));

    const letter = parts[1].replace(':', '');

    const password = parts[2];

    return {index1, index2, letter, password};
  })
}

// Iterates through the array of objects, computs a *sum* of the number of
// *password* values where the characters at *index1* or *index2* (but not both)
// are equal to *letter. Returns the *sum*.
function count(data) {
  let sum = 0;

  data.forEach(d => {
    const firstIndexMatch = d.password[d.index1 - 1] === d.letter;
    const secondIndexMatch = d.password[d.index2 - 1] === d.letter;

    if ((firstIndexMatch || secondIndexMatch) &&
        !(firstIndexMatch && secondIndexMatch)) {
      sum += 1
    }
  })

  return sum;
}

(function main() {
  const data = clean(read(__dirname + '/input.txt'));
  console.log(count(data))
})();
