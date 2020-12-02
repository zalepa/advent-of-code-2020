const helpers = require('../helpers');

const input = helpers.readlines(__dirname + '/input').map(v => parseInt(v))

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
