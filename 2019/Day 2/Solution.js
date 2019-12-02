const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split(',')
  .map(ele=>+ele)


// const array = [1,9,10,3,2,3,11,0,99,30,40,50]
function opCodes(noun, verb, array) {
    array[1] = noun
    array[2] = verb

    let pointer = 0
    let curr = array[pointer]

    while(curr !== 99){
        if(curr === 1){
            let tmp = array[array[pointer + 1]] + array[array[pointer + 2]]
            array[array[pointer + 3]] = tmp
        } else if(curr === 2){
            let tmp = array[array[pointer + 1]] * array[array[pointer + 2]]
            array[array[pointer + 3]] = tmp
        }

        pointer += 4
        curr = array[pointer]
    }

    return array[0]
}


function opCodes2() {
    let noun = 0
    let verb = 0

    for(let noun = 0; noun < 100; noun++){
        for(let verb = 0; verb < 100; verb++){
            if(opCodes(noun,verb,[...arr]) === 19690720) console.log(100 * noun + verb)
        }
    }
}

opCodes2()