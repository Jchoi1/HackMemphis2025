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

    
    if (btn.dataset.tab === 'map' && !mapInitialized) {
      setTimeout(() => {
        initMap();
        mapInitialized = true;
      }, 200);
    }
  });
});

document.getElementById('homeBtn')?.addEventListener('click', () => {
  location = 'Userdashboard.html';
});
document.getElementById('needBtn').addEventListener('click', () => {
  location = 'filter.html';
});

// DEMO DATA
const dummyBiz = [
  {id:1, name:"Mid-South Food Bank", categories:["Food"], desc:"Groceries & hot meals"},
  {id:2, name:"Memphis Health Center", categories:["Health"], desc:"Free medical clinic"},
  {id:3, name:"United Way Housing", categories:["Housing"], desc:"Emergency shelter"}
];

function loadBiz(list = dummyBiz) {
  const box = document.getElementById('bizList');
  box.innerHTML = list.map(b => `
    <div class="biz-card">
      <h4>${b.name}</h4>
      <p>${b.categories.join(', ')} • ${b.desc}</p>
      <div class="card-actions">
        <button onclick="toggleFav(${b.id})" title="Favorite">☆</button>
        <button onclick="reportBiz(${b.id})" title="Report">🚩</button>
      </div>
    </div>`).join('');
}

// REPORT A BUSINESS
function reportBiz(id) {
  const reason = prompt('What needs to be reported?\n(e.g. hours wrong, location closed, etc.)');
  if (!reason) return;
  fetch('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bizId: id, reason, user: localStorage.getItem('savedUsername') || 'Guest' })
  }).then(r => r.json()).then(res => {
    alert(res.ok ? 'Report sent – thank you!' : 'Report failed.');
  });
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

// MAP
let map;
let mapInitialized = false;

function initMap() {
  const memphis = { lat: 35.1495, lng: -90.0490 };

  map = new google.maps.Map(document.getElementById("mapCanvas"), {
    center: memphis,
    zoom: 12
  });

  const geocoder = new google.maps.Geocoder();

  dummyBiz.forEach(b => {
    geocoder.geocode({ address: b.name + ", Memphis, TN" }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;

        const marker = new google.maps.Marker({
          map,
          position: location,
          title: b.name
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<h4>${b.name}</h4><p>${b.categories.join(', ')} • ${b.desc}</p>`
        });

        marker.addListener("click", () => infoWindow.open(map, marker));
      } else {
        console.error("Geocode failed for " + b.name + ": " + status);
      }
    });
  });
}
