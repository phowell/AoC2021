import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((x) => x.split("\n"));
  const coords = input[0].map((x) => x.split(",").map((x) => +x));
  const folds = input[1].map((x) => [x.split("=")[0].at(-1), +x.split("=")[1]]);

  let maxX = 0;
  let maxY = 0;
  for (let c of coords) {
    if (c[0] > maxX) {
      maxX = c[0];
    }
    if (c[1] > maxY) {
      maxY = c[1];
    }
  }
  console.log(maxX);
  console.log(maxY);
  let grid = [];
  for (let i = 0; i < maxY + 1; i++) {
    grid.push(new Array(maxX + 1).fill(false));
  }
  console.log(grid.length);
  console.log(grid[0].length);
  for(let c of coords){
    grid[c[1]][c[0]] = true;
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
          6,10
          0,14
          9,10
          0,3
          10,4
          4,11
          6,0
          6,12
          4,1
          0,13
          10,12
          3,4
          3,0
          8,4
          1,10
          2,14
          8,10
          9,0
          
          fold along y=7
          fold along x=5`,
          expected: 17,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [],
      solution: part2,
    },
    trimTestInputs: true,
  },
  "src/day13/input.txt",
);
