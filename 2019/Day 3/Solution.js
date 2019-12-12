const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  //   .readFileSync('sample.txt')
  .toString()
  .split('\r\n')
  .map(ele => ele.split(','));

//Part 1 - Find the shortest distance between the origin and where the wires intersect
//Returns 248

const hash = new Set();
const cross = [];

function drawWire(arr, hash, index = 0) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    let xChange = 0;
    let yChange = 0;

    if (curr[0] === 'R') xChange += +curr.slice(1);
    if (curr[0] === 'L') xChange -= +curr.slice(1);
    if (curr[0] === 'U') yChange += +curr.slice(1);
    if (curr[0] === 'D') yChange -= +curr.slice(1);

    let xPointer = 0;
    let yPointer = 0;
    while (xPointer !== xChange || yPointer !== yChange) {
      const newCoord = `${x + xPointer},${y + yPointer}`;

      if (Array.isArray(hash)) hash.push(newCoord);
      //Index !== 0 so that if a wire visits the same spot it won't count
      else if (hash.has(newCoord) && index !== 0) cross.push(newCoord);
      else hash.add(newCoord);

      if (xChange > 0) xPointer++;
      else if (xChange < 0) xPointer--;

      if (yChange > 0) yPointer++;
      else if (yChange < 0) yPointer--;
    }

    x += xChange;
    y += yChange;
  }
}

arr.forEach((array, index) => drawWire(array, hash, index));

function findClosest() {
  let res = Infinity;
  for (let i = 1; i < cross.length; i++) {
    let curr = cross[i];

    let x = +curr.slice(0, curr.indexOf(','));
    let y = +curr.slice(curr.indexOf(',') + 1);

    let currDistance = Math.abs(x) + Math.abs(y);

    if (currDistance < res) res = currDistance;
  }

  console.log(res);
}
findClosest();

//Part 2 - Find the intersection in the wire that has the shortest path from the origin
//Returns 28580
let wire1 = [];
const wire2 = [];

drawWire(arr[0], wire1);
drawWire(arr[1], wire2);
const wire2Set = new Set(wire2);
const intersection = wire1.filter(element => wire2Set.has(element));

function findLength(wire1, wire2) {
  let length = Infinity;

  //First intersection is 0,0 so we skip it
  for (let i = 1; i < intersection.length; i++) {
    let curr = intersection[i];
    let wire1length = wire1.indexOf(curr);
    let wire2length = wire2.indexOf(curr);
    let total = wire1length + wire2length;

    if (total === 28553) continue;

    if (total < length) length = total;
  }

  console.log(length);
}

findLength(wire1, [...wire2]);
