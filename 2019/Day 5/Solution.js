const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split(',')
  .map(ele=>+ele)

//Part 1 - Add 2 new instructions and parameter modes
//Returns - 9654885

// const arr = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]
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
            while(mode.length){
                let currMode = mode.shift()
    
                if(currMode === '0') total += +array[+array[pointer]]
                if(currMode === '1') total += +array[pointer]
                
                pointer++
            }
        } else if(opCode === '2'){
            total = 1

            while(mode.length){
                let currMode = mode.shift()
    
                if(currMode === '0') total *= array[array[pointer]]
                if(currMode === '1') total *= +array[pointer]

                pointer++
            }
        } else if(opCode === '3'){
            //Part 1 - Input = 1
            let input = 1
            array[+array[pointer]] = input
    
            pointer++
            continue;
        } else if(opCode === '4'){
            
            if(mode[0]==='1') console.log('OPCODE 04 OUTPUT', array[pointer])
            else console.log('OPCODE 4 OUTPUT', array[+array[pointer]])

            pointer++

            continue;
        } else if(curr.slice(-2) === '99'){
            console.log('OPCODE 99')
            return
        } else {
            console.log(curr, 'BROKEN OPCODE', pointer)
            return;
        }

        if(pointer !== array.length) {
            let position = array[pointer]
            array[position] = total
            pointer++
        }
    }
}

opCodes(arr)
