const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
//   .readFileSync('sample.txt')
  .toString()
  .split('\r\n')
  .map(ele=>ele.split(','))


//Part 1 - 248

const hash = new Set()
const cross = []

function drawWire(arr, index){
    let x = 0
    let y = 0

    for(let i = 0; i < arr.length; i++){
        let curr = arr[i]
        let xChange = 0
        let yChange = 0

        if(curr[0] === 'R') xChange += +curr.slice(1)
        if(curr[0] === 'L') xChange -= +curr.slice(1)
        if(curr[0] === 'U') yChange += +curr.slice(1)
        if(curr[0] === 'D') yChange -= +curr.slice(1)

        let tmpX = xChange
        let tmpY = yChange
        let steps = 0
        while(xChange || yChange){
            const newCoord = `${x + xChange},${y + yChange}`


            if(hash.has(newCoord) && index !== 0) cross.push(newCoord)
            else hash.add(newCoord)

            if(xChange > 0)  xChange--
            else if(xChange < 0)  xChange++

            if(yChange > 0)  yChange--
            else if(yChange < 0)  yChange++
        }

        x += tmpX
        y += tmpY
    }
}

arr.forEach((array, index) => drawWire(array, index))

function findClosest(){
    let res = Infinity
    for(let i = 0; i < cross.length; i++){
        let curr = cross[i]

        let x = +curr.slice(0, curr.indexOf(','))
        let y = +curr.slice(curr.indexOf(',') + 1)
        
        let currDistance = Math.abs(x) + Math.abs(y)

        if(currDistance < res) res = currDistance
    }

    // console.log(res)
}
// console.log(cross)
// findClosest()

//Part 2 - 

//Recursive depth first search solution
//Doesn't work with full input because the call stack goes to ~15k

// const stepArr = []
// const crossSet = new Set(cross)

// function drawWire2(arr){
//     const steps = []
//     const hash = new Set()

//     let x = 0
//     let y = 0
//     let minX = 0
//     let minY = 0
//     let maxX = 0
//     let maxY = 0
    
//     hash.add(`${x},${y}`)

//     for(let i = 0; i < arr.length; i++){
//         let curr = arr[i]
//         let xChange = 0
//         let yChange = 0

//         if(curr[0] === 'R') xChange += +curr.slice(1)
//         if(curr[0] === 'L') xChange -= +curr.slice(1)
//         if(curr[0] === 'U') yChange += +curr.slice(1)
//         if(curr[0] === 'D') yChange -= +curr.slice(1)

//         let tmpX = xChange
//         let tmpY = yChange
//         while(xChange || yChange){
//             let currX = x + xChange
//             let currY = y + yChange

//             if(currX > maxX) maxX = currX
//             if(currY > maxY) maxY = currY
//             if(currX < minX) minX = currX
//             if(currY < minY) minY = currY

//             const newCoord = `${currX},${currY}`

//             hash.add(newCoord)
            
//             if(xChange > 0)  xChange--
//             else if(xChange < 0)  xChange++

//             if(yChange > 0)  yChange--
//             else if(yChange < 0)  yChange++
//         }

//         x += tmpX
//         y += tmpY
//     }
//     // console.log(hash, minX, minY, maxX, maxY)
//     // console.log(cross)
//     cross.forEach(coord => {
//         let stepsCount = 0

//         let xCross = +coord.slice(0, coord.indexOf(','))
//         let yCross = +coord.slice(coord.indexOf(',') + 1)

//         stepsCount += helper(0,0)
//         steps.push(stepsCount) 

//         function helper(x,y) {
//             let curr = `${x},${y}`
//             if(x === xCross && y === yCross) return 0
//             if(x < minX || x > maxX) return 0
//             if(y < minY || y > maxY) return 0
//             if(!hash.has(curr)) return 0
    
//             let count = 1
//             hash.delete(curr)
//             count += helper(x + 1, y)
//             count += helper(x - 1, y)
//             count += helper(x, y + 1)
//             count += helper(x, y - 1)
//             hash.add(curr)
    
//             return count
//         }
//     })

//     stepArr.push(steps)
// }

// // drawWire2(arr[0])
// arr.forEach((array) => drawWire2(array))
// // console.log(stepArr)

// function minSteps() {
//     let res = Infinity

//     for(let i = 0; i < stepArr[0].length; i++){
//         let currSum = stepArr[0][i] + stepArr[1][i]

//         if(currSum < res) res = currSum
//     }

//     console.log(res)
// }

// minSteps()