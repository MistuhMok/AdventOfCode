const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  // .readFileSync('Sample.txt')
  .toString()
  .split('\n');
array.length = array.length - 1;

const aList = {};
const valid = new Array(26).fill(false);

//Part 1 - Find order that the steps must be completed in
//Returns ACHOQRXSEKUGMYIWDZLNBFTJVP

//A - char code 65
function createGraph() {
  for (let i = 0; i < array.length; i++) {
    //First letter at index 5
    let firstChar = array[i][5];

    //Second letter at index 36
    let secChar = array[i][36];

    //If character exists in the puzzle we set to valid by normalizing to 0-25 index
    valid[firstChar.charCodeAt() - 65] = true;
    valid[secChar.charCodeAt() - 65] = true;

    if (!Array.isArray(aList[firstChar])) aList[firstChar] = [];

    //Add the steps that must be completed first into that chars array
    if (Array.isArray(aList[secChar])) aList[secChar].push(firstChar);
    else aList[secChar] = [firstChar];
  }
}

createGraph();

function buildOrder() {
  const keys = Object.keys(aList);

  let res = '';
  let pointer = 0;

  while (res.length !== keys.length) {
    if (valid[pointer]) {
      let currChar = String.fromCharCode(pointer + 65);

      //If no other steps must be completed before the currChar
      if (aList[currChar].length === 0) {
        res += currChar;
        valid[pointer] = false;

        //Restart pointer from the beginning
        pointer = -1;

        //Remove the currChar from chars array that need it as a completed step
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          if (aList[key].includes(currChar))
            aList[key] = aList[key].filter(char => char !== currChar);
        }
      }
    }

    pointer++;
  }

  console.log(res, 'res');
}

buildOrder();
