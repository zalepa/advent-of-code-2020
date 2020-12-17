const fs = require('fs');

exports.loadFile = (path) => {
  const file = fs
  .readFileSync(path, 'utf-8')
  .split(/\n\n/);

  const rules = file[0].split(/\n/).map(l=>{
    const [field, vals] = l.split(/:\s*/)
    const ranges = vals.split(/\s*or\s*/).map(cond => {
      const [min, max] = cond.split('-').map(v => parseInt(v));
      return {min, max}
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

  return [rules, yourTicket, nearbyTickets]
}

exports.findInvalidNumbersInTicketForRules = (ticket, rules) => {
  const result = rules.map(r => {
    const validNumbers = ticket.map(t => {
      const passesFirstCheck = (t >= r.ranges[0].min && t <= r.ranges[0].max);
      const passesSecondCheck = (t >= r.ranges[1].min && t <= r.ranges[1].max);
      if (passesFirstCheck || passesSecondCheck) return t;
    }).filter(r => r !== undefined);
    
    return validNumbers;
  }).flat();

  const resultSet = new Set(result);

  const final = ticket.filter(v => !resultSet.has(v));
  return final;
};