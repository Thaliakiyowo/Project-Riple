(function () {
  'use strict';

  initParallaxStars();
  initHorrorMode();
  initHabitTicker();

  function initParallaxStars() {
    var starContainer = document.getElementById('mirrorStars');
    if (!starContainer) return;

    for (var i = 0; i < 120; i++) {
      var s = document.createElement('div');
      s.className = 'm-star';
      var size = 1 + Math.random() * 2.5;
      s.style.cssText =
        'width:' + size + 'px;height:' + size + 'px;' +
        'left:' + (Math.random() * 100) + '%;' +
        'top:' + (Math.random() * 100) + '%;' +
        'animation-delay:' + (Math.random() * 3) + 's;' +
        'animation-duration:' + (2 + Math.random() * 3) + 's;';
      starContainer.appendChild(s);
    }

    var heroVisual = document.querySelector('.hero-visual');
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var sy = window.scrollY;
          if (heroVisual) {
            heroVisual.style.transform = 'translateY(' + (sy * 0.25) + 'px) scale(' + (1 - sy * 0.0003) + ')';
            heroVisual.style.opacity = Math.max(0, 1 - sy * 0.003);
          }
          if (starContainer) {
            starContainer.style.transform = 'translateY(' + (sy * 0.08) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function initHorrorMode() {
    var HORROR_THRESHOLD = 40;
    var banner = document.getElementById('horrorBanner');
    var scoreEl = document.getElementById('earthScore');
    if (!scoreEl) return;

    var observer = new MutationObserver(checkHorror);
    observer.observe(scoreEl, { childList: true, subtree: true, characterData: true });
    setInterval(checkHorror, 2000);

    function checkHorror() {
      var txt = scoreEl.textContent || '0';
      var score = parseInt(txt.replace('%', '')) || 0;

      if (score > 0 && score < HORROR_THRESHOLD) {
        document.body.classList.add('horror-mode');
        if (banner) banner.style.display = 'block';
      } else {
        document.body.classList.remove('horror-mode');
        if (banner) banner.style.display = 'none';
      }
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'h' || e.key === 'H') {
        var tag = (e.target.tagName || '').toLowerCase();
        if (['input', 'textarea', 'select'].includes(tag)) return;
        document.body.classList.toggle('horror-mode');
        if (banner) banner.style.display = document.body.classList.contains('horror-mode') ? 'block' : 'none';
      }
    });
  }

  function initHabitTicker() {
    var names = [
      'Andi (Jakarta)', 'Sari (Bandung)', 'Budi (Surabaya)', 'Nisa (Medan)',
      'Rizky (Yogya)', 'Dewi (Makassar)', 'Fajar (Bali)', 'Citra (Semarang)',
      'Hana (Palembang)', 'Bagas (Malang)', 'Tiara (Bogor)', 'Eko (Depok)',
      'Melinda (Bekasi)', 'Rafi (Tangerang)', 'Putri (Solo)', 'Dimas (Manado)'
    ];
    var actions = [
      { icon: '🚶', text: 'jalan kaki ke sekolah', score: '+0.4' },
      { icon: '🚲', text: 'bersepeda ke kantor', score: '+0.6' },
      { icon: '🌱', text: 'menanam bibit pohon', score: '+0.8' },
      { icon: '♻️', text: 'memilah sampah hari ini', score: '+0.3' },
      { icon: '💡', text: 'matiin lampu saat keluar', score: '+0.2' },
      { icon: '🥗', text: 'makan sayur tanpa daging', score: '+0.5' },
      { icon: '🚿', text: 'hemat air mandi 5 menit', score: '+0.3' },
      { icon: '📚', text: 'belajar lingkungan ekstra', score: '+0.4' },
      { icon: '🌊', text: 'ikut beach cleanup', score: '+1.2' },
      { icon: '🛍️', text: 'pakai tas belanja sendiri', score: '+0.2' },
      { icon: '☀️', text: 'pakai energi surya hari ini', score: '+0.9' },
      { icon: '🐄', text: 'kurangi konsumsi daging', score: '+0.7' }
    ];

    var staticFacts = [
      '🌱 12.847 pohon ditanam hari ini',
      '🔥 CO₂ global: 417 ppm',
      '💧 1 dari 3 orang kekurangan air bersih',
      '🌡️ Suhu bumi +1.2°C dari era pra-industri',
      '♻️ Hanya 9% plastik yang pernah didaur ulang',
      '🐠 50% terumbu karang hilang sejak 1950',
      '📚 258 juta anak tidak mengenyam pendidikan',
      '💡 Energi terbarukan tumbuh 10% per tahun',
      '🌍 Generasi Z 2050 = penentu nasib planet ini'
    ];

    function generateItems(count) {
      var items = [];
      for (var i = 0; i < count; i++) {
        var name = names[Math.floor(Math.random() * names.length)];
        var action = actions[Math.floor(Math.random() * actions.length)];
        var minAgo = Math.floor(Math.random() * 8) + 1;
        items.push(Object.assign({ name: name, minAgo: minAgo }, action));
      }
      return items;
    }

    function renderTicker(items) {
      var inner = document.getElementById('tickerContent');
      if (!inner) return;

      var dynamicHtml = items.map(function (it) {
        return '<span class="habit-ticker-item" style="margin-right:8px">' +
          it.icon +
          ' <span style="color:#f3701e;font-weight:700">' + it.name + '</span>' +
          ' baru saja ' + it.text +
          ' <span style="color:#4ade80;font-weight:700;margin-left:4px">' + it.score + ' 🌍</span>' +
          ' <span style="font-size:10px;opacity:0.6;margin-left:4px">' + it.minAgo + 'm lalu</span>' +
          '</span>';
      }).join(' &nbsp;·&nbsp; ');

      var combined = staticFacts.join(' &nbsp;·&nbsp; ') + ' &nbsp;·&nbsp; ' + dynamicHtml;

      inner.innerHTML = combined + ' &nbsp;·&nbsp; ' + combined;
    }

    renderTicker(generateItems(12));

    setInterval(function () {
      var inner = document.getElementById('tickerContent');
      if (inner) {
        // We do not reset the CSS animation, just update the items. 
        // The animation length is 42s, so every 42s it changes data seamlessly 
        // behind the mask since the animation repeats.
        renderTicker(generateItems(12));
      }
    }, 80000);
  }

})();
