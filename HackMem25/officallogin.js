// officallogin.js — unified sign-in for user / business / admin
document.getElementById('uniLogin').addEventListener('submit', async e => {
  e.preventDefault(); // keep page from reloading

  const data = Object.fromEntries(new FormData(e.target)); // username, password, accountType

  const res = await fetch('/api/unified/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json());

  if (res.token) {
    localStorage.setItem('token', res.token); // save auth
    // route by account type
    switch (data.accountType) {
      case 'user':     location = 'user/portal.html'; break;
      case 'business': location = 'business/portal.html'; break;
      case 'admin':    location = 'admin/dashboard.html'; break;
      default:         location = 'generalhomepage.html'; // fallback
    }
  } else {
    alert(res.message || 'Login failed.');
  }
});