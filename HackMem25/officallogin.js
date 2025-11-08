document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uniLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    const { username, password, accountType } = data;

    if (!username || !password || !accountType) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        alert(`Welcome ${result.username}!`);
        localStorage.setItem("loggedInUser", result.username);
        localStorage.setItem("userRole", result.role);

        if (result.role === "organization") {
          window.location.href = "Bussinessdash.html";
        } else if (result.role === "user") {
          window.location.href = "Userdashboard.html";
        } else if (result.role === "admin") {
          window.location.href = "admindash.html";
        }
      } else {
        alert(result.detail || "Login failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Could not connect to the server.");
    }
  });
});
