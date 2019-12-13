const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split(',')
  .map(ele=>+ele)


// const arr = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]
// const arr = [1102,34915192,34915192,7,4,7,99,0]
// const arr = [104,1125899906842624,99]

// console.log(arr)

//Part 1 - Add new relative mode
//Returns -  2171728567

function intCode(input){
    let pointer = 0
    let rBase = 0
    while(pointer < arr.length){
        //OpCode and Mode
        let curr = '' + arr[pointer]
        let opCode
        if(curr.length === 1) opCode = +curr
        else opCode = +curr.slice(-2)


        let mode = curr.slice(0,curr.length - 2).split('').map(ele=>+ele).reverse()
        let total = 0

        //If not enough modes given defaults to 0
        while(mode.length < 3) mode.push(0)

        //Start parsing
        switch (opCode){
            case 1: {
                let first = applyMode(mode[0], pointer + 1)
                let second = applyMode(mode[1], pointer + 2)
                let res = applyResult(mode[2], pointer + 3)
                arr[res] = first + second

                pointer += 4
                break;
            }
            case 2: {
                let first = applyMode(mode[0], pointer + 1)
                let second = applyMode(mode[1], pointer + 2)
                let res = applyResult(mode[2], pointer + 3)
                arr[res] = first * second

                pointer += 4
                break;
            }
            case 3: {
                arr[applyResult(mode[0], pointer + 1)] = input

                pointer += 2
                break;
            }
            case 4: {
                console.log(applyMode(mode[0], pointer + 1))

                pointer += 2
                break;
            }
            case 5: {
                let first = applyMode(mode[0], pointer + 1)
                let second = applyMode(mode[1], pointer + 2)

                if(first !== 0) pointer = second
                else pointer += 3
                break;
            }
            case 6: {
                let first = applyMode(mode[0], pointer + 1)
                let second = applyMode(mode[1], pointer + 2)

                if(first === 0) pointer = second
                else pointer += 3
                break; 
            } 
            case 7: {
                let first = applyMode(mode[0], pointer + 1)
                let second = applyMode(mode[1], pointer + 2)
                let res = applyResult(mode[2], pointer + 3)
                arr[res] = first < second ? 1 : 0

                pointer += 4
                break;    
            }
            case 8: {
                let first = applyMode(mode[0], pointer + 1)
                let second = applyMode(mode[1], pointer + 2)
                let res = applyResult(mode[2], pointer + 3)
                arr[res] = first === second ? 1 : 0

                pointer += 4
                break;
            }
            case 9: {
                let first = applyMode(mode[0], pointer + 1)
                rBase += first

                pointer += 2
                break;
            }
            case 99: 
                // console.log(arr, 'ARR AFTER')
                return;
            default: 
                console.log(`OPCODE ${opCode}, CURR ${curr} ERROR`)
                return;
        }

    }


    function applyMode(mode, index) {
        switch (mode) {
          case 0:
            return arr[arr[index]];
          case 1:
            return arr[index];
          case 2:
            return arr[arr[index] + rBase];
          default:
            console.log(`Mode ${mode} not valid!`);
            return -1;
        }
    };

    function applyResult(mode, index) {
        switch (mode) {
          case 0:
          case 1:
            return arr[index];
          case 2:
            return arr[index] + rBase;
          default:
            console.log(`Mode ${mode} not valid!`);
            return -1;
        }
    };
}

intCode(1)

//Part 2 - Use Input 2
//Returns 49815
intCode(2)
