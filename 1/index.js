import fs from "fs";

const text = fs.readFileSync("./1/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

console.log(
  textByLine.reduce((prev, curr) => {
    return prev + (Math.floor(parseInt(curr) / 3) - 2);
  }, 0)
);
