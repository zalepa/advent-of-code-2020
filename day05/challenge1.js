const helpers = require('../helpers');

function findRow(str) {
  const totalRows = 128;
  const totalCols = 8;
  const dirs = str.split('');
  let row = 0;
  let seat = 0;

  let currentRowMin = 0;
  let currentRowMax = totalRows - 1;

  let currentColMin = 0;
  let currentColMax = totalCols - 1;

  dirs.forEach(dir => {
    if (dir === 'F' || dir === 'B') {
      
      let dist = currentRowMax - currentRowMin;
      let midpoint = dist / 2;

      if (dir === 'F') {
        currentRowMax = Math.floor(midpoint + currentRowMin);
      } else if (dir === 'B') {
        currentRowMin = Math.ceil(midpoint + currentRowMin);
      }

      if (currentRowMin === currentRowMax) {
        row = currentRowMin;
      }
    } else if (dir === 'L' || dir === 'R') {

      let dist = currentColMax - currentColMin;
      let midpoint = dist / 2;

      if (dir === 'L') {
        currentColMax = Math.floor(midpoint + currentColMin);
      } else if (dir === 'R') {
        currentColMin = Math.ceil(midpoint + currentColMin);
      }

      if (currentColMin === currentColMax) {
        seat = currentColMin;
      }
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