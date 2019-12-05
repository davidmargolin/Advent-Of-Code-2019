import fs from "fs";

// parse input

const text = fs.readFileSync("./1/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

const fuels = textByLine.map(mass => Math.floor(parseInt(mass) / 3) - 2);

console.log("Part 1:");
console.log(fuels.reduce((total, curr) => total + curr, 0));

// Part 2

const getFuel = mass => {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel <= 0) return 0;
  else return fuel + getFuel(fuel);
};

const fuelsExpanded = textByLine.map(mass => getFuel(mass));

console.log("Part 2:");
console.log(fuelsExpanded.reduce((total, curr) => total + curr, 0));
