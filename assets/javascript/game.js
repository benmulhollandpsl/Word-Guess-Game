$(document).ready(function() {
// half psuedocode half plan of attack
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

// instructions
// 1. Play a sound or song when the user guesses their word correctly, like in our demo.
// 2. Write some stylish CSS rules to make a design that fits your game's theme.
// 3. **HARD MODE:** Organize your game code as an object, except for the key events to get the letter guessed. This will be a challenge if you haven't coded with JavaScript before, but we encourage anyone already familiar with the language to try this out.
// 4. Save your whole game and its properties in an object.
// 5. Save any of your game's functions as methods, and call them underneath your object declaration using event listeners.
// 6. Don't forget to place your global variables and functions above your object.
//    * Remember: global variables, then objects, then calls.
// 7. Definitely talk with a TA or your instructor if you get tripped up during this challenge.
    var listOfWords = [ 
    "FlashMan", 
    "ShadowMan", 
    "TopMan", "Roll",
    "ProtoMan", "DrWily", "DrLight", 
    "BubbleMan", "MetalMan", 
    "WoodMan", "HeatMan", "Rush", "QuickMan", 
    "AirMan", "CrashMan", "DocRobot", 
    "GeminiMan", "MagnetMan", ]
    // ] ;

    const maxGuess = 10
   
    var pauseGame = false

    var guessedLetter = []

    var guessingWord = []
    
    var wordToMatch
    
    var numGuess
    
    var wins = 0

    resetGame()

    // var word = listOfWords[Math.floor(Math.random()* words.length)].toUpperCase()
    // console.log(wordToMatch)
    // document.write(myGame[random]); 
   
    //commented out because of order, duplicates, and not clear writing.
    // var answerArray = [];
    
    // }
    // var remainingLetters = word.length;

    // while (remianingLetters > 0) {
        //gamecode goes here
        
        //when out of guesses we leave this loop

    // const maxGuess = 10
    // var pauseGame = false
    // var guessedLetter = []
    // var guessingWord = []
    // var wordToMatch
    // var numGuess
    // var wins = 0

    // resetGame()




    // Wait for key press
    document.onkeypress = function(event) 
        {
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }
//change all to caps to minimize issues, saw example in another build, where lower case and upper wouldn't work

    // Check if letter play back a sound, when win what next? 1/13
    function checkForLetter(letter) {
        var foundLetter = false
        var correctSound = document.createElement("audio")
        var incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src","assets/audio/megayes.mp3")
        incorrectSound.setAttribute("src","assets/audio/dundun.mp3")


        // Search string for letter
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play()
            }
                if (guessingWord.join("") === wordToMatch) {
                    wins++
                    pauseGame = false     //check this again
                    updateDisplay()
                    setTimeout(resetGame,1000)
                }
            }      
                
        // use an array to put string together to see word
            
        if (!foundLetter) {
           incorrectSound.play()
            if (!guessedLetter.includes(letter)) {
                guessedLetter.push(letter)
                numGuess--
            }
            
            if (numGuess === 0) {
        //         // Displays word before reset
                guessingWord = wordToMatch.split()
                pauseGame = false   //why would we?
                setTimeout(resetGame,1000)
            }
        }
//these var's are so similiar in name this is a nightmare to sort out, I might need to add a third word onto some of them to keep it straight in my head
        updateDisplay()

    }
    // // key pressed between A-z
    // function isAlpha (ch){
    //     return /^[A-Z]$/i.test(ch);
    // }
//try either 100-103 or 106-109 <------------ note from -'1/11'  i've added so many lines this is a moot comment -'1/12'
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }
//this was a royal pain to figure out, i'm still having trouble having my file find the .js when opening in browser. update: 
// turned out to be a (actually several) missing curly brace(s) like much else in life -1/13

    function resetGame() {
        numGuess = maxGuess
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
        //creating an alert that says "good job the answer is _" not sure how to tie 
        // it to guessing all letters yet, and my alert code below breaks my game -1/14
        // alert(guessingword.join(" "));
        // alert("Good work! the character was " + word);
        
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
