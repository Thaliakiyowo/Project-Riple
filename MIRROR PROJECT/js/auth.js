/* ================================================
   auth.js  —  RIPPLE Auth Pages Shared Logic
   Used by: login.html, register.html
   ================================================ */

/* ─────────────────────────────────────────────────
   PARTICLES
   ───────────────────────────────────────────────── */
function initParticles() {
  const bg = document.getElementById('particlesBg');
  if (!bg) return;

  const colors = [
    'rgba(243,112,30,',
    'rgba(75,96,127,',
    'rgba(232,216,201,',
  ];

  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const c = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 3 + 1;

    p.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${Math.random() * 100}%;
      top:    ${Math.random() * 100}%;
      background:        ${c}${(Math.random() * 0.5 + 0.3)});
      box-shadow: 0 0 ${size * 4}px ${c}0.6));
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay:    ${Math.random() * -14}s;
    `;
    bg.appendChild(p);
  }
}

/* ─────────────────────────────────────────────────
   TOGGLE PASSWORD VISIBILITY
   Call: togglePwd('inputId', buttonElement)
   ───────────────────────────────────────────────── */
function togglePwd(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  const svg = btn.querySelector('svg');

  svg.innerHTML = show
    /* eye-off icon */
    ? `<line x1="1" y1="1" x2="23" y2="23"></line>
       <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 7 11 7a19.3 19.3 0 0 1-2.34 3.12M14.6 14.6A5 5 0 0 1 12 17c-2.76 0-5-2.24-5-5 0-.86.22-1.67.6-2.38"></path>
       <path d="M1 12s4-7 11-7"></path>`
    /* eye icon */
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
       <circle cx="12" cy="12" r="3"></circle>`;
}

/* ─────────────────────────────────────────────────
   PASSWORD STRENGTH METER  (register only)
   ───────────────────────────────────────────────── */
function checkStrength(val) {
  const segs = [
    document.getElementById('seg1'),
    document.getElementById('seg2'),
    document.getElementById('seg3'),
    document.getElementById('seg4'),
  ];
  const label = document.getElementById('strengthLabel');
  if (!segs[0] || !label) return;

  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const colors = ['#ff3d5a', '#f97316', '#facc15', '#4caf7d'];
  const labels = ['Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];

  segs.forEach((s, i) => {
    s.style.background = (i < score)
      ? colors[score - 1]
      : 'rgba(255,255,255,0.08)';
  });

  if (val.length === 0) {
    label.textContent = 'Masukkan password';
    label.style.color = 'var(--muted)';
  } else {
    label.textContent = labels[score - 1] || 'Lemah';
    label.style.color = colors[score - 1] || '#ff3d5a';
  }
}

/* ─────────────────────────────────────────────────
   EMAIL VALIDATION  (register only)
   ───────────────────────────────────────────────── */
function validateEmail(input) {
  const hint = document.getElementById('emailHint');
  if (!hint) return;

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

  if (input.value.length > 0 && !valid) {
    hint.classList.add('show');
    input.classList.add('error');
    input.classList.remove('valid');
  } else if (valid) {
    hint.classList.remove('show');
    input.classList.remove('error');
    input.classList.add('valid');
  } else {
    hint.classList.remove('show');
    input.classList.remove('error', 'valid');
  }
}

/* ─────────────────────────────────────────────────
   PASSWORD MATCH CHECK  (register only)
   ───────────────────────────────────────────────── */
function checkMatch() {
  const pass = document.getElementById('regPassword');
  const conf = document.getElementById('confirmPassword');
  const hint = document.getElementById('matchHint');
  if (!pass || !conf || !hint) return;

  if (conf.value.length > 0 && conf.value !== pass.value) {
    hint.classList.add('show');
    conf.classList.add('error');
    conf.classList.remove('valid');
  } else if (conf.value.length > 0 && conf.value === pass.value) {
    hint.classList.remove('show');
    conf.classList.remove('error');
    conf.classList.add('valid');
  } else {
    hint.classList.remove('show');
    conf.classList.remove('error', 'valid');
  }
}

/* ─────────────────────────────────────────────────
   LOGIN FORM HANDLER
   ───────────────────────────────────────────────── */
function handleLogin(e) {
  e.preventDefault();

  const btn = document.getElementById('loginBtn');
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) return;

  /* ── Demo account ── */
  const DEMO_EMAIL    = 'demo@ripple.id';
  const DEMO_PASSWORD = 'ripple123';

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    alert('Email atau password salah.\n\nGunakan akun demo:\nEmail: demo@ripple.id\nPassword: ripple123');
    return;
  }

  btn.textContent = 'MEMVERIFIKASI...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = 'mirror.html';
  }, 1800);
}

/* ─────────────────────────────────────────────────
   REGISTER FORM HANDLER
   ───────────────────────────────────────────────── */
function handleRegister(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('confirmPassword').value;
  const agreed = document.getElementById('agreeTerms').checked;
  const btn = document.getElementById('registerBtn');

  /* Validation */
  if (!firstName) {
    alert('Nama depan wajib diisi.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Format email tidak valid.');
    return;
  }
  if (password.length < 8) {
    alert('Password minimal 8 karakter.');
    return;
  }
  if (password !== confirm) {
    alert('Password tidak cocok.');
    return;
  }
  if (!agreed) {
    alert('Setujui syarat & ketentuan untuk melanjutkan.');
    return;
  }

  btn.textContent = 'MEMBUAT AKUN...';
  btn.disabled = true;

  /* Simulate account creation — replace with real API call */
  setTimeout(() => {
    const overlay = document.getElementById('successOverlay');
    if (overlay) overlay.classList.add('show');
    setTimeout(() => {
      window.location.href = 'mirror.html';
    }, 2000);
  }, 1600);
}

/* ─────────────────────────────────────────────────
   SOCIAL LOGIN / REGISTER
   ───────────────────────────────────────────────── */
function socialLogin(provider) {
  alert(`Login dengan ${provider} — Fitur segera hadir! 🚀`);
}

function socialRegister(provider) {
  alert(`Daftar dengan ${provider} — Fitur segera hadir! 🚀`);
}

/* ─────────────────────────────────────────────────
   INIT ON DOM READY
   ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', initParticles);
