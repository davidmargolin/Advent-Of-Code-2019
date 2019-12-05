import fs from "fs";

// parse input

const text = fs.readFileSync("./5/input.txt", { encoding: "utf-8" });
const memory = text.split(",").map(str => parseInt(str));

// Part 1

const getProgramOut = (mem, input) => {
  let pointer = 0;
  let instruction, lastOut;
  while (instruction !== 99) {
    const data = mem[pointer].toString().split("");

    instruction = parseInt(data.splice(-2, 2).join(""));

    while (data.length < 2) data.unshift("0");
    const param1 = data[1] === "1" ? mem[pointer + 1] : mem[mem[pointer + 1]];
    const param2 = data[0] === "1" ? mem[pointer + 2] : mem[mem[pointer + 2]];

    const destination = mem[pointer + 3];

    if (instruction === 1) {
      mem[destination] = param1 + param2;
      pointer += 4;
    } else if (instruction === 2) {
      mem[destination] = param1 * param2;
      pointer += 4;
    } else if (instruction === 3) {
      mem[mem[pointer + 1]] = input;
      pointer += 2;
    } else if (instruction === 4) {
      lastOut = mem[mem[pointer + 1]];
      pointer += 2;
    }
  }
  return lastOut;
};

const memCopy = [...memory];
console.log("Part 1:");
console.log(getProgramOut(memCopy, 1));

// Part 2

const getProgramOutP2 = (mem, input) => {
  let pointer = 0;
  let instruction, lastOut;
  while (instruction !== 99) {
    const data = mem[pointer].toString().split("");

    instruction = parseInt(data.splice(-2, 2).join(""));

    while (data.length < 2) data.unshift("0");

    const param1 = data[1] === "1" ? mem[pointer + 1] : mem[mem[pointer + 1]];
    const param2 = data[0] === "1" ? mem[pointer + 2] : mem[mem[pointer + 2]];

    const destination = mem[pointer + 3];

    if (instruction === 1) {
      mem[destination] = param1 + param2;
      pointer += 4;
    } else if (instruction === 2) {
      mem[destination] = param1 * param2;
      pointer += 4;
    } else if (instruction === 3) {
      mem[mem[pointer + 1]] = input;
      pointer += 2;
    } else if (instruction === 4) {
      lastOut = mem[mem[pointer + 1]];
      pointer += 2;
    } else if (instruction === 5) {
      if (param1 !== 0) pointer = param2;
      else pointer += 3;
    } else if (instruction === 6) {
      if (param1 === 0) pointer = param2;
      else pointer += 3;
    } else if (instruction === 7) {
      mem[destination] = param1 < param2 ? 1 : 0;
      pointer += 4;
    } else if (instruction === 8) {
      mem[destination] = param1 === param2 ? 1 : 0;
      pointer += 4;
    }
  }
  return lastOut;
};

const memCopyP2 = [...memory];
console.log("Part 2:");
console.log(getProgramOutP2(memCopyP2, 5));
