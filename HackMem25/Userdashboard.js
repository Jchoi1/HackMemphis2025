
let mapInitialized = false;
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
      setTimeout(() => { initMap(); mapInitialized = true; }, 200);
    }
  });
});

document.getElementById('homeBtn')?.addEventListener('click', () => {
  location = 'Userdashboard.html';
});
document.getElementById('needBtn').addEventListener('click', () => {
  location = 'filter.html';
});


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

// ----------  ONE-TIME STORY  ----------
const household   = document.getElementById('household');
const employed    = document.getElementById('employed');
const transport   = document.getElementById('transport');
const extra       = document.getElementById('extra');
const attachToggle= document.getElementById('attachToggle');
const needsSummary= document.getElementById('needsSummary');
const saveStoryBtn= document.getElementById('saveStoryBtn');

function buildSummary(){
  const people = household.value || '1';
  const job    = employed.value;
  const car    = transport.value;
  const needs  = [...document.querySelectorAll('#needsGrid input:checked')].map(cb => cb.value);
  const other  = extra.value.trim();
  let txt = `Household of ${people} people. Currently employed: ${job}. Transportation: ${car}.`;
  if (needs.length) txt += ` Needs: ${needs.join(', ')}.`;
  if (other) txt += ` Additional info: ${other}`;
  needsSummary.textContent = txt;
  return txt;
}

// live preview + auto-save on change
document.addEventListener('input', buildSummary);
saveStoryBtn.addEventListener('click', () => {
  const summary = buildSummary();
  const data = {
    household: household.value,
    employed: employed.value,
    transport: transport.value,
    needs: [...document.querySelectorAll('#needsGrid input:checked')].map(cb => cb.value),
    extra: extra.value,
    attachOnFirstMsg: attachToggle.checked,
    needsSummary: summary
  };
  localStorage.setItem('userStory', JSON.stringify(data));
  alert('Story saved!');
});

function showProfile() {
  // 1.  show username
  document.getElementById('showUser').textContent = localStorage.getItem('savedUsername') || 'Guest';
  // 2.  load story if saved
  const saved = JSON.parse(localStorage.getItem('userStory') || '{}');
  if (saved.household) household.value = saved.household;
  if (saved.employed) employed.value = saved.employed;
  if (saved.transport) transport.value = saved.transport;
  if (saved.extra) extra.value = saved.extra;
  if (saved.attachOnFirstMsg !== undefined) attachToggle.checked = saved.attachOnFirstMsg;
  saved.needs?.forEach(n => {
    const cb = document.querySelector(`#needsGrid input[value="${n}"]`);
    if (cb) cb.checked = true;
  });
  buildSummary();
}

document.getElementById('clearFaves').addEventListener('click', () => {
  favorites = [];
  localStorage.removeItem('favorites');
  loadFaves();
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  location = 'Generalhomepage.html';
});

// ----------  MAP  ----------
let map;
function initMap() {
  const memphis = { lat: 35.1495, lng: -90.0490 };
  map = new google.maps.Map(document.getElementById("mapCanvas"), { center: memphis, zoom: 12 });
  dummyBiz.forEach(b => {
    new google.maps.Marker({
      position: { lat: memphis.lat + Math.random() * 0.05, lng: memphis.lng + Math.random() * 0.05 },
      map,
      title: b.name
    });
  });
}

// initial load
loadBiz();