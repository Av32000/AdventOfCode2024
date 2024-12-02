const { readFileSync } = require("fs");
// Part 1

// Parse Input
const inputFile = "input.txt";

let list1 = [];
let list2 = [];
const input = readFileSync(inputFile).toString();
input.split("\n").forEach((line) => {
  if (line.split("   ").length > 1) {
    list1.push(parseInt(line.split("   ")[0]));
    list2.push(parseInt(line.split("   ")[1]));
  }
});

// Sort List
function quickSort(T) {
  if (T.length <= 1) {
    return T;
  } else {
    const pivot = T[0];

    const less = [];
    const greater = [];

    T.slice(1).forEach((x) => (x <= pivot ? less.push(x) : greater.push(x)));

    return [...quickSort(less), pivot, ...quickSort(greater)];
  }
}

list1 = quickSort(list1);
list2 = quickSort(list2);

// Compute Distance
let result = 0;
for (let i = 0; i < list1.length; i++) {
  result += Math.abs(list1[i] - list2[i]);
}

console.log(result);
