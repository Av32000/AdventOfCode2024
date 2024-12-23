const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const secretNumbers = input
  .trim()
  .split("\n")
  .map((sn) => Number(sn));

function pruneAndMix(n, sn) {
  return (((n >>> 0) ^ (sn >>> 0)) >>> 0) % 16777216;
}

function tick(sn) {
  let step1 = pruneAndMix(sn * 64, sn);
  let step2 = pruneAndMix(Math.floor(step1 / 32), step1);
  return pruneAndMix(step2 * 2048, step2);
}

for (let i = 0; i < secretNumbers.length; i++) {
  const sn = secretNumbers[i];
  for (let j = 0; j < 2000; j++) {
    secretNumbers[i] = tick(secretNumbers[i]);
  }
}

console.log(
  secretNumbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
);
