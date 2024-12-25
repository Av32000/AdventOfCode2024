const { readFileSync } = require("fs");

class Wire {
  id = null;
  value = null;
  outputs = [];

  constructor(id) {
    this.id = id;
  }

  setValue(value) {
    this.value = value;
    this.outputs.forEach((o) => o.update());
  }

  addOutput(output) {
    this.outputs.push(output);
  }
}

class Gate {
  type = null;
  input1 = null;
  input2 = null;
  output = [];

  constructor(type, input1, input2, output) {
    this.type = type;
    this.input1 = input1;
    this.input2 = input2;
    this.output = output;
  }

  update() {
    if (this.input1.value !== null && this.input2.value !== null) {
      this.Run();
    }
  }

  Run() {
    switch (this.type) {
      case "AND":
        this.output.setValue(this.input1.value & this.input2.value);
        break;

      case "OR":
        this.output.setValue(this.input1.value | this.input2.value);
        break;

      case "XOR":
        this.output.setValue(this.input1.value ^ this.input2.value);
        break;
    }
  }
}

// Parse Input
const inputFile = "input.txt";
const input = readFileSync(inputFile).toString();

const wires = [];
const gates = [];

input
  .trim()
  .split("\n\n")[1]
  .split("\n")
  .forEach((line) => {
    const wire1Id = line.split(" ")[0];
    const wire2Id = line.split(" ")[2];
    const gateType = line.split(" ")[1];
    const outputWireId = line.split("-> ")[1];

    let wire1 = wires.find((w) => w.id == wire1Id);
    let wire2 = wires.find((w) => w.id == wire2Id);
    let outputWire = wires.find((w) => w.id == outputWireId);

    if (!wire1) {
      wire1 = new Wire(wire1Id);
      wires.push(wire1);
    }
    if (!wire2) {
      wire2 = new Wire(wire2Id);
      wires.push(wire2);
    }
    if (!outputWire) {
      outputWire = new Wire(outputWireId);
      wires.push(outputWire);
    }

    const gate = new Gate(gateType, wire1, wire2, outputWire);
    wire1.addOutput(gate);
    wire2.addOutput(gate);
    gates.push(gate);
  });

input
  .trim()
  .split("\n\n")[0]
  .split("\n")
  .forEach((line) => {
    const wireId = line.split(": ")[0];
    const wireValue = Number(line.split(": ")[1]);

    wires.find((w) => w.id == wireId).setValue(wireValue);
  });

let zWires = [];
wires.forEach((w) => {
  if (w.id[0] == "z") {
    zWires.push({ id: Number(w.id.split("z")[1]), value: w.value });
  }
});

zWires.sort((a, b) => a.id - b.id).reverse();

console.log(parseInt(zWires.map((w) => w.value).join(""), 2));
