const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";

let equations = [];
const input = readFileSync(inputFile).toString();
input.split("\n").forEach((line) => {
  if (line.split(":").length > 1) {
    equations.push({
      target: parseInt(line.split(":")[0]),
      numbers: line
        .split(":")[1]
        .trim()
        .split(" ")
        .map((x) => parseInt(x)),
      operators: [],
      isValid: false,
    });
  }
});

function evaluateEquation(equation) {
  let result = equation.numbers[0];
  equation.numbers.forEach((n, i) => {
    if (i != 0) {
      let operator = equation.operators[i - 1];
      if (operator == "+") {
        result += n;
      } else {
        result *= n;
      }
    }
  });

  equation.isValid = result == equation.target;
}

function convertPaternToOperators(pattern) {
  return pattern
    .toString(2)
    .split("")
    .slice(1)
    .map((x) => (x == 1 ? "*" : "+"));
}

function bruteforceEquation(equation) {
  let operatorsCount = equation.numbers.length - 1;
  let currentPattern = 1 << operatorsCount;

  let currentOffset = 0;
  let maxOffset = 2 ** operatorsCount;

  while (currentOffset <= maxOffset) {
    if (!equation.isValid) {
      currentPattern = (1 << operatorsCount) + currentOffset;
      equation.operators = convertPaternToOperators(currentPattern);
      evaluateEquation(equation);
      if (equation.isValid) break;
      else currentOffset++;
    }
  }

  return equation;
}

let result = 0;

equations.forEach((e) => {
  let parsed = bruteforceEquation(e);

  if (parsed.isValid) {
    result += parsed.target;
  }
});

console.log(result);
