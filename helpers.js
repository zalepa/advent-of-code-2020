const fs = require('fs');

/* 
  Reads a file, converts to string and splits by newline characters
*/
exports.readlines = function(filename) {
  const rawInput = fs.readFileSync(filename);
  const strInput = rawInput.toString();
  const output = strInput.split(/\n/);
  const lines = output.length - 1;

  if (output[lines] === undefined) {
    return output.slice(0, lines);
  } else {
    return output;
  }
}