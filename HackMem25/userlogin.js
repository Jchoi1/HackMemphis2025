function login() {
    // Simple example username and password
    let correctUsername = "user123";
    let correctPassword = "password123";

    let enteredUsername = document.getElementById("username").value;
    let enteredPassword = document.getElementById("password").value;

    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        alert("Login Successful!");
    } else {
        alert("Incorrect username or password.");
    }
}
