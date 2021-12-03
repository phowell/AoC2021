import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let pos_h = 0;
  let pos_v = 0; // down is positive
  const directions = input.map((x) => x.split(" "));
  for (const dir of directions) {
    switch (dir[0].trim()) {
      case "forward":
        pos_h += +dir[1];
        break;
      case "up":
        pos_v -= +dir[1];
        break;
      case "down":
        pos_v += +dir[1];
        break;
    }
  }

  return pos_h * pos_v;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let pos_h = 0;
  let pos_v = 0; //down is positive
  let aim = 0;
  const directions = input.map((x) => x.split(" "));
  for (const dir of directions) {
    let dist = +dir[1]
    switch (dir[0].trim()) {
      case "forward":
        pos_h += dist;
        pos_v += dist * aim
        break;
      case "up":
        aim -= dist;
        break;
      case "down":
        aim += dist;
        break;
    }
  }

  return pos_h * pos_v;

};

run(
  {
    part1: {
      tests: [
        {
          input:`
          forward 5
          down 5
          forward 8
          up 3
          down 8
          forward 2`,
          expected: 150,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input:`
          forward 5
          down 5
          forward 8
          up 3
          down 8
          forward 2`,
          expected: 900,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
  },
);
