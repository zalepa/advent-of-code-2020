const fs = require('fs');

const rawInput = fs.readFileSync(__dirname + '/input').toString().split(/\n/);

const input = rawInput.slice(0, rawInput.length - 1).map(v => parseInt(v))

for(let i = 0; i < input.length; i++) {
  let a = input[i];
  for (let j = 0; j < input.length; j++) {
    let b = input[j];
    let sum = a + b;
    if ( sum === 2020 ) {
      console.log(a * b);
      process.exit(); // assumes a single match
    }
  }
}
