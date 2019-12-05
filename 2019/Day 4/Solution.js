//Puzzle Input
const min = 248345
const max = 746315

//Part 1 - Find how many different passwords fufill the critera
//Comment out code on line 26 and 28 for Part 1 solution
//Returns 1019

//Part 2 - Find how many different passwords fulfill the additional criteria
//Returns - 660
function count() {
    let res = 0
    for(let i = min; i <= max; i++){
        let num = "" + i
        let valid = false
        for(let j = 0; j < num.length; j++){
            if(num[j] > num[j + 1]) {
                valid = false
                break;
            }

            if (num[j] === num[j - 1]) {
                if (num[j + 1] !== num[j]) {

                    //Part 2 logic - Checks if there is more than 2 of the same number
                    if (num[j - 2] !== num[j]) {
                        valid = true;
                    }

                }
            }
        }

        if(valid) res++
    }

    console.log(res)
}

count()
