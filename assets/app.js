// script.js
const words = [
	'pocahontas',
	'cinderella',
	'dumbo',
	'aladdin',
	'flounder',
	'anastasia',
];
let chosenWord = '';
let scrambledWord = '';
let maxTries = 5;
let tries = 0;
let mistakes = [];

const scrambledWordDisplay = document.getElementById('scrambledWord');
const triesDisplay = document.getElementById('tries');
const mistakesDisplay = document.getElementById('mistakes');
const inputsContainer = document.getElementById('inputsContainer');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');

// Function to scramble the word
function scrambleWord(word) {
	return word
		.split('')
		.sort(() => Math.random() - 0.5)
		.join('');
}

// Function to generate a random word and display
function generateRandomWord() {
	chosenWord = words[Math.floor(Math.random() * words.length)];
	scrambledWord = scrambleWord(chosenWord);
	scrambledWordDisplay.innerText = scrambledWord;

	// Reset input fields
	inputsContainer.innerHTML = '';
	for (let i = 0; i < chosenWord.length; i++) {
		const input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('maxlength', '1');
		inputsContainer.appendChild(input);

		input.addEventListener('input', function () {
			handleInput(input, i);
		});
	}

	tries = 0;
	mistakes = [];
	updateDisplay();
}

// Handle user input
function handleInput(input, index) {
	const letter = input.value.toLowerCase();

	// Check if the letter matches
	if (letter !== chosenWord[index]) {
		if (!mistakes.includes(letter)) {
			mistakes.push(letter);
			tries++;
		}

		input.value = ''; // Clear input if wrong
	} else {
		// Move to the next input if correct
		if (index + 1 < inputsContainer.children.length) {
			inputsContainer.children[index + 1].focus();
		}
	}

	updateDisplay();
}

// Update tries and mistakes
function updateDisplay() {
	triesDisplay.innerText = tries;
	mistakesDisplay.innerText = mistakes.join(', ');
}

// Check if the word is fully guessed
function isWordComplete() {
	let guessedWord = '';
	for (let i = 0; i < inputsContainer.children.length; i++) {
		guessedWord += inputsContainer.children[i].value;
	}
	return guessedWord.toLowerCase() === chosenWord.toLowerCase();
}

// Reset game state
function resetGame() {
	generateRandomWord();
}

// Add event listeners for buttons
randomBtn.addEventListener('click', generateRandomWord);
resetBtn.addEventListener('click', resetGame);

// Initialize the game on page load
window.onload = generateRandomWord;

// Function to show result card
function showResult(message) {
	const resultCard = document.getElementById('resultCard');
	const resultMessage = document.getElementById('resultMessage');
	resultMessage.textContent = message;
	resultCard.classList.add('show'); // Show the result card
}

// Event listener for play again button
document.getElementById('playAgainBtn').addEventListener('click', function () {
	const resultCard = document.getElementById('resultCard');
	resultCard.classList.remove('show'); // Hide the result card
	resetGame(); // Reset the game
});

// Handle user input
function handleInput(input, index) {
	const letter = input.value.toLowerCase();

	// Check if the letter matches
	if (letter !== chosenWord[index]) {
		if (!mistakes.includes(letter)) {
			mistakes.push(letter);
			tries++;
		}

		input.value = ''; // Clear input if wrong
	} else {
		// Move to the next input if correct
		if (index + 1 < inputsContainer.children.length) {
			inputsContainer.children[index + 1].focus();
		}
	}

	updateDisplay();

	// Check if the game is over
	if (tries >= maxTries) {
		showResult('Game Over! You made too many mistakes.'); // Show lose message
	} else if (isWordComplete()) {
		showResult('🎉 Success! You guessed the word!'); // Show win message
	}
}

// Reset game state
function resetGame() {
	generateRandomWord();
	const resultCard = document.getElementById('resultCard');
	resultCard.classList.remove('show'); // Hide the result card in case it's open
}
