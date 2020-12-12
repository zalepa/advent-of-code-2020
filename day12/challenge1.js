const helpers = require('../helpers');

const parse = (line) => {
  const dir = line.match(/([A-Z]*)/)[0]
  const steps = parseInt(line.replace(dir, ""))
  return [dir, steps]
}

(function main() {
  const steps = helpers.readlines(__dirname + '/input.txt').map(parse);

  let movement = {
    currentDirection: 'E',
    horizontal: 0,
    vertical: 0,
  };

  let rotations = {
    'N': ['E', 'S', 'W'],
    'S': ['W', 'N', 'E'],
    'E': ['S', 'W', 'N'],
    'W': ['N', 'E', 'S'],
  }

  steps.forEach(([dir, steps]) => {
    switch(dir) {
      case 'N': 
        movement.vertical += steps
        break;
      case 'S': 
        movement.vertical -= steps
        break;
      case 'E': 
        movement.horizontal += steps
        break;
      case 'W': 
        movement.horizontal -= steps
        break;
      case 'L': 
        degrees = steps / 90;
        if (degrees === 1) degrees = 3;
        else if (degrees == 3) degrees = 1;
        movement.currentDirection = rotations[movement.currentDirection][degrees - 1]
        break;
      case 'R':
        degrees = steps / 90;
        movement.currentDirection = rotations[movement.currentDirection][degrees - 1]
        break;
      case 'F': 
        if (movement.currentDirection === 'E')      movement.horizontal += steps;
        else if (movement.currentDirection === 'W') movement.horizontal -= steps;
        else if (movement.currentDirection === 'N') movement.vertical   += steps;
        else if (movement.currentDirection === 'S') movement.vertical   -= steps;
        break;
    }
  });

  function manhattanDistance(movement) {
    return Math.abs(movement.horizontal) + Math.abs(movement.vertical)
  }

  console.log(manhattanDistance(movement));
  
})();