// business-reg.js — handles BUSINESS sign-up with live typed values
document.getElementById('bizRegForm').addEventListener('submit', async e => {
  e.preventDefault(); // stop page reload

  const data = Object.fromEntries(new FormData(e.target)); // grabs ALL inputs

  const res = await fetch('/api/business/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json());

  if (res.ok) {
    alert('Business account submitted!');
    location = 'business/login.html'; // go to biz login after success
  } else {
    alert(res.message || 'Registration failed.');
  }
});