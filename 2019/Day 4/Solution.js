//Puzzle Input
const min = 248345
const max = 746315

//Part 1
//Returns 1019

//Part 2
//Returns - 660
function count() {
    let res = 0
    for(let i = min; i <= max; i++){
        let word = "" + i
        let valid = false
        for(let j = 0; j < word.length; j++){
            if(word[j] > word[j + 1]) {
                valid = false
                break;
            }

            if (word[j] === word[j - 1]) {
                if (word[j + 1] !== word[j]) {
                    if (word[j - 2] !== word[j]) {
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