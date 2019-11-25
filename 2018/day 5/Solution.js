const fs = require('fs');
const string = fs.readFileSync('PuzzleInput.txt').toString();

// console.log(string.length);

//Part 1 - Remove capital lowercase pairs
//Returns 11042

function removePairs() {
  let res = [];

  for (let i = 0; i < string.length - 1; i++) {
    res.push(string[i]);
    if (res.length > 1) {
      let len = res.length;
      let currChar = res[len - 1].charCodeAt();
      let prevChar = res[len - 2].charCodeAt();

      //AZaz char codes are 65,90,97,122
      //Lower case and upper case are in different ranges and are off by 32
      if (
        (currChar >= 97 && currChar <= 122 && currChar === prevChar + 32) ||
        (currChar >= 65 && currChar <= 90 && currChar === prevChar - 32)
      )
        res.length = len - 2;
    }
  }

  //Input has a blank space at the end
  console.log(res.length);
}

removePairs();
