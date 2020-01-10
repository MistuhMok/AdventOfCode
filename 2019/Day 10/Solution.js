const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
// .readFileSync('Example.txt')
  .toString()
  .split('\r\n')

// console.log(arr)
const asteroidHash = new Set()

//Hash all asteroids
function hashAsteroids() {
    for(let r = 0; r < arr.length; r++){
        let currRow = arr[r]
        for(let c = 0; c < arr[0].length; c++){
            if(currRow[c]==='#') asteroidHash.add(`${c},${r}`)
        }
    }
}

//Create sets of angles from one asteroid to the rest of them and find largest set
function bestLocation() {
    let maxAsteroids = 0
    let bestSpot = ''
    hashAsteroids()

    asteroidHash.forEach(asteroid => {
        let uniqueAngles = new Set()
        let currX = asteroid.slice(0, asteroid.indexOf(','))
        let currY = asteroid.slice(asteroid.indexOf(',') + 1)

        asteroidHash.forEach(ele => {
            if(ele !== asteroid){ 
                let tmpX = ele.slice(0, ele.indexOf(','))
                let tmpY = ele.slice(ele.indexOf(',') + 1)
        
                //Arc tangent of the slope will return angle betwen two points
                //Convert radians to degrees by multiplying by 180/pi
                let angle = Math.atan2(tmpY- currY, tmpX - currX) * 180 / Math.PI

                uniqueAngles.add(angle)
            }
        })

        if(uniqueAngles.size > maxAsteroids) {
            maxAsteroids = uniqueAngles.size
            bestSpot = asteroid
        }
    })

    console.log(maxAsteroids, bestSpot)
}

bestLocation()