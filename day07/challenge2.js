const helpers = require('../helpers');

const parseOutBagName = (str) => {
  const [bag, includes] = str.split(' bags contain ');
    return { bag, includes }
};

const parseIncludes = ({bag, includes}) => {
  let parsed = includes
    .split(',')
    .map(str => {
      if (str.match('no other bags')) return;

      const num = parseInt(str.match(/^\s*(\d*)/)[1]);

      const type = str.split(/^\s*\d*\s/)[1].split(/\sbags?/)[0];

      return {num, type};
    });

  if (parsed[0] === undefined) parsed = null;
  return { bag, includes: parsed }
};


const parse = (filename) => {
  const file = helpers.readlines(filename);

  const bags = file
    .map(parseOutBagName)
    .map(parseIncludes);


  return bags;
};

const find = (name, mapping) => {
  const bag = mapping.find(b => b.bag === name);
  if (bag.includes === null) return 0;

  let count = 0;

  bag.includes.forEach(b => {
    count += (b.num + b.num*find(b.type, mapping))
  });

  return count;
}




(function main() {
  const mapping = parse(__dirname + '/input.txt');
  console.log(find('shiny gold', mapping));
})();