import fs from "fs";

// parse input

const text = fs.readFileSync("./6/input.txt", { encoding: "utf-8" });
const byLine = text.split("\n");

// Part 1

const allOrbits = byLine.reduce((orbits, curr) => {
  const [satelite, orbiter] = curr.split(")");
  orbits[orbiter] = satelite;
  return orbits;
}, {});

const savedAmounts = {};
const getOrbitAmount = orbiter => {
  if (orbiter in savedAmounts) {
    return savedAmounts[orbiter];
  }
  if (orbiter in allOrbits) {
    const amount = 1 + getOrbitAmount(allOrbits[orbiter]);
    savedAmounts[orbiter] = amount;
    return amount;
  }
  return 0;
};

const totalOrbits = Object.keys(allOrbits)
  .map(getOrbitAmount)
  .reduce((total, curr) => total + curr, 0);

console.log("Part 1:");
console.log(totalOrbits);

// Part 2

const getOrbitedObjects = orbiter => {
  if (orbiter in allOrbits) {
    return [allOrbits[orbiter], ...getOrbitedObjects(allOrbits[orbiter])];
  }
  return [];
};

const orbitedByYou = getOrbitedObjects("YOU");
const orbitedBySan = getOrbitedObjects("SAN");

for (let i = 0; i < orbitedByYou.length; i++) {
  const index = orbitedBySan.findIndex(
    satelite => satelite === orbitedByYou[i]
  );
  if (index !== -1) {
    console.log("Part 2:");
    console.log(index + i);
    break;
  }
}
