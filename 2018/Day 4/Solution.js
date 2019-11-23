const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  // .readFileSync('Sample.txt')
  .toString()
  .split('\r\n');
// .split('\n');

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

const shifts = createGuardShifts();
const sleepData = organizeData();

//Part 1 - Find guard with most minutes asleep and most common minute asleep
//Not all guards fall asleep
//Some guards fall asleep multiple times throughout a shift

//Create hash of date to guard on duty for that day
function createGuardShifts() {
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

        if (monthHash[month] < day) {
          let newMonth = (+month + 1).toString();
          // console.log(newMonth);
          if (newMonth.length === 1) newMonth = '0' + newMonth;

          key = key.replace(month, newMonth);
          key = key.slice(0, 3) + '01';
        } else
          key = array[i].slice(dateIndex, dateIndex + 5 - day.length) + day;
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

//Organize guard sleep data into wake up and sleep arrays
function organizeData() {
  const data = {};

  for (let i = 0; i < array.length - 1; i++) {
    const dateIndex = array[i].indexOf('-') + 1;
    let date = array[i].slice(dateIndex, dateIndex + 5);

    const hourIndex = array[i].indexOf(':') - 2;
    let dayBefore = false;
    if (array[i].slice(hourIndex, hourIndex + 2) === '23') {
      dayBefore = true;
      let day = (+date.slice(-2) + 1).toString();
      let month = date.slice(0, 2);

      if (monthHash[month] < day) {
        let newMonth = (+month + 1).toString();
        if (newMonth.length === 1) newMonth = '0' + newMonth;

        date = date.replace(month, newMonth);
        date = date.slice(0, 3) + '01';
      } else date = array[i].slice(dateIndex, dateIndex + 5 - day.length) + day;
    }

    if (data[date] === undefined) data[date] = [[], []];

    //14 is the index of the timestamp
    let minute = array[i].slice(15, 17);
    if (dayBefore) minute = '00';
    if (array[i].includes('falls asleep')) data[date][0].push(minute);
    else if (array[i].includes('wakes up')) data[date][1].push(minute);
  }

  return data;
}

function calculate() {
  const guards = {};
  let max = 0;
  let guardId;

  for (let key in sleepData) {
    const guard = shifts[key];
    const fallAsleep = sleepData[key][0];
    const wakesUp = sleepData[key][1];
    let mins = 0;

    if (fallAsleep.length === 0) continue;
    if (fallAsleep.length === 1) mins = +wakesUp[0] - +fallAsleep[0];
    else {
      fallAsleep.sort((a, b) => +a - +b);
      wakesUp.sort((a, b) => +a - +b);

      for (let i = 0; i < fallAsleep.length; i++) {
        mins += +wakesUp[i] - +fallAsleep[i];
      }
    }

    if (guards[guard] === undefined) guards[guard] = mins;
    else guards[guard] += mins;

    if (guards[guard] > max) {
      guardId = guard;
      max = guards[guard];
    }
  }

  //#1571 most minutes slept
  const guardSleepData = new Array(60).fill(0);

  for (let date in shifts) {
    if (shifts[date] === guardId) {
      const fallAsleep = sleepData[date][0];
      const wakesUp = sleepData[date][1];
      fallAsleep.sort((a, b) => +a - +b);
      wakesUp.sort((a, b) => +a - +b);

      for (let i = 0; i < fallAsleep.length; i++) {
        let start = fallAsleep[i];
        let end = wakesUp[i];
        while (start < end) guardSleepData[start++]++;
      }
    }
  }

  //54th min most commonly asleep
  //1571 * 54 = 84834
  console.log(guardId * guardSleepData.indexOf(Math.max(...guardSleepData)));
}

calculate();
