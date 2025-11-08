// Business Registration Form Handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bizReg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page reload

    // Collect all input values
    const data = Object.fromEntries(new FormData(form).entries());

    // Simple validation for required fields
    if (!data.username || !data.password || !data.org_name || !data.org_address) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Send data to backend API
      const res = await fetch("http://127.0.0.1:8000/api/register/organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert("Business account created successfully!");
        window.location.href = "/static/officallogin.html";
      } else {
        alert(result.detail || "Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Could not connect to the server.");
    }
  });
});
