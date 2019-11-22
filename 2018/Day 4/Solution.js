const fs = require('fs');
const array = fs
  // .readFileSync('PuzzleInput.txt')
  .readFileSync('Sample.txt')
  .toString()
  .split('\n');
const shifts = createGuardShifts();
console.log(shifts, 'SHIFTS');

//Part 1 - Find guard with most minutes asleep and most common minute asleep

// {
//   Guard X: {
//      total: INTEGER
//      intervals: {
//                  date: [start,end]
//                  }
// }

// }

//Create hash of date to guard on duty for that day
function createGuardShifts() {
  const shifts = {};

  for (let i = 0; i < array.length; i++) {
    if (array[i].includes('begins shift')) {
      // console.log(array[i], 'BEGINS SHIFT');

      const dateIndex = array[i].indexOf('-') + 1;
      let key = array[i].slice(dateIndex, dateIndex + 5);

      //If started shift at at 23rd hour the shift is for the next day
      const hourIndex = array[i].indexOf(':') - 2;
      if (array[i].slice(hourIndex, hourIndex + 2 === '23')) {
        let date = (+key.slice(-2) + 1).toString();
        console.log(date, 'DATE');
        key.slice();
      }

      const idIndex = array[i].indexOf('#') + 1;

      //Find index of space after 'Guard #XXX '
      const idFinish = array[i].indexOf(' ', idIndex);
      const value = array[i].slice(idIndex, idFinish);

      shifts[key] = value;
    }
  }

  return shifts;
}

//Organize guard data
function organizeData() {
  const data = {};

  for (let i = 0; i < array.length; i++) {
    const dateIndex = array[i].indexOf('-') + 1;
    let date = array[i].slice(dateIndex, dateIndex + 5);

    const guardId = shifts[date];
    if (array[i].includes('falls asleep')) {
    }
  }
}
