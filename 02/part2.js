const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";

let reports = [];
const input = readFileSync(inputFile).toString();
input.split("\n").forEach((line) => {
  if (line.split(" ").length > 1) {
    reports.push(line.split(" ").map((x) => parseInt(x)));
  }
});

function checkReport(r) {
  let current = r[0];
  let gap = 0;
  let valid = true;

  r.slice(1).forEach((x) => {
    if (valid == false) return;

    if (gap == 0) {
      if (current + 1 == x || current + 2 == x || current + 3 == x) {
        gap = 1;
        current = x;
      } else if (current - 1 == x || current - 2 == x || current - 3 == x) {
        gap = -1;
        current = x;
      } else {
        valid = false;
      }
    } else if (gap > 0) {
      if (current + 1 == x || current + 2 == x || current + 3 == x) {
        current = x;
      } else {
        valid = false;
      }
    } else {
      if (current - 1 == x || current - 2 == x || current - 3 == x) {
        current = x;
      } else {
        valid = false;
      }
    }
  });

  return valid;
}

function removeElementAtIndex(arr, index) {
  let newArray = [...arr];
  newArray.splice(index, 1);
  return newArray;
}

// Compute Safe reports
let result = 0;
reports.forEach((r) => {
  let valid = checkReport(r);

  for (let i = 0; i < r.length; i++) {
    if (!valid) {
      valid = checkReport(removeElementAtIndex(r, i));
    }
  }

  if (valid) result++;
});

console.log(result);
