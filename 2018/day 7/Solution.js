const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  // .readFileSync('Sample.txt')
  .toString()
  .split('\n');
array.length = array.length - 1;
// console.log(array);

const aList = Array.apply(null, new Array(26)).map(ele => []);
const child = new Array(26).fill(false);

//First letter at index 5
//Second letter at index 36
//A - char code 65
//Z - char code 90
//Return string should be 22 chars long
function createGraph() {
  for (let i = 0; i < array.length; i++) {
    let firstChar = array[i][5];
    let secChar = array[i][36];

    aList[firstChar.charCodeAt() - 65].push(secChar);
    child[secChar.charCodeAt() - 65] = true;
  }

  // console.log(aList, child);
}

createGraph();

function buildOrder() {
  let res = '';
  let queue = [];

  for (let i = 0; i < child.length; i++) {
    if (!child[i]) {
      res += String.fromCharCode(i + 65);
      queue.push(...aList[i]);

      while (queue.length) {
        queue.sort();
        let curr = queue.shift();
        let children = aList[curr.charCodeAt() - 65];
        console.log(curr, queue);
        res += curr;
        if (children.length) queue.push(...children);
      }
    }
  }

  console.log(aList, res, 'res');
}

// buildOrder();

const steps = input => {
  let steps = array;

  let finalOrder = [];
  let allSteps = [];

  // Prepare parent-child relationships
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const matchGroups = step.match(
      /(\w+) (.) (\w+) (\w+) (\w+) (\w+) (\w+) (.)/
    );

    const parent = matchGroups[2];
    const child = matchGroups[8];

    if (!allSteps.find(x => x.step === parent)) {
      allSteps.push({
        step: parent,
        children: [],
        parents: [],
      });
    }

    if (!allSteps.find(x => x.step === child)) {
      allSteps.push({
        step: child,
        children: [],
        parents: [],
      });
    }

    const parentRelationship = allSteps.find(x => x.step === parent);

    if (!parentRelationship.children.includes(child)) {
      parentRelationship.children.push(child);
    }

    const childRelationship = allSteps.find(x => x.step === child);

    if (!childRelationship.parents.includes(parent)) {
      childRelationship.parents.push(parent);
    }
  }

  while (allSteps.length) {
    let potentialStep = allSteps
      .filter(x => !x.parents.length)
      .map(y => y.step)
      .sort()[0];

    finalOrder.push(potentialStep);
    allSteps.splice(
      allSteps.indexOf(allSteps.find(x => x.step === potentialStep)),
      1
    );

    allSteps
      .filter(a => a.parents.includes(potentialStep))
      .forEach(y => y.parents.splice(y.parents.indexOf(potentialStep), 1));
  }

  console.log(finalOrder.join(''));
};

steps();
