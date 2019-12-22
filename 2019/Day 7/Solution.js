const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split(',')
  .map(ele => +ele);

// const arr = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
// const arr = [3,23,3,24,1002,24,10,24,1002,23,-1,23,
// 101,5,23,23,1,24,23,23,4,23,99,0,0]
// const arr = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
//     1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]
// const arr = [
//   3,
//   52,
//   1001,
//   52,
//   -5,
//   52,
//   3,
//   53,
//   1,
//   52,
//   56,
//   54,
//   1007,
//   54,
//   5,
//   55,
//   1005,
//   55,
//   26,
//   1001,
//   54,
//   -5,
//   54,
//   1105,
//   1,
//   12,
//   1,
//   53,
//   54,
//   53,
//   1008,
//   54,
//   0,
//   55,
//   1001,
//   55,
//   1,
//   55,
//   2,
//   53,
//   55,
//   53,
//   4,
//   53,
//   1001,
//   56,
//   -1,
//   56,
//   1005,
//   56,
//   6,
//   99,
//   0,
//   0,
//   0,
//   0,
//   10,
// ];
function opCodes(array, input, prevInput = 0) {
  let pointer = 0;
  let secondInput = false;

  while (pointer < array.length) {
    let curr = '' + array[pointer];

    let opCode = curr.slice(-1);
    let mode = curr
      .slice(0, curr.length - 2)
      .split('')
      .reverse();
    let total = 0;

    pointer++;
    while (mode.length < 2) mode.push('0');

    if (opCode === '1') {
      let mode1 = mode[0];
      let mode2 = mode[1];

      let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer];
      let param2 =
        mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1];

      total = param1 + param2;

      pointer += 2;
    } else if (opCode === '2') {
      let mode1 = mode[0];
      let mode2 = mode[1];

      let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer];
      let param2 =
        mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1];

      total = param1 * param2;

      pointer += 2;
    } else if (opCode === '3') {
      if (secondInput) array[array[pointer]] = prevInput;
      else array[array[pointer]] = input;
      secondInput = true;

      pointer++;
      continue;
    } else if (opCode === '4') {
      if (mode[0] === '1') return array[pointer];
      else return array[+array[pointer]];
    } else if (opCode === '5') {
      let mode1 = mode[0];
      let mode2 = mode[1];

      let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer];
      let param2 =
        mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1];

      if (param1 !== 0) pointer = param2;
      else pointer += 2;

      continue;
    } else if (opCode === '6') {
      let mode1 = mode[0];
      let mode2 = mode[1];

      let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer];
      let param2 =
        mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1];

      if (param1 === 0) pointer = param2;
      else pointer += 2;

      continue;
    } else if (opCode === '7') {
      let mode1 = mode[0];
      let mode2 = mode[1];

      let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer];
      let param2 =
        mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1];

      if (param1 < param2) total = 1;
      else total = 0;

      pointer += 2;
    } else if (opCode === '8') {
      let mode1 = mode[0];
      let mode2 = mode[1];

      let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer];
      let param2 =
        mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1];

      if (param1 === param2) total = 1;
      else total = 0;

      pointer += 2;
    } else if (curr.slice(-2) === '99') {
      console.log('OPCODE 99');
      return;
    } else {
      console.log(curr, 'BROKEN OPCODE', pointer);
      return;
    }

    //Modifies position if the opcode has a 3rd param for address
    if (pointer !== array.length) {
      let position = array[pointer];
      array[position] = total;
      pointer++;
    }
  }
}

//Part 1 - Test all permutations of 0-4 to see which one generates the highest result
//Run maxThruster() returns 70597

function maxThruster() {
  let max = 0;
  const arr1 = [0, 1, 2, 3, 4];

  permutation(arr1).forEach(phaseSettings => {
    let prev = 0;

    phaseSettings.forEach(ele => (prev = opCodes(arr, ele, prev)));

    if (prev > max) max = prev;
  });

  console.log(max);
}

function permutation(array) {
  const result = [];
  helper(array, []);
  return result;

  function helper(array, temp) {
    if (!array.length) result.push(temp);
    for (let i = 0; i < array.length; i++) {
      const tmp = array.splice(i, 1)[0];
      helper(array, temp.concat(tmp));
      array.splice(i, 0, tmp);
    }
  }
}
