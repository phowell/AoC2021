import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

class Board {
  constructor(values) {
    this.boardstate = [];
    this.position = NaN;
    this.winning_ball = NaN;
    for (let v of values) {
      this.boardstate.push([v, false]);
    }
  }

  get position(){
    return this._position;
  }

  set position(pos){
    this._position = pos;
  }

  get winning_ball(){
    return this._winning_ball;
  }

  set winning_ball(ball){
    this._winning_ball = ball;
  }

  markNum(num) {
    let found = false;
    for (let cell of this.boardstate){
      if (cell[0] == num){
        cell[1] = true;
        found = true;
      }
    }
    return found;
  }

  checkColumn(col) {
    return (
      this.boardstate[col][1] &&
      this.boardstate[col+5][1] &&
      this.boardstate[col+10][1] &&
      this.boardstate[col+15][1] &&
      this.boardstate[col+20][1]
    );
  }

  checkRow(row) {
    let r = row * 5;
    return (
      this.boardstate[r][1] &&
      this.boardstate[r+1][1] &&
      this.boardstate[r+2][1] &&
      this.boardstate[r+3][1] &&
      this.boardstate[r+4][1]
    );
  }

  checkWin(){
    let win = false;
    for (let i = 0; i <= 4; i++){
      if (this.checkColumn(i)){
        win = true;
      }
      if (this.checkRow(i)){
        win = true;
      }
    }
    return win;
  }

  score() {
    let score = 0;
    for (let cell of this.boardstate) {
      if (!cell[1]) {
        score += cell[0];
      }
    }
    return score;
  }
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("\n\n");
  const balls = input[0].split(",").map((x) => +x);

  let boards = [];
  for(let i = 1; i < input.length; i++){
    boards.push(new Board(input[i].split(/\s+/).map((x) => +x)));
  }
  
  for (let ball of balls){
    for (let board of boards){
      let found = board.markNum(ball);
      if(found && board.checkWin()){
        return (ball * board.score());
      }
    }
  }
  return;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split("\n\n");
  const balls = input[0].split(",").map((x) => +x);

  let boards = [];
  for(let i = 1; i < input.length; i++){
    boards.push(new Board(input[i].split(/\s+/).map((x) => +x)));
  }

  let pos = 0;
  for (let ball of balls){
    for (let board of boards){
      let found = board.markNum(ball);
      if(found && board.position == NaN && board.checkWin()){
        board.position = pos;
        board.winning_ball = ball;
        pos += 1;
      }
    }
  }

  let loser = 0;
  for(let board of boards){
    console.log(board.position);
    if(board.position > loser){
      loser = board.position;
    }
  }

  for(let board of boards){
    if(board.position == loser){
      return (board.winning_ball * board.score())
    }
  }
  return;
};

run(
  {
    part1: {
      tests: [
        {
          input: `
        7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19
        
         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6
        
        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7`,
          expected: 4512,
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `
        7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

        22 13 17 11  0
         8  2 23  4 24
        21  9 14 16  7
         6 10  3 18  5
         1 12 20 15 19
        
         3 15  0  2 22
         9 18 13 17  5
        19  8  7 25 23
        20 11 10 24  4
        14 21 16 12  6
        
        14 21 17 24  4
        10 16 15  9 19
        18  8 23 26 20
        22 11 13  6  5
         2  0 12  3  7`,
          expected: 1924,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
  },
  "src/day04/input.txt",
);
