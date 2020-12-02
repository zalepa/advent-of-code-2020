const helpers = require('../helpers');

const input = helpers.readlines(__dirname + '/input').map(v => parseInt(v))

for(let i = 0; i < input.length; i++) {
  let a = input[i];
  for (let j = 0; j < input.length; j++) {
    let b = input[j];
    for (let k = 0; k < input.length; k++) {
      let c = input[k];
      let sum = a + b + c;
      if ( sum === 2020 ) {
        console.log(a * b * c);
        process.exit(); // assumes a single match
      }
    }
  }
}
