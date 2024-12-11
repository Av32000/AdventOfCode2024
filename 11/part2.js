const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
let input = readFileSync(inputFile)
  .toString()
  .trim()
  .split(" ")
  .map((x) => parseInt(x));

let counts = new Array(input.length).fill(1);

function splitNumber(num) {
  const str = num.toString();
  const half = str.length / 2;
  const firstPart = str.slice(0, half);
  const secondPart = str.slice(half);
  return [parseInt(firstPart), parseInt(secondPart)];
}

function tick() {
  const newInput = [];
  const newCounts = [];

  input.forEach((e) => {
    let eCount = counts[input.indexOf(e)];

    if (e == 0) {
      let index = newInput.indexOf(1);

      if (index >= 0) newCounts[index] += eCount;
      else {
        newInput.push(1);
        newCounts.push(eCount);
      }
    } else if (e.toString().split("").length % 2 == 0) {
      let parts = splitNumber(e);
      if (parts[0] == parts[1]) {
        let index = newInput.indexOf(parts[0]);
        if (index >= 0) {
          newCounts[index] += eCount * 2;
        } else {
          newInput.push(parts[0]);
          newCounts.push(eCount * 2);
        }
      } else {
        let index0 = newInput.indexOf(parts[0]);
        let index1 = newInput.indexOf(parts[1]);

        if (index0 >= 0) {
          newCounts[index0] += eCount;
        } else {
          newInput.push(parts[0]);
          newCounts.push(eCount);
        }

        if (index1 >= 0) {
          newCounts[index1] += eCount;
        } else {
          newInput.push(parts[1]);
          newCounts.push(eCount);
        }
      }
    } else {
      let index = newInput.indexOf(e * 2024);
      if (index >= 0) newCounts[index] += eCount;
      else {
        newInput.push(e * 2024);
        newCounts.push(eCount);
      }
    }
  });

  input = newInput;
  counts = newCounts;
}

for (let i = 0; i < 75; i++) {
  process.stdout.write(
    `Tick : ${i + 1}/${75}. Current Result : ${counts.reduce(
      (acc, value) => acc + value,
      0
    )}\r`
  );
  tick();
}

console.log(
  "\n",
  counts.reduce((acc, value) => acc + value, 0)
);
