const fs = require('fs');
const array = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\r\n')

  console.log(array.reduce((acc,curr)=>{
    let res = 0

    while(curr > 0){
        let newFuel = Math.floor(+curr/3) - 2
        newFuel = newFuel > 0 ? newFuel : 0

        res += newFuel
        curr = newFuel
    }
    return acc + res
  },0))

  5083024