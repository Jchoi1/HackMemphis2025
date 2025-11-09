// officallogin.js — unified local login for user, business, and admin
const form = document.getElementById('uniLogin');

form.addEventListener('submit', e => {
  e.preventDefault(); // prevent page reload

  const data = Object.fromEntries(new FormData(form)); // username, password, accountType
  const { username, password, accountType } = data;

  if (!username || !password || !accountType) {
    alert('Please fill in all fields.');
    return;
  }

  let storedData;

  switch(accountType) {
    case 'user':
      storedData = {
        username: localStorage.getItem('savedUsername'),
        password: localStorage.getItem('savedPassword')
      };
      break;

    case 'business':
      const biz = localStorage.getItem('savedBusiness');
      storedData = biz ? JSON.parse(biz) : null;
      break;

    case 'admin':
      // example admin hardcoded for demo purposes
      storedData = { username: 'admin', password: 'admin123' };
      break;

    default:
      alert('Invalid account type.');
      return;
  }

  if (!storedData) {
    alert(`${accountType} account not found.`);
    return;
  }

  // Check credentials
  if (username === storedData.username && password === storedData.password) {
    // Save token for demo (could be any string)
    localStorage.setItem('token', 'local-login-token');

    // Redirect by account type
    switch(accountType) {
      case 'user': location.href = 'Userdashboard.html'; break;
      case 'business': location.href = 'Bussinessdash.html'; break;
      case 'admin': location.href = 'admindash.html'; break;
    }
  } else {
    alert('Incorrect username or password.');
  }
});
