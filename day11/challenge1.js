const helpers = require('../helpers');

const getSurroundingSeats = (row, column, map) => {
  let nw, n, ne, sw, s, se;

  const prevRow = map[row - 1];
  const nextRow = map[row + 1];

  if (prevRow) {
    n = prevRow[column] || '';
    nw = prevRow[column-1] || '';
    ne = prevRow[column+1] || '';
  }

  if (nextRow) {
    s = nextRow[column] || '';
    sw = nextRow[column-1] || '';
    se = nextRow[column+1] || '';
  }

  let e = map[row][column-1] || ''
  let w = map[row][column+1] || ''

  return [nw, n, ne, e, w, sw, s, se];
}

const process = (map) => {
  const nextMap = map.map((r, i) => {
    return r.split('').map((element, j) => {
      
      const surroundings = getSurroundingSeats(i, j, map).join('');


      if (element === 'L' && surroundings.indexOf('#') === -1) {
        return '#'
      } else if (element === '#') {
        const occupied = surroundings.match(/#/g);
        if (occupied  && occupied.length >= 4) return 'L'
      } 


      return element;
    }).join('');

  });

  return nextMap
}



(function main() {
  const lines = helpers.readlines(`${__dirname}/input.txt`);

  let count = 1;
  let map = lines;
  let nextMap;

  for (;;) {
    let nextMap = process(map);
    if (nextMap.join('') === map.join('')) {
      console.log(
        nextMap.join('').match(/#/g).length
      );
      break;
    } else {
      count += 1
      map = nextMap
    }
  }
  
})();