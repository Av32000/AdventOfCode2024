const { readFileSync } = require("fs");
// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const grid = [];
const moves = [];
input
  .split("\n\n")[0]
  .trim()
  .split("\n")
  .forEach((line) => grid.push(line.split("")));

input
  .split("\n\n")[1]
  .trim()
  .split("")
  .forEach((move) => {
    switch (move) {
      case "^":
        moves.push([0, -1]);
        break;
      case "v":
        moves.push([0, 1]);
        break;
      case "<":
        moves.push([-1, 0]);
        break;
      case ">":
        moves.push([1, 0]);
        break;
    }
  });

let robotPosition = [0, 0];
for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    if (grid[y][x] == "@") robotPosition = [x, y];
  }
}

function canPerformMove(position, move) {
  const newPosition = [position[0] + move[0], position[1] + move[1]];
  let object = grid[newPosition[1]][newPosition[0]];
  switch (object) {
    case "O":
      return canPerformMove(newPosition, move);
    case "#":
      return false;
    default:
      return true;
  }
}

function applyMove(move) {
  if (canPerformMove(robotPosition, move)) {
    let position = robotPosition;
    let newPosition = [position[0] + move[0], position[1] + move[1]];
    let object = grid[position[1]][position[0]];
    let lastObject = ".";

    while (object == "@" || object == "O") {
      if (object == "@") robotPosition = newPosition;

      let tempObject = grid[newPosition[1]][newPosition[0]];

      grid[position[1]][position[0]] = lastObject;
      grid[newPosition[1]][newPosition[0]] = object;

      lastObject = object;
      position = newPosition;
      newPosition = [newPosition[0] + move[0], newPosition[1] + move[1]];
      object = tempObject;
    }
  }
}

moves.forEach((move) => {
  applyMove(move);
});

let result = 0;
for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    if (grid[y][x] == "O") result += 100 * y + x;
  }
}

console.log(result);
