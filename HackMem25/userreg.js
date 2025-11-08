const form = document.getElementById('userRegForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/register/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Account created successfully!');
      window.location.href = 'userlogin.html';
    } else {
      alert(data.detail || 'Registration failed.');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Could not connect to the server.');
  }
});
