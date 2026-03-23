(function () {
  'use strict';

  /* Custom Cursor */
  (function initCursor() {
    if ('ontouchstart' in window) return;

    var dot = Object.assign(document.createElement('div'), { id: 'rpl-cursor-dot' });
    var ring = Object.assign(document.createElement('div'), { id: 'rpl-cursor-ring' });
    document.body.append(dot, ring);

    var mx = -200, my = -200, rx = -200, ry = -200;
    var lastTrail = 0;
    var trailColors = [
      'rgba(243,112,30,0.65)',
      'rgba(75,96,127,0.5)',
      'rgba(232,216,201,0.45)',
    ];

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';

      var now = Date.now();
      if (now - lastTrail > 40) {
        lastTrail = now;
        var t = document.createElement('div');
        t.className = 'rpl-trail';
        var sz = 3 + Math.random() * 3.5;
        Object.assign(t.style, {
          left: mx + 'px', top: my + 'px',
          width: sz + 'px', height: sz + 'px',
          background: trailColors[Math.floor(Math.random() * trailColors.length)],
        });
        document.body.appendChild(t);
        setTimeout(function () { t.remove(); }, 560);
      }
    }, { passive: true });

    (function followRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(followRing);
    })();

    document.addEventListener('mousedown', function () {
      dot.style.cssText += ';width:14px;height:14px';
      ring.style.cssText += ';width:50px;height:50px;border-color:rgba(243,112,30,0.95)';
    });
    document.addEventListener('mouseup', function () {
      dot.style.cssText += ';width:8px;height:8px';
      ring.style.cssText += ';width:34px;height:34px;border-color:rgba(243,112,30,0.5)';
    });

    document.addEventListener('mouseover', function (e) {
      var isInteractive = e.target.closest(
        'a, button, [role="button"], input, textarea, select, .chip, .fdot, label'
      );
      if (isInteractive) {
        dot.style.background = '#fff';
        dot.style.width = dot.style.height = '5px';
        ring.style.width = ring.style.height = '46px';
        ring.style.borderColor = 'rgba(243,112,30,0.9)';
      } else {
        dot.style.background = '#f3701e';
        dot.style.width = dot.style.height = '8px';
        ring.style.width = ring.style.height = '34px';
        ring.style.borderColor = 'rgba(243,112,30,0.5)';
      }
    });
  })();

  /* Cinematic Splash Screen */
  (function initSplash() {
    var splash = document.createElement('div');
    splash.id = 'rpl-splash';
    splash.innerHTML =
      '<div id="rpl-splash-r3"></div>' +
      '<div id="rpl-splash-r2"></div>' +
      '<div id="rpl-splash-r1"></div>' +
      '<div id="rpl-splash-logo">RIPPLE</div>' +
      '<div id="rpl-splash-tag">Every Habit Shapes the Future</div>';
    document.body.appendChild(splash);
    setTimeout(function () { splash.remove(); }, 2200);
  })();

  /* Streak Counter */
  (function initStreak() {
    var KEY_S = 'rpl_streak', KEY_L = 'rpl_last';
    var today = new Date().toDateString();
    var lastVisit = localStorage.getItem(KEY_L);
    var streak = parseInt(localStorage.getItem(KEY_S) || '1', 10);

    if (lastVisit && lastVisit !== today) {
      var yest = new Date();
      yest.setDate(yest.getDate() - 1);
      streak = (lastVisit === yest.toDateString()) ? streak + 1 : 1;
    }

    localStorage.setItem(KEY_S, streak);
    localStorage.setItem(KEY_L, today);

    var widget = document.createElement('div');
    widget.id = 'rpl-streak';
    widget.innerHTML =
      '<div id="rpl-streak-flame">🔥</div>' +
      '<div id="rpl-streak-count">' + streak + '</div>' +
      '<div id="rpl-streak-label">Day Streak</div>';
    document.body.appendChild(widget);

    widget.addEventListener('click', function () {
      showToast('🔥', 'Streak Aktif!', 'Kamu sudah ' + streak + ' hari berturut-turut di RIPPLE!', true);
    });

    var MILESTONES = [3, 7, 14, 30, 50, 100];
    if (MILESTONES.includes(streak)) {
      setTimeout(function () {
        widget.classList.add('rpl-milestone');
        showToast('🔥', streak + '-Day Streak!', 'Luar biasa! ' + streak + ' hari berturut-turut — kamu konsisten!', true);
        setTimeout(function () { widget.classList.remove('rpl-milestone'); }, 1000);
      }, 2700);
    }
  })();

  var toastStack = document.createElement('div');
  toastStack.id = 'rpl-toast-stack';
  document.body.appendChild(toastStack);

  var _shownToasts = new Set(
    JSON.parse(sessionStorage.getItem('rpl_toasts') || '[]')
  );

  function showToast(icon, title, sub, force) {
    var key = title;
    if (!force && _shownToasts.has(key)) return;
    _shownToasts.add(key);
    sessionStorage.setItem('rpl_toasts', JSON.stringify([..._shownToasts]));

    var duration = 4500;
    var toast = document.createElement('div');
    toast.className = 'rpl-toast';
    toast.style.setProperty('--toast-duration', duration + 'ms');
    toast.innerHTML =
      '<div class="rpl-toast-icon">' + icon + '</div>' +
      '<div>' +
        '<div class="rpl-toast-title">' + title + '</div>' +
        '<div class="rpl-toast-sub">' + sub + '</div>' +
      '</div>';
    toastStack.appendChild(toast);

    var dismiss = function () {
      if (!toast.parentNode) return;
      toast.classList.add('rpl-toast-out');
      setTimeout(function () { toast.remove(); }, 400);
    };

    toast.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);
  }

  /* Make showToast globally accessible */
  window.showToast = showToast;

  /* Auto-trigger toasts based on page */
  (function autoToasts() {
    var path = location.pathname.toLowerCase();
    var isFirstEver = !localStorage.getItem('rpl_visited');
    if (isFirstEver) localStorage.setItem('rpl_visited', '1');

    var queue = [];

    if (path.includes('mirror')) {
      queue.push({ d: 1300, i: '🌍', t: 'Earth Mirror!', s: 'Lihat dampak nyata kebiasaanmu terhadap Bumi.' });
    }
    if (path.includes('about')) {
      queue.push({ d: 1300, i: '👥', t: 'Tim RIPPLE!', s: 'Kamu bertemu para pembuat RIPPLE. Thanks sudah berkunjung!' });
    }
    if (path.includes('login') && !path.includes('register')) {
      queue.push({ d: 1300, i: '👋', t: 'Selamat Datang!', s: 'Masuk dan lanjutkan perjalanan Bumi-mu.' });
    }
    if (path.includes('register')) {
      queue.push({ d: 1300, i: '🌱', t: 'Pejuang Baru!', s: 'Daftar & mulai membentuk Bumi yang lebih baik.' });
    }
    if (isFirstEver) {
      queue.push({ d: 2200, i: '🚀', t: 'Penjelajah Pertama!', s: 'Kamu baru pertama kali membuka RIPPLE. Selamat bergabung!' });
    }

    queue.forEach(function (a) {
      setTimeout(function () { showToast(a.i, a.t, a.s); }, a.d);
    });

    var scrollDone = false;
    window.addEventListener('scroll', function () {
      if (!scrollDone && window.scrollY > window.innerHeight * 0.45) {
        scrollDone = true;
        showToast('📜', 'Penjelajah!', 'Kamu sudah menelusuri halaman ini.');
      }
    }, { passive: true });
  })();

  /* Live Impact Widget */
  (function initImpact() {
    var trees = 12340 + Math.floor(Math.random() * 600);
    var co2 = 4820 + Math.floor(Math.random() * 200);
    var km = 76500 + Math.floor(Math.random() * 1200);

    var widget = document.createElement('div');
    widget.id = 'rpl-impact';
    widget.innerHTML =
      '<div class="rpl-imp-head">' +
        '<div class="rpl-imp-dot"></div>' +
        '<div class="rpl-imp-title">Live Impact Hari Ini</div>' +
      '</div>' +
      '<div class="rpl-imp-row">' +
        '<span class="rpl-imp-emoji">🌳</span>' +
        '<span class="rpl-imp-num" id="rpl-iw-tree">—</span>' +
        '<span class="rpl-imp-desc">pohon setara</span>' +
      '</div>' +
      '<div class="rpl-imp-row">' +
        '<span class="rpl-imp-emoji">💨</span>' +
        '<span class="rpl-imp-num" id="rpl-iw-co2">—</span>' +
        '<span class="rpl-imp-desc">kg CO₂ hemat</span>' +
      '</div>' +
      '<div class="rpl-imp-row">' +
        '<span class="rpl-imp-emoji">🚶</span>' +
        '<span class="rpl-imp-num" id="rpl-iw-km">—</span>' +
        '<span class="rpl-imp-desc">km bebas emisi</span>' +
      '</div>';
    document.body.appendChild(widget);

    function updateImpact() {
      var t = document.getElementById('rpl-iw-tree');
      var c = document.getElementById('rpl-iw-co2');
      var k = document.getElementById('rpl-iw-km');
      if (t) t.textContent = trees.toLocaleString('id-ID');
      if (c) c.textContent = co2.toLocaleString('id-ID');
      if (k) k.textContent = km.toLocaleString('id-ID');
    }

    updateImpact();

    setInterval(function () {
      trees += Math.floor(Math.random() * 4);
      co2 += Math.floor(Math.random() * 6);
      km += Math.floor(Math.random() * 10);
      updateImpact();
    }, 2500);

    widget.addEventListener('click', function () {
      showToast('🌍', 'Dampak Kolektif!', 'Hari ini ' + trees.toLocaleString('id-ID') + ' pohon setara sudah dihasilkan bersama!', true);
    });
  })();

})();


