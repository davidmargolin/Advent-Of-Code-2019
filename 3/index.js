import fs from "fs";

// parse input

const text = fs.readFileSync("./3/input.txt", { encoding: "utf-8" });
const [wire0, wire1] = text.split("\n").map(line => line.split(","));

// Part 1

const generateCoordsFromInstructions = instructions => {
  let wireLastCoord = [0, 0];
  const wireCoords = [];
  instructions
    .map(instruction => instruction.split(""))
    .forEach(([direction, ...amount], index) => {
      const amountInt = parseInt(amount.join(""));
      if (direction === "R") {
        for (let i = 0; i < amountInt; i++) {
          const nextCoord = [wireLastCoord[0] + 1, wireLastCoord[1]];
          wireCoords.push(nextCoord);
          wireLastCoord = nextCoord;
        }
      } else if (direction === "U") {
        for (let i = 0; i < amountInt; i++) {
          const nextCoord = [wireLastCoord[0], wireLastCoord[1] + 1];
          wireCoords.push(nextCoord);
          wireLastCoord = nextCoord;
        }
      } else if (direction === "L") {
        for (let i = 0; i < amountInt; i++) {
          const nextCoord = [wireLastCoord[0] - 1, wireLastCoord[1]];
          wireCoords.push(nextCoord);
          wireLastCoord = nextCoord;
        }
      } else if (direction === "D") {
        for (let i = 0; i < amountInt; i++) {
          const nextCoord = [wireLastCoord[0], wireLastCoord[1] - 1];
          wireCoords.push(nextCoord);
          wireLastCoord = nextCoord;
        }
      }
    });
  return wireCoords;
};

const wire0Coords = generateCoordsFromInstructions(wire0);
const wire1Coords = generateCoordsFromInstructions(wire1);

console.log("Part 1:")
console.log(
  Math.min(
    ...wire0Coords
      .filter(([x, y]) => wire1Coords.find(([x1, y1]) => x1 === x && y1 === y))
      .map(([x, y]) => Math.abs(x) + Math.abs(y))
  )
);

// Part 2

const wire0Coords = generateCoordsFromInstructions(wire0).map(
  (item, index) => ({
    coord: item,
    index
  })
);

const wire1Coords = generateCoordsFromInstructions(wire1).map(
  (item, index) => ({
    coord: item,
    index
  })
);

let companion0 = null;
const shortest0 = wire0Coords.findIndex(({ coord: [x, y] }) => {
  const index = wire1Coords.findIndex(
    ({ coord: [x1, y1] }) => x1 === x && y1 === y
  );
  if (index !== -1) {
      companion0 = index;
      return index
  }
});

let companion1 = null;
const shortest1 = wire1Coords.findIndex(({ coord: [x, y] }) => {
  const index = wire0Coords.findIndex(
    ({ coord: [x1, y1] }) => x1 === x && y1 === y
  );
  if (index !== -1) {
    companion1 = index;
    return index
}
});

console.log("Part 2:");
console.log(Math.min(shortest0 + companion0, shortest1 + companion1) + 2);
