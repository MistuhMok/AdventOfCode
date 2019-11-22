const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  // .readFileSync('Sample.txt')
  .toString()
  .split('\r\n');
// .split('\n');

const shifts = createGuardShifts();
// console.log(shifts, 'SHIFTS');

// console.log(array);
//Part 1 - Find guard with most minutes asleep and most common minute asleep
//Not all guards fall asleep
//Some guards fall asleep multiple times throughout a shift

//Create hash of date to guard on duty for that day
function createGuardShifts() {
  const monthHash = {
    '01': 31,
    '02': 28,
    '03': 31,
    '04': 30,
    '05': 31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09': 30,
    '10': 31,
    '11': 30,
    '12': 31,
  };

  const shifts = {};

  for (let i = 0; i < array.length; i++) {
    if (array[i].includes('begins shift')) {
      const dateIndex = array[i].indexOf('-') + 1;
      let key = array[i].slice(dateIndex, dateIndex + 5);

      //If shift starts at 23rd hour the shift is for the next day
      const hourIndex = array[i].indexOf(':') - 2;
      if (array[i].slice(hourIndex, hourIndex + 2) === '23') {
        let day = (+key.slice(-2) + 1).toString();
        let month = key.slice(0, 2);

        console.log(monthHash[month], day);
        if (monthHash[month] < day) {
          day = 01;
          let newMonth = (+month + 1).toString();
          // console.log(newMonth);
          if (newMonth.length === 1) newMonth = '0' + newMonth;

          console.log(key, 'before  ');
          key.replace(month, newMonth);
          console.log(key, 'after ');
        }

        key = array[i].slice(dateIndex, dateIndex + 5 - day.length) + day;
      }

      const idIndex = array[i].indexOf('#') + 1;

      //Find index of space after 'Guard #XXX '
      const idFinish = array[i].indexOf(' ', idIndex);
      const value = array[i].slice(idIndex, idFinish);

      console.log(key);
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

    const hourIndex = array[i].indexOf(':') - 2;
    const dayBefore = array[i].slice(hourIndex, hourIndex + 2) === '23';
    if (dayBefore) {
      let newDate = (+date.slice(-2) + 1).toString();
      date =
        array[i].slice(dateIndex, dateIndex + 5 - newDate.length) + newDate;
    }

    if (data[date] === undefined) data[date] = [[], []];

    //14 is the index of the timestamp
    let minute = array[i].slice(15, 17);
    if (dayBefore) minute = '00';
    if (array[i].includes('falls asleep')) data[date][0].push(+minute);
    else if (array[i].includes('wakes up')) data[date][1].push(minute);
  }

  console.log(data);
}

// organizeData();
