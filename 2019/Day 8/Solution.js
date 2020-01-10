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
    //Returns 2048
    console.log(image.replace(/[^1]/g, "").length * image.replace(/[^2]/g, "").length)

    let finalImage = ''
    //Parse image based on pixels
    // 0 is black, 1 is white, and 2 is transparent
    while(finalImage.length < imageSize){
        let imagePointer = 0
        let currPointer = finalImage.length
        let currImage = res[imagePointer]
        while(currImage[currPointer]==='2') {
            imagePointer++
            currImage = res[imagePointer]
            if(currImage === undefined) {
                currImage = '2'.repeat(imageSize)
                break;
            }
        }
        
        finalImage += currImage[currPointer]
    }

    let finalImageLine = 0
    finalImage = finalImage.replace(/0/g, '-')
    while(finalImageLine < finalImage.length){
        console.log(finalImage.substring(finalImageLine, finalImageLine + 25))
        finalImageLine += 25
    }

    //Returns HFYAK
}

parseImage()

