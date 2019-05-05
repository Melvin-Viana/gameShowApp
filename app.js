// Helper functions
const dcq =(selector)=>document.querySelector(selector);

// Elements
const qwerty = dcq('#qwerty');
const phrase = dcq('#phrase');
const startBtn = dcq('.btn__reset');
const phraseUl = phrase.firstElementChild;
const startClass = dcq('.start');
const title = dcq('.title')

// Utility Variables
let missed = 0; //Add + 1 when player's guess missed
const phrasesArr = ['JavaScript is the best',
'Game Show App',
'Self Taught Developer',
'Team Treehouse',
'Free Code Camp'];//Phrases player will guess

// FUNCTIONS
const getRandomPhraseAsArray = (arr) => {
    //Random numbers 0-4
    let randomNum = Math.floor(Math.random() * 5);
    //Return random phrase into array of characters
    return arr[randomNum].split("");
};

const addPhraseToDisplay=arr=>{
// Loops through arr of characters
    for(let i=0; i<arr.length;i++){
        let newChar = document.createElement('li');
        newChar.textContent=arr[i];
        //Append li to #phrase ul
        phraseUl.appendChild(newChar);
        //If li is not a space
        if(arr[i]!==" ")
            newChar.classList.add('letter')
            //add .letter as class
    }
}
// TODO: CheckLetter function - One paramater button player has guessed
const checkLetter =(key)=>{
    const letters = document.querySelectorAll('.letter'); //Letters created only when game is started.

    // Loop through all .letter elements
    for(let i=0; i<letters.length;i++){
        //Check if they match the button
        if(letters[i].textContent===key)
        return letters[i].textContent;
        // If loop reaches end no match return null
        if(i===letters.length-1 )
            return null;
    }
};

// TODO: checkWin function
const checkWin = () =>{

}

// !MAIN JS CODE
// Check if DOM is ready.
document.addEventListener("DOMContentLoaded", () => {

    //Attach a event listener to the “Start Game” button to hide the start screen overlay.
    startBtn.addEventListener('click', () => {
        const phraseArray = getRandomPhraseAsArray(phrasesArr);
        // Set the game display.
            addPhraseToDisplay(phraseArray);
            startBtn.style.display='none';
            startClass.style.backgroundColor="initial"
            title.style.display='none';
        // TODO: Add an event listener to the keyboard.
        document.addEventListener('keypress', (event)=>{
            let letter = checkLetter(event.key);
            // Count the missed guesses in the game.
                //If checkLetter function returns a null value, the player has guesssed thwe wrong letter
                if(!letter)
                missed++;
            console.log(missed);
            });

    });
});