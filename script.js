// script.js

// ****************************************************************************
// GLOBAL STATE
// ****************************************************************************
let pendingRole = 'student';  // will track whether we started from "student" or "admin"

// ****************************************************************************
// HELPERS
// ****************************************************************************

// Show the login/register popup
function showLoginForm() {
  document.getElementById('loginPopup').style.display = 'flex';
}

// Hide a modal overlay by its ID
function hideModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.style.display = 'none';
}

// ****************************************************************************
// MAIN INITIALIZATION
// ****************************************************************************
document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------------------------
  // GLOBAL CLICK → backdrop closes any open overlay
  // ----------------------------------------------------------------------------
  window.addEventListener('click', e => {
    ['loginPopup','emailModal','codeModal','successModal'].forEach(id => {
      const overlay = document.getElementById(id);
      if (e.target === overlay) overlay.style.display = 'none';
    });
  });

  // ----------------------------------------------------------------------------
  // ROLE TABS (Student / Admin)
  // ----------------------------------------------------------------------------
  document.querySelectorAll('.popup-tabs .tab').forEach(btn => {
    btn.addEventListener('click', e => {
      // Activate clicked tab
      document.querySelectorAll('.popup-tabs .tab').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');

      // Show matching role-view
      const role = e.currentTarget.dataset.role; // "student" or "admin"
      document.querySelectorAll('.role-view')
        .forEach(rv => rv.classList.toggle('active', rv.classList.contains(`${role}-view`)));

      // Reset to the “Login” subtab
      document.querySelectorAll('.popup-subtabs .subtab').forEach(s => s.classList.remove('active'));
      document.querySelector('.popup-subtabs .subtab[data-view="login"]').classList.add('active');

      // Show that role’s login view
      document.querySelectorAll('.views .view')
        .forEach(v => v.classList.toggle('active', v.id === `${role}-login`));
    });
  });

  // ----------------------------------------------------------------------------
  // LOGIN / REGISTER SUBTABS
  // ----------------------------------------------------------------------------
  document.querySelectorAll('.popup-subtabs .subtab').forEach(btn => {
    btn.addEventListener('click', e => {
      // Activate clicked subtab
      document.querySelectorAll('.popup-subtabs .subtab').forEach(s => s.classList.remove('active'));
      e.currentTarget.classList.add('active');

      // Show matching view
      const view = e.currentTarget.dataset.view; // "login" or "register"
      const role = document.querySelector('.popup-tabs .tab.active').dataset.role;
      document.querySelectorAll('.views .view')
        .forEach(v => v.classList.toggle('active', v.id === `${role}-${view}`));
    });
  });

  // ----------------------------------------------------------------------------
  // EMAIL AUTH FLOW (with HTML5 validation)
  // ----------------------------------------------------------------------------

  // 1) Intercept “Create Account” clicks to launch emailModal
  document.querySelectorAll('#student-register .btn-login, #admin-register .btn-login')
    .forEach(btn => {
      btn.addEventListener('click', e => {
        const form = btn.closest('form');
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        e.preventDefault();

        // remember which role they were on:
        pendingRole = document.querySelector('.popup-tabs .tab.active').dataset.role;

        hideModal('loginPopup');
        document.getElementById('emailModal').style.display = 'flex';
      });
    });

  // 2) Send Code → show codeModal
  document.getElementById('sendCodeBtn').addEventListener('click', e => {
    e.preventDefault();
    hideModal('emailModal');
    document.getElementById('codeModal').style.display = 'flex';
  });

  // 3) Verify Code → show successModal
  document.getElementById('verifySubmit').addEventListener('click', e => {
    e.preventDefault();
    hideModal('codeModal');
    document.getElementById('successModal').style.display = 'flex';
  });

  // 4) Proceed → hide successModal, reopen loginPopup at correct role-login
  document.getElementById('proceedBtn').addEventListener('click', e => {
    e.preventDefault();
    hideModal('successModal');
    showLoginForm();

    // Reset to the correct role tab
    document.querySelectorAll('.popup-tabs .tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.popup-tabs .tab[data-role="${pendingRole}"]`).classList.add('active');

    // Reset to login subtab
    document.querySelectorAll('.popup-subtabs .subtab').forEach(s => s.classList.remove('active'));
    document.querySelector('.popup-subtabs .subtab[data-view="login"]').classList.add('active');

    // Show the correct login view
    document.querySelectorAll('.views .view')
      .forEach(v => v.classList.toggle('active', v.id === `${pendingRole}-login`));
  });

  // 5) Wire up any “×” buttons inside codeModal / successModal
  document.querySelectorAll('.modal-overlay .close-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const overlay = e.currentTarget.closest('.modal-overlay');
      if (overlay) overlay.style.display = 'none';
    });
  });

});

// ****************************************************************************
// INLINE VALIDATION
// ****************************************************************************
function validateAdminLogin() {
  const username = document.getElementById("adm-email").value.trim();
  const password = document.getElementById("adm-pass").value;

  if (username === "admin@globalcity.sti.edu.ph" && password === "admin123") {
    alert("Login Successful");
    window.location.href = "HomeNews.html";
    return false;
  }

  alert("Email or password is incorrect.");
  return false;
}

function validateStudentLogin() {
  const username = document.getElementById("stu-email").value.trim();
  const password = document.getElementById("stu-pass").value;

  if (username === "student@globalcity.sti.edu.ph" && password === "student123") {
    alert("Login Successful");
    window.location.href = "Student-HomeNews.html";
    return false;
  }

  alert("Email or password is incorrect.");
  return false;
}
