// business-reg.js — handles BUSINESS sign-up with live typed values
document.getElementById('bizReg').addEventListener('submit', async e => {
  e.preventDefault(); // stop page reload

  const data = Object.fromEntries(new FormData(e.target)); // grabs ALL inputs

  try{
    const res = await fetch('http://127.0.0.1:8000/api/register/organization', {
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
  } catch (err) {
    console.error(err);
    alert('Could not connect to server.');
  }
});