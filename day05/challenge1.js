const helpers = require('../helpers');

function binarySpaceParition(range, split) {
  if (!split.match(/upper|lower/)) {
    throw new Error('split parameter must be "lower" or "upper"');
  }

  let min = range[0];
  let max = range[1];

  const dist = max - min;
  const midpoint = dist / 2;

  if (split === 'lower') {
    max = Math.floor(midpoint + min);
  } else if (split === 'upper') {
    min = Math.ceil(midpoint + min);
  }

  return [min, max]
}

function findRow(str) {
  const totalRows = 128;
  const totalCols = 8;
  let row = 0;
  let seat = 0;
  
  let currentRowMin = 0;
  let currentRowMax = totalRows - 1;
  let currentColMin = 0;
  let currentColMax = totalCols - 1;

  const dirs = str.split('');

  dirs.forEach(dir => {

    let direction = 'lower';
    if (dir.match(/B|R/)) direction = 'upper'

    if (dir.match(/F|B/)) {
      [currentRowMin, currentRowMax] = binarySpaceParition([currentRowMin, currentRowMax], direction)
      if (currentRowMin === currentRowMax) row = currentRowMin;
    }
      
    else if (dir.match(/R|L/)) {
      [currentColMin, currentColMax] = binarySpaceParition([currentColMin, currentColMax], direction);
      if (currentColMin === currentColMax) seat = currentColMin;
    }
  });

  return [row, seat];
}

(function main(file){
  const lines = helpers.readlines(file);
  let maxSeatId = 0;
  lines.forEach(l => {
    let [row, seat] = findRow(l);
    let answer = (row * 8) + seat;
    if (answer > maxSeatId) {
      maxSeatId = answer
    }
  })

  console.log(maxSeatId);
})(__dirname + '/input.txt');