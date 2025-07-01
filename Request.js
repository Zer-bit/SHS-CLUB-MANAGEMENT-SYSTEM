document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.app-tab');
  const tableRows = Array.from(document.querySelectorAll('.applications-table tbody tr'));

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1) mark active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 2) decide which status to show
      const label = tab.textContent.match(/\((\d+)\)$/)
        ? tab.textContent.replace(/\s*\(\d+\)$/, '').trim()
        : tab.textContent.trim(); 
      // e.g. "Pending", "Approved", "Rejected" or "All Applications"

      // 3) show/hide rows
      tableRows.forEach(row => {
        if (label === 'All Applications') {
          row.style.display = '';
        } else {
          const statusCell = row.querySelector('td:nth-child(6)').textContent.trim();
          row.style.display = (statusCell === label) ? '' : 'none';
        }
      });
    });
  });
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