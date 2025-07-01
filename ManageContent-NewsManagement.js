document.addEventListener('DOMContentLoaded', () => {
  const createBtn = document.querySelector('.create-news-btn');
  const modal = document.getElementById('createNewsModal');
  const closeButtons = modal.querySelectorAll('.close-btn');

  createBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });

  // optional: close when clicking outside the box
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });

  // handle form submission
  document.getElementById('createNewsForm').addEventListener('submit', e => {
    e.preventDefault();
    // TODO: your submission logic here…
    modal.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal   = document.getElementById('confirmDeleteModal');
  const cancel  = modal.querySelector('[data-action="cancel"]');
  const confirm = modal.querySelector('[data-action="confirm"]');
  const closeX  = modal.querySelector('.close-btn');

  // 1) Open modal when any “Delete” button is clicked
  document.querySelectorAll('.action-delete').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();           // prevent actual navigation
      modal.classList.add('active');
      // Optionally remember which row to delete:
      modal._targetRow = e.currentTarget.closest('tr');
    });
  });

  // 2) Close on “Cancel” or “×”
  [cancel, closeX].forEach(el =>
    el.addEventListener('click', () => modal.classList.remove('active'))
  );

  // 3) Confirm deletion
  confirm.addEventListener('click', () => {
    modal.classList.remove('active');
    if (modal._targetRow) {
      modal._targetRow.remove();   // remove the <tr> from the table
      delete modal._targetRow;
    }
    // ...or perform your AJAX delete here...
  });

  // 4) Also close if clicking backdrop
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
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
