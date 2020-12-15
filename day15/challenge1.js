let seq = [13,0,10,12,1,5,8];
const GOAL = 2020;

// Loop through 0...2020 and decide what number to push to the seq
for (let i = seq.length; i < GOAL + 1; i++) {
  // Here, i is the index we want to retrieve and analyze
  const last = seq[i - 1];
  
  // Now we need to check if this is the first time we've seen this number
  // matches will be an array of length 1 if so, greater than 1 if not
  const matches = seq.map((el, idx) => [el, idx]).filter(e => e[0] == last);
  
  // If this is the first instance of the value
  if (matches.length === 1) {
    // Say "0"
    seq[i] = 0;
  } else {
    // The number has been spoken before
    const mostRecent = matches[matches.length - 1];
    const previous = matches[matches.length - 2];
    seq[i] = mostRecent[1] - previous[1];
  }
  
}

console.log(seq[GOAL - 1]);