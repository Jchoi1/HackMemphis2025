// user-reg.js  — handles USER sign-up with live typed values
document.getElementById('userRegForm').addEventListener('submit', async e => {
  e.preventDefault(); // stop page reload

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const res = await fetch('/api/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(r => r.json());

  if (res.ok) {
    alert('Account created!');
    location = 'userlogin.html'; // go to login after success
  } else {
    alert(res.message || 'Registration failed.');
  }
});