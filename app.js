import { words } from "./words.js";

// Query Selector Variables
const wordInput = document.getElementById('word')
const wrongLetters = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessageTitle = document.getElementById('final-message-title')
const finalMessageDescription = document.getElementById('final-message-description')
const figureParts = document.querySelectorAll('.figure-part')


let selectedWord = words[Math.floor(Math.random() * words.length)]
console.log(selectedWord)
