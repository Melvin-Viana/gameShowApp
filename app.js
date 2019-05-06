

// Elements
const qwerty = $('#qwerty');
const phrase = $('#phrase');
const startBtn = $('.btn__reset');
const phraseUl = phrase.first();
const startClass = $('.start');
const title = $('.title')

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
        phraseUl.append(newChar);
        //If li is not a space
        if(arr[i]!==" ")
            newChar.classList.add('letter')
            //add .letter as class
    }
}
// TODO: CheckLetter function - One paramater button player has guessed
const checkLetter =(key)=>{
    const letters = document.querySelectorAll('.letter'); //Letters created only when game is started.
    let letter = null;
    // Loop through all .letter elements
    for(let i=0; i<letters.length;i++){
        //Check if they match the button
        if(letters[i].textContent===key)
        {   letters[i].classList.add('show');
            letter= letters[i].textContent;}
    }
    return letter;
};

// TODO: checkWin function
const checkWin = () =>{

}

// MAIN JS CODE
// Check if DOM is ready.
document.addEventListener("DOMContentLoaded", () => {

    //Attach a event listener to the “Start Game” button to hide the start screen overlay.
    startBtn.on('click', () => {
        const phraseArray = getRandomPhraseAsArray(phrasesArr);
        // Set the game display.
            addPhraseToDisplay(phraseArray);
            startBtn.css('display','none');
            startClass.css('backgroundColor','initial')
            title.css('display','none');
        // TODO: Add an event listener to the keyboard.
        document.addEventListener('keypress', (event)=>{
            //Add button to chosen

            console.log(event);
            let letterFound = checkLetter(event.key);
            // Count the missed guesses in the game.
                if(letterFound){
                    //Add .chosen to button
                    let letterBtn = $(`button:contains(${letterFound})`);
                    letterBtn.addClass('chosen');
                }

                //If checkLetter function returns a null value, the player has guesssed thwe wrong letter
                else if(!letterFound)
                missed++;

            });

    });
});