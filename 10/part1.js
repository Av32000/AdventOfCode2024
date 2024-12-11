const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
input
  .trim()
  .split("\n")
  .forEach((line) => grid.push(line.split("")));

let trailheads = [];

for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    const element = line[x];
    if (element == "0") {
      trailheads.push({
        id: trailheads.length,
        start: [x, y],
      });
    }
  }
}

const directions = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function isInGrid(coord) {
  let x = coord[0];
  let y = coord[1];
  return !(x < 0 || y < 0 || x >= grid[0].length || y >= grid.length);
}

function computeTrailhead(th) {
  const path = [
    {
      thId: th.id,
      currentValue: 0,
      coord: th.start,
    },
  ];

  let endCoords = [];

  while (path.length > 0) {
    let currentPath = path.pop();
    let currentValue = currentPath.currentValue;
    let coord = currentPath.coord;

    directions.forEach((d) => {
      let checkedCoord = [coord[0] + d[0], coord[1] + d[1]];
      if (
        isInGrid(checkedCoord) &&
        currentValue == 8 &&
        grid[checkedCoord[1]][checkedCoord[0]] == 9 &&
        endCoords.find(
          (ec) => ec[0] == checkedCoord[0] && ec[1] == checkedCoord[1]
        ) == null
      ) {
        endCoords.push(checkedCoord);
      } else if (
        isInGrid(checkedCoord) &&
        grid[checkedCoord[1]][checkedCoord[0]] == currentValue + 1
      ) {
        path.push({
          thId: th.id,
          currentValue: currentValue + 1,
          coord: checkedCoord,
        });
      }
    });
  }

  return endCoords.length;
}

let result = 0;
trailheads.forEach((th) => {
  result += computeTrailhead(th);
});

console.log(result);
