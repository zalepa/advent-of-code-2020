const fs = require('fs');

const file = fs
  .readFileSync(__dirname + '/input.txt', 'utf-8')
  .split(/\n\n/);

const rules = file[0].split(/\n/).map(l=>{
  const [field, vals] = l.split(/:\s*/)
  const ranges = vals.split(/\s*or\s*/).map(cond => {
    const [min, max] = cond.split('-').map(v => parseInt(v));
    return [min, max]
  });
  return { field, ranges }
});

const yourTicket = file[1]
  .split(/\n/)[1]
  .split(',')
  .map(v => parseInt(v))

const nearbyTickets = file[2]
  .split(/\n/)
  .slice(1)
  .map(l => l.split(',').map(v => parseInt(v)));


let invalidValues = [];

function validate(ticket) {
  // console.log('#### Validating ticket...', ticket);
  const result = rules.map(r => {
    // For example r = [1, 3]
    // Here, we want to see how many fields of the ticket match this rule.
    const validNumbers = ticket.map(t => {
      const firstCheck = (t >= r.ranges[0][0] && t <= r.ranges[0][1]);
      const secondCheck = (t >= r.ranges[1][0] && t <= r.ranges[1][1]);
      if (firstCheck || secondCheck) return t;
    }).filter(r => r !== undefined);
    return validNumbers;
  }).flat();

  const resultSet = new Set(result);

  const final = ticket.filter(v => !resultSet.has(v));
  return final;
}

const res = nearbyTickets.map(ticket => {
  return validate(ticket)
}).flat();

console.log(res.reduce((acc, v) => acc + v));
