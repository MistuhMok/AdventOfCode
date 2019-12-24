const input = `.##.#
###..
#...#
##.#.
.###.`

// const input = `....#
// #..#.
// #..##
// ..#..
// #....`

// const input = `.....
// .....
// .....
// #....
// .#...`
const arr = input.split('\n').map(ele=>ele.split(''))
const set = new Set()

//Part 1 - Calculate the biodiversity rating of the first layer that appears twice
//Returns 1151290

function updateBoard(arr) {
    const newBoard = []
    let counter = arr.length

    while (counter--) newBoard.push([])


    for(let r = 0; r < arr.length; r++){
        for(let c = 0; c < arr[0].length; c++){
            //Bug dies unless exactly one bug adjacent
            let count = 0
            let curr = arr[r][c]
            if(arr[r + 1] && arr[r + 1][c] === '#') count++
            if(arr[r - 1] && arr[r - 1][c] === '#') count++
            if(arr[r][c + 1] === '#') count++
            if(arr[r][c - 1] === '#') count++

            if(curr ==='.' && count > 0 && count <= 2) newBoard[r].push('#')
            else if(curr ==='#' && count !== 1) newBoard[r].push('.')
            else newBoard[r].push(curr)
        }
    }

    return newBoard
}

function hashArr(arr){
    let str = ''

    for(let r = 0; r < arr.length; r++){
        for(let c = 0; c < arr[0].length; c++){
            if(arr[r][c] === '.') str += 0
            else str += 1
        }
    }

    if(set.has(str)) return true
    else {
        set.add(str)
        return false
    }
}

function calculateBiodiversityRating(arr){
    let count = 0
    let point = 1

    for(let r = 0; r < arr.length; r++){
        for(let c = 0; c < arr[0].length; c++){
            if(arr[r][c]==='#') count += point

            point *= 2
        }
    }

    console.log(count)
}

hashArr(arr)
let board = updateBoard(arr)
let str = ''

while (!hashArr(board)) board = updateBoard(board)

calculateBiodiversityRating(board)