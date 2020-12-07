const helpers = require('../helpers');

function clean(data) {
  return data.map(r => r.split(''));
}

function findTrees(data) {
  let sum = 0;

  const maxY = data[0].length - 1;

  for (i = 1, j = 3; i < data.length; i += 1, j += 3) {    
    // We run off the array here, need to recompute our location in the row
    if (j > maxY) {
      j = j - maxY - 1;
    }

    if (data[i][j] === '#') {
      sum += 1;
    }
  }

  return sum
}

(function main() {
  const data = clean(helpers.readlines(__dirname + '/input.txt'));
  const sum = findTrees(data); // answer: 193
  console.log(sum);
})();