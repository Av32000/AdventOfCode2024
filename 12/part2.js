const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
input
  .trim()
  .split("\n")
  .forEach((line) => grid.push(line.split("")));

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

function isInGrid(coord) {
  let x = coord[0];
  let y = coord[1];
  return !(x < 0 || y < 0 || x >= grid[0].length || y >= grid.length);
}

let areas = [];
let parsed = [];

for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    if (!parsed.find((c) => c[0] == x && c[1] == y)) {
      let currentValue = grid[y][x];
      let currentArea = {
        id: areas.length,
        value: currentValue,
        corners: 0,
        items: [],
      };
      let toParse = [[x, y]];
      let internalToCheck = [];
      while (toParse.length > 0) {
        let e = toParse.pop();
        if (parsed.find((c) => c[0] == e[0] && c[1] == e[1]) != null) continue;
        parsed.push(e);

        currentArea.items.push(e);

        let currentFences = [];
        directions.forEach((d, i) => {
          let nd = [d[0] + e[0], d[1] + e[1]];
          if (isInGrid(nd) && grid[nd[1]][nd[0]] == currentArea.value) {
            toParse.push(nd);
          } else {
            currentFences.push([nd, i]);
          }
        });

        if (currentFences.length == 4) {
          currentArea.corners = currentArea.corners + 4;
        } else {
          internalToCheck.push(e);
          if (
            currentFences.length == 3 ||
            (currentFences.length == 2 &&
              !(
                (currentFences[0][1] == 0 && currentFences[1][1] == 1) ||
                (currentFences[0][1] == 2 && currentFences[1][1] == 3)
              ))
          ) {
            currentArea.corners =
              currentArea.corners + currentFences.length - 1;
          }
        }
      }

      // Check Internal Corners
      internalToCheck.forEach((e) => {
        currentArea.corners =
          currentArea.corners + checkInternalCorners(e, currentArea);
      });
      currentArea.items = currentArea.items.length;
      areas.push(currentArea);
    }
  }
}

function hasCoordInList(coord, list) {
  return list.some(([x, y]) => x === coord[0] && y === coord[1]);
}

function checkInternalCorners(coord, area) {
  const crossDirections = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
  ];

  let patern = [];
  let result = 0;

  crossDirections.forEach((d, i) => {
    let nd = [d[0] + coord[0], d[1] + coord[1]];
    patern.push(hasCoordInList(nd, area.items));

    if (patern.length == 3) {
      if (
        patern[0] == true &&
        patern[1] == false &&
        patern[2] == true &&
        [0, 2, 4, 6, 8].includes(i)
      )
        result += 1;
      patern.shift();
    }
  });

  return result;
}

let result = 0;

areas.forEach((a) => (result += a.corners * a.items));
console.log(result);
