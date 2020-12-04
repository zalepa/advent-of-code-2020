const fs = require('fs');

const requiredFields = [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const validateBatchFile = (filename) => {
  const file = fs.readFileSync(filename).toString();
  const entries = file.split(/\n\n/)
  return entries.map(e => validateEntry(e))
};

const validateEntry = (entry) => {

  const parsedEntry = entry.split(/\n|\s/).filter(e => e != '').map(e => {
    const [field, value] = e.split(':');
    return {
      field, value
    }
  });

  const presentFields = parsedEntry.map(e => {
    return e.field
  });

  let valid = true;

  requiredFields.forEach(f => {
    if (!presentFields.includes(f)) valid = false;
  });

  return {
    entry: parsedEntry,
    valid
  }
};

(function main() {
  const results = validateBatchFile(__dirname + '/input.txt');
  console.log(results.filter(e => e.valid).length);
})();