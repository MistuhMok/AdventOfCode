const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split(',')
  .map(ele => +ele);

//Part 1 - Run input and return value in position 0
//Returns 10566835
function opCodes(noun, verb, array) {
  array[1] = noun;
  array[2] = verb;

  let pointer = 0;
  let curr = array[pointer];

  while (curr !== 99) {
    if (curr === 1) {
      let tmp = array[array[pointer + 1]] + array[array[pointer + 2]];
      array[array[pointer + 3]] = tmp;
    } else if (curr === 2) {
      let tmp = array[array[pointer + 1]] * array[array[pointer + 2]];
      array[array[pointer + 3]] = tmp;
    }

    pointer += 4;
    curr = array[pointer];
  }

  return array[0];
}

// console.log(opCodes(12, 2, arr));

//Part 2 - Find the values for 1st and 2nd position that will return 19690720
//Returns 2347 (23, 47)
function opCodes2() {
  let noun = 0;
  let verb = 0;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      if (opCodes(noun, verb, [...arr]) === 19690720)
        console.log(100 * noun + verb);
    }
  }
}

opCodes2();
