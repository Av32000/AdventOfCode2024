const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
input
  .trim()
  .split("\n")
  .forEach((line) => grid.push(line.split("")));

let antenaPositions = [];

for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    const element = line[x];
    if (element != ".") {
      antenaPositions.push({
        id: antenaPositions.length,
        type: element,
        x,
        y,
      });
    }

    grid[y][x] = element;
  }
}

function isInGrid(x, y) {
  return !(x < 0 || y < 0 || x >= grid[0].length || y >= grid.length);
}

const antinodes = [];
antenaPositions.forEach((a) => {
  antenaPositions
    .filter((ca) => a.type == ca.type && ca.id != a.id)
    .forEach((o) => {
      let xDiff = o.x - a.x;
      let yDiff = o.y - a.y;
      let antinode = { type: a.type, x: a.x - xDiff, y: a.y - yDiff };

      if (
        isInGrid(antinode.x, antinode.y) &&
        !antinodes.find((n) => n.x == antinode.x && n.y == antinode.y)
      ) {
        antinodes.push(antinode);
      }
    });
});

console.log(antinodes.length);
