const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const diskMap = readFileSync(inputFile)
  .toString()
  .trim()
  .split("")
  .map((x) => parseInt(x));

// Generate Blocks View
let blocksView = [];
let blocksCount = 0;
diskMap.forEach((value, i) => {
  if (i % 2 == 0) {
    blocksView.push(...new Array(value).fill(i / 2));
    blocksCount += value;
  } else {
    blocksView.push(...new Array(value).fill("."));
  }
});

// Reorganize blocks
[...blocksView].reverse().forEach((b, i) => {
  let firstFreeSpace = blocksView.indexOf(".");
  if (
    firstFreeSpace > 0 &&
    b != "." &&
    blocksView.length - 1 - i > firstFreeSpace
  ) {
    blocksView[firstFreeSpace] = b;
    blocksView[blocksView.length - 1 - i] = ".";
  }
});

// Compute Result
let result = 0;
blocksView.forEach((v, i) => {
  if (v !== ".") {
    result += v * i;
  }
});

console.log(result);
