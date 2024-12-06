const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
input.split("\n").forEach((line) => grid.push(line.split("")));

let playerPosition = [0, 0];
let velocity = [0, -1];

for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    const element = line[x];
    if (element == "^") {
      playerPosition[0] = x;
      playerPosition[1] = y;
      grid[y][x] = ".";
    }
  }
}

function isInGrid(coord) {
  let x = coord[0];
  let y = coord[1];
  return !(x < 0 || y < 0 || x >= grid[0].length || y >= grid.length);
}

function forward() {
  const nextPosition = [
    playerPosition[0] + velocity[0],
    playerPosition[1] + velocity[1],
  ];

  if (!isInGrid(nextPosition)) {
    return true;
  }

  if (grid[nextPosition[1]][nextPosition[0]] == ".") {
    playerPosition = nextPosition;
  } else {
    if (velocity[0] == 0 && velocity[1] == -1) {
      velocity = [1, 0];
    } else if (velocity[0] == 1 && velocity[1] == 0) {
      velocity = [0, 1];
    } else if (velocity[0] == 0 && velocity[1] == 1) {
      velocity = [-1, 0];
    } else if (velocity[0] == -1 && velocity[1] == 0) {
      velocity = [0, -1];
    }
  }

  return false;
}

let result = [];
let initialPlayerPosition = playerPosition;
for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    process.stdout.write(
      `y: ${y + 1}/${grid.length}; x: ${x + 1}/${grid[0].length}\r`,
    );

    if (
      grid[y][x] == "." &&
      !(x == initialPlayerPosition[0] && y == initialPlayerPosition[1])
    ) {
      playerPosition = initialPlayerPosition;
      velocity = [0, -1];
      grid[y][x] = "#";
      let isFinished = false;
      for (let i = 0; i < 1000000; i++) {
        isFinished = forward();
        if (isFinished) break;
      }

      if (!isFinished) result.push([x, y]);
      grid[y][x] = ".";
    }
  }
}

console.log("\n", result.length);
