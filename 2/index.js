import fs from "fs";

// parse input

const text = fs.readFileSync("./2/input.txt", { encoding: "utf-8" });
const memory = text.split(",").map(str => parseInt(str));

// Part 1

const getProgramOut = mem => {
  for (let i = 0; mem[i] !== 99; i += 4) {
    if (mem[i] === 1) {
      mem[mem[i + 3]] = mem[mem[i + 1]] + mem[mem[i + 2]];
    } else if (mem[i] === 2) {
      mem[mem[i + 3]] = mem[mem[i + 1]] * mem[mem[i + 2]];
    }
  }
  return mem.shift();
};

const memCopy = [...memory];
memCopy[1] = 12;
memCopy[2] = 2;

console.log("Part 1:");
console.log(getProgramOut(memCopy));

// Part 2

const EXPECTED_OUT = 19690720;

for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) {
    const memCopy = [...memory];
    memCopy[1] = noun;
    memCopy[2] = verb;
    if (getProgramOut(memCopy) === EXPECTED_OUT) {
      console.log("Part 2:");
      console.log(100 * noun + verb);
      break;
    }
  }
}
