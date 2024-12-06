const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const rules = [];
const updates = [];

input.split("\n").forEach((line) => {
  if (line.includes("|")) {
    rules.push(line.split("|").map((x) => parseInt(x)));
  } else if (line.includes(",")) {
    updates.push(line.split(",").map((x) => parseInt(x)));
  }
});

function applyRule(rule, update) {
  const n1 = update.indexOf(rule[0]);
  const n2 = update.indexOf(rule[1]);

  if (n1 == -1 || n2 == -1 || n1 < n2) {
    return;
  }

  let newUpdate = update;
  let temp = newUpdate[n2];
  newUpdate[n2] = newUpdate[n1];
  newUpdate[n1] = temp;

  return newUpdate;
}

function findRulesForNumber(number) {
  const result = [];
  rules.forEach((r) => {
    if (r.includes(number)) result.push(r);
  });

  return result;
}

const invalid = [];
updates.forEach((u) => {
  let currentUpdate = u;
  let updated = false;
  let modified = true;
  while (modified) {
    modified = false;
    currentUpdate.forEach((n) => {
      findRulesForNumber(n).forEach((r) => {
        const fixed = applyRule(r, currentUpdate);
        if (fixed) {
          currentUpdate = fixed;
          updated = true;
          modified = true;
        }
      });
    });
  }

  if (updated) {
    invalid.push(currentUpdate);
  }
});

let result = 0;
invalid.forEach((u) => {
  result += u[(u.length / 2) >> 0];
});

console.log(result);
