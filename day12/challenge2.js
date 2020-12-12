const helpers = require('../helpers');

const parse = (line) => {
  const dir = line.match(/([A-Z]*)/)[0]
  const steps = parseInt(line.replace(dir, ""))
  return [dir, steps]
};

(function main() {
  const steps = helpers.readlines(__dirname + '/input.txt').map(parse);

  let waypoint = { x: 10, y: 1           };
  let ship     = { x: 0,  y: 0, dir: 'E' };

  ship.moveForward = function (waypoint, amount) {
    this.x += (waypoint.x * amount);
    this.y += (waypoint.y * amount);
  };

  waypoint.move = function(dir, amount) {
    if (dir === 'N') this.y += amount;
    if (dir === 'S') this.y -= amount;
    if (dir === 'E') this.x += amount;
    if (dir === 'W') this.x -= amount;
  }

  waypoint.rotate = function(direction, degrees) {
    let {x, y} = this;

    if (degrees === 180) {
      this.x = -x;
      this.y = -y;
    } else if (direction === 'R') {
      if (degrees === 90) {
        this.x =  y;
        this.y = -x;
      } else if (degrees === 270) {
        this.x = -y;
        this.y =  x;
      }
    } else if (direction === 'L') {
      if (degrees === 90) {
        this.x =  -y;
        this.y = x;
      } else if (degrees === 270) {
        this.x = y;
        this.y = -x;
      }
    }
  }
  
  function manhattanDistance(x, y) {
    return Math.abs(x) + Math.abs(y)
  }

  steps.forEach(([type, amount]) => {
    switch (type) {
      case 'N':
      case 'S':
      case 'E':
      case 'W':
        waypoint.move(type, amount);
        break;
      case 'R':
      case 'L':
        waypoint.rotate(type, amount);
        break;
      case 'F':
        ship.moveForward(waypoint, amount);
        break;
    }
  });

  console.log(manhattanDistance(ship.x, ship.y))
})();