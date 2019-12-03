import fs from "fs";

// parse input

const text = fs.readFileSync("./3/input.txt", { encoding: "utf-8" });
const [wire0, wire1] = text.split("\n").map(line => line.split(","));

// Part 1

const generateCoordsFromInstructions = instructions => {
  let wireLastCoord = [0, 0];
  let distance = 0;
  return instructions
    .map(instruction => instruction.split(""))
    .reduce((total, [direction, ...amount]) => {
      const amountInt = parseInt(amount.join(""));
      for (let i = 0; i < amountInt; i++) {
        distance += 1;
        let nextCoord;
        if (direction === "R") {
          nextCoord = [wireLastCoord[0] + 1, wireLastCoord[1]];
        } else if (direction === "U") {
          nextCoord = [wireLastCoord[0], wireLastCoord[1] + 1];
        } else if (direction === "L") {
          nextCoord = [wireLastCoord[0] - 1, wireLastCoord[1]];
        } else if (direction === "D") {
          nextCoord = [wireLastCoord[0], wireLastCoord[1] - 1];
        }
        if (!total.has(nextCoord.join(","))) {
          total.set(nextCoord.join(","), distance);
        }
        wireLastCoord = nextCoord;
      }
      return total;
    }, new Map());
};

const wire0Coords = generateCoordsFromInstructions(wire0);
const wire1Coords = generateCoordsFromInstructions(wire1);

let minIntersection = Infinity;
for (const coord of wire0Coords.keys()) {
  if (wire1Coords.has(coord)) {
    const [x, y] = coord.split(",").map(s => parseInt(s));
    const manhattanDistance = Math.abs(x) + Math.abs(y);
    if (manhattanDistance < minIntersection)
      minIntersection = manhattanDistance;
  }
}
console.log("Part 1:");
console.log(minIntersection);

// Part 2

let minDistance = Infinity;
for (const [coord, distance] of wire0Coords.entries()) {
  if (wire1Coords.has(coord)) {
    const totalDistance = distance + wire1Coords.get(coord);
    if (totalDistance < minDistance) minDistance = totalDistance;
  }
}

console.log("Part 2:");
console.log(minDistance);
