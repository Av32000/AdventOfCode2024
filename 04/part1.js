const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
input.split("\n").forEach((line) => grid.push(line.split("")));

const target = "XMAS";
let result = 0;

const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

// Search occurrences
function search(x, y, dx, dy, currentIndex) {
  if (currentIndex === target.length) {
    result += 1;
    return;
  }

  const newX = x + dx;
  const newY = y + dy;

  if (
    newX >= 0 &&
    newY >= 0 &&
    newX < grid[0].length &&
    newY < grid.length &&
    grid[newY][newX] === target[currentIndex]
  ) {
    search(newX, newY, dx, dy, currentIndex + 1);
  }
}

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === target[0]) {
      for (const [dx, dy] of directions) {
        search(x, y, dx, dy, 1);
      }
    }
  }
}

console.log(result);
