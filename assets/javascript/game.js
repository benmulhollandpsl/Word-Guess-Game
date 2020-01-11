// this is no longer vdelariva's game in it's entirety.  I have systematically started deleting most of the original code and relearning/reentering the code
// I will rewrite this entirely before homework is due without this current file
$(document).ready(function() {

// 1. Picking a 'random' word. Maybe not so random considering there is a themed background
// 2. Take the player’s guess.
// 3. Quit the game if the player wants to... working on a time out or reset button maybe
// 4. Check that the player’s guess is a valid letter.
// 5. Keep track of letters the player has guessed.
// 6. Show the player their progress.
// 7. Finish when the player has guessed the word. add a point to their score either way
// 8. try not to plagerize another persons work, study extra hard js I don't understand
// 9. notes on adjustments to scope at current build.
// 9a. want to have a song play with associated words, and stop soon (so maybe just a 15 second clip of each robo.ch)
    var possibleWords = ["FlashMan", "ProtoMan", "DrWily", "DrLight", "BubbleMan", "MetalMan", 
                        "WoodMan", "HeatMan", "Rush", "QuickMan", "AirMan", "CrashMan", "DocRobot"  ]

    const maxGuess = 10
    var pauseGame = false

    var guessedLetters = []
    var guessingWord = []
    var wordToMatch
    var numGuess
    var wins = 0

    resetGame()

    // Wait for key press
    document.onkeypress = function(event) {
        // Make sure key pressed is an alpha character
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }

    // Game Functions
    // Check if letter is in word & process
    function checkForLetter(letter) {
        var foundLetter = false
        var correctSound = document.createElement("audio")
        var incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src", "assets/sounds/stairs.mp3")
        incorrectSound.setAttribute("src","assets/sounds/croak.mp3")

        // Search string for letter
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play()
                // If guessing word matches random word
                if (guessingWord.join("") === wordToMatch) {
                    // Increment # of wins
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame,5000)
                }
            }
        }

        if (!foundLetter) {
            incorrectSound.play()
            // Check if inccorrect guess is already on the list
            if (!guessedLetters.includes(letter)) {
                // Add incorrect letter to guessed letter list
                guessedLetters.push(letter)
                // Decrement the number of remaining guesses
                numGuess--
            }
            if (numGuess === 0) {
                // Display word before reseting game
                guessingWord = wordToMatch.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }

        updateDisplay()

    }
    // Check in keypressed is between A-Z or a-z
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        // Get a new word
        wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
        console.log(wordToMatch)

        // Reset word arrays
        guessedLetters = []
        guessingWord = []

        // Reset the guessed word
        for (var i=0, j=wordToMatch.length; i < j; i++){
            // Put a space instead of an underscore between multi word "words"
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push("_")
            }
        }

        // Update the Display
        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("currentWord").innerText = guessingWord.join("")
        document.getElementById("remainingGuesses").innerText = numGuess
        document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
    }
})
