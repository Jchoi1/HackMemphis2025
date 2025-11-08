document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bizReg");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop page reload

    const data = Object.fromEntries(new FormData(form).entries());

    // Simple validation
    if (!data.username || !data.password || !data.org_name || !data.org_address) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Server response:", result);

      if (res.ok) {
        alert("Business account submitted!");
        window.location.href = "Bussinessdash.html";
      } else {
        alert(result.detail || result.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Could not connect to server.");
    }
  });
});
