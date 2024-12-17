const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString().trim();

let regA = parseInt(input.split("\n")[0].split(":")[1].trim());
let regB = parseInt(input.split("\n")[1].split(":")[1].trim());
let regC = parseInt(input.split("\n")[2].split(":")[1].trim());

let program = input
  .split("\n\n")[1]
  .split(": ")[1]
  .split(",")
  .map((x) => parseInt(x));

function getOperandValue(operand) {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return regA;
    case 5:
      return regB;
    case 6:
      return regC;
    case 7:
      return;
  }
}

function runIntruction(opcode, operand) {
  switch (opcode) {
    case 0:
    case 6:
    case 7:
      let result = Math.trunc(regA / 2 ** getOperandValue(operand));
      if (opcode == 0) regA = result;
      else if (opcode == 6) regB = result;
      else regC = result;
      break;
    case 1:
      regB = regB ^ operand;
      break;
    case 2:
      regB = getOperandValue(operand) % 8;
      break;
    case 3:
      if (regA != 0) instructionPointer = operand - 2;
      break;
    case 4:
      regB = regB ^ regC;
      break;
    case 5:
      outputs.push(getOperandValue(operand) % 8);
      break;
  }
}

let instructionPointer = 0;
let outputs = [];
while (true) {
  if (instructionPointer < program.length - 1) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];

    runIntruction(opcode, operand);

    instructionPointer += 2;
  } else break;
}

console.log(outputs.join(","));
