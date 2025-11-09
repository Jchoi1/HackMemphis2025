const needOptions = [
  {id:'food',   icon:'🍲', label:'I need food'},
  {id:'health', icon:'🏥', label:'I need health care'},
  {id:'housing',icon:'🏠', label:'I need housing'},
  {id:'clothing',icon:'👕', label:'I need clothing'},
  {id:'taxes',  icon:'💰', label:'I need tax help'},
  {id:'child',  icon:'🧸', label:'I need childcare'},
  {id:'transport',icon:'🚍', label:'I need transportation'},
  {id:'legal',  icon:'⚖️', label:'I need legal help'}
];

const stepNeeds   = document.getElementById('stepNeeds');
const stepResults = document.getElementById('stepResults');
const needsGrid   = document.getElementById('needsGrid');
const resultsGrid = document.getElementById('resultsGrid');
const nextBtn     = document.getElementById('nextBtn');
const backBtn     = document.getElementById('backBtn');
const skipBtn     = document.getElementById('skipBtn');
const restartBtn  = document.getElementById('restartBtn');

let selected = [];

function renderNeeds() {
  needsGrid.innerHTML = needOptions.map(n => `
    <div class="need-card" data-id="${n.id}">
      <div class="need-icon">${n.icon}</div>
      <div class="need-label">${n.label}</div>
    </div>`).join('');
}
renderNeeds();

needsGrid.addEventListener('click', e => {
  const card = e.target.closest('.need-card');
  if (!card) return;
  const id = card.dataset.id;
  card.classList.toggle('selected');
  selected = [...document.querySelectorAll('.need-card.selected')].map(c => c.dataset.id);
});

nextBtn.addEventListener('click', () => {
  stepNeeds.classList.remove('active');
  stepResults.classList.add('active');
  runFilter();
});

document.getElementById('homeBtn')?.addEventListener('click', () => {
  location = 'Userdashboard.html';
});

backBtn.addEventListener('click', () => {
  stepResults.classList.remove('active');
  stepNeeds.classList.add('active');
});

skipBtn.addEventListener('click', () => {
  selected = [];
  stepNeeds.classList.remove('active');
  stepResults.classList.add('active');
  runFilter();
});

restartBtn.addEventListener('click', () => {
  selected = [];
  document.querySelectorAll('.need-card').forEach(c => c.classList.remove('selected'));
  stepResults.classList.remove('active');
  stepNeeds.classList.add('active');
});

const dummyBiz = [
  {id:1,name:"Mid-South Food Bank",categories:["Food"],desc:"Groceries & hot meals"},
  {id:2,name:"Memphis Health Center",categories:["Health"],desc:"Free medical clinic"},
  {id:3,name:"United Way Housing",categories:["Housing"],desc:"Emergency shelter"},
  {id:4,name:"Grizzly Closet",categories:["Clothing"],desc:"Free clothes for all ages"},
  {id:5,name:"Tax Aid Memphis",categories:["Taxes"],desc:"Free tax prep & filing"},
  {id:6,name:"Bear Necessities",categories:["Food","Child"],desc:"Food + baby supplies"},
  {id:7,name:"Shelter + Food Hub",categories:["Housing","Food"],desc:"Meals & shelter beds"},
  {id:8,name:"Legal Aid Society",categories:["Legal"],desc:"Free legal advice"}
];

function runFilter() {
  const wanted = selected.length ? selected : null;
  const hits = wanted
    ? dummyBiz.filter(b => b.categories.some(cat => wanted.includes(cat)))
    : dummyBiz;

  resultsGrid.innerHTML = hits.length
    ? hits.map(b => `
        <div class="result-card">
          <h4>${b.name}</h4>
          <p class="tag-line">${b.categories.map(c => `<span class="tag" data-cat="${c}">${c}</span>`).join('')}</p>
          <p>${b.desc}</p>
          <button onclick="viewBiz(${b.id})">View</button>
          <button onclick="toggleFav(${b.id})">☆</button>
        </div>`).join('')
    : '<p>No matches – try selecting more needs or skip to see all.</p>';
}

function viewBiz(id) {
  alert('Open detail / directions for id ' + id);
}

let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFav(id) {
  favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
  localStorage.setItem('favorites', JSON.stringify(favorites));
  const btn = event.target;
  btn.textContent = favorites.includes(id) ? '★' : '☆';
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('tag')) {
    const cat = e.target.dataset.cat;
    selected = [cat];
    runFilter();
    document.getElementById('wizContent').scrollTop = 0;
  }
});