$(document).ready(function() {

    var listOfWords = [ 
    "FlashMan", 
    "ShadowMan", 
    "TopMan", "Roll",
    "ProtoMan", "DrWily", "DrLight", 
    "BubbleMan", "MetalMan", 
    "WoodMan", "HeatMan", "Rush", "QuickMan", 
    "AirMan", "CrashMan", "DocRobot", 
    "GeminiMan", "MagnetMan", "ToadMan", "Gamma", "BreakMan", "SparkMan"
    ];
    

    const maxGuess = 10;
    var pauseGame = false;
    var guessedLetter = [];
    var guessingWord = [];
    var wordToMatch;
    var numGuess;
    var wins = "";

    resetGame();




    // Wait for key press
    document.onkeypress = (event) => 
        {
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase());
        }
    };
    //change all to caps

    // Check if letter play back a sound, when win what next? 1/13
    function checkForLetter(letter) {
        var foundLetter = false;
        var correctSound = document.createElement("audio");
        var incorrectSound = document.createElement("audio");
        correctSound.setAttribute("src","assets/audio/megayes.mp3");
        incorrectSound.setAttribute("src","assets/audio/dundun.mp3");


        // Search string for letter
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play();
            }
                console.log(wins)
                if (guessingWord.join("") == wordToMatch) {
                    console.log(guessingWord)
                    wins++;
                    pauseGame === false
                    console.log(wins);    
                    //testing this, increments per guess
                    updateDisplay();
                    setTimeout(resetGame,1000);
                } else {
                    setTimeout(resetGame,200000);
                }
            }      
                
        // using an array to put string together to see word
            
        if (!foundLetter) {
           incorrectSound.play()
            if (!guessedLetter.includes(letter)) {
                guessedLetter.push(letter);
                console.log(letter);
                numGuess--;
            }
            
            if (numGuess === 0) {
               // Displays word before reset
                guessingWord = wordToMatch.split()
                pauseGame = false   
                setTimeout(resetGame,1000)
            }
        }
        updateDisplay()

    }
 
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        // Get a new word
        wordToMatch = listOfWords[Math.floor(Math.random() * listOfWords.length)].toUpperCase();
        console.log(wordToMatch);
        

        guessedLetter = [];
        guessingWord = [];

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
        
        updateDisplay();
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins;
        console.log(wins)
        document.getElementById("currentWord").innerText = guessingWord.join("")
        document.getElementById("remainingGuesses").innerText = numGuess
        document.getElementById("guessedLetter").innerText =  guessedLetter.join(" ")
    }

    // function myFunction() {
    //     var x = document.getElementById("myAudio").duration;
    //     document.getElementById("liveatUarts2014Betatestmusic").innerHTML = x;
    //   }
    //   return myFunction;
})
