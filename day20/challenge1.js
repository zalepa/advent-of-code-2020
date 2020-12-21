const fs = require('fs');
const colors = require('colors');
const log = console.log;

function parseBlobToTile(blob) {
  const lines = blob.split(/\n/);
  return {
    id: parseInt(lines[0].split(' ')[1]),
    data: lines.slice(1)
  }
};

function convertToBinary(v) {
  return parseInt(v.replace(/#/g, 1).replace(/\./g, 0), 2);
}

function calculateTileEdgeValues(tile) {
  tile.sides = [
    convertToBinary(tile.data[0]),
    convertToBinary(tile.data[0].split('').reverse().join('')),
    convertToBinary(tile.data[tile.data.length - 1]),
    convertToBinary(tile.data[tile.data.length - 1].split('').reverse().join('')),
    convertToBinary(tile.data.map(row => row[0]).join('')),
    convertToBinary(tile.data.map(row => row[0]).reverse().join('')),
    convertToBinary(tile.data.map(row => row[row.length - 1]).join('')),
    convertToBinary(tile.data.map(row => row[row.length - 1]).reverse().join(''))
  ]
  return tile;
}

function findConnections(tiles) {
  return tiles.map(({id, sides}) => {

    let out = {id, matchingTiles: []};

    let matchingTiles = [];
    
    tiles.forEach(t => {
      sides.forEach(s => {
        if (t.sides.includes(s)) {
          matchingTiles.push(t.id);
        }
      })
    });

    out.matchingTiles = 
      matchingTiles
        .filter((t, index) => matchingTiles.indexOf(t) === index)
        .filter(t => t !== id)
    
    return out;
  });
}


// MAIN
const tiles = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
  .split(/\n\n/)
  .map(parseBlobToTile)
  .map(calculateTileEdgeValues);


const connections = findConnections(tiles);

log(
  connections.filter(c => c.matchingTiles.length === 2).map(c => c.id).reduce((acc, v) => acc * v)
)