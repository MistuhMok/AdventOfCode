//Part 1
const res1 = input.split('\n').reduce((a,c)=>{
    const split = c.split(' ')
    const range = split[0].split('-')
    const letter = split[1][0]
    const password = split[2]
    let counter = 0

    for(let char of password){
      if(char === letter) counter++
    }
    if(counter >= range[0] && counter <= range[1]) a++

    return a
}, 0)

//Part 2
const res2 = input.split('\n').reduce((a,c)=>{
    const split = c.split(' ')
    const positions = split[0].split('-')
    const letter = split[1][0]
    const password = split[2]
    let match = false

    if(password[positions[0]-1] === letter) match = true
    if(password[positions[1]-1] === letter) match = match ? false : true

    if(match) a++
    return a
}, 0)