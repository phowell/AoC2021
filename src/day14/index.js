import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const generation = (startStr, rules) => {
  let newStr = [];
  for (let i = 0; i < startStr.length - 1; i++) {
    const pair = startStr.substring(i, i + 2);
    if (newStr.length == 0) {
      newStr.push(pair[0]);
    }
    newStr.push(rules[pair]);
    newStr.push(pair[1]);
  }
  return newStr.join("");
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("\n\n");
  const startStr = input[0];
  const rules = input[1]
    .split("\n")
    .map((x) => x.split("->"))
    .reduce((map, obj) => {
      map[obj[0].trim()] = obj[1].trim();
      return map;
    }, {});

  let result = startStr;
  for (let i = 0; i < 10; i++) {
    result = generation(result, rules);
  }

  let chars = new Map();

  for (let c of result) {
    if (chars.has(c)) {
      chars.set(c, chars.get(c) + 1);
    } else {
      chars.set(c, 1);
    }
  }

  let maxVal = 0;
  let minVal = Number.MAX_VALUE;
  for (const [key, val] of chars) {
    if (val > maxVal) {
      maxVal = val;
    }
    if (val < minVal) {
      minVal = val;
    }
  }
  return maxVal - minVal;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split("\n\n");
  const startStr = input[0];
  const rules = input[1]
    .split("\n")
    .map((x) => x.split("->"))
    .reduce((map, obj) => {
      map[obj[0].trim()] = obj[1].trim();
      return map;
    }, {});

  let count = new Map();
  for (const c of "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")) {
    count.set(c, 0);
  }

  let genlist = startStr.split("").map((x) => [x, 0]);

  let curDepth = 0;
  const maxDepth = 10;
  while (genlist.length > 1) {
    curDepth += 1;
    const key = new Array(genlist[0][0], genlist[1][0]).join("");
    genlist.splice(1, 0, [rules[key], curDepth]);
    if (curDepth == maxDepth) {
      let snip = genlist.splice(0, 2);
      count.set(snip[0][0], count.get(snip[0][0]) + 1);
      count.set(snip[1][0], count.get(snip[1][0]) + 1);
      curDepth = genlist[0][1];
    }
  }

  count.set(genlist[0][0], count.get(genlist[0][0]) + 1);

  let maxVal = 0;
  let minVal = Number.MAX_VALUE;
  for (const [key, val] of count) {
    if (val > maxVal) {
      maxVal = val;
    }
    if (val > 0 && val < minVal) {
      minVal = val;
    }
  }
  return maxVal - minVal;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`,
          expected: 1588,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`,
          expected: 2188189693529,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
  },
  "src/day14/input.txt",
);
