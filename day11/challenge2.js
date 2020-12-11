const helpers = require('../helpers');

const getNumberOfOccupiedSeats = (row, column, map, debug) => {
  let occupied = 0;

  for (let i = row - 1; i >= 0; i--) { // Travel N (column fixed)
    let inspectedCell = map[i][column];
    if (inspectedCell !== '.') {
      if (inspectedCell === '#') occupied += 1;
      break 
    }
  }

 
  for (let i = row + 1; i < map.length; i++) { // Travel S (column fixed)
    let inspectedCell = map[i][column];
    if (inspectedCell !== '.') {
      if (inspectedCell === '#') occupied += 1;
      break 
    }
  }

  for (let i = column - 1; i >= 0; i--) { // Travel W (row fixed)
    let inspectedCell = map[row][i];
    if (inspectedCell !== '.') {
      if (inspectedCell === '#') occupied += 1;
      break 
    }
  }

  for (let i = column + 1; i <= map[row].length; i++) { // Travel E (row fixed)
    let inspectedCell = map[row][i];
    if (inspectedCell !== '.') {
      if (inspectedCell === '#') occupied += 1;
      break 
    }
  }

  for (let i = row - 1, j = column + 1; i >= 0; i--, j++) { // Travel NW
    let inspectedCell = map[i][j];
    if (inspectedCell !== '.') {
      if (inspectedCell === '#') occupied += 1;
      break 
    }
  }

  for (let i = row - 1, j = column - 1; i >= 0; i--, j--) { // Travel NE
    let inspectedCell = map[i][j];
    if (inspectedCell !== '.') {
      if (inspectedCell === '#') occupied += 1;
      break 
    }
  }

  for (let i = row + 1, j = column - 1; i < map.length; i++, j--) { // Travel SW
    let inspectedCell = map[i][j];
    if (inspectedCell !== '.') {
      if (inspectedCell === '#') occupied += 1;
      break 
    }
  }

  for (let i = row + 1, j = column + 1; i < map.length; i++, j++) { // Travel SE
    let inspectedCell = map[i][j];
    if (inspectedCell !== '.') {
      if (inspectedCell === '#') occupied += 1;
      break 
    }
  }

  return occupied;
}

const process = (map, debug) => {
  const nextMap = map.map((r, i) => {
    return r.split('').map((element, j) => {
      
      const occupiedSeats = getNumberOfOccupiedSeats(i, j, map);
    
      if (element === '#' && occupiedSeats >= 5) return 'L'
      else if (element === 'L' && occupiedSeats === 0) return '#'
      
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