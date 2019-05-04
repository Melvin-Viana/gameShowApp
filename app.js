//Get the elements you’ll need from your HTML
/*
Get the element with the ID of qwerty and save it to a variable.
Get the element with the ID of phrase and save it to a variable.
Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed (remember, if the player guesses wrong 5 times, they lose the game)
*/
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('prhase');
let missed = 0; //Add + 1 when player's guess missed
//Phrases player will guess
const phrasesArr = ['JavaScript is the best', '100 Days Of Code', 'Self Taught Developer', 'Team Treehouse', 'Free Code Camp'];

const getRandomPhraseAsArray = () => {
    //Random numbers 0-4
    let randomNum = Math.floor(Math.random() * 5);
    //Return random phrase into array of characters
    return phrasesArr[randomNum].split("");
}
//Button
const startBtn = document.querySelector('.btn__reset');
// Check if DOM is ready.
document.addEventListener("DOMContentLoaded", () => {

    //Attach a event listener to the “Start Game” button to hide the start screen overlay.
    startBtn.addEventListener('click', () => {
        console.log(getRandomPhraseAsArray());
    });
});