const fs = require('fs');
let maxCol = Number.NEGATIVE_INFINITY;
let maxRow = Number.NEGATIVE_INFINITY;

let minCol = Infinity;
let minRow = Infinity;

const array = parseInput();
console.log(maxCol, maxRow, minCol, minRow);
function parseInput() {
  return (
    fs
      .readFileSync('PuzzleInput.txt')
      // .readFileSync('Sample.txt')

      .toString()
      .split('\n')
      .map(ele => {
        if (ele === '') return;
        let x = +ele.slice(0, ele.indexOf(','));
        let y = +ele.slice(ele.indexOf(' ') + 1);

        //Find largest and smallest coordinates
        if (x > maxCol) maxCol = x;
        if (x < minCol) minCol = x;
        if (y > maxRow) maxRow = y;
        if (y < minRow) minRow = y;

        return [x, y];
      })
  );
}

array.length = array.length - 1;

//Part 1 - Find the largest area around a coordinate
function findLargestArea() {
  let areas = new Array(array.length).fill(0);

  for (let row = 0; row <= maxRow; row++) {
    for (let col = 0; col <= maxCol; col++) {
      let minDistance = Infinity;
      let minCoordIndex;
      let duplicate = false;
      for (let c = 0; c < array.length; c++) {
        let currDistance =
          Math.abs(array[c][0] - col) + Math.abs(array[c][1] - row);
        if (minDistance > currDistance) {
          minDistance = currDistance;
          minCoordIndex = c;
          duplicate = false;
        } else if (minDistance === currDistance) duplicate = true;
      }

      if (!duplicate) {
        // console.log(x,y)
        areas[minCoordIndex]++;
      }
    }
  }

  let largestArea = 0;
  for (let i = 0; i < array.length; i++) {
    let currX = array[i][0];
    let currY = array[i][1];

    // console.log(currX, currY, minCol, maxCol, minRow, maxRow);
    if (
      currX <= minCol ||
      currX >= maxCol ||
      currY <= minRow ||
      currY >= maxRow
    )
      continue;
    if (areas[i] > largestArea) largestArea = areas[i];
  }
  console.log(areas);
}

findLargestArea();
