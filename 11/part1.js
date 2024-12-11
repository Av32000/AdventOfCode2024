const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile)
  .toString()
  .trim()
  .split(" ")
  .map((x) => parseInt(x));

function splitNumber(num) {
  const str = num.toString();
  const half = str.length / 2;
  const firstPart = str.slice(0, half);
  const secondPart = str.slice(half);
  return [parseInt(firstPart), parseInt(secondPart)];
}

function tick() {
  let toApply = [];
  input.forEach((e, i) => {
    if (e == 0) input[i] = 1;
    else if (e.toString().split("").length % 2 == 0) {
      let parts = splitNumber(e);
      input[i] = parts[0];
      toApply.push([i + 1, parts[1]]);
    } else {
      input[i] = e * 2024;
    }
  });

  toApply.forEach((e) => {
    input.splice(e[0], 0, e[1]);
  });
}

for (let i = 0; i < 25; i++) {
  process.stdout.write(
    `Tick : ${i + 1}/${25}. Current Result : ${input.length}\r`
  );
  tick();
}

console.log("\n", input.length);
