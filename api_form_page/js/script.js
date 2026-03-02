// event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", displaySuggestedPassword);
document.querySelector("#signupForm").addEventListener("submit", validateForm);

// display city, lat, long
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    if (!data || data == false) {
        document.querySelector("#zipError").innerHTML = "Zip code not found";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
        return;
    }

    document.querySelector("#zipError").innerHTML = "";
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

// display counties
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();

    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option>Select County</option>";

    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option>${data[i].county}</option>`;
    }
}

// check username availability
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    let msg = document.querySelector("#usernameError");

    if (data.available) {
        msg.innerHTML = "Username available!";
        msg.style.color = "green";
    } else {
        msg.innerHTML = "Username taken";
        msg.style.color = "red";
    }
}

// suggested password
async function displaySuggestedPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("#suggestedPwd").innerHTML = data.password;
}

// form validation
function validateForm(e) {
    let isValid = true;

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let passwordAgain = document.querySelector("#passwordAgain").value;

    if (username.length < 3) {
        document.querySelector("#usernameError").innerHTML = "Username must be at least 3 characters";
        isValid = false;
    }

    if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters";
        isValid = false;
    }

    if (password !== passwordAgain) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
}
