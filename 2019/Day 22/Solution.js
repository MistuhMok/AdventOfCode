const fs = require('fs');
const arr = fs
  .readFileSync('PuzzleInput.txt')
  .toString()
  .split('\r\n')

// const arr = [
//     'deal into new stack',
//     'cut -2',
//     'deal with increment 7',
//     'cut 8',
//     'cut -4',
//     'deal with increment 7',
//     'cut 3',
//     'deal with increment 9',
//     'deal with increment 3',
//     'cut -1'
// ]
// console.log(arr)

//Part 1 Deck size 10007
//Returns 3074
const DECK_SIZE = 10007
let deck = [...Array(DECK_SIZE).keys()]

function shuffle() {

    for(let i = 0; i < arr.length; i++){
        let curr = arr[i]


        if(curr.includes('cut')) {
            let cutAmount = +curr.substring(curr.indexOf(' ') + 1)
            deck = [...deck.slice(cutAmount), ...deck.slice(0, cutAmount)]
        }
        if(curr.includes('deal into new stack')) deck.reverse()

        if(curr.includes('deal with increment')){
            let incrementAmount = +curr.substring(curr.lastIndexOf(' ') + 1)
            let newDeck = []
            let pointer = 0
            for (let i = 0; i < deck.length; i++){
                newDeck[pointer] = deck[i]
                pointer += incrementAmount
                if(pointer > DECK_SIZE) pointer %= DECK_SIZE
            }
            
            deck = newDeck
        }
    }
}

shuffle()

//Part 2 - Run 101741582076661 times
// let counter = 101741582076661
let counter = 2423
let originalShuffle = false

// while(counter--) {
    // shuffle()
    
    // counter++
    // originalShuffle = true

    // for(let i = 0; i < deck.length; i++){
    //     if(deck[i] !== i) {
    //         originalShuffle = false
    //         break;
    //     };
    // }
// }
// console.log(deck.indexOf(2020))


//5003 shuffles the deck is ordered again - 10007 cards
//Part 2 4762 too low
//Part 2 9013 still too low
// console.log(101741582076661 % 5003)

function shuffleTrack(card) {
    let position = card

    for(let i = 0; i < arr.length; i++){
        let curr = arr[i]

        if(curr.includes('deal into new stack')) position = deck.length - card - 1

        if(curr.includes('cut')) {
            let cutAmount = +curr.substring(curr.indexOf(' ') + 1)

            if(cutAmount > 0){
            
            if(position >= cutAmount) position -= cutAmount
            else position = deck.length - cutAmount + position
            } else {
                let newCutAmount = cutAmount + deck.length
                if(position >= newCutAmount) position -= newCutAmount
                else position = position - cutAmount
            }
            if(position < 0) console.log(cutAmount, position)
        }

        if(curr.includes('deal with increment')){
            let incrementAmount = +curr.substring(curr.lastIndexOf(' ') + 1)
        
            let iterations = Math.floor(deck.length / incrementAmount)

            let newPosition = incrementAmount * position
            if(newPosition > deck.length) newPosition %= deck.length

            position = newPosition
        }

    }
    console.log(position)

}

shuffleTrack(2019)
// shuffleTrack(2)
// shuffleTrack(5)
// shuffleTrack(8)
// shuffleTrack(1)
// shuffleTrack(4)
// shuffleTrack(7)
// shuffleTrack(0)
// shuffleTrack(3)
// shuffleTrack(6)