(function () {
  'use strict';

  /* Scroll Progress Bar */
  (function initProgress() {
    var bar = Object.assign(document.createElement('div'), { id: 'rpl-progress' });
    document.body.appendChild(bar);

    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  })();

  /* Dark / Light Mode Toggle */
  (function initThemeToggle() {
    var PREF_KEY = 'rpl_theme';
    var saved = localStorage.getItem(PREF_KEY);
    if (saved === 'light') document.body.classList.add('rpl-light');

    var btn = Object.assign(document.createElement('div'), { id: 'rpl-theme-btn' });
    btn.title = 'Toggle Dark/Light Mode';
    btn.textContent = document.body.classList.contains('rpl-light') ? '🌙' : '☀️';
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
      var isLight = document.body.classList.toggle('rpl-light');
      btn.textContent = isLight ? '🌙' : '☀️';
      localStorage.setItem(PREF_KEY, isLight ? 'light' : 'dark');

      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s, border-color 0.22s';
      btn.style.transform = 'rotate(360deg) scale(1.2)';
      setTimeout(function () {
        btn.style.transition = '';
        btn.style.transform = '';
      }, 500);
    });
  })();

  /* Back to Top Button */
  (function initBackToTop() {
    var btn = document.createElement('div');
    btn.id = 'rpl-top-btn';
    btn.title = 'Kembali ke atas';
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      btn.classList.toggle('rpl-top-visible', window.scrollY > 320);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* Mouse-Follow Glow */
  (function initMouseGlow() {
    if ('ontouchstart' in window) return;
    var glow = Object.assign(document.createElement('div'), { id: 'rpl-mouse-glow' });
    document.body.appendChild(glow);

    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  })();

  /* Keyboard Shortcuts Panel */
  (function initKeyboardPanel() {
    var overlay = document.createElement('div');
    overlay.id = 'rpl-kb-overlay';

    var shortcuts = [
      {
        section: 'Navigasi',
        rows: [
          { desc: 'Buka Keyboard Shortcuts', keys: ['?'] },
          { desc: 'Tutup panel / modal', keys: ['Esc'] },
          { desc: 'Scroll ke atas', keys: ['↑', '↑'] },
        ]
      },
      {
        section: 'Earth Mirror',
        rows: [
          { desc: 'Toggle Horror Mode', keys: ['H'] },
          { desc: 'Kirim input AI (form)', keys: ['Enter'] },
        ]
      },
      {
        section: 'Sitewide',
        rows: [
          { desc: 'Toggle Dark / Light Mode', keys: ['Klik ☀️'] },
          { desc: 'Kembali ke atas halaman', keys: ['Klik ⬆'] },
          { desc: 'Lihat streak aktifmu', keys: ['Klik 🔥'] },
          { desc: 'Lihat dampak kolektif', keys: ['Klik 🌳'] },
        ]
      },
    ];

    overlay.innerHTML =
      '<div id="rpl-kb-panel">' +
        '<div class="rpl-kb-header">' +
          '<div class="rpl-kb-title">⌨ Keyboard Shortcuts</div>' +
          '<div class="rpl-kb-close" id="rpl-kb-close-btn">✕</div>' +
        '</div>' +
        shortcuts.map(function (s) {
          return '<div class="rpl-kb-section">' +
            '<div class="rpl-kb-section-title">' + s.section + '</div>' +
            s.rows.map(function (r) {
              return '<div class="rpl-kb-row">' +
                '<span class="rpl-kb-desc">' + r.desc + '</span>' +
                '<div class="rpl-kb-keys">' +
                  r.keys.map(function (k) { return '<span class="rpl-key">' + k + '</span>'; }).join('') +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>';
        }).join('') +
        '<div class="rpl-kb-hint">Tekan <strong>?</strong> kapan saja untuk membuka / menutup panel ini</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var closePanel = function () { overlay.classList.remove('rpl-kb-open'); };
    var openPanel = function () { overlay.classList.add('rpl-kb-open'); };
    var toggle = function () { overlay.classList.toggle('rpl-kb-open'); };

    var closeBtn = document.getElementById('rpl-kb-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closePanel(); });

    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (['input', 'textarea', 'select'].includes(tag)) return;
      if (e.key === '?') toggle();
      if (e.key === 'Escape') closePanel();
    });

    setTimeout(function () {
      var hint = document.createElement('div');
      hint.className = 'rpl-toast';
      hint.style.setProperty('--toast-duration', '5000ms');
      hint.innerHTML =
        '<div class="rpl-toast-icon">⌨️</div>' +
        '<div>' +
          '<div class="rpl-toast-title">Keyboard Shortcuts</div>' +
          '<div class="rpl-toast-sub">Tekan <strong style="color:#f3701e">?</strong> untuk melihat semua shortcut site ini</div>' +
        '</div>';
      var stack = document.getElementById('rpl-toast-stack');
      if (stack) {
        stack.appendChild(hint);
        hint.addEventListener('click', function () {
          hint.classList.add('rpl-toast-out');
          setTimeout(function () { hint.remove(); }, 400);
          openPanel();
        });
        setTimeout(function () {
          hint.classList.add('rpl-toast-out');
          setTimeout(function () { hint.remove(); }, 400);
        }, 5200);
      }
    }, 3500);
  })();

})();
