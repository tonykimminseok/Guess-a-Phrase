const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const phraseUL = document.querySelector('#phrase ul');
const keyboard = document.querySelector('#qwerty');
const heartList = document.querySelector('#scoreboard ol');
const heartArray = document.querySelectorAll('.tries img');
const heart = document.querySelector('.tries img');

let missed = 0;
let phrases = ['heart of gold',
			   'love is blind',
			   'cool as a cucumber',
			   'bring home the bacon',
			   'saved by the bell',
			   'dressed to the nines',
			   'down to earth',
			   'keep on trucking',
			   'a piece of cake',
			   'just do it'];

startButton.addEventListener('click', () => {
	if (startButton.textContent === 'Start Game') {
		startGame();
		overlay.style.display = 'none';
	} else {
		resetGame();
		startGame();
		overlay.style.display = 'none';
	}
});

function getRandomPhraseAsArray(arr) {
	// choose random phrase from arr
	const randomNumber = Math.floor(Math.random() * arr.length);
	const randomPhrase = arr[randomNumber];

	// split that string into new array of characters
	const characters = randomPhrase.split('');

	// return the new array of characters
	console.log(characters);
	return characters;
}

function addPhraseToDisplay(arr) {
	// loop through array of characters
	for (let i = 0; i < arr.length; i++) {
	// create a list item
		const li = document.createElement('li');
	// put the character inside the list item
		li.textContent = arr[i];
	// append the list item to #phrase ul
		phraseUL.append(li);
	// if list item is a letter, add class "letter"
		const letters = /^[0-9a-zA-Z]+$/;
		if (li.textContent.match(letters)) {
			li.className = 'letter';
		} else {
			li.className = '';
			li.style.width = '100%';
		}
	}
}

keyboard.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const button = e.target;
		button.className = 'chosen';
		button.setAttribute('disabled', '');
		const letter = button.textContent;
		const letterFound = checkLetter(letter);

		// check value of letterFound variable
		if (letterFound === null) {
			heartArray[missed].src = 'images/lostHeart.png';
			button.className = 'wrong';
			missed++;
		}
	}

	// check for winner
	checkWin();

});

function checkLetter(letter) {
	// get all of the elements with class "letter"
	const letters = document.querySelectorAll('.letter');
	let matchingLetter;
	let matchCounter = 0;

	// loop over these elements to see if they match letter chosen
	for (let i = 0; i < letters.length; i++) {
		// if there's a match
		if (letter === letters[i].textContent) {
			// add class "show" to the list item containing that letter
			letters[i].className += ' show';
			// store the matching letter inside a variable
			matchingLetter = letter;
			matchCounter++;
		}
	}



	if (matchCounter > 0) {
		return matchingLetter;
	} else {
		return null;
	}
}

function checkWin() {
	const totalLetters = document.querySelectorAll('.letter');
	const shownLetters = document.querySelectorAll('.show');
	const h3 = document.createElement('h3');
	h3.style.fontSize = "2.5em";

	// 	if # of letters with class "show" === # of letters with class "letter"
	if (shownLetters.length === totalLetters.length) {
		// show overlay screen with class "win" and appropriate text
		removeShowClass();
		overlay.className = 'win';
		overlay.style.display = 'flex';
		startButton.textContent = 'Play Again';
		overlay.appendChild(h3);
		h3.textContent = 'You Won!';
		showCorrectPhrase();
	} else if (missed >= 5) {
		// show overlay screen with class "lose" and appropriate text
		removeShowClass();
		overlay.className = 'lose';
		overlay.style.display = 'flex';
		startButton.textContent = 'Try Again';
		overlay.appendChild(h3);
		h3.textContent = 'You Lost!';
		showCorrectPhrase();
	}
}

function removeShowClass() {
	for (let i = 0; i < phraseUL.children.length; i++) {
		phraseUL.children[i].classList.remove('show');
	}
}

function showCorrectPhrase() {
	const h4 = document.createElement('h4');
	h4.style.fontSize = "1.5em";
	h4.textContent = 'The correct phrase was: ' + phraseUL.textContent.toUpperCase();
	overlay.appendChild(h4);
}

function startGame() {
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
}

function resetGame() {
	// reset missed counter
	missed = 0;

	// remove prior phrase from board
	while (phraseUL.firstChild) {
		phraseUL.removeChild(phraseUL.firstChild);
	}

	// remove win/lose message
	const h3 = document.querySelector('h3');
	h3.parentNode.removeChild(h3);

	// remove correct phrase
	const h4 = document.querySelector('h4');
	h4.parentNode.removeChild(h4);

	// reset heart images
	for (let i = 0; i < heartArray.length; i++) {
		heartArray[i].src = 'images/liveHeart.png';
	}

	// reset keyboard classes and attributes
	const keyboardButton = document.querySelectorAll('#qwerty button');
	for (let i = 0; i < keyboardButton.length; i++) {
		keyboardButton[i].classList.remove('chosen');
		keyboardButton[i].classList.remove('wrong');
		keyboardButton[i].removeAttribute('disabled');
	}
}
