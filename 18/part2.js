const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString().trim();

const bytes = [];
let maxX = Number.MIN_VALUE;
let maxY = Number.MIN_VALUE;
input.split("\n").forEach((line) => {
  let x = parseInt(line.split(",")[0]);
  let y = parseInt(line.split(",")[1]);

  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;

  bytes.push([x, y]);
});

const baseGrid = Array.from({ length: maxY + 1 }, () =>
  Array(maxX + 1).fill(null)
);

let grid = baseGrid;

function isInGrid(coord) {
  let x = coord[0];
  let y = coord[1];
  return !(x < 0 || y < 0 || x >= grid[0].length || y >= grid.length);
}

const directions = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function computeDist() {
  let toParse = [{ position: [0, 0], dist: 0 }];

  while (toParse.length > 0) {
    let elem = toParse.shift();

    let currentValue = grid[elem.position[1]][elem.position[0]];
    if (
      (currentValue == null || currentValue > elem.dist) &&
      currentValue != -1
    ) {
      grid[elem.position[1]][elem.position[0]] = elem.dist;

      directions.forEach((d) => {
        let newPosition = [elem.position[0] + d[0], elem.position[1] + d[1]];
        if (isInGrid(newPosition))
          toParse.push({ position: newPosition, dist: elem.dist + 1 });
      });
    }
  }
}

let result = null;
bytes.forEach((b, i) => {
  if (result == null) {
    process.stdout.write(
      `Index : ${i + 1}/${
        bytes.length
      }; Size : ${maxX}x${maxY}; Result : ${JSON.stringify(
        result
      )}; Current End Dist : ${grid[grid.length - 1][grid[0].length - 1]}    \r`
    );

    baseGrid[b[1]][b[0]] = -1;
    grid = JSON.parse(JSON.stringify(baseGrid));
    computeDist();

    if (grid[grid.length - 1][grid[0].length - 1] == null) {
      result = bytes[i];
    }
  }
});

console.log("\n", result);
