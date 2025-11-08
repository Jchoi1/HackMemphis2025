// TAB SWITCHING
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // update active states
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');

    // load tab-specific stuff
    if (btn.dataset.tab === 'home') loadBiz();
    if (btn.dataset.tab === 'faves') loadFaves();
    if (btn.dataset.tab === 'profile') showProfile();
  });
});

// DEMO BUSINESS LIST
const dummyBiz = [
  {id:1,name:"Mid-South Food Bank",tag:"Food",desc:"Groceries & hot meals"},
  {id:2,name:"Memphis Health Center",tag:"Health",desc:"Free medical clinic"},
  {id:3,name:"United Way Housing",tag:"Housing",desc:"Emergency shelter"}
];

function loadBiz(list = dummyBiz) {
  const box = document.getElementById('bizList');
  box.innerHTML = list.map(b => `
    <div class="biz-card">
      <h4>${b.name}</h4>
      <p>${b.tag} • ${b.desc}</p>
      <button onclick="toggleFav(${b.id})">☆</button>
    </div>`).join('');
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