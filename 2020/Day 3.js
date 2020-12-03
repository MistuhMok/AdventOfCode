const grid = input.split(`\n`).map(r=>r.split(''))
const width = grid[0].length-1
const height = grid.length-1

function checkTrees(right,down){
  let row = 0
  let col = 0
  let counter = 0

  while(row < height){
    col = col + right <= width ? col+right : col+right-width-1
    row += down
    if(grid[row][col] === '#') counter++
  }

  return counter
}

// Part 1
// console.log(checkTrees(3,1))



// Part 2
console.log(
  checkTrees(1,1) *
  checkTrees(3,1) *
  checkTrees(5,1) *
  checkTrees(7,1) *
  checkTrees(1,2)
)
