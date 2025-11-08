// Get the registration form
const form = document.getElementById('userRegForm');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent page reload

  // Get the username and password values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  // Check if fields are empty
  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
  }

  // Store credentials in localStorage for login page
  localStorage.setItem('savedUsername', username);
  localStorage.setItem('savedPassword', password);

  // Notify user and redirect
  alert('Account created!');
  location.href = 'officallogin.html';
});
