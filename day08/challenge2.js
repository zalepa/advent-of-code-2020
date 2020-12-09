const helpers = require('../helpers');

helpers.DEBUG = false;

let acc = 0;
let commandLog = [];

const parse = (lines) => {
  let i = 0;
  return lines.map(l => {
    const [command, operand] = l.split(' ');
    return { line: i++, command, operand:parseInt(operand) }
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
  helpers.debug("\n\nRunning code");
  let ptr = 0;
  acc = 0;
  commandLog = [];
  for (;;) {
    const cmd = code[ptr];
    helpers.debug(ptr, cmd);
    ptr = processCommand(ptr, cmd)
    if (ptr < 0) { // we got in an infinite loop
      helpers.debug("Infinite loop");
      break;
    } else {
      if (ptr === code.length) {
        console.log(acc)
        break;
      }
    }
  }
}

const permute = (lines) => {
  const changedLines = lines
    .filter(a => a.command === 'jmp' || a.command === 'nop')
    .map(e => e.line);

  helpers.debug('Original Line Set');
  helpers.debug(lines);

  changedLines.forEach(changedLine => {
    let permutation = lines.map(x => x);
    let cmd = permutation[changedLine].command;
    
    if (cmd === 'jmp') permutation[changedLine].command = 'nop';
    else if (cmd === 'nop') permutation[changedLine].command = 'jmp';

    // Run permutation
    helpers.debug('Permutation...');
    run(permutation);

    // Change back
    cmd = permutation[changedLine].command;
    if (cmd === 'jmp') permutation[changedLine].command = 'nop';
    else if (cmd === 'nop') permutation[changedLine].command = 'jmp';
    helpers.debug('Back to original...');
    helpers.debug(permutation);
  })
}

(function main() {
  const lines = helpers.readlines(__dirname + '/input.txt');
  permute(parse(lines));
})();