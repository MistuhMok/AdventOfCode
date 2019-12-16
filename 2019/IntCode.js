class IntCode {
    constructor(inputs) {
        this.inputs = inputs
        this.pointer = 0
        this.relativeBase = 0
    }

    run() {
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
                    const output = applyMode(mode[0], pointer + 1)
                    pointer += 2
                    return output
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
    
}

module.exports = IntCode