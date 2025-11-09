// ---------- TABS ----------
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});


function getCategories(){
  return [...document.querySelectorAll('#catPicker input[type=checkbox]:checked')]
         .map(cb => cb.value);
}


document.getElementById('cardForm').addEventListener('input', e => {
  const field = e.target.name;
  const val   = e.target.value;

  if (field === 'name')  document.getElementById('prevName').textContent = val || 'Your Name';
  if (field === 'desc')  document.getElementById('prevDesc').textContent = val || 'Description';
  if (field === 'hours') document.getElementById('prevHours').textContent = `Hours: ${val || 'Hours'}`;

  const email = document.querySelector('[name=email]').value;
  const phone = document.querySelector('[name=phone]').value;
  document.getElementById('prevContact').textContent = [email, phone].filter(Boolean).join(' • ');

  
  if (e.target.type === 'checkbox') {
    const tags = getCategories();
    document.getElementById('prevTag').textContent = tags.length ? tags.join(', ') : 'Category';
  }
});


document.getElementById('cardForm').addEventListener('submit', e => {
  e.preventDefault();
  const categories = getCategories();
  if (!categories.length) {
    alert('Pick at least one category.');
    return;
  }

  const payload = {
    name:     document.querySelector('[name=name]').value,
    address:  document.querySelector('[name=address]').value,
    hours:    document.querySelector('[name=hours]').value,
    desc:     document.querySelector('[name=desc]').value,
    email:    document.querySelector('[name=email]').value,
    phone:    document.querySelector('[name=phone]').value,
    categories
  };

  console.log('Saving card:', payload);
  alert('Card saved (multi-cat demo).');
});

// ---------- DEMO PRELOAD ----------
const demoTags = ['Food', 'Housing'];
demoTags.forEach(t =>
  document.querySelector(`#catPicker input[value="${t}"]`).checked = true
);
document.getElementById('prevTag').textContent = demoTags.join(', ');


document.getElementById('userMsgs').innerHTML = `
  <div class="msg">User123: "Thanks for the help!"</div>
  <div class="msg">User456: "What are your weekend hours?"</div>
`;
document.getElementById('adminMsgs').innerHTML = `
  <div class="msg">Admin: "Please update holiday hours."</div>
`;

function sendReply(to) {
  const box = to === 'user' ? document.getElementById('replyUser') : document.getElementById('replyAdmin');
  const text = box.value.trim();
  if (!text) return alert('Type a message first.');
  alert(`Sent to ${to}: ${text}`);
  box.value = '';
}


document.getElementById('settingsForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Settings updated (demo).');
});

// ---------- LOGOUT ----------
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  location = 'Generalhomepage.html';
});

document.getElementById('catPicker').addEventListener('click', e => {
  const card = e.target.closest('.cat-card');
  if (!card) return;
  const cb = card.querySelector('input[type=checkbox]');
  cb.checked = !cb.checked;
  card.classList.toggle('selected', cb.checked);
});