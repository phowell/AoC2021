import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split("").map((y) => +y));
  [];
  const input_count = length(input);
  let val_count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let line of input) {
    for (let i = 0; i < length(line); i++) {
      if (line[i] == 1) {
        val_count[i]++;
      }
    }
  }

  let gamma = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < length(val_count); i++) {
    if (val_count[i] * 2 > input_count) {
      gamma[i] = 1;
    } else {
      gamma[i] = 0;
    }
  }

  let epsilon = [];
  for (let i of gamma){
    if (i == 1){
      epsilon.push(0);
    }else{
      epsilon.push(1);
    }
  }

  return;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010`,
          expected: 198,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        // { input: ``, expected: "" },
      ],
      solution: part2,
    },
    trimTestInputs: true,
  },
);
