console.log("running"); 

// variables are like characters in a play, list them first so you can keep track of them
// let = let it be known that this is a variable, you can change the value of it later on in the code, but you can't change the name of it.

//this is how you declare a variable, you can change the value of it later on in the code, but you can't change the name of it.
let correctNumber = 13; 
let correctMessage = "Congrats!"; //this is a string variable, it can hold text


//this is how you get an element from the HTML, you can use this variable to access the value of the input later on in the code 
let guessInput = document.querySelector("#guessInput"); 
let guessButton = document.querySelector("#guessButton");
let guessResult = document.querySelector("#guessResult"); 


//this is how you add an event listener to a button, it will run the function when the button is clicked

//first make a function
// function displayWinMessage() {
//     //this is how you change the text content of an element in the HTML, you can use this variable to change the text later on in the code
//     guessResult.textContent = correctMessage; 
//     guessResult.style.color = "green"; //this is how you change the color of the text in the HTML, you can use this variable to change the color of the text later on in the code
// }

//the above function goes into the second parameter of the addEventListener function, this is how you tell the button to run the function when it is clicked

//this makes the guessButton interacttive, when you click it, it will run the displayWinMessage function


guessButton.addEventListener("click", function () {
    
//the parameter after if is the condition, if the condition is true, it will run the code inside the curly braces, if it is false, it will skip the code inside the curly braces
    if(correctNumber== guessInput.value) {
    guessResult.textContent = correctMessage; 
    guessResult.style.color = "green";
    }
});

alert("Welcome to the guessing game! Try to guess the correct number between 1 and 20!");

//to add a feature that says that says 'too high' or 'too low', you can add an else if statement after the if statement, this is how you tell the code to run a different block of code if the condition is false
guessButton.addEventListener("click", function () {
    
    if(correctNumber== guessInput.value) {
    guessResult.textContent = correctMessage; 
    guessResult.style.color = "green";
    }
    else if (guessInput.value > correctNumber) {
        guessResult.textContent = "Too high!";
        guessResult.style.color = "red";
    }
    else if (guessInput.value < correctNumber) {
        guessResult.textContent = "Too low!";
        guessResult.style.color = "red";
    }
});


