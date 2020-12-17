const shared = require('./shared');

const [rules, _, nearbyTickets] = shared.loadFile(__dirname + '/input.txt')

const res = nearbyTickets.map(ticket => {
  return shared.findInvalidNumbersInTicketForRules(ticket, rules)
}).flat();

console.log(res.reduce((acc, v) => acc + v));
