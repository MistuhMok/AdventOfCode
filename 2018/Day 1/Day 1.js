const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\r\n')
  .map(Number);

// console.log(array);

//Part 1 - Sum all frequencies
//Returns 474
// console.log(array.reduce((acc, curr) => acc + curr, 0));

//Part 2 - Find number frequency reached twice
//Returns 137041
function findDuplicate() {
  const hash = {};
  let sum = 0;
  let found = false;

  while (!found) {
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
      if (hash[sum]) {
        console.log(sum);
        return;
      } else hash[sum] = true;
    }
  }
}

findDuplicate();
