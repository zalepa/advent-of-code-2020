

const write = process.stdout.write;
const log = (msg) => {}

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
      
      // Process array of integer/operations (maybe refactor this)
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
      // return result;
      stack.push(result)

      
    } else {
      stack.push(c)
    }

    

  }

  log("\nStack:", stack)

  let result = parseInt(stack.shift());

  // log('Initial result', result)

  while (stack.length > 0) {
    let nextSymbol = stack.shift();
    //log('Next symbol', nextSymbol)
    if (nextSymbol === '+' || nextSymbol === '*') {
      let nextInteger = stack.shift();
      //log('Next integer', nextInteger)
      if (nextSymbol === '+') {
        result += parseInt(nextInteger);
      } else {
        result *= parseInt(nextInteger)
      }
    }
  }
  return result;
}

const { assert } = require('console');
const fs = require('fs');
const formulae = fs.readFileSync(__dirname + '/input.txt', 'utf-8').split(/\n/)

test = () => {
  const assert = require('assert');
  assert.strictEqual(computeFormula("2 * 3 + (4 * 5)"), 26);
  assert.strictEqual(computeFormula("5 + (8 * 3 + 9 + 3 * 4 * 3)"), 437);
  assert.strictEqual(computeFormula("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"), 12240);
  assert.strictEqual(computeFormula("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2)"), 13632);
}

// test();

run = () => {
  const fs = require('fs');
  const filename = __dirname + '/input.txt';
  const res = fs.readFileSync(filename, 'utf-8').split(/\n/).map(l => {
    return computeFormula(l);
  });
  console.log(res.reduce((acc, v) => acc + v))
}

run();