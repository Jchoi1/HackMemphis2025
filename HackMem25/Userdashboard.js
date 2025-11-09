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

document.getElementById('homeBtn')?.addEventListener('click', () => {
  location = 'Userdashboard.html';   // or your landing page
});
document.getElementById('needBtn').addEventListener('click', () => {
  location = 'filter.html'; // step-by-step sorting page
});

// DEMO DATA
const dummyBiz = [
  {id:1,name:"Mid-South Food Bank",categories:["Food"],desc:"Groceries & hot meals"},
  {id:2,name:"Memphis Health Center",categories:["Health"],desc:"Free medical clinic"},
  {id:3,name:"United Way Housing",categories:["Housing"],desc:"Emergency shelter"}
];

function loadBiz(list = dummyBiz) {
  const box = document.getElementById('bizList');
  box.innerHTML = list.map(b => `
    <div class="biz-card">
      <h4>${b.name}</h4>
      <p>${b.categories.join(', ')} • ${b.desc}</p>
      <button onclick="toggleFav(${b.id})">☆</button>
    </div>`).join('');
}

// FAVORITES
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFav(id) {
  favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadBiz();
}

function loadFaves() {
  const favBiz = dummyBiz.filter(b => favorites.includes(b.id));
  document.getElementById('faveList').innerHTML = favBiz.length
    ? favBiz.map(b => `
        <div class="biz-card">
          <h4>${b.name}</h4>
          <p>${b.categories.join(', ')} • ${b.desc}</p>
        </div>`).join('')
    : '<p>No favorites yet.</p>';
}

// PROFILE
function showProfile() {
  document.getElementById('showUser').textContent = localStorage.getItem('savedUsername') || 'Guest';
}

document.getElementById('clearFaves').addEventListener('click', () => {
  favorites = [];
  localStorage.removeItem('favorites');
  loadFaves();
});

// LOGOUT
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  location = 'Generalhomepage.html';
});

// initial load
loadBiz();