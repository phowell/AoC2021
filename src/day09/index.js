import run from "aocrunner";
import { dir } from "console";

const parseInput = (rawInput) => rawInput;

const neighbors = (x, y, maxX, maxY) => {
  const n = [x - 1, y];
  const s = [x + 1, y];
  const w = [x, y - 1];
  const e = [x, y + 1];
  let vals = [];

  for (let dir of [n, s, w, e]) {
    if (dir[0] >= 0 && dir[1] >= 0 && dir[0] <= maxX && dir[1] <= maxY) {
      //console.log(dir)
      vals.push(dir);
    }
  }
  //console.log("["+x+","+y+"] has neighbors at: " + vals + "{"+maxX + "x"+ maxY+ "}")
  //console.log(vals);
  return vals;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split("").map((x) => +x));
  
  const maxX = input.length -1;
  const maxY = input[0].length -1;
  let lowPoints = [];
  for(let x = 0; x <= maxX; x++){
    for(let y = 0; y <= maxY; y++){
      let lowest = true;
      for (let n of neighbors(x, y, maxX, maxY)){
        if(input[n[0]][n[1]] < input[x][y]){
          console.log()
          lowest = false;

        }
      }
      if(lowest){
        lowPoints.push([x, y]);
      }
    }
  }

  let riskLevel = 0;
  for(let p of lowPoints){
     riskLevel += 1 + input[p[0]][p[1]];
  }
  return riskLevel;
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
          2199943210
          3987894921
          9856789892
          8767896789
          9899965678`,
          expected: 15,
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
  "src/day09/input.txt",
);
