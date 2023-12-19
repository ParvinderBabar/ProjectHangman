import prompt  from 'readline-sync';
import wordBank from './word-bank.js';

const MAX_WRONG_GUESSES = 6;

let chosenWord = '';
let guessedWord = '';
let incorrectGuesses = 0;
let guessedLetters = [];

function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
}

function initializeGame() {
  chosenWord = getRandomWord();
  guessedWord = '_'.repeat(chosenWord.length);
  incorrectGuesses = 0;
  guessedLetters = [];
}

function displayGameStatus() {
  console.clear();
  console.log(`Hangman Game\n`);
  console.log(`Word: ${guessedWord}`);
  console.log(`Incorrect Guesses: ${incorrectGuesses}/${MAX_WRONG_GUESSES}`);
  console.log(`Guessed Letters: ${guessedLetters.join(', ')}`);
}

function updateGuessedWord(letter) {
  let newGuessedWord = '';
  for (let i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] === letter) {
      newGuessedWord += letter;
    } else {
      newGuessedWord += guessedWord[i];
    }
  }
  guessedWord = newGuessedWord;
}

function makeGuess() {
  const letter = prompt.question('Please guess a letter: ').toUpperCase();

  if (!letter.match(/^[A-Z]$/)) {
    console.log('Please enter a valid letter.');
    return makeGuess();
  }

  if (guessedLetters.includes(letter)) {
    console.log(`You already guessed the letter ${letter}. Try again.`);
    return makeGuess();
  }

  guessedLetters.push(letter);

  if (chosenWord.includes(letter)) {
    updateGuessedWord(letter);
  } else {
    console.log(`Incorrect guess: ${letter}`);
    incorrectGuesses++;
  }
}

function checkGameResult() {
  if (guessedWord === chosenWord) {
    console.log(`Congratulations! You guessed the word: ${chosenWord}`);
  } else {
    console.log(`Sorry, you ran out of guesses. The correct word was: ${chosenWord}`);
  }
}

function playHangman() {
  initializeGame();

  while (incorrectGuesses < MAX_WRONG_GUESSES && guessedWord !== chosenWord) {
    displayGameStatus();
    makeGuess();
  }

  displayGameStatus();
  checkGameResult();
}

function askToPlayAgain() {
  const playAgain = prompt.keyInYNStrict('Do you want to play again?');
  if (playAgain) {
    playHangman();
    askToPlayAgain();
  } else {
    console.log('Thanks for playing!');
  }
}


console.log('Welcome to Hangman! Press ctrl+c to stop.\n');

playHangman();
askToPlayAgain();