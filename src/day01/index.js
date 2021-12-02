import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((x) => +x);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let total = 0;

  for (let i = 1; i <= input.length; i++) {
    if (input[i] > input[i - 1]) {
      total++;
    }
  }

  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let window_sums = [];
  for (let i = 0; i < input.length - 2; i++) {
    window_sums.push(input[i] + input[i + 1] + input[i + 2]);
  }
  let total = 0;

  for (let i = 1; i <= window_sums.length; i++) {
    if (window_sums[i] > window_sums[i - 1]) {
      total++;
    }
  }

  return total;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
      199
      200
      208
      210
      200
      207
      240
      269
      260
      263`,
          expected: 7,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
      199
      200
      208
      210
      200
      207
      240
      269
      260
      263`,
          expected: 5,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
  },
  "src/day01/input.txt",
);
