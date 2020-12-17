const shared = require('./shared');

const [rules, mine, nearby] = shared.loadFile(__dirname + '/input.txt')

const validTickets = nearby.filter(ticket => {
  const nums = shared.findInvalidNumbersInTicketForRules(ticket, rules);
  return nums.length === 0;
});

const TARGET_MATCH = validTickets.length ;

function check(value, rule) {
  return ((value >= rule.ranges[0].min && value <= rule.ranges[0].max) || 
          (value >= rule.ranges[1].min && value <= rule.ranges[1].max));
}

// Build a list of where each rule is valid (for each ticket)
let matches = []
validTickets.forEach(ticket => {
  ticket.forEach((field, position) => {
    rules.forEach((rule, idx) => {
      if (check(field, rule)) {
        if (matches[idx]) matches[idx].push(position);
        else matches[idx] = [position];
      }
    });
  });
});

// Filter the above list to only include possible positions
// A possible position for a rule is one where the rule is satisfied
// for each valid ticket
let validAlternatives = [];
for (let i = 0; i < rules.length; i++) {
  const min = matches[i].sort((a,b) => a - b)[0];
  const max  = matches[i].sort((a,b) => a - b)[matches[i].length - 1];
  for (let j = min; j < max + 1; j++) {
    let count = matches[i].filter(e => e === j).length;
    if (count === TARGET_MATCH) {
      if (validAlternatives[i]) validAlternatives[i].push(j);
      else validAlternatives[i] = [j]
    }
  }
}

// Invert these into a rule -> position mapping
let inverted = {}
Object.keys(rules).forEach(k => inverted[k] = []);
for (let i = 0; i < validAlternatives.length; i++) {
  const rulesMatchingPosition = validAlternatives[i];
  rulesMatchingPosition.forEach(ruleNumber => inverted[ruleNumber].push(i))
}

// Iteratively bubble out one-one matches
let out = []
while (Object.keys(inverted).length > 0) {
  Object.keys(inverted).forEach(ruleNumber => {
    if (inverted[ruleNumber].length === 1) {
      const pos = inverted[ruleNumber][0];
      delete inverted[ruleNumber];
      out.push([ruleNumber, pos])
      Object.keys(inverted).forEach(key => {
        const newPositions = inverted[key].filter(e => e !== pos);
        inverted[key] = newPositions;
      });
    }
  });
}

let result = 1;
out.sort((a, b) => a[1] - b[1]).slice(0, 6).forEach(v => {
  result *= mine[parseInt(v[0])]
});

console.log(result);
