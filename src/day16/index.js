import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("")
    .map((x) => {
      const nybble = parseInt(x, 16).toString(2);
      switch (nybble.length) {
        case 1:
          return "000" + nybble;
        case 2:
          return "00" + nybble;
        case 3:
          return "0" + nybble;
        default:
          return nybble;
      }
    })
    .join("")
    .split("");

const realinputlen = 1370*4;
const tokenize = (binary) => {
  let pointer = 0;
  
  let transmission = [];
  let token = [];
  while (pointer < binary.length) {
    if(binary.length > 5000){
      console.log(pointer + "/" + binary.length);
    }
    token = [];
    const version = binary.slice(pointer, pointer + 3).join("");
    pointer += 3;
    const typeid = binary.slice(pointer, pointer + 3).join("");
    pointer += 3;
    token.push(version);
    token.push(typeid);
    let value = [];
    let fivebits = [];
    let headerbits = [];
    if (typeid == "100") {
      do {
        fivebits = binary.slice(pointer, pointer + 5);
        pointer += 5;
        headerbits.push(fivebits[0]);
        value.push(fivebits.slice(1, 5).join(""));
      } while (fivebits[0] == 1);
      token.push(headerbits.flat().join(""));
      token.push(value.flat().join(""));
    } else {
      const lenid = binary[pointer];
      pointer += 1;
      token.push(lenid);
      if (lenid == 0) {
        const totallen = binary.slice(pointer, pointer + 15).join("");
        token.push(totallen);
        pointer += 15;
        let packet = [];
        for (let tok of tokenize(
          binary.slice(pointer, pointer + parseInt(totallen, 2)),
        )) {
          packet.push(tok);
        }
        pointer += parseInt(totallen, 2);
        token.push(packet);
      } else if (lenid == 1) {
        const subcount = binary.slice(pointer, pointer + 11).join("");
        token.push(binary.slice(pointer, pointer + 11).join(""));
        pointer += 11;

        //There is probably a better way to do this but I'm going to parse the entire rest of the document and take the first X tokens returned.
        const subpackets = tokenize(binary.slice(pointer)).slice(
          0,
          parseInt(subcount, 2),
        );
        token.push(subpackets);
        let splen = subpackets.flat(Infinity).join("");;
        pointer += splen.length;
      }
    }
    if (parseInt(binary.slice(pointer).join(""), 2) == 0) {
      pointer = binary.length;
    }
    transmission.push(token);
  }
  return transmission;
};

const countvers = (tokens) => {
  let vercount = 0;
  for (let tok of tokens) {
    let newval = parseInt(tok[0], 2);
    vercount += parseInt(tok[0], 2);
    for (let t of tok) {
      if (Array.isArray(t)) {
        vercount += countvers(t);
      }
    }
  }
  return vercount;
};

function printArray(arr) {
  if (typeof arr == "object") {
    for (var i = 0; i < arr.length; i++) {
      printArray(arr[i]);
    }
  } else console.log(arr);
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const transmission = tokenize(input);
  return countvers(transmission);
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
        D2FE28`,
          expected: 6,
        },
        {
          input: `
        D14A4480`,
          expected: 8,
        },
        {
          input: `
        38006F45291200`,
          expected: 9,
        },
        {
          input: `
        EE00D40C823060`,
          expected: 14,
        },
        {
          input: `
        8A004A801A8002F478`,
          expected: 16,
        },
        {
          input: `
        620080001611562C8802118E34`,
          expected: 12,
        },
        {
          input: `
        C0015000016115A2E0802F182340`,
          expected: 23,
        },
        {
          input: `
        A0016C880162017C3686B18A3D4780`,
          expected: 31,
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
  "src/day16/input.txt",
);
