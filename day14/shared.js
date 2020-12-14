/**
 * Converts a decimal value into a binary bitstring
 * @param {number} dec Number to convert
 * @returns {string} Binary bit string
 */
function toBinary(dec) {
  return (dec >>> 0).toString(2);
}

function toDecimal(binary) {
  return parseInt(binary, 2);
}

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
 * Applies a mask to a memory address and returns a decimal result
 * @param {number} addr - A decimal memory address
 * @param {string} mask - A binary bitstring
 * @returns {number} - A decimal value after applying the mask to the address
 */
function applyMemoryMask(addr, mask) {
  const binary = (addr >>> 0).toString(2).split('').map(v => parseInt(v));
  const input = leftpad(binary, 36, 0);
  
  const res = input.map((digit, i) => {
    const maskBit = mask[i];
    if (maskBit === 'X') return 'X'; // floating 
    if (maskBit === '0') return digit; // pass thru
    else if (maskBit === '1') return 1 // overwrite    
  }).join('')

  return res;
}
/**
 * Returns an array of possible bit strings based on a masked bitstring
 * @param {string} str - a bit string
 */
function permute(str) {
  let out = [];
  
  const permutations = 2**str.match(/X/g).length;

  const max = permutations - 1;
  const maxInBinary = toBinary(max);

  for(let i = 0; i<permutations; i++) {
    // Problem line
    const bs = leftpad(toBinary(i), maxInBinary.length, 0).join('').split('').map(l => parseInt(l));    
    const indicies = str.split('').map((s, i) => {
      if (s === 'X') return i;
    }).filter(x => x !== undefined)

    // iterate through string characters
    const res = str.split('').map((c, i) => {
      // and if the character index matches an indicie
      if (indicies.includes(i)) {
        // replace it with the head of the bs
        return bs.shift(); // mutable
      }
      // if not, just return the character
      return c;
    }).join('')

    out.push(res)
  }
  return out;
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
  parseCommand,
  applyMemoryMask,
  permute,
  toDecimal
};