const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\n')
  .map(ele => ele.slice(ele.indexOf('@') + 2));

//Split input and dimensions into separate arrays
//Not necessary but easier to read
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

// const width = [
//   [1, 4],
//   [3, 4],
//   [5, 2],
// ];
// const height = [
//   [3, 4],
//   [1, 4],
//   [5, 2],
// ];

//Part 1 - Figure out area of overlapping parts
//Returns 97218
function overlap() {
  const board = [];
  for (let i = 0; i < 1000; i++) {
    board.push(new Array(1000).fill(0));
  }

  let pointer = 0;
  let count = 0;

  while (pointer < height.length) {
    //Row and col are tuples [starting point, range]
    let row = height[pointer];
    let col = width[pointer];

    //Count each square if something already exists there
    //Make sure not to double count repeat overlapped squares
    for (let i = 0; i < row[1]; i++) {
      for (let j = 0; j < col[1]; j++) {
        if (board[row[0] + i][col[0] + j] === 1) {
          count++;
          board[row[0] + i][col[0] + j] = -1;
        } else if (board[row[0] + i][col[0] + j] === -1) continue;
        else board[row[0] + i][col[0] + j]++;
      }
    }

    pointer++;
  }
  console.log(count);
}

overlap();
