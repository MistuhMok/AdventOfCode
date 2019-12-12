const arr = [{x:-14, y:-4, z:-11},
            {x:-9, y:6, z:-7},
            { x:4, y:1, z:4},
            { x:2, y:-14, z:-9}]

const vel = [{},{},{},{}]
let counter = 0

function updatePlanets(){
    //gravity
    for(let i = 0; i < arr.length; i++){
        let curr = arr[i].x
        let velocity = vel[i].x || 0

        for(let j = 0; j < arr.length; j++){
            if(i===j) continue

            let next = arr[j].x
            if(curr > next) velocity--
            if(curr < next) velocity++
        }

        vel[i].x = velocity
    }

    for(let i = 0; i < arr.length; i++){
        let curr = arr[i].y
        let velocity = vel[i].y || 0

        for(let j = 0; j < arr.length; j++){
            if(i===j) continue

            let next = arr[j].y
            if(curr > next) velocity--
            if(curr < next) velocity++
        }
        vel[i].y = velocity
    }    
    
    for(let i = 0; i < arr.length; i++){
        let curr = arr[i].z
        let velocity = vel[i].z || 0

        for(let j = 0; j < arr.length; j++){
            if(i===j) continue

            let next = arr[j].z
            if(curr > next) velocity--
            if(curr < next) velocity++
        }
        vel[i].z = velocity
    }


    //Velocity
    for(let i = 0; i < arr.length; i++){
        arr[i].x += vel[i].x
        arr[i].y += vel[i].y
        arr[i].z += vel[i].z
    }
    // console.log(vel)
}

function calcEnergy() {
    let energy = 0

    //Potential energy
    for(let i = 0; i < arr.length; i++){
        let potential = Math.abs(arr[i].x)+Math.abs(arr[i].y)+Math.abs(arr[i].z)
        let kinetic = Math.abs(vel[i].x)+Math.abs(vel[i].y)+Math.abs(vel[i].z)

        energy += potential * kinetic
    }

    console.log(energy)
}

let runTimes = 1000
while(runTimes){
    updatePlanets()
    runTimes--
}
calcEnergy()

function updatePlanets2(hash,letter){
    let str = ''

    //Get string    
    for(let i = 0; i < arr.length; i++){
        let curr = arr[i][letter]
        let velo = vel[i][letter] || 0
        str += `${curr},${velo},`
    }

    //gravity
    for(let i = 0; i < arr.length; i++){
        let curr = arr[i].x
        let velocity = vel[i].x || 0


        for(let j = 0; j < arr.length; j++){
            if(i===j) continue

            let next = arr[j].x
            if(curr > next) velocity--
            if(curr < next) velocity++
        }

        vel[i].x = velocity
    }

    for(let i = 0; i < arr.length; i++){
        let curr = arr[i].y
        let velocity = vel[i].y || 0

        for(let j = 0; j < arr.length; j++){
            if(i===j) continue

            let next = arr[j].y
            if(curr > next) velocity--
            if(curr < next) velocity++
        }
        vel[i].y = velocity
    }    
    
    for(let i = 0; i < arr.length; i++){
        let curr = arr[i].z
        let velocity = vel[i].z || 0

        for(let j = 0; j < arr.length; j++){
            if(i===j) continue

            let next = arr[j].z
            if(curr > next) velocity--
            if(curr < next) velocity++
        }
        vel[i].z = velocity
    }

    //Velocity
    for(let i = 0; i < arr.length; i++){
        arr[i].x += vel[i].x
        arr[i].y += vel[i].y
        arr[i].z += vel[i].z
    }
    // console.log(vel)
    // console.log(str)
    counter++
    if(hash.has(str)) return false
    else hash.add(str)

    return true
}


//Part 2 - Find how many iterations until the all positions and velocity are repeated
//Returns - 314610635824376

function repeatState(){
    let str = 'xyz'
    const res = []

    for(let i = 0; i < str.length; i++){
        let curr = str[i]
        const hash = new Set()
        let counter = 0
        let running = true

        while(running) {
            running = updatePlanets2(hash, curr)
            counter++
        }

        res.push(counter - 1)
    }


    while(res.length > 1){
        let num1 = res.pop()
        let num2 = res.pop()

        res.push(lcm(num1,num2))
    }
    
    function gcd(num1, num2){
        if(num1 === 0) return num2
        return gcd(num2%num1, num1)
    }
    
    function lcm(num1, num2){
        return (num1*num2)/gcd(num1,num2)
    }


    console.log(res[0])
}

repeatState()


