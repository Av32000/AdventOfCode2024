const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
input
  .trim()
  .split("\n")
  .forEach((line) => {
    grid.push(line.split("").map((x) => (x == "#" ? -1 : null)));
  });

const startPoint = [1, grid.length - 2];
const exitPoint = [grid[0].length - 2, 1];

const directions = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function computePath() {
  let toParse = [{ position: startPoint, velocity: [1, 0], score: 0 }];

  while (toParse.length > 0) {
    let elem = toParse.shift();
    let currentValue = grid[elem.position[1]][elem.position[0]];
    if (currentValue == null || currentValue > elem.score) {
      grid[elem.position[1]][elem.position[0]] = elem.score;

      directions.forEach((d) => {
        if (!(elem.velocity[0] + d[0] == 0 && elem.velocity[1] + d[1] == 0)) {
          let newPosition = [elem.position[0] + d[0], elem.position[1] + d[1]];
          let newScore = elem.score + 1;
          if (elem.velocity[0] + d[0] != 0 && elem.velocity[1] + d[1] != 0) {
            newScore += 1000;
          }
          toParse.push({ position: newPosition, velocity: d, score: newScore });
        }
      });
    }
  }
}

computePath();
console.log(grid[exitPoint[1]][exitPoint[0]]);
