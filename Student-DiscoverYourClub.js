


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

document.addEventListener('DOMContentLoaded', () => {
  const tabs      = document.querySelectorAll('.quiz-tabs .tab');
  const panels    = document.querySelectorAll('.quiz-wrapper.panel');
  const form      = document.querySelector('.quiz-form');

  function showPanel(id) {
    panels.forEach(p => p.id === id
      ? p.classList.add('active')
      : p.classList.remove('active'));
    tabs.forEach(t => t.dataset.target === id
      ? t.classList.add('active')
      : t.classList.remove('active'));
  }

  // clicking tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => showPanel(tab.dataset.target));
  });

  // on form submit, show results
  form.addEventListener('submit', e => {
    e.preventDefault();
    showPanel('results');
  });

  // optional: “Browse All” could go back to list of clubs
  document.getElementById('browseAll')
    .addEventListener('click', () => {
      window.location.href = 'Student-ListOfClub.html';
    });
});
