const colors = require('colors');
const fs = require('fs');
const log = console.log;

/**
 * Debugging facility
 * @param {string} msg Debug logger
 */
function debug(msg) { 
  console.log("   DEBUG   ".white.bgBlue, "", msg);
  console.log();
}

/**
 * Converts puzzle into into an array of player objects
 * Having the form { player: *n*, cards: [1, 2, ... *n*]}
 * @param {string} filename Filename to parse
 * @returns Array of players
 */
function parseFile(filename) {
  return fs.readFileSync(filename, 'utf-8')
    .split(/\n\n/)
    .map(chunk => chunk.split(/\n/))
    .map(rows => {
      return {
        player: parseInt(rows[0].match(/(\d)/)[1]),
        cards: rows.slice(1).map(n => parseInt(n))
      }
    });
}

/**
 * Plays a round of the game
 * @param {array} - Array of players
 * @param {boolean} - Print output flag
 * @param {number} - Round number
 */
function playRound(players, round=1, print=false) {

  if (print) {
    debug(`-- Round ${round} --`);
    log(`Player 1's deck:`, players[0].cards);
    log(`Player 2's deck:`, players[1].cards);
  }
  
  const player1Card = players[0].cards.shift();
  const player2Card = players[1].cards.shift();
  
  if (player1Card > player2Card) {
    players[0].cards.push(player1Card);
    players[0].cards.push(player2Card);
  } else {
    players[1].cards.push(player2Card);
    players[1].cards.push(player1Card);
  }

  if (print) {
    log(`Player 1 plays:`, player1Card);
    log(`Player 2 plays:`, player2Card);
    if (player1Card > player2Card) {
      log(`Player 1 wins the round!`);
    } else {
      log(`Player 2 wins the round!`);
    }
    
  }
}

function printPostGame(players) {
  log('\nPlayer 1\'s deck:', players[0].cards.join(', ').yellow)
  log('Player 2\'s deck:', players[1].cards.join(', ').yellow);
}

function calculateScore(players) {
  const deck = players[0].cards.length === 0 ? players[1].cards : players[0].cards;
  let score = 0;
  for (let i = 0, multiplier = deck.length; i < deck.length; i++, multiplier--) {
    score += (deck[i] * multiplier)
  }
  return score;
}

// Main...
false && debug('Parsing players');
const players = parseFile(__dirname + '/input.txt');

let i = 1;
while (players[0].cards.length > 0 && players[1].cards.length > 0) {
  playRound(players, i);
  i++;
}

false && printPostGame(players);

const score = calculateScore(players);

log('Score:', score)