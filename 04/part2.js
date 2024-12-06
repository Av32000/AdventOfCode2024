const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
input.split("\n").forEach((line) => grid.push(line.split("")));

const target = "MAS";
let targetOccurences = [];

const directions = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

// Search occurrences
function search(x, y, dx, dy, currentIndex) {
  if (currentIndex === target.length) {
    targetOccurences.push([x - dx, y - dy]);
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

const parsed = [];
let result = 0;

targetOccurences.forEach((t) => {
  let found = false;
  parsed.forEach((p) => {
    if (p[0] == t[0] && p[1] == t[1] && !found) {
      result++;
      found = true;
    }
  });

  if (!found) parsed.push(t);
});

console.log(result);
