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

function checkRule(rule, update) {
  const n1 = update.indexOf(rule[0]);
  const n2 = update.indexOf(rule[1]);

  return n1 == -1 || n2 == -1 || n1 < n2;
}

function findRulesForNumber(number) {
  const result = [];
  rules.forEach((r) => {
    if (r.includes(number)) result.push(r);
  });

  return result;
}

const valid = [];
updates.forEach((u) => {
  let isValid = true;
  u.forEach((n) => {
    findRulesForNumber(n).forEach((r) => {
      if (!checkRule(r, u)) isValid = false;
    });
  });

  if (isValid) valid.push(u);
});

let result = 0;
valid.forEach((u) => {
  result += u[(u.length / 2) >> 0];
});

console.log(result);
