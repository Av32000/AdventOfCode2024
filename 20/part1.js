const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
let grid = [];

let startPoint = [0, 0];
let exitPoint = [0, 0];

for (let y = 0; y < input.split("\n\n")[0].trim().split("\n").length; y++) {
  const line = input.split("\n\n")[0].trim().split("\n")[y];
  for (let x = 0; x < line.length; x++) {
    if (line[x] == "S") {
      startPoint = [x, y];
    } else if (line[x] == "E") {
      exitPoint = [x, y];
    }
  }
}

input
  .split("\n\n")[0]
  .trim()
  .split("\n")
  .forEach((line) =>
    grid.push(line.split("").map((x) => (x == "#" ? null : -1))),
  );

const baseGrid = JSON.parse(JSON.stringify(grid));

function isInGrid(coord) {
  let x = coord[0];
  let y = coord[1];
  return !(x < 0 || y < 0 || x >= grid[0].length || y >= grid.length);
}

const directions = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function computeDist() {
  let toParse = [{ position: startPoint, dist: 0 }];

  while (toParse.length > 0) {
    let elem = toParse.shift();

    if (
      elem.position[0] === exitPoint[0] &&
      elem.position[1] === exitPoint[1]
    ) {
      grid[elem.position[1]][elem.position[0]] = elem.dist;
      return;
    }

    let currentValue = grid[elem.position[1]][elem.position[0]];

    if (
      currentValue != null &&
      (currentValue >= elem.dist || currentValue == -1)
    ) {
      grid[elem.position[1]][elem.position[0]] = elem.dist;

      directions.forEach((d) => {
        let newPosition = [elem.position[0] + d[0], elem.position[1] + d[1]];

        if (isInGrid(newPosition)) {
          toParse.push({ position: newPosition, dist: elem.dist + 1 });
        }
      });
    }
  }
}

computeDist();
let baseDist = grid[exitPoint[1]][exitPoint[0]];

let result = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    process.stdout.write(
      `y: ${y + 1}/${grid.length}; x: ${x + 1}/${
        grid[0].length
      }; Current result: ${result}     \r`,
    );
    grid = JSON.parse(JSON.stringify(baseGrid));
    if (grid[y][x] == null) {
      grid[y][x] = -1;
      computeDist();

      if (baseDist - grid[exitPoint[1]][exitPoint[0]] >= 100) result++;
    }
  }
}

console.log("\n", result);
