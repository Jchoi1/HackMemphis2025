// Get the correct form
const form = document.getElementById('bizReg');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent page reload

  // Collect all input values
  const data = Object.fromEntries(new FormData(form));

  // Simple validation for required fields
  if (!data.username || !data.password || !data.businessName || !data.address) {
    alert('Please fill in all required fields.');
    return;
  }

  // Store data locally for testing
  localStorage.setItem('savedBusiness', JSON.stringify(data));

  // Notify user and redirect
  alert('Business account created!');
  window.location.href = 'officallogin.html';
});
