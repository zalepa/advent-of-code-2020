const helpers = require('../helpers');

function clean(data) {
  return data.map(r => r.split(''));
}

function findTrees(data, right, down) {
  let sum = 0;

  const maxY = data[0].length - 1;

  for (i = down, j = right; i < data.length; i += down, j += right) {    
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
  let res = [
    findTrees(data, 1, 1),
    findTrees(data, 3, 1),
    findTrees(data, 5, 1),
    findTrees(data, 7, 1),
    findTrees(data, 1, 2)
  ].reduce((acc, v) => acc * v)
  console.log(res);
})();