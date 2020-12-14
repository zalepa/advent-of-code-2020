const helpers = require('../helpers');

// const FILE = __dirname + '/sample.txt';
const FILE = __dirname + '/input.txt';
(function main() {
  const lines = helpers.readlines(FILE);
  const busses = lines[1].split(',').map((b, i) => [b, i]).filter(a => a[0] !== 'x');

  let x = 1, y = 1;

  for ([id, index] of busses) {
    for (;;) {
      if ((y + index) % id === 0) break;
      y += x
    }
    x *= id;
  }

  console.log(y);
})();