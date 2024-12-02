const fs = require("fs");
const path = require("path");

const baseFolder = "./";
const readmePath = path.join(baseFolder, "README.md");

const generateReadme = () => {
  let readmeContent =
    "# Advent of Code 2024\n\nMy solutions for the [Advent of Code 2024](https://adventofcode.com/) in Javascript.\n\nSolutions :\n|                     Day                      |         Part 1             |         Part 2             |\n| :------------------------------------------: | :------------------------: | :------------------------: |\n";

  const folders = fs.readdirSync(baseFolder).filter((f) => {
    return fs.statSync(path.join(baseFolder, f)).isDirectory() && !isNaN(f);
  });

  folders.sort((a, b) => Number(a) - Number(b)); // Sort numerically

  folders.forEach((folder) => {
    const day = parseInt(folder, 10);
    const part1Path = `${folder}/part1.js`;
    const part2Path = `${folder}/part2.js`;

    const part1Link = fs.existsSync(path.join(baseFolder, part1Path))
      ? `[${part1Path}](${part1Path})`
      : "Not available";
    const part2Link = fs.existsSync(path.join(baseFolder, part2Path))
      ? `[${part2Path}](${part2Path})`
      : "Not available";

    readmeContent += `| [Day ${day}](https://adventofcode.com/2024/day/${day}) | ${part1Link} | ${part2Link} |\n`;
  });

  fs.writeFileSync(readmePath, readmeContent, "utf8");
  console.log("README.md generated successfully!");
};

// Generate the README
generateReadme();
