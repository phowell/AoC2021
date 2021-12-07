import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(',').map(x => +x);
  const greatest_pos = Math.max(...input);

  let cheapest_pos = -1;
  let cheapest_fuel = Number.MAX_VALUE;
  for (let i = 0; i <= greatest_pos; i++){

    let fuel = 0;
    for (let crab of input){
      if (crab > i){
        fuel += crab - i;
      } else {
        fuel += i - crab;
      }
    }
    if (fuel < cheapest_fuel){
      cheapest_pos = i;
      cheapest_fuel = fuel;
      
    }
  }
  console.log("Best is: " + cheapest_pos + "(" + cheapest_fuel + " units of fuel)");

  return cheapest_fuel;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(',').map(x => +x);
  const greatest_pos = Math.max(...input);

  let cheapest_pos = -1;
  let cheapest_fuel = Number.MAX_VALUE;
  for (let i = 0; i <= greatest_pos; i++){

    let fuel = 0;
    for (let crab of input){
      let diff = 0;
      if (crab > i){
        diff += crab - i;
      } else {
        diff += i - crab;
      }
      fuel += (diff*(diff+1))/2
    }
    if (fuel < cheapest_fuel){
      cheapest_pos = i;
      cheapest_fuel = fuel;
      
    }
  }
  console.log("Best is: " + cheapest_pos + "(" + cheapest_fuel + " units of fuel)");

  return cheapest_fuel;
};

run({
  part1: {
    tests: [
      {
        input: `
        16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
      input: `
        16,1,2,0,4,2,7,1,2,14`,
        expected: 168,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
}, 'src/day07/input.txt');
