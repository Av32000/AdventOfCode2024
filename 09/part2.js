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
    blocksView.push(
      ...new Array(value).fill(
        String.fromCodePoint(i / 2 == 46 ? 10000 : i / 2)
      )
    );

    blocksCount += value;
  } else {
    blocksView.push(...new Array(value).fill("."));
  }
});

blocksView = blocksView.join("");

// Reorganize blocks
let currentBlockType = "";
let currentBlockSize = 0;

[...blocksView.split("")].reverse().forEach((b, i) => {
  if (b == currentBlockType) {
    currentBlockSize++;
  } else {
    if (currentBlockType != "" && currentBlockType != ".") {
      let targetSpace = new Array(currentBlockSize).fill(".").join("");
      let block = new Array(currentBlockSize).fill(currentBlockType).join("");
      let firstFreeSpace = blocksView.indexOf(targetSpace);

      if (firstFreeSpace > -1) {
        let blockStartIndex = blocksView.indexOf(block);

        if (firstFreeSpace < blockStartIndex) {
          blocksView = blocksView.replace(block, targetSpace);
          blocksView = blocksView.replace(targetSpace, block);
        }
      }
    }

    currentBlockType = b;
    currentBlockSize = 1;
  }
});

// Compute Result
let result = 0;
blocksView.split("").forEach((v, i) => {
  if (v !== ".") {
    let value = v.codePointAt(0) == 10000 ? 46 : v.codePointAt(0);
    result += value * i;
  }
});

console.log(result);
