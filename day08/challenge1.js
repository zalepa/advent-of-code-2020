const helpers = require('../helpers');

let acc = 0;
let commandLog = [];

const parse = (lines) => {
  return lines.map(l => {
    const [command, operand] = l.split(' ');
    return { command, operand:parseInt(operand) }
  });
};

const processCommand = (line, cmd) => {
  
  if (commandLog.includes(line)) {
    return -1;
  }

  commandLog.push(line);

  switch(cmd.command) {
    case 'acc':
      acc += cmd.operand;
      return line + 1;
      break;
    case 'nop':
      return line + 1;
    case 'jmp':
      return line + cmd.operand;
  }
};

const run = (code) => {
  let ptr = 0;
  for (;;) {
    const cmd = code[ptr];
    ptr = processCommand(ptr, cmd)
    if (ptr < 0) {
      console.log(acc);
      break;
    }
  }
}

(function main() {
  const lines = helpers.readlines(__dirname + '/sample.txt');
  run(parse(lines));
})();