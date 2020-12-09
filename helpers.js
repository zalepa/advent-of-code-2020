const fs = require('fs');

let DEBUG = false;

exports.DEBUG = DEBUG;

/* 
  Reads a file, converts to string and splits by newline characters
*/
exports.readlines = function(filename) {
  const rawInput = fs.readFileSync(filename);
  const strInput = rawInput.toString();
  const output = strInput.split(/\n/);
  const lines = output.length - 1;
  
  if (output[lines] === undefined || output[lines] === '') {
    return output.slice(0, lines);
  } else {
    return output;
  }
}

exports.debug = function(msg) {
  if (exports.DEBUG) {
    console.log(msg)
  }
}