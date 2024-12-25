const { readFileSync } = require("fs");

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
}

// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();
const links = input
  .trim()
  .split("\n")
  .map((link) => link.split("-"));

const network = new Graph();

const icSets = [];

links.forEach((link) => {
  network.addEdge(link[0], link[1]);
});

Object.keys(network.adjacencyList).forEach((c1) => {
  let connections1 = network.adjacencyList[c1];
  connections1.forEach((c2) => {
    let connections2 = network.adjacencyList[c2];
    let commonPoints = connections2.filter((item) =>
      connections1.includes(item)
    );
    if (commonPoints.length > 0) {
      commonPoints.forEach((c3) => {
        let icSet = [c1, c2, c3];
        icSet.sort();

        if (
          !icSets.find((set) => JSON.stringify(set) == JSON.stringify(icSet))
        ) {
          icSets.push(icSet);
        }
      });
    }
  });
});

let result = 0;
icSets.forEach((set) => {
  let hasAValidComputer = false;
  set.forEach((elem) => {
    if (!hasAValidComputer && elem[0] == "t") hasAValidComputer = true;
  });
  if (hasAValidComputer) result++;
});

console.log(result);
