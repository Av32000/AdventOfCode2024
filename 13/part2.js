const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString().trim();
const machines = [];

input.split("\n\n").forEach((m) => {
  const regex = /X[+=](\d+).*?Y[+=](\d+)/g;
  let match;
  const results = [];
  while ((match = regex.exec(m.trim())) !== null) {
    results.push({ X: parseInt(match[1]), Y: parseInt(match[2]) });
  }

  machines.push({
    id: machines.length,
    buttonA: [results[0].X, results[0].Y],
    buttonB: [results[1].X, results[1].Y],
    prize: [results[2].X + 10000000000000, results[2].Y + 10000000000000],
    result: null,
  });
});

function solveEquationSystem(machine) {
  let a = machine.buttonA[0];
  let b = machine.buttonB[0];
  let c = machine.buttonA[1];
  let d = machine.buttonB[1];
  let m1 = machine.prize[0];
  let m2 = machine.prize[1];

  let y = (a * m2 - c * m1) / (-c * b + d * a);
  let x = (m1 - b * y) / a;

  if (Number.isInteger(y) && y >= 0 && Number.isInteger(x) && x >= 0)
    machine.result = [x, y];
}

let result = 0;
machines.forEach((m) => {
  solveEquationSystem(m);
  if (m.result) result += m.result[0] * 3 + m.result[1];
});

console.log(result);
