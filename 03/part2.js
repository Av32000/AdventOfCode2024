const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();

// Apply Regex
const regex = /mul\((\d+),\s*(\d+)\)|do\(\)|don't\(\)/g;
let match,
  op = [];
while ((match = regex.exec(input)) !== null) {
  if (match[1] && match[2]) {
    op.push({ type: "mul", x: parseInt(match[1]), y: parseInt(match[2]) });
  } else if (match[0] === "do()") {
    op.push({ type: "do" });
  } else if (match[0] === "don't()") {
    op.push({ type: "don't" });
  }
}

// Compute Result
let result = 0;
let enabled = true;
op.forEach((g) => {
  switch (g.type) {
    case "mul":
      if (enabled) result += g.x * g.y;
      break;
    case "do":
      enabled = true;
      break;
    case "don't":
      enabled = false;
      break;
  }
});

console.log(result);
