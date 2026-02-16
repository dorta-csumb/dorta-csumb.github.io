//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);



// alert("running external JS code")
let myLuckyNumber = 7;

//Global variables
let randomNumber;
let attempts = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";
  
   //adding focus to textbox
   document.querySelector("#playerGuess").focus();
}

console.log(randomNumber); 

//the next lines use dom manipulation to change the color of the header text
// document.querySelector("h1").style.color = "red";
// document.querySelector("h2").style.color = "blue";


function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        alert("Guess out of range!");
        return;
    } 
}
