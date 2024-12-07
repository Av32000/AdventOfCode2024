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
      } else if (operator == "*") {
        result *= n;
      } else {
        result = parseInt(`${result}${n}`);
      }
    }
  });

  equation.isValid = result == equation.target;
}

function bruteforceEquation(equation) {
  let operatorsCount = equation.numbers.length - 1;
  let operators = ["+", "*", "||"];

  equation.operators = new Array(operatorsCount).fill("+");

  while (true) {
    evaluateEquation(equation);
    if (equation.isValid) break;

    for (let i = operatorsCount - 1; i >= 0; i--) {
      let currentIndex = operators.indexOf(equation.operators[i]);
      if (currentIndex < operators.length - 1) {
        equation.operators[i] = operators[currentIndex + 1];
        break;
      } else {
        equation.operators[i] = operators[0];
        if (i === 0) return equation;
      }
    }
  }

  return equation;
}

let result = 0;

equations.forEach((e, i) => {
  let parsed = bruteforceEquation(e);
  process.stdout.write(
    `Parsed : ${i + 1}/${equations.length}. Current Result : ${result}\r`,
  );

  if (parsed.isValid) {
    result += parsed.target;
  }
});

console.log("\n", result);
