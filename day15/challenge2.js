let seq = [13,0,10,12,1,5,8];
// let seq = [0,3,6];
const GOAL =  30000000;

let seen = {};

seq.forEach((v,i) => seen[v] = [i]);

let last = seq[seq.length - 1]

// I'm ashamed of this loop. Takes 8 minutes to run 2020, 13in MBP 1.4Ghz i5
for (let i = seq.length; i < GOAL + 1; i++) {

  if (i % 1000000 === 0) {
    console.log("\nWaypoint:", i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    console.log('Seq size:', seq.length);
    console.log('Seen size:', JSON.stringify(seen).length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  
  // Now we need to check if this is the first time we've seen this number
  // Here, seenAt will be an array of indicies of seq where the value appears.
  const seenAt = seen[last];

  //console.log(seenAt);

  // So, if seenAt.length is one, its first seen at the end of seq
  if (seenAt.length === 1) {
    //console.log('First instance');
    // Thus we add 0 to the sequence
    last = 0;
    // And we also update the seen counter
    // To reduce space, we only store the two must recent
    seen[0] = [seen[0][seen[0].length-1], i]

  }
  // If, on the other hand, seenAt.length is greater than one, we need to 
  // compute the distance because the number has been seen before
  else {
    //console.log('seen before...');
    const mostRecent = seenAt[seenAt.length - 1];
    const previous = seenAt[seenAt.length - 2];
    //console.log(mostRecent, "-", previous);
    last = mostRecent - previous;
    if (seen[mostRecent - previous]) {
      seen[mostRecent - previous].unshift();
      seen[mostRecent - previous].push(i);
    } else {
      seen[mostRecent - previous] = [i]
    }
  }

  if (i === GOAL - 1) {
    console.log(i, '=', last);
  }
  
}


