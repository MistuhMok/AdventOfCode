const fs = require('fs');
const string = fs.readFileSync('PuzzleInput.txt').toString();

//Part 1 - Remove capital lowercase pairs
//Returns 11042

// let string = 'dabAcCaCBAcCcaDA ';
function removePairs(char = '', char2 = '') {
  let res = [];

  for (let i = 0; i < string.length - 1; i++) {
    if (string[i] === char || string[i] === char2) continue;

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
  return res.length;
}

// removePairs();

//Part 2 - What is the shortest string if 1 letter is removed entirely
//Returns 6872

function shortestRemoval() {
  let min = Infinity;

  for (let i = 0; i < 26; i++) {
    let upperCharCode = 65 + i;
    let lowerCharCode = 97 + i;
    let currMin = removePairs(
      String.fromCharCode(upperCharCode),
      String.fromCharCode(lowerCharCode)
    );

    if (min > currMin) min = currMin;
  }

  console.log(min);
}

shortestRemoval();
