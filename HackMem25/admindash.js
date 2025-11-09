
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');

    if (btn.dataset.tab === 'analytics') loadAnalytics();
    if (btn.dataset.tab === 'reports') loadReports();
    if (btn.dataset.tab === 'messages') loadMsgLists();
  });
});


const dummyClicks = [
  {bizId:1,name:"Mid-South Food Bank",clicks:120},
  {bizId:2,name:"Memphis Health Center",clicks:95},
  {bizId:3,name:"United Way Housing",clicks:80}
];
const dummyFavs = [
  {bizId:1,name:"Mid-South Food Bank",favs:42},
  {bizId:3,name:"United Way Housing",favs:38},
  {bizId:2,name:"Memphis Health Center",favs:25}
];

function loadAnalytics() {
  document.getElementById('totalUsers').textContent  = '127';
  document.getElementById('totalBiz').textContent    = '34';
  document.getElementById('totalReports').textContent= '12';

  const clickList = document.getElementById('clickRank');
  clickList.innerHTML = dummyClicks.map(b => `
    <li>${b.name} <span>${b.clicks} clicks</span></li>`).join('');

  const favList = document.getElementById('favRank');
  favList.innerHTML = dummyFavs.map(b => `
    <li>${b.name} <span>${b.favs} favorites</span></li>`).join('');
}

// ---------- REPORTS ----------
const dummyReports = [
  {id:1,bizName:"Mid-South Food Bank",user:"user123",reason:"Hours changed to 8-4",status:"open"},
  {id:2,bizName:"United Way Housing",user:"user456",reason:"Location moved",status:"open"}
];

function loadReports() {
  const box = document.getElementById('reportList');
  box.innerHTML = dummyReports.map(r => `
    <div class="report-card">
      <h4>${r.bizName}</h4>
      <p>${r.reason}</p>
      <small>by ${r.user} – ${r.status}</small>
      <div class="report-actions">
        <button class="btn-approve" onclick="resolveReport(${r.id},'approved')">Approve</button>
        <button class="btn-reject" onclick="resolveReport(${r.id},'rejected')">Reject</button>
        <button class="btn-resolve" onclick="resolveReport(${r.id},'resolved')">Resolve</button>
      </div>
    </div>`).join('');
}

function resolveReport(id, action) {
  alert(`Report ${id} marked ${action}`);
  // TODO: fetch PATCH /api/admin/reports/${id}  {status:action}
}


const dummyBiz = [
  {id:1,name:"Mid-South Food Bank"},
  {id:2,name:"Memphis Health Center"},
  {id:3,name:"United Way Housing"}
];
const dummyUsers = [
  {id:1,name:"user123"},
  {id:2,name:"user456"}
];

function loadMsgLists() {
  const bizSel = document.getElementById('bizSelect');
  bizSel.innerHTML = '<option>Select business</option>' +
    dummyBiz.map(b => `<option value="${b.id}">${b.name}</option>`).join('');

  const userSel = document.getElementById('userSelect');
  userSel.innerHTML = '<option>Select user</option>' +
    dummyUsers.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
}

function sendMsg(to) {
  const select = to === 'business' ? document.getElementById('bizSelect') : document.getElementById('userSelect');
  const chat   = to === 'business' ? document.getElementById('bizChat')   : document.getElementById('userChat');
  const input  = to === 'business' ? document.getElementById('bizReply')  : document.getElementById('userReply');

  const text = input.value.trim();
  if (!text) return alert('Type a message first.');
  const name = select.options[select.selectedIndex]?.text || 'Unknown';
  const side = 'Admin: ';
  chat.innerHTML += `<div>${side}${text}</div>`;
  input.value = '';
  // TODO: fetch POST /api/admin/message  {toType:to, toId:select.value, text}
}


document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  location = '../generalhomepage.html';
});

// initial load
loadAnalytics();