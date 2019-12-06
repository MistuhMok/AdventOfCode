const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\r\n')

//console.log(arr)

const parents = {}
const planets = new Set()

for (let i = 0; i < arr.length; i++){
    let curr = arr[i]

    let first = curr.slice(0,curr.indexOf(')'))
    let second = curr.slice(curr.indexOf(')') + 1)

    parents[second] = first
    planets.add(first)
    planets.add(second)
}

//Part 1 - What is the sum of all paths from each node to the root
//Returns - 162816

function countOrbits() {
    const orbits = {}
    let sum = 0
    planets.forEach(planet => sum += helper(planet))

    console.log(sum)

    function helper(planet){
        if(orbits[planet] === undefined){
            if(parents[planet]) orbits[planet] = 1 + helper(parents[planet])
            else orbits[planet] = 0
        }
            
        return orbits[planet]
    }
}

countOrbits()