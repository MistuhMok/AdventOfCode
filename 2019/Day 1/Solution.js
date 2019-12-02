const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\r\n');

//Part 1 - Calculate how much fuel is needed for each module
//Returns 3390596
console.log(array.reduce((acc, curr) => acc + Math.floor(+curr / 3) - 2, 0));

//Part 2 - Calculate how much more fuel is needed to carry the fuel too
//Returns 5083024
console.log(
  array.reduce((acc, curr) => {
    let res = 0;

    while (curr > 0) {
      let newFuel = Math.floor(+curr / 3) - 2;
      newFuel = newFuel > 0 ? newFuel : 0;

      res += newFuel;
      curr = newFuel;
    }
    return acc + res;
  }, 0)
);
