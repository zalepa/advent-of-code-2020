/**
 * Left pads an array with a value
 * @param {Arry} arr - Input array to left pad
 * @param {number} len - Size of output array
 * @param {*} fill - Value to pad with
 * @returns {Array} - Left-padded array
 */
function leftpad(arr,len,fill) {
  return Array(len).fill(fill).slice(arr.length).concat(arr)
}

/**
 * Applies a mask to a decimal value and returns a decimal result
 * @param {number} dec - A decimal value to mask
 * @param {string} mask - A binary bitstring
 * @returns {number} - A decimal value after applying the mask to the value
 */
function applyMask(dec, mask) {
  const binary = (dec >>> 0).toString(2).split('').map(v => parseInt(v));
  const input = leftpad(binary, 36, 0);
  const res = input.map((digit, i) => {
    const maskBit = mask[i];
    if (maskBit === 'X') return digit;
    return parseInt(maskBit);
  }).join('')
  return parseInt(res, 2);
}

/**
 * Parses an input command into an object ovalues
 * @param {string} cmd - Command to parse
 * @returns {object} - Parsed command
 * 
 */
function parseCommand(cmd) {
  let out = {};
  if (cmd.match(/^mask/)) {
    out.type = 'mask';
    out.mask = cmd.split(' = ')[1];
  } else if (cmd.match(/^mem/)) {
    out.type = 'mem';
    out.address = parseInt(cmd.match(/\[(\d*)\]/)[1])
    out.value = parseInt(cmd.match(/(\d*)$/)[1])
  }
  return out;
}

module.exports = {
  applyMask,
  parseCommand
};