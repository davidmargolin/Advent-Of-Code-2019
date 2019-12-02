import fs from "fs";

// parse input

const text = fs.readFileSync("./1/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");
console.log(
  textByLine.reduce((prev, curr) => {
    return prev + (Math.floor(parseInt(curr) / 3) - 2);
  }, 0)
);

// Part 2

const getFuel = input => {
  const fuel = Math.floor(parseInt(input) / 3) - 2;
  if (fuel <= 0) return 0;
  else return fuel + getFuel(fuel);
};

console.log("Part 2:");
console.log(
  textByLine.reduce((prev, curr) => {
    return prev + getFuel(curr);
  }, 0)
);
