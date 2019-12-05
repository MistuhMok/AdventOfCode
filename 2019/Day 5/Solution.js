const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split(',')
  .map(ele=>+ele)

//Part 1 - Add 2 new instructions and parameter modes
//Returns - 9654885

//Part 2 - Add 4 more instructions
//Returns - 7079459

// const arr = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
// 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
// 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]
function opCodes(array) {

    let pointer = 0


    while(pointer < array.length){
        let curr = '' + array[pointer]

        let opCode = curr.slice(-1)
        let mode = curr.slice(0,curr.length - 2).split('').reverse()
        let total = 0

        pointer++
        while(mode.length < 2) mode.push('0')
        
        if(opCode === '1'){
            let mode1 = mode[0]
            let mode2 = mode[1]

            let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer]
            let param2 = mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1]

            total = param1 + param2

            pointer += 2
        } else if(opCode === '2'){
            let mode1 = mode[0]
            let mode2 = mode[1]

            let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer]
            let param2 = mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1]

            total = param1 * param2

            pointer += 2
        } else if(opCode === '3'){
            //Part 1 - Input = 1
            //Part 2 - Input = 5
            let input = 5
            array[array[pointer]] = input
    
            pointer++
            continue;
        } else if(opCode === '4'){
            if(mode[0] === '1') console.log('OPCODE 04 OUTPUT', array[pointer])
            else console.log('OPCODE 4 OUTPUT', array[+array[pointer]])

            pointer++
            continue;
        } else if(opCode === '5'){
            let mode1 = mode[0]
            let mode2 = mode[1]

            let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer]
            let param2 = mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1]

            if(param1 !== 0) pointer = param2
            else pointer += 2

            continue;
        } else if(opCode === '6'){
            let mode1 = mode[0]
            let mode2 = mode[1]

            let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer]
            let param2 = mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1]

            if(param1 === 0) pointer = param2
            else pointer += 2

            continue;
        } else if(opCode === '7'){
            let mode1 = mode[0]
            let mode2 = mode[1]

            let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer]
            let param2 = mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1]

            if(param1 < param2) total = 1
            else total = 0

            pointer += 2
        } else if(opCode === '8'){
            let mode1 = mode[0]
            let mode2 = mode[1]

            let param1 = mode1 === '0' ? array[array[pointer]] : array[pointer]
            let param2 = mode2 === '0' ? array[array[pointer + 1]] : array[pointer + 1]

            if(param1 === param2) total = 1
            else total = 0

            pointer += 2
        } else if(curr.slice(-2) === '99'){
            console.log('OPCODE 99')
            return
        } else {
            console.log(curr, 'BROKEN OPCODE', pointer)
            return;
        }

        //Modifies position if the opcode has a 3rd param for address
        if(pointer !== array.length) {
            let position = array[pointer]
            array[position] = total
            pointer++
        }
    }
}

opCodes(arr)
