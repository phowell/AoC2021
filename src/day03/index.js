import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const BinArrayToInt = (arr) => {
  const binaryString = arr.join("");
  return parseInt(binaryString, 2);
};

const FilterArrays = (arr, idx, most) => {
  let idx_val = 0;

  for (let line of arr) {
    if (line[idx] == 1) {
      idx_val++;
    }
  }
  let signif = 0;

  if (most) {
    signif = idx_val * 2 >= arr.length ? 1 : 0;
    
  } else {
    signif = idx_val * 2 >= arr.length ? 0 : 1;
    
  }
  if (arr.length > 1) {
    return arr.filter((line) => line[idx] == signif);
  } else {
    return arr;
  }
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split("").map((y) => +y));

  const input_count = input.length;
  let val_count = new Array(input[0].length).fill(0);

  for (let line of input) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] == 1) {
        val_count[i]++;
      }
    }
  }

  let gamma = new Array(input[0].length).fill(0);
  for (let i = 0; i < val_count.length; i++) {
    if (val_count[i] * 2 > input_count) {
      gamma[i] = 1;
    } else {
      gamma[i] = 0;
    }
  }

  let epsilon = [];
  for (let i of gamma) {
    if (i == 1) {
      epsilon.push(0);
    } else {
      epsilon.push(1);
    }
  }

  return BinArrayToInt(gamma) * BinArrayToInt(epsilon);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split("").map((y) => +y));

  let oxy = new Array();
  let co2 = new Array();
  for (let i of input) {
    oxy.push(i);
    co2.push(i);
  }

  for (let i = 0; i < input[0].length; i++) {
    oxy = FilterArrays(oxy, i, true);
    co2 = FilterArrays(co2, i, false);
  }


  return BinArrayToInt(oxy[0]) * BinArrayToInt(co2[0]);
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
          expected: 230,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
  },
  "src/day03/input.txt",
);
