const log = console.log;
const colors = require('colors');
const fs = require('fs');
const { replace } = require('lodash');

function parse(filename) {
  return fs.readFileSync(filename, 'utf-8')
    .split(/\n/)
    .filter(l => l !== '')
    .map(l => {
      let [ingredients, allergies] = l.split(' (')
      return { 
        ingredients: ingredients.split(' '),
        allergies: allergies.replace(/\(|contains\s|\)/g, '').split(/,\s*/)
      }
    })
}

function mapAllergies(food) {
  let allergyMap = new Map();
  food.forEach(({ingredients, allergies}) => {
    allergies.forEach(allergy => {
      let foundAllergies = allergyMap.get(allergy);
      if (foundAllergies === undefined) foundAllergies = [];
      foundAllergies.push(ingredients);
      allergyMap.set(allergy, foundAllergies);
    })
  });
  return allergyMap;
}
const food = parse(__dirname + '/input.txt');

const allergyMap = mapAllergies(food);

let mapping = [];

allergyMap.forEach((allergy, key) => {
  let intersection = allergy[0];
  for (let i = 1; i < allergy.length; i++) {
    intersection = intersection.filter(ingredient => allergy[i].includes(ingredient));
  }
  mapping.push([key, intersection]);
});


mapping = mapping.sort((a,b) => a[1].length - b[1].length)

mapping.forEach(m => {
  const ingredients = m[1];
  if (ingredients.length === 1) {
    mapping.forEach(m2 => {
      if (m2[0] !== m[0]) {
        const idx = m2[1].indexOf(ingredients[0]);
        if (idx > -1) {
          m2[1].splice(idx, 1);
        }
      }
    })
  }
});

mapping = mapping
  .sort((a,b) => a[0].localeCompare(b[0]))
  .map(e => e[1][0])
  .join(',')
  // .map(m => ({ allergy: m[0], ingredient: m[1][0] }))
  // .sort((a,b) => a.allergy[0] < b.allergy[0])



log(mapping)