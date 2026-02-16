//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);



// alert("running external JS code")
let myLuckyNumber = 7;

//Global variables
let randomNumber;
let attempts = 0;

//Setting the game over conditions by hiding the Guess button and showing the Reset button
function gameover() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline"; 
}

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";
  
   //adding focus to textbox
   document.querySelector("#playerGuess").focus();

   //This encourage ID shows how to change the text content of an element in the DOM (in this case h1)
   document.querySelector("#insult").textContent = "Player, you are a great person!";
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
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        gameover();
    }    else {
          if (attempts == 7) {
            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "red";
            gameover();
          } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high!";
          } else {
            feedback.textContent = "Guess was low!";
          } 
        }
    }

