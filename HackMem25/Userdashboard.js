// TAB SWITCHING
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');

    if (btn.dataset.tab === 'home') loadBiz();
    if (btn.dataset.tab === 'faves') loadFaves();
    if (btn.dataset.tab === 'profile') showProfile();
  });
});

async function loadBiz() {
  const box = document.getElementById('bizList');
  box.innerHTML = "<p>Loading organizations...</p>";

  try {
    const res = await fetch("http://127.0.0.1:8000/api/organizations");
    const data = await res.json();
    const list = data.organizations || [];

    if (!list.length) {
      box.innerHTML = "<p>No organizations found.</p>";
      return;
    }

    box.innerHTML = list.map(b => `
      <div class="biz-card">
        <h4>${b.name}</h4>
        <p>${b.desc || "No description"}</p>
        <p><b>Contact:</b> ${b.org_phone || "N/A"}</p>
        <p><b>Address:</b> ${b.org_address || "N/A"}</p>
        <button onclick="toggleFav(${b.id})">☆</button>
      </div>`).join('');
  } catch (err) {
    console.error("Error loading organizations:", err);
    box.innerHTML = "<p>Failed to load data. Please try again.</p>";
  }
}

// FAVORITES (stored in localStorage)
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFav(id) {
  favorites = favorites.includes(id)
    ? favorites.filter(x => x !== id)
    : [...favorites, id];
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadBiz(); // refresh stars
}

function loadFaves() {
  const favBiz = dummyBiz.filter(b => favorites.includes(b.id));
  document.getElementById('faveList').innerHTML = favBiz.length
    ? favBiz.map(b => `
        <div class="biz-card">
          <h4>${b.name}</h4>
          <p>${b.tag} • ${b.desc}</p>
        </div>`).join('')
    : '<p>No favorites yet.</p>';
}

// PROFILE TAB
function showProfile() {
  document.getElementById('showUser').textContent =
    localStorage.getItem('savedUsername') || 'Guest';
}

// LOGOUT
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  location = '../generalhomepage.html';
});

// initial load
loadBiz();