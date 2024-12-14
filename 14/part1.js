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

function tick() {
  robots.forEach((robot) => {
    let x = (robot.position[0] + robot.velocity[0]) % GRID_WIDTH;
    let y = (robot.position[1] + robot.velocity[1]) % GRID_HEIGHT;

    if (x < 0) x = GRID_WIDTH + x;
    if (y < 0) y = GRID_HEIGHT + y;

    robot.position = [x, y];
  });
}

for (let i = 0; i < 100; i++) {
  tick();
}

let quadrants = [0, 0, 0, 0];
let halfWidth = Math.floor(GRID_WIDTH / 2);
let halfHeight = Math.floor(GRID_HEIGHT / 2);

robots.forEach((robot) => {
  let [x, y] = robot.position;
  if (x < halfWidth && y < halfHeight) quadrants[0]++;
  if (x > halfWidth && y < halfHeight) quadrants[1]++;
  if (x > halfWidth && y > halfHeight) quadrants[2]++;
  if (x < halfWidth && y > halfHeight) quadrants[3]++;
});

let result = quadrants.reduce((acc, num) => acc * num, 1);
console.log(result);
