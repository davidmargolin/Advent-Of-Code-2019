import fs from "fs";

const text = fs.readFileSync("./2/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

const getFuel = input => {
  const fuel = Math.floor(parseInt(input) / 3) - 2;
  if (fuel <= 0) return 0;
  else return fuel + getFuel(fuel);
};

console.log(
  textByLine.reduce((prev, curr) => {
    return prev + getFuel(curr);
  }, 0)
);
