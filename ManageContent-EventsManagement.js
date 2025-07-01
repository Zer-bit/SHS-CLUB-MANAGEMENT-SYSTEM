document.addEventListener('DOMContentLoaded', () => {
  const createEventBtn = document.querySelector('.create-event-btn'); 
  // make sure your button has class="create-event-btn"
  const modal = document.getElementById('createEventModal');
  const closeBtns = modal.querySelectorAll('.close-btn');

  createEventBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtns.forEach(b => b.addEventListener('click', () => modal.classList.remove('active')));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

function toggleDeleteModal(show) {
  document.getElementById('deleteModal')
          .classList.toggle('active', show);
}

// wire up all your “Delete” links/buttons:
document.querySelectorAll('.action-delete').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    toggleDeleteModal(true);
  });
});

function confirmDeletion() {
  // do your actual delete logic here...
  toggleDeleteModal(false);
}


// toggle helper
function toggleParticipantsModal(show) {
  document
    .getElementById('participantsModal')
    .classList.toggle('active', show);
}

// wire up every “See Participants” link
document.querySelectorAll('.action-more').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    // grab the event name from the same row:
    const row = btn.closest('tr');
    const eventName = row.querySelector('.event-name').textContent.trim();

    // TODO: replace this static data with real fetch/API
    const sampleData = [
      { name:'Rain Cruz',   email:'cruz@globalcity.edu.ph',   phone:'+63 974 404 6350', date:'Apr 14, 2025 3:25 PM' },
      { name:'Kate Santos', email:'santos@globalcity.edu.ph', phone:'+63 974 404 6351', date:'Apr 15, 2025 3:25 PM' }
    ];
    const maxParticipants = 50;

    // populate header
    document.getElementById('pm-event-name').textContent = eventName;
    document.getElementById('pm-registered').textContent = sampleData.length;
    document.getElementById('pm-maximum').textContent = maxParticipants;

    // build table rows
    const tbody = document.getElementById('pm-body');
    tbody.innerHTML = ''; // clear out
    sampleData.forEach((p,i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${p.name}</td>
        <td>${p.email}</td>
        <td>${p.phone}</td>
        <td>${p.date}</td>
      `;
      tbody.appendChild(tr);
    });

    // show it
    toggleParticipantsModal(true);
  });
});

// also allow clicking outside to close
document.getElementById('participantsModal')
  .addEventListener('click', e => {
    if (e.target.id === 'participantsModal') toggleParticipantsModal(false);
  });

  
  // ── LOGOUT CONFIRMATION ──
  const logoutLink = document.querySelector('.logout-link');
  const overlay    = document.getElementById('logoutConfirmOverlay');
  if (logoutLink && overlay) {
    const btnNo  = overlay.querySelector('.btn-no');
    const btnYes = overlay.querySelector('.btn-yes');
    logoutLink.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('active');
    });
    btnNo.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
    btnYes.addEventListener('click', () => {
      // redirect to your login page:
      window.location.href = 'index.html';
    });
  };