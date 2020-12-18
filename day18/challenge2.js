

const write = process.stdout.write;
const log = (msg) => {}

/**
 * 
 * @param {array} list - An array of integers and operations
 */
function processList(list) {
  // ex, list = 1+2*3+4*5+6
  // 1. Find indicies of all '*' operators.
  //  ex, list = 1+2*3+4*5+6
  //             0123456789A
  //                ^   ^
  // 2. Break array into chunks at these indicies
  // list = [[1+2],[3+4],[5+6]]  
  // 3. Evaulate each sub-array
  // list = [3, 7, 11]
  // 4. Reduce via multiplication
  // list = 3 * 7 * 11 = 231
  const sums = list.join('').split('*').map(eq => {
    return eq.split('+').map(v => parseInt(v)).reduce((acc,v) => acc +v);
  });

  return sums.reduce((acc, v) => acc * v);
}

function computeFormula(input) {

  let stack = [];

  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === ' ') continue;

    if (c === ')') {
      log('Parens Process....')
      log('stack upon detecting parens', stack);
      
      let op = stack.pop();
      let parens = [];
      do {
        parens.push(op);
        op = stack.pop();
      } while (op !== '(')

      parens = parens.reverse();
      
      log('stack after parens removal', stack);
      log("parens:", parens)

      let result = processList(parens)
      
      // Process array of integer/operations (maybe refactor this)
      /*
      old method...
      let result = parseInt(parens.shift());
      log('Initial result = ', result)
      while (parens.length > 0) {
        let nextSymbol = parens.shift();
        log('Next symbol', nextSymbol)
        if (nextSymbol === '+' || nextSymbol === '*') {
          let nextInteger = parseInt(parens.shift());
          log('Next integer=', nextInteger)
          if (nextSymbol === '+') {
            log('Performing', result, "+", nextInteger)
            result += nextInteger;
          } else {
            log('Performing', result, "*", nextInteger)
            result *= nextInteger
          }
        }
        log('Next result=', result)
      }
      */
      // return result;
      stack.push(result)

      
    } else {
      stack.push(c)
    }



  }

  log("\nStack:", stack)

  let result = processList(stack)
 
  return result;
}

const { assert } = require('console');
const fs = require('fs');
const formulae = fs.readFileSync(__dirname + '/input.txt', 'utf-8').split(/\n/)

test = () => {
  const assert = require('assert');
  const tests = [
    ['1 + 2 * 3 + 4 * 5 + 6', 231],
    ['1 + (2 * 3) + (4 * (5 + 6))', 51],
    ['2 * 3 + (4 * 5)', 46],
    ['5 + (8 * 3 + 9 + 3 * 4 * 3)', 1445],
    ['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', 669060],
    ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', 23340],
  ];

  tests.forEach(t => {
    assert.strictEqual(computeFormula(t[0]), t[1])
  });
}

// test();

// console.log(computeFormula('5 + (8 * 3 + 9 + 3 * 4 * 3)'.split('')))

run = () => {
  const fs = require('fs');
  const filename = __dirname + '/input.txt';
  const res = fs.readFileSync(filename, 'utf-8').split(/\n/).map(l => {
    return computeFormula(l);
  });
  console.log(res.reduce((acc, v) => acc + v))
}

run();