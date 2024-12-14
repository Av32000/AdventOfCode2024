const { readFileSync } = require("fs");

// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString().trim();
const robots = [];

const GRID_WIDTH = 101;
const GRID_HEIGHT = 103;

input.split("\n").forEach((line) => {
  const regex = /-?\d+/g;
  const values = line.match(regex).map((x) => parseInt(x));

  robots.push({
    id: robots.length,
    position: [values[0], values[1]],
    velocity: [values[2], values[3]],
  });
});

function displayGrid() {
  const grid = Array.from({ length: GRID_HEIGHT }, () =>
    Array(GRID_WIDTH).fill(0)
  );

  robots.forEach((robot) => {
    grid[robot.position[1]][robot.position[0]]++;
  });

  grid.forEach((line) => {
    console.log(line.map((x) => (x == 0 ? "." : x.toString())).join(""));
  });
  console.log("Elapsed Seconds", elapsedSeconds);
}

function computeVariations() {
  let totalDistance = 0;

  let coords = robots.map((r) => r.position);

  for (let i = 1; i < coords.length; i++) {
    const x1 = coords[i - 1][0];
    const y1 = coords[i - 1][1];
    const x2 = coords[i][0];
    const y2 = coords[i][1];

    totalDistance += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  return totalDistance / (coords.length - 1);
}

function tick() {
  robots.forEach((robot) => {
    let x = (robot.position[0] + robot.velocity[0]) % GRID_WIDTH;
    let y = (robot.position[1] + robot.velocity[1]) % GRID_HEIGHT;

    if (x < 0) x = GRID_WIDTH + x;
    if (y < 0) y = GRID_HEIGHT + y;

    robot.position = [x, y];
  });
}

let elapsedSeconds = 0;
while (true) {
  tick();
  elapsedSeconds++;
  if (computeVariations() < 40) {
    displayGrid();
    break;
  }
}
