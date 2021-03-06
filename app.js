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
// console.log(selectedWord)

let correctLettersArray = []
let wrongLettersArray = []


// Show hidden word
function displayWord() {
    // Loop through the selected word and display it on the screen
    wordInput.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correctLettersArray.includes(letter) ? letter : ''}
            </span>
        `)
        .join('')}
    `
    const innerWord = wordInput.innerText.replace(/\n/g, '')

    if (innerWord === selectedWord) {
        finalMessageTitle.innerText = 'Congratulations!'
        finalMessageDescription.innerText = 'You won!'
        popup.style.display = 'flex'
    }
}

// Update the wrong letters
function updateWrongLetters() {
    // Display wrong letters
    wrongLetters.innerHTML = `
        ${wrongLettersArray.length > 0 ? '<p>Wrong Letters</p>' : ''}
        ${wrongLettersArray.map(letter => `<span> ${letter} </span>`)}
    `

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLettersArray.length

        if (index < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })

    // Check if lost
    if (wrongLettersArray.length === figureParts.length) {
        finalMessageTitle.innerText = 'Unfortunately you lost'
        finalMessageDescription.innerText = `The correct word was: ${selectedWord}`
        popup.style.display = 'flex'
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key
        if (selectedWord.includes(letter)) {
            if (!correctLettersArray.includes(letter)) {
                correctLettersArray.push(letter)

                displayWord()
            } else {
                showNotification()
            }
        } else {
            if (!wrongLettersArray.includes(letter)) {
                wrongLettersArray.push(letter)

                updateWrongLetters()
            } else {
                showNotification()
            }
        }
    }
})

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLettersArray = []
    wrongLettersArray = []

    // Select new word
    selectedWord = words[Math.floor(Math.random() * words.length)]

    // Update the DOM
    displayWord()
    updateWrongLetters()

    // Hide the popup
    popup.style.display = 'none'
})

displayWord()