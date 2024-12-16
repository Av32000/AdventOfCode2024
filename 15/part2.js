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
  .forEach((line) => {
    let part2Line = line;
    part2Line = part2Line.replaceAll("#", "##");
    part2Line = part2Line.replaceAll("O", "[]");
    part2Line = part2Line.replaceAll(".", "..");
    part2Line = part2Line.replaceAll("@", "@.");
    grid.push(part2Line.split(""));
  });

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
  let toCheck = [position];
  let checked = [];
  while (toCheck.length > 0) {
    let position = toCheck.shift();
    const newPosition = [position[0] + move[0], position[1] + move[1]];
    let object = grid[newPosition[1]][newPosition[0]];

    if (!checked.find((p) => p[0] == position[0] && p[1] == position[1])) {
      if (object == "#") return false;
      else if (object != ".") {
        toCheck.push(newPosition);

        if (object == "[") toCheck.push([position[0] + 1, position[1]]);
        if (object == "]") toCheck.push([position[0] - 1, position[1]]);
      }
      checked.push(position);
    }
  }

  return true;
}

function applyMove(move) {
  if (canPerformMove(robotPosition, move)) {
    let toParse = [robotPosition];
    let movesToApply = [];
    let parsedPosition = [];
    while (toParse.length > 0) {
      let position = toParse.shift();
      let newPosition = [position[0] + move[0], position[1] + move[1]];
      let object = grid[position[1]][position[0]];

      if (
        object != "." &&
        object != "#" &&
        !parsedPosition.find((p) => p[0] == position[0] && p[1] == position[1])
      ) {
        movesToApply.push({
          position,
          newPosition,
          object,
        });

        if (object == "[") {
          toParse.push([position[0] + 1, position[1]]);
        } else if (object == "]") {
          toParse.push([position[0] - 1, position[1]]);
        }

        toParse.push(newPosition);
      }

      parsedPosition.push(position);
    }

    movesToApply.reverse().forEach((m) => {
      grid[m.position[1]][m.position[0]] = ".";
      grid[m.newPosition[1]][m.newPosition[0]] = m.object;

      if (m.object == "@") robotPosition = m.newPosition;
    });
  }
}

moves.forEach((move) => {
  applyMove(move);
});

let result = 0;
for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    if (grid[y][x] == "[") result += 100 * y + x;
  }
}

console.log(result);
