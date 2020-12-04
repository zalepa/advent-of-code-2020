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

  let allFieldsPresent = true;

  requiredFields.forEach(f => {
    if (!presentFields.includes(f)) allFieldsPresent = false;
  });

  let allFieldsValid = true;

  if (allFieldsPresent) {
    parsedEntry.forEach(f => {
      switch(f.field) {
        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        case 'byr':
          const byr = parseInt(f.value);
          if (!f.value.match(/^\d\d\d\d$/) || byr < 1920 || byr > 2002) {
            allFieldsValid = false;
          } 
          break;
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        case 'iyr':
          const iyr = parseInt(f.value);
          if (!f.value.match(/^\d\d\d\d$/) || iyr < 2010 || iyr > 2020) {
            allFieldsValid = false;
          }
          break;
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        case 'eyr':
          const eyr = parseInt(f.value);
          if (!f.value.match(/^\d\d\d\d$/) || eyr < 2020 || eyr > 2030) {
            allFieldsValid = false;
          }
          break;
        // hgt (Height) - a number followed by either cm or in:
          // If cm, the number must be at least 150 and at most 193.
          // If in, the number must be at least 59 and at most 76.
        case 'hgt':
          if (f.value.includes('cm')) {
            const val = parseInt(f.value.slice(0, f.value.indexOf('cm')));
            if (val < 150 || val > 193) {
              allFieldsValid = false;
            }
          }
          else if (f.value.includes('in')) {
            const val = parseInt(f.value.slice(0, f.value.indexOf('in')));
            if (val < 59 || val > 76) {
              allFieldsValid = false;
            }
          } else {
            allFieldsValid = false;
          }
          break;
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        case 'hcl':
          if (f.value.match(/#(\d|[a-f]){6,}/) === null) {
            allFieldsValid = false
          }
          break;
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        case 'ecl':
          if (!f.value.match(/amb|blu|brn|gry|grn|hzl|oth/)) {
            allFieldsValid = false;
          } 
          break;
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        case 'pid':
          if (f.value.length != 9) {
            allFieldsValid = false;
          } 
          break;
      }
    })
  }

  const valid = allFieldsPresent && allFieldsValid;

  return {
    entry: parsedEntry,
    valid
  }
};

(function main() {
  const results = validateBatchFile(__dirname + '/input.txt');
  console.log(results.filter(e => e.valid).length);
})();