const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\n')
  .map(ele => ele.slice(ele.indexOf('@') + 2));

const width = [];
const height = [];
array.forEach(ele =>
  width.push([
    +ele.slice(0, ele.indexOf(',')),
    +ele.slice(ele.indexOf('x') - 2, ele.indexOf('x')),
  ])
);

array.forEach(ele =>
  height.push([
    +ele.slice(ele.indexOf(',') + 1, ele.indexOf(':')),
    +ele.slice(ele.indexOf('x') + 1),
  ])
);
