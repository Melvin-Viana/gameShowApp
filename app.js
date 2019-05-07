// Elements
const $qwerty = $('#qwerty');
const $phrase = $('#phrase');
const $startBtn = $('.btn__reset');
const $phraseUl = $phrase.first();
const $title = $('.title')
const overlay = document.querySelector('#overlay');
const $buttons = $('button');

// Utility Variables
let missed = 0; //Add + 1 when player's guess missed
const phrasesArr = ['JavaScript Developer',
    'Game Show App',
    'Self Taught Developer',
    'Team Treehouse',
    'Free Code Camp'
]; //Phrases player will guess

//=======================
// FUNCTIONS
const getRandomPhraseAsArray = (arr) => {
    //Random numbers 0-4
    let randomNum = Math.floor(Math.random() * 5);
    //Return random phrase into array of characters
    return arr[randomNum].split("");
};

const addPhraseToDisplay = arr => {
    // Loops through arr of characters
    for (let i = 0; i < arr.length; i++) {
        let newChar = document.createElement('li');
        newChar.textContent = arr[i];
        //Append li to #phrase ul
        $phraseUl.append(newChar);
        //If li is not a space
        if (arr[i] !== " ")
            newChar.classList.add('letter')
        else
            newChar.classList.add('space')
        //add .letter as class
    }
}

const checkLetter = (key) => {
    const letters = document.querySelectorAll('.letter'); //Letters created only when game is started.
    let letter = null;
    // Loop through all .letter elements
    for (let i = 0; i < letters.length; i++) {
        //Check if they match the button
        if (letters[i].textContent.toUpperCase() === key.toUpperCase()) {
            letters[i].classList.add('show');
            letter = letters[i].textContent;
        }
    }
    return letter;
};

const reset = (result) => {
    missed = 0;
    const $disabledButtons = $('button:disabled');
    overlay.classList.add(result);
    $title.show();
    $title.text(`YOU ${result.toUpperCase()}`);
    $startBtn.show();
    $startBtn.text('Reset');
    //Reset the list
    $phrase.empty();
    //Reset disabled
    $disabledButtons.each(function () {
        $(this).prop('disabled', false).removeClass('chosen')
    })
    // Reset missed
    for (let i = 0; i < 5; i++) {
        $('#scoreboard ol').append('<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>')
    }
    // Remove event listener

    $('#qwerty').css('z-index', -1);
}

const checkWin = () => {
    const letters = document.querySelectorAll('.letter'); //Letters created only when game is started.
    const shownLetters = document.querySelectorAll('.show');

    if (missed === 5) {
        document.removeEventListener('keypress', keypressEvent);
        reset('lose');
    } else if (missed !== 5 && letters.length === shownLetters.length) {
        document.removeEventListener('keypress',keypressEvent);
        $('#scoreboard ol').empty();
        return reset('win');
    }
}

const buttonClickEvent = (key) => {
    let letterFound = checkLetter(key);
    //Add .chosen to button
    let letterBtn = $(`button:contains('${key}')`);
    letterBtn.addClass('chosen');
    letterBtn.prop('disabled', true);
    //If checkLetter function returns a null value, the player has guesssed thwe wrong letter
    if (letterFound == null) {
        missed++;
        $('#scoreboard ol li').last().remove();
    }
    checkWin();
}
const keypressEvent = (event) => {
    $(`button:contains('${event.key}'):enabled`).trigger('click');
}

const resetButton = (result) => {
    $startBtn.show();
    $startBtn.text('Reset');
    $overlay.removeClass(result);
}
//=======================
// MAIN JS CODE
// Check if DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
    //Attach a event listener to the “Start Game” button to hide the start screen overlay.
    $startBtn.on('click', () => {
        $('#qwerty').css('z-index', 1); //Add button to front

        const phraseArray = getRandomPhraseAsArray(phrasesArr);
        // Set the game display.
        addPhraseToDisplay(phraseArray);
        $startBtn.css('display', 'none');
        overlay.classList = "";
        $title.css('display', 'none');
        // Trigger keyboard click onClick
        document.addEventListener('keypress',keypressEvent );

    });

    $("button").each(function () {
        $(this).on("click", function () {
            buttonClickEvent(this.textContent)
        });
    });
});