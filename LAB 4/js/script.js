

//  extra credit 1 (part a) - load States when page loads 
async function pageLoad() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();
    
    // build the dropdown options using a basic string and for-loop
    let stateHTML = "<option value=''>Select a State</option>";
    for (let i = 0; i < data.length; i++) {
        stateHTML += `<option value="${data.usps}">${data.state}</option>`;
    }
    
    // add the html into the state dropdown
    document.querySelector("#stateSelect").innerHTML = stateHTML;
}

pageLoad();


//  participation 1 - Update City, Latitude, and Longitude 
let zipCodeInput = document.querySelector("#zipCodeInput"); 
zipCodeInput.addEventListener("input", async function() {

    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCodeInput.value}`;
    try {
       const response = await fetch(url);
       if (!response.ok) {
           throw new Error("Error accessing API endpoint")
       }
       const data = await response.json();
       console.log(data);
    
       document.querySelector("#cityDisplay").textContent = data.city;
       
       // added Latitude and Longitude based on the prompt
       document.querySelector("#latDisplay").textContent = data.latitude;
       document.querySelector("#lonDisplay").textContent = data.longitude;

    } catch (err) {
       if (err instanceof TypeError) {
           console.log("Error accessing API endpoint (network failure)");
       } else {
           console.log(err.message);
       }
    } 
});


//  participation 2 - display suggested password when clicking on Password text box 
let passwordInput = document.querySelector("#passwordInput");
passwordInput.addEventListener("click", async function() {
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let response = await fetch(url);
    let data = await response.json();
    
    // display the suggested password next to the input
    document.querySelector("#passwordMessage").textContent = "Suggested password: " + data.password;
});


//  participation 3 - display whether the username is available or not 
let usernameInput = document.querySelector("#usernameInput");
usernameInput.addEventListener("change", async function() {
    let url = `https://csumb.space/api/usernamesAPI.php?username=${usernameInput.value}`;
    let response = await fetch(url);
    let data = await response.json();
    
    if (data.available == true) {
        document.querySelector("#usernameMessage").textContent = "Username is available!";
        document.querySelector("#usernameMessage").style.color = "green";
    } else {
        document.querySelector("#usernameMessage").textContent = "Username is NOT available.";
        document.querySelector("#usernameMessage").style.color = "red";
    }
});


//  extra credit 1  (part b) - County list is updated when selecting a state 
let stateSelect = document.querySelector("#stateSelect");
stateSelect.addEventListener("change", async function() {
    let url = `https://csumb.space/api/countyListAPI.php?state=${stateSelect.value}`;
    let response = await fetch(url);
    let data = await response.json();
    
    // build the dropdown options for counties
    let countyHTML = "<option value=''>Select a County</option>";
    for (let i = 0; i < data.length; i++) {
        countyHTML += `<option value="${data.county}">${data.county}</option>`;
    }
    
    document.querySelector("#countySelect").innerHTML = countyHTML;
});


//  extra credit 2 - Error message below Sign up button if password < 6 chars 
let submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", function() {
    
    // Check if less than 6 characters
    if (passwordInput.value.length < 6) {
        document.querySelector("#submitMessage").textContent = "Error: Password must be at least six characters.";
    } else {
        document.querySelector("#submitMessage").textContent = ""; // clear if good
    }
});

// "The message disappears when entering a password with at least six characters."
passwordInput.addEventListener("input", function() {
    if (passwordInput.value.length >= 6) {
        document.querySelector("#submitMessage").textContent = "";
    }
});