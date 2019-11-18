var fs = require('fs');
var array = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\r\n')
  .map(Number);

console.log(array);
