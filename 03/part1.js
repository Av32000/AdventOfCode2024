const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();

// Apply Regex
const regex = /mul\((\d+),\s*(\d+)\)/g;
let match,
  groups = [];
while ((match = regex.exec(input)) !== null) {
  groups.push({ x: parseInt(match[1]), y: parseInt(match[2]) });
}

// Compute Result
let result = 0;
groups.forEach((g) => {
  result += g.x * g.y;
});

console.log(result);
