const { readFileSync } = require("fs");
// Part 1

// Parse Input
const inputFile = "input.txt";

let list1 = [];
let list2 = [];
const input = readFileSync(inputFile).toString();
input.split("\n").forEach((line) => {
  if (line.split("   ").length > 1) {
    list1.push(parseInt(line.split("   ")[0]));
    list2.push(parseInt(line.split("   ")[1]));
  }
});

// Compute Similarity
let result = 0;
list1.forEach((x) => {
  let occurrence = 0;
  list2.forEach((y) => {
    if (x == y) {
      occurrence++;
    }
  });

  result += x * occurrence;
});

console.log(result);
