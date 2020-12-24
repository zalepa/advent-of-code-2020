const colors = require('colors');
const log = console.log;

const input = '389125467'.split('').map(e => parseInt(e));

function move(circle, currentCup=0, moveNumber=0) {
  log(`\n-- move ${moveNumber + 1} --`.inverse)
  
  log('cups:', circle.map((e, i) => {
    if (i === currentCup) return `(${e})`
    return e;
  }).join(' ').yellow)

  /*
    The crab picks up the three cups that are immediately clockwise of the 
    current cup. They are removed from the circle; cup spacing is adjusted as 
    necessary to maintain the circle.
  */

  let nextThreeCupsClockwiseOfCurrentCup = circle.splice(currentCup + 1, 3);

  if (circle.length - currentCup <= 3) {
    // Calculate how many we need from the head of the array
    let availableCupsFromTail = (circle.length - 1) - currentCup
    let neededFromFront = 3 - availableCupsFromTail;
    nextThreeCupsClockwiseOfCurrentCup = nextThreeCupsClockwiseOfCurrentCup.concat(circle.splice(0, neededFromFront));
  }

  log(circle)
  log('current cup:', currentCup, '=', circle[currentCup])
  // log(circle
  log('pick up:', nextThreeCupsClockwiseOfCurrentCup.join(', ').yellow)

  /*
    The crab selects a destination cup: the cup with a label equal to the 
    current cup's label minus one. 
  */ 

  let destinationCup = circle[currentCup] - 1;

  /*
    If this would select one of the cups that was just picked up, the crab will
    keep subtracting one until it finds a cup that wasn't just picked up. 
    If at any point in this process the value goes below the lowest value on any 
    cup's label, it wraps around to the highest value on any cup's label 
    instead.
  */
  let lowestCupValue = [...circle].sort()[0];
  
  
  while (nextThreeCupsClockwiseOfCurrentCup.includes(destinationCup)) {
    destinationCup -= 1;
    if (destinationCup < lowestCupValue) {
      destinationCup = [...circle].sort()[circle.length - 1];
    }
  }

  log('desination:', destinationCup)

  
  /*
    The crab places the cups it just picked up so that they are immediately 
    clockwise of the destination cup. They keep the same order as when they were
    picked up.
  */
 let index = circle.indexOf(destinationCup)
 for (let i = 0; i < nextThreeCupsClockwiseOfCurrentCup.length; i++, index++) {
  circle.splice(index + 1, 0, nextThreeCupsClockwiseOfCurrentCup[i])
 }

 log('Final circle:', circle)

}

function game() {
  let currentCup = 0;
  for (let i = 0; i <= 10; i++) {
    let pos = i % input.length;
    move(input, pos, i);
  }
  // move(input, 0)
  // move(input, 1)
  // move(input, 2)
  // move(input, 3)
  // move(input, 4)
  // move(input, 5)
  // move(input, 6)
  // move(input, 7)
  // move(input, 8)
  // move(input, 0)
  // move(input, 1)
}

game();