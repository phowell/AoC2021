import run from "aocrunner";

import inspect from "util";

const parseInput = (rawInput) => rawInput;

const areSetsEqual = (a, b) =>
  a.size === b.size && [...a].every((value) => b.has(value));

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split("|")[1])
    .map((x) => x.trim().split(" "));

  let count = 0;
  for (let codes of input) {
    for (let code of codes) {
      if ([2, 3, 4, 7].includes(code.length)) {
        count++;
      }
    }
  }
  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split("|"));

  // Each digit
  let one = new Set();
  let two = new Set();
  let three = new Set();
  let four = new Set();
  let five = new Set();
  let six = new Set();
  let seven = new Set();
  let eight = new Set();
  let nine = new Set();
  let zero = new Set();

  let fivecells = []; // 2, 3, and 5
  let sixcells = []; // 6, 9, and 0

  // Each of the 7 segments
  let top = new Set();
  let topl = new Set();
  let topr = new Set();
  let mid = new Set();
  let botl = new Set();
  let botr = new Set();
  let bot = new Set();

  let sumOfAnswers = 0;
  for (let config of input) {
    const digits = config[0]
      .trim()
      .split(" ")
      .map((x) => new Set(x.split("")));

    for (let d of digits) {
      // Identify one
      if (d.size == 2) {
        one = d;
      }

      // Identify four
      if (d.size == 4) {
        four = d;
      }

      // Identify seven
      if (d.size == 3) {
        seven = d;
      }

      // Identify eight
      if (d.size == 7) {
        eight = d;
      }

      // Identify who can be 2, 3, or 5
      if (d.size == 5) {
        fivecells.push(d);
      }

      // Identify who can be 6, 9 or 0
      if (d.size == 6) {
        sixcells.push(d);
      }
    }

    // The top segment is present in 7 but not 1
    top = new Set([...seven].filter((x) => !one.has(x)));

    // Bottom = 9 - (Top + 4)
    const almost_nine = new Set([...four, ...top]);
    for (let c of sixcells) {
      const segment = new Set([...c].filter((x) => !almost_nine.has(x)));
      if (segment.size == 1) {
        nine = new Set(c);
        bot = new Set(...segment);
      }
    }

    // With 8 and 9, we can get bottom left
    botl = new Set([...eight].filter((x) => !nine.has(x)));

    // bottom left lets us find 2, 3 and 5
    const oneA = [...one];
    for (let c of fivecells) {
      if (c.has(...botl)) {
        two = new Set(c);
      } else if (c.has(oneA[0]) && c.has(oneA[1])) {
        three = new Set(c);
      } else {
        five = new Set(c);
      }
    }

    // 5 + botl = 6
    six = new Set([...five, ...botl]);

    // 0 is the last 6 segment number
    for (let c of sixcells) {
      if (!areSetsEqual(c, six) && !areSetsEqual(c, nine)) {
        zero = new Set(c);
      }
    }

    const coded_answers = config[1]
      .trim()
      .split(" ")
      .map((x) => new Set(x.split("")));

    let answer = [];
    for (let c of coded_answers) {
      if (areSetsEqual(c, zero)) {
        answer.push(0);
      } else if (areSetsEqual(c, one)) {
        answer.push(1);
      } else if (areSetsEqual(c, two)) {
        answer.push(2);
      } else if (areSetsEqual(c, three)) {
        answer.push(3);
      } else if (areSetsEqual(c, four)) {
        answer.push(4);
      } else if (areSetsEqual(c, five)) {
        answer.push(5);
      } else if (areSetsEqual(c, six)) {
        answer.push(6);
      } else if (areSetsEqual(c, seven)) {
        answer.push(7);
      } else if (areSetsEqual(c, eight)) {
        answer.push(8);
      } else if (areSetsEqual(c, nine)) {
        answer.push(9);
      }
    }

    sumOfAnswers += +answer.join("");

    // Reset for the next run
    // Each digit
    one = new Set();
    two = new Set();
    three = new Set();
    four = new Set();
    five = new Set();
    six = new Set();
    seven = new Set();
    eight = new Set();
    nine = new Set();
    zero = new Set();

    fivecells = []; // 2, 3, and 5
    sixcells = []; // 6, 9, and 0

    // Each of the 7 segments
    top = new Set();
    topl = new Set();
    topr = new Set();
    mid = new Set();
    botl = new Set();
    botr = new Set();
    bot = new Set();
  }

  return sumOfAnswers;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
        edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
        fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
        fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
        aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
        fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
        dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
        bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
        egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
        gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
          expected: 26,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`,
          expected: 5353,
        },
        {
          input: `
        be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
        edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
        fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
        fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
        aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
        fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
        dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
        bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
        egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
        gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
          expected: 61229,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
  },
  "src/day08/input.txt",
);
