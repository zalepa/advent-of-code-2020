const helpers = require('../helpers');

const parseOutBagName = (str) => {
  const [bag, includes] = str.split(' bags contain ');
    return { bag, includes }
};

const parseIncludes = ({bag, includes}) => {
  const parsed = includes
    .split(',')
    .map(str => {
      if (str.match('no other bags')) return;

      const num = parseInt(str.match(/^\s*(\d*)/)[1]);

      const type = str.split(/^\s*\d*\s/)[1].split(/\sbags?/)[0];

      return {num, type};
    });
  return { bag, includes: parsed }
};

const invert = (bags) => {
  // Note: does not retain the size of contents
  let map = {};

  bags.forEach(b => {
    const name = b.bag;
    const contains = b.includes.map(i => {
      if (i) return i.type
    });

    contains.forEach(c => {
      if (c) {
        if (map[c] === undefined) {
          map[c] = [name]
        } else {
          map[c].push(name); 
        }
      }
    })
  });

  return map;
};

const parse = (filename) => {
  const file = helpers.readlines(filename);

  const bags = file
    .map(parseOutBagName)
    .map(parseIncludes);

  const containerMapping = invert(bags);

  return containerMapping;
};

const find = (name, mapping) => {
  let answer = [];

  let searchKeys = [name];

  for (;;) {
    
    let results = []

    if (searchKeys.length === 0) break; // no more keys
    
    searchKeys.forEach(k => {
      if (mapping[k])
        mapping[k].forEach(l => results.push(l))
    });

    if (results.length === 0) break;

    results.forEach(r => {
      if (!answer.includes(r))
        answer.push(r)
    })

    searchKeys = results;
  }
  
  return answer;
}




(function main() {
  const mapping = parse(__dirname + '/input.txt');

  const answer = find('shiny gold', mapping);

  console.log(answer.length);
})();