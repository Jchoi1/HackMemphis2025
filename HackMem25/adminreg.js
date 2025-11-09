// Get the registration form
const form = document.getElementById('adminRegForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // prevent page reload

  // Get the username and password values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  // Validate
  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
  }

  try {
    // Send registration info to backend
    const res = await fetch('http://127.0.0.1:8000/api/register/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Account created successfully!');
      window.location.href = '/static/officallogin.html';
    } else {
      alert(data.detail || 'Registration failed.');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Could not connect to the server.');
  }
});