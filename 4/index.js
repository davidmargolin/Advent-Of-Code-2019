// create array with input range

const RANGE_START = 138307;
const RANGE_END = 654504;

const range = new Array(RANGE_END - RANGE_START)
  .fill(0)
  .map((_, index) => (index + RANGE_START).toString().split(""));

// Part 1

const isIncreasing = input =>
  !input.some((num, index) => num > input[index + 1]);

const hasAdjacent = input =>
  input.some((num, index) => num === input[index + 1]);

console.log("Part 1:");
console.log(
  range.filter(item => isIncreasing(item) && hasAdjacent(item)).length
);

// Part 2

const hasAdjacentSetOfTwo = input =>
  input.some((num, index) => {
    return (
      num === input[index + 1] &&
      num != input[index + 2] &&
      num !== input[index - 1]
    );
  });

console.log("Part 2:");
console.log(
  range.filter(item => isIncreasing(item) && hasAdjacentSetOfTwo(item)).length
);
