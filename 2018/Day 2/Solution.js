const fs = require('fs');
const arr = fs
  .readFileSync('Input.txt')
  .toString()
  .split('\n');

//Part 1 - Count characters that contain strings with either 2 or 3 of the same char
//Returns 5434 (247 * 22)
function countChars() {
  let twoCount = 0;
  let threeCount = 0;

  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    let hash = {};

    for (let j = 0; j < str.length; j++) {
      let curr = str[j];

      if (hash[curr]) {
        hash[curr]++;
      } else hash[curr] = 1;
    }

    const values = Object.values(hash);
    if (values.includes(2)) twoCount++;
    if (values.includes(3)) threeCount++;
  }

  console.log(twoCount, threeCount);
}

// countChars();
