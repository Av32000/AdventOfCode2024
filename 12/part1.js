const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
input
  .trim()
  .split("\n")
  .forEach((line) => grid.push(line.split("")));

const directions = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function isInGrid(coord) {
  let x = coord[0];
  let y = coord[1];
  return !(x < 0 || y < 0 || x >= grid[0].length || y >= grid.length);
}

let areas = [];
let parsed = [];

for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    if (!parsed.find((c) => c[0] == x && c[1] == y)) {
      let currentValue = grid[y][x];
      let currentArea = {
        id: areas.length,
        value: currentValue,
        fences: 0,
        items: 0,
      };
      let toParse = [[x, y]];
      while (toParse.length > 0) {
        let e = toParse.pop();
        if (parsed.find((c) => c[0] == e[0] && c[1] == e[1]) != null) continue;
        parsed.push(e);

        currentArea.items = currentArea.items + 1;

        directions.forEach((d) => {
          let nd = [d[0] + e[0], d[1] + e[1]];
          if (isInGrid(nd) && grid[nd[1]][nd[0]] == currentArea.value) {
            toParse.push(nd);
          } else {
            currentArea.fences = currentArea.fences + 1;
          }
        });
      }
      areas.push(currentArea);
    }
  }
}

let result = 0;

areas.forEach((a) => (result += a.fences * a.items));
console.log(result);
