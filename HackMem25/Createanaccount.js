function createAccount() {
    let username = document.getElementById("new-username").value;
    let password = document.getElementById("new-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (username === "" || password === "") {
        alert("Please fill out all fields.");
        return;
    }

    // -------------------------------
    // PLACEHOLDER FOR BACKEND CONNECTION
    // Your backend team will replace this with:
    // 1. Send username/password to API/server
    // 2. Store password securely (hashed) in database
    // -------------------------------

    alert("Account created successfully! (Temporary Demo Only)");
}
