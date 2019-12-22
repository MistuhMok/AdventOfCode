const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  // .readFileSync('Sample.txt')
  .toString()
  .split('\n');
array.length = array.length - 1;

const aList = {};
const child = {};
const valid = new Array(26).fill(false);

//Part 1 - Find order that the steps must be completed in
//Run buildOrder() returns ACHOQRXSEKUGMYIWDZLNBFTJVP

//A - char code 65
function createGraphs() {
  for (let i = 0; i < array.length; i++) {
    //First letter at index 5
    let firstChar = array[i][5];

    //Second letter at index 36
    let secChar = array[i][36];

    //If character exists in the puzzle we set to valid by normalizing to 0-25 index
    valid[firstChar.charCodeAt() - 65] = true;
    valid[secChar.charCodeAt() - 65] = true;

    if (!Array.isArray(aList[firstChar])) aList[firstChar] = [];
    if (!Array.isArray(aList[secChar])) aList[secChar] = [];

    if (!Array.isArray(child[firstChar])) child[firstChar] = [];
    if (!Array.isArray(child[secChar])) child[secChar] = [];

    //Add the steps that must be completed first into that chars array
    aList[secChar].push(firstChar);
    child[firstChar].push(secChar);
  }

  // console.log(aList, 'alist child', child);
}

function buildOrder() {
  createGraphs();
  const keys = Object.keys(aList);

  let res = '';
  let pointer = 0;
  const queue = [];

  while (res.length !== keys.length) {
    if (valid[pointer]) {
      let currChar = String.fromCharCode(pointer + 65);

      //If no other steps must be completed before the currChar
      if (aList[currChar].length === 0) {
        res += currChar;
        valid[pointer] = false;

        //Restart pointer from the beginning
        pointer = -1;

        //Remove the currChar from chars array that need it as a completed step
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          if (aList[key].includes(currChar))
            aList[key] = aList[key].filter(char => char !== currChar);
        }

        let children = child[currChar];
        if (children.length < 5 - queue.length) queue.push(...children);
        else {
          children.sort();
          queue.push(children.slice(5 - queue.length));
        }
      }
    }

    pointer++;
  }

  console.log(res, 'res');
}

//Part 2 - Find the order the steps will be completed in now that they take time to prepare
//Run buildOrder2() returns 985

function buildOrder2() {
  const hash = {};

  //Create hash for all the chars
  for (let i = 0; i < array.length; i++) {
    let firstChar = array[i][5];
    let secChar = array[i][36];

    //Don't change anything if hash for character exists otherwise create the entry
    hash[firstChar] = hash[firstChar] || {
      prereqs: {},
      time: 60 + firstChar.charCodeAt() - 64,
    };
    hash[secChar] = hash[secChar] || {
      prereqs: {},
      time: 60 + secChar.charCodeAt() - 64,
    };

    //Populates the prereqs with the chars
    hash[secChar].prereqs[firstChar] = true;
  }

  // console.log(hash);

  let totalTime = 0;
  let workQueue = [];
  let finished = '';
  let minTime = Infinity;

  while (Object.keys(hash).length) {
    //If there are no prereqs for a part add it to the work queue and store min time
    for (const key in hash) {
      let curr = hash[key];
      if (
        Object.values(curr.prereqs).length === 0 &&
        !workQueue.includes(key)
      ) {
        workQueue.push(key);
        if (curr.time < minTime) minTime = curr.time;
      }
    }

    totalTime += minTime;
    let removed = [];

    //Sets number of workers and deducts time from each part in the workQueue
    for (let i = 0; i < Math.min(5, workQueue.length); i++) {
      let part = workQueue[i];
      hash[part].time -= minTime;

      //If part is finished remove part from hash, workQueue, and prereqs
      if (hash[part].time === 0) {
        finished += part;
        removed.push(part);
        delete hash[part];

        for (const key in hash) {
          let curr = hash[key];
          delete curr.prereqs[part];
        }
      }
    }

    //Filter out the completed parts
    workQueue = workQueue.filter(ele => !removed.includes(ele));

    minTime = Infinity;
    //Find new minTime after completing one part
    workQueue.forEach(part => {
      if (hash[part].time < minTime) minTime = hash[part].time;
    });
  }

  console.log(totalTime);
}
