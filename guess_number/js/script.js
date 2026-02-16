//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);



// alert("running external JS code")
let myLuckyNumber = 7;

//Global variables
let randomNumber;
let attempts = 0;
let totalAttempts = 7;
let totalWins = 0;
let totalLosses = 0;

//Setting the game over conditions by hiding the Guess button and showing the Reset button
function gameover() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn"); 
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline"; 
}



//calling the initializeGame function to start the game when the page loads. In 5th grade terms, this is like saying "Let's start the game!" when the page loads.
initializeGame(); 

function initializeGame() { //This function is like saying "Let's start the game!" when the page loads. It sets up the game by generating a random number, hiding the Reset button, and adding focus to the textbox for the player's guess.
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0; //resetting the attempts variable to 0 at the start of the game

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");//selecting the <input> element for the player's guess
   playerGuess.focus(); //adding focus to the <input> element so that the player can start typing their guess immediately
   playerGuess.value = ""; //clearing the <input> field for the player's guess

  let feedback = document.querySelector("#feedback"); //selecting the <div> element for feedback
  feedback.textContent = ""; //clearing any previous feedback messages

  document.querySelector("#guesses").textContent = ""; //clearing the previous guesses display

  document.querySelector("#guessesRem").textContent = ""; //clearing the remaining guesses display

   //adding focus to textbox
   document.querySelector("#playerGuess").focus();

   //This encourage ID shows how to change the text content of an element in the DOM (in this case h1)
   document.querySelector("#encourage").textContent = "Player, you are a great person!";
}

console.log(randomNumber); 

//the next lines use dom manipulation to change the color of the header text
// document.querySelector("h1").style.color = "red";
// document.querySelector("h2").style.color = "blue";


function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value; 
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    } 
    
    attempts++; //incrementing the attempts variable by 1
    console.log("Attempts: " + attempts); 
    feedback.style.color = "orange"; 
    if (guess == randomNumber) { //if the guess is correct
        feedback.textContent = "Perfect Signal! Rescue Ops bombed the zombies outside. You survived another day!";//display winning message
        feedback.style.color = "lightgreen";
        
        document.querySelector("#totalWins").textContent = ++totalWins; //increment total wins and update the display for total wins
        gameover();//call the gameover function to end the game

    }    else {
          document.querySelector("#guesses").textContent += guess + " "; //display previous guesses and add the current guess to the list
          if (attempts == 7) {
            feedback.textContent = "The tower is locked! Zombies breached the door. You died.";
            feedback.style.color = "red";
            document.querySelector("#totalLosses").textContent = ++totalLosses; //increment total losses and update the display for total losses
            gameover();

          } else if (guess > randomNumber) {
            feedback.textContent = "Signal too high. Interference spike. Zombies heard you.";
          } else {
            feedback.textContent = "Signal too low. Static detected. Zombies are stirring";
          } 
        }
        document.querySelector("#guessesRem").textContent = totalAttempts - attempts; //update the display for remaining guesses

    }

