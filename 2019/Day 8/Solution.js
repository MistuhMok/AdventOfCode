const fs = require('fs');
const str = fs
  .readFileSync('PuzzleInput.txt')
  .toString()


// const str = '123456789012'

function parseImage() {
    const imageSize = 25 * 6
    const res = []
    let pointer = 0
    let minZeroes = Infinity
    let image = ''
    
    //Split string into separate images
    while(pointer < str.length){
        res.push(str.substring(pointer, pointer + imageSize))
        pointer += imageSize
    }

    //Find which image has the least 0s
    for(let i = 0; i < res.length; i++){
        let zeroCount = res[i].replace(/[^0]/g, "").length
        if(zeroCount < minZeroes) {
            minZeroes = zeroCount
            image = res[i]
        }
    }

    //Multiply the number of 1s by the number of 2s
    console.log(image.replace(/[^1]/g, "").length * image.replace(/[^2]/g, "").length)
}

parseImage()

