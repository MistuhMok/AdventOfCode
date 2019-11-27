const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\n');

console.log(array);
