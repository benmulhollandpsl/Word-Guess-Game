// file completely rewritten
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
    var listOfWords = [ 
    "FlashMan", 
    "ShadowMan", 
    "TopMan", "Roll",
    "ProtoMan", "DrWily", "DrLight", 
    "BubbleMan", "MetalMan", 
    "WoodMan", "HeatMan", "Rush", "QuickMan", 
    "AirMan", "CrashMan", "DocRobot", 
    "GeminiMan", "MagnetMan", 
    ];

    var word = listOfWords[Math.floor(Math.random()* words.length)].toUpperCase()
    console.log(wordToMatch)
    document.write(myGame[random]); 
   
    
    var answerArray = [];
    for (var i = 0; i < word.length; i++){
        answerArray[I] = "_";
    }
    var remainingLetters = word.length;

    while (remianingLetters > 0) {
        //gamecode goes here
        
        //when out of guesses we leave this loop
    }
    const maxGuess = 11
    var pauseGame = false
    var guessedLetter = []
    var guessingWord = []
    var wordToMatch
    var numGuess
    var wins = 0

    resetGame()

    // Wait for key press
    document.onkeypress = function(event) {
        // Make sure key pressed is alphabet
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }
//change all to caps to minimize issues, saw example in another build, where lower case and upper wouldn't work

    // Check if letter is in word & process
    function checkForLetter(letter) {
        var foundLetter = false
        


        // Search string for letter
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                
                if (guessingWord.join("") === wordToMatch) {
                    // Increment # of wins
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame,5000)

        // use an array to put string together to see word
                }
            }
        }

    
            if (!foundLetter) {}
            if (!guessedLetter.includes(letter)){
                guessedLetter.push(letter)numGuess--
            }
            if (numGuess === 0) {
        //         // Display word before reseting game
                guessingWord = wordToMatch.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }
//these var's are so similiar in name this is a nightmare to sort out, I might need to add a third word onto some of them to keep it straight in my head
        updateDisplay()

    }
    // key pressed between A-z
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }
//try either 100-103 or 106-109 <------------ note from 1/11

    // var isAlpha = function(ch){
    //     return /^[A-Z]$/i.test(ch);
    //   }isAlpha

    function resetGame() {
        numGuess = 10
        pauseGame = false

        // Get a new word
        wordToMatch = listOfWords[Math.floor(Math.random() * listOfWords.length)].toUpperCase()
        console.log(wordToMatch)
        

        guessedLetter = []
        guessingWord = []

        // Reset the guessed word
        for (var i=0, j=wordToMatch.length; i < j; i++){
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
        document.getElementById("guessedLetter").innerText =  guessedLetter.join(" ")
    }
})
