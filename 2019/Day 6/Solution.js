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

//Part 2 - Calculate the distance from YOU to SAN
//Returns - 304

function findOrbitalTransfers(){
    //Create a hash of the path leading up to 'YOU' and how far away each planet is
    const youPath = {'YOU': 0}
    let curr = 'YOU'
    let next = parents[curr]
    let counter = 0
    while(next){
        youPath[next] = ++counter
        curr = next
        next = parents[curr]
    }

    //Find a path from 'SAN' back to root until one of the planets is on the path leading up to 'YOU'
    curr = 'SAN'
    counter = 0
    next = parents[curr]

    while(youPath[next] === undefined){
        counter++
        curr = next
        next = parents[curr]
    }

    //The counter will double count the planet they meet up on
    console.log(youPath[next] + counter - 1)
}

findOrbitalTransfers()
