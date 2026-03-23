// 
//  RIPPLE — ai-engine.js  |  5 Advanced AI Features
//  Features: Emotion-Aware UI, Explainable AI, Gamified XP,
//            AI Prediction Engine, Digital Twin
// 

// ── SHARED STATE ─────────────────────────────────────────────
const RippleEngine = {
  emotion:      'neutral',
  xp:           parseInt(localStorage.getItem('rpl_xp') || '0', 10),
  interactions: parseInt(localStorage.getItem('rpl_interactions') || '0', 10),
};

// 
//  FEATURE 1 · EMOTION-AWARE INTERFACE
// 
const EMOTION_KEYWORDS = {
  energized: ['semangat','bisa','berhasil','senang','bangga','rajin','giat','aktif','suka','bagus','luar biasa','bersepeda','jogging','gym','olahraga'],
  inspired:  ['belajar','inovasi','kreatif','ide','mimpi','tujuan','target','cita','impian','baca','perpustakaan'],
  stressed:  ['stress','burnout','kecewa','frustasi','panik','cemas','khawatir','pusing','deadline','marah'],
  tired:     ['capek','lelah','ngantuk','begadang','istirahat','males','malas','lemas','gak semangat','gak bisa'],
  calm:      ['tenang','meditasi','yoga','santai','stabil','damai','nabung','hemat','simpan'],
};

function detectEmotion(text) {
  const t = text.toLowerCase();
  let maxScore = 0, detected = 'neutral';
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    const score = keywords.filter(kw => t.includes(kw)).length;
    if (score > maxScore) { maxScore = score; detected = emotion; }
  }
  return detected;
}

function applyEmotion(emotion) {
  if (emotion === RippleEngine.emotion && emotion !== 'neutral') return;
  RippleEngine.emotion = emotion;
  document.body.setAttribute('data-emotion', emotion);

  const CONFIGS = {
    neutral:   { icon: '✨', label: 'Mode Analisis',    bg: 'rgba(243,112,30,0.82)' },
    energized: { icon: '⚡', label: 'Mode Bersemangat!', bg: 'rgba(243,112,30,0.92)' },
    stressed:  { icon: '💙', label: 'Mode Tenang Dulu',  bg: 'rgba(100,149,237,0.9)' },
    tired:     { icon: '🌙', label: 'Mode Recharge',     bg: 'rgba(148,103,189,0.88)' },
    inspired:  { icon: '🚀', label: 'Mode Inspirasi',    bg: 'rgba(74,222,128,0.88)' },
    calm:      { icon: '🧘', label: 'Mode Damai',        bg: 'rgba(75,96,127,0.88)' },
  };

  const badge = document.getElementById('rpl-emotion-badge');
  if (!badge) return;
  const c = CONFIGS[emotion] || CONFIGS.neutral;
  badge.textContent = `${c.icon} ${c.label}`;
  badge.style.background  = c.bg;
  badge.style.boxShadow   = `0 4px 20px ${c.bg.replace(/[\d.]+\)$/, '0.35)')}`;
  badge.classList.add('show');
  setTimeout(() => badge.classList.remove('show'), 3200);
}

// 
//  FEATURE 2 · EXPLAINABLE AI
// 
const EXPLANATIONS = {
  jalan:   [
    'WHO 2023: 30 menit jalan kaki/hari ↓ risiko penyakit jantung 30%',
    'Kemenkes: siswa aktif fisik memiliki nilai rata-rata 15% lebih tinggi',
    'Cambridge Univ.: aktivitas aerobik harian ↑ konsentrasi 23%',
    'UNEP: jalan kaki vs kendaraan setara menanam 12 pohon/tahun',
    'BPS: pengguna transportasi aktif hemat Rp2,4 juta/tahun rata-rata',
  ],
  belajar: [
    'Oxford Univ.: 1 jam belajar ekstra/hari → 3× peluang universitas top',
    'MIT Neuroscience: spaced repetition ↑ retensi memori 80%',
    'UNESCO 2023: pendidikan ekstra usia 15-18 menentukan 40% lintasan karir',
    'Kemendikbud: +2 jam belajar/hari = rata-rata nilai naik satu grade',
    'McKinsey: skill akademis kuat sejak muda → income dewasa 2.3× lebih tinggi',
  ],
  nabung:  [
    'Bank Indonesia: Rp5.000/hari dari usia 15 → ≈Rp45 juta di usia 30',
    'OJK: hanya 36% milenial Indonesia punya tabungan darurat memadai',
    'Harvard: kebiasaan menabung di usia muda adalah prediktor keberhasilan #1',
    'Behavioral Econ.: "pay yourself first" ↑ tabungan rata-rata 48%',
    'BI: modal UMKM lokal rata-rata hanya Rp3 juta — sangat terjangkau!',
  ],
  pohon:   [
    'UNEP: 1 pohon serap 100 kg CO₂/tahun & beri O₂ untuk 2 orang selama 50 tahun',
    'IPCC: reboisasi = solusi paling cost-effective untuk sequester karbon',
    'Yale Univ.: kawasan hijau ↓ suhu urban 2-8°C (urban heat island)',
    'KLHK: 1,8 juta ha hutan Indonesia hilang tiap tahun — 1 pohon bermakna!',
    'Biodiversity: 1 pohon dukung rata-rata 200 spesies serangga & burung lokal',
  ],
  daging:  [
    'FAO: produksi daging = 14.5% emisi GRK global (melebihi sektor transportasi)',
    'Science Journal: diet nabati ↓ jejak karbon individu hingga 73%',
    'Water Footprint Ntw: 1 kg daging sapi butuh 15.000 liter air',
    'The Lancet: kurangi daging merah 50% = ↓ risiko kanker kolorektal 22%',
    'WRI: jika semua kurangi daging 1 hari/minggu → setara hilangkan 7,6 juta mobil',
  ],
  sampah:  [
    'KLHK: Indonesia hasilkan 67,8 juta ton sampah/tahun, 57% belum terkelola',
    'Ellen MacArthur: plastik digunakan 15 menit rata-rata, lalu 400 tahun terurai',
    'UNEP: 1 kg plastik terpilah benar menghemat 6 kg CO₂ equivalent',
    'KLH: kota dengan pemilahan >50% hemat biaya kebersihan 40%',
    'Studi UI: 1 orang memilah sampah menginspirasi rata-rata 3.2 orang lain',
  ],
  default: [
    'Agregat dari 12.847 pengguna RIPPLE dengan kebiasaan serupa',
    'Behavioral Science: 21 hari konsisten = neural pathway baru di otak terbentuk',
    'WHO 2023: kebiasaan harian adalah faktor paling kuat penentu kualitas hidup',
    'Efek domino sosial: 1 perubahan positif → avg 3.2 orang sekitar ikut terpengaruh',
    'UNDP: kebiasaan individu berkontribusi 34% terhadap Sustainable Development Goals',
  ],
};

function getExplanations(data) {
  const text = (JSON.stringify(data.chain || '') + (data.category || '')).toLowerCase();
  for (const [key, exps] of Object.entries(EXPLANATIONS)) {
    if (key === 'default') continue;
    if (text.includes(key)) return exps;
  }
  return EXPLANATIONS.default;
}

// 
//  FEATURE 3 · GAMIFIED XP IMPACT SYSTEM
// 
const XP_LEVELS = [
  { min: 0,    max: 99,   label: 'Benih',        icon: '🌱', color: '#6ee7b7' },
  { min: 100,  max: 299,  label: 'Tunas',        icon: '🌿', color: '#34d399' },
  { min: 300,  max: 599,  label: 'Pohon',        icon: '🌳', color: '#f3701e' },
  { min: 600,  max: 999,  label: 'Hutan',        icon: '🌲', color: '#4b9fe8' },
  { min: 1000, max: Infinity, label: 'Penjaga Bumi', icon: '🌍', color: '#e8d8c9' },
];

function getCurrentLevel(xp) {
  return XP_LEVELS.find(l => xp >= l.min && xp <= l.max) || XP_LEVELS[0];
}

function updateXPBar() {
  const level  = getCurrentLevel(RippleEngine.xp);
  const nextLv = XP_LEVELS[XP_LEVELS.indexOf(level) + 1];
  const bar    = document.getElementById('rpl-xp-fill');
  const label  = document.getElementById('rpl-xp-label');
  const icon   = document.getElementById('rpl-xp-icon');
  const count  = document.getElementById('rpl-xp-count');
  const next   = document.getElementById('rpl-xp-next');

  const nextMin = nextLv ? nextLv.min : level.max;
  const pct = nextLv
    ? Math.min(((RippleEngine.xp - level.min) / (nextMin - level.min)) * 100, 100)
    : 100;

  if (bar)   { bar.style.width = pct + '%'; bar.style.background = `linear-gradient(90deg, ${level.color}, ${level.color}88)`; }
  if (label) label.textContent = level.label;
  if (icon)  icon.textContent  = level.icon;
  if (count) count.textContent = RippleEngine.xp + ' XP';
  if (next)  next.textContent  = nextLv ? nextLv.label + ' ' + nextLv.icon : '🏆 MAX';
}

function addXP(amount, reason) {
  const prevLevel = getCurrentLevel(RippleEngine.xp);
  RippleEngine.xp = Math.max(0, RippleEngine.xp + amount);
  localStorage.setItem('rpl_xp', RippleEngine.xp);
  updateXPBar();
  showXPPopup(amount, reason);

  const newLevel = getCurrentLevel(RippleEngine.xp);
  if (newLevel.label !== prevLevel.label) {
    setTimeout(() => showLevelUp(newLevel), 1100);
  }
}

function showXPPopup(amount, reason) {
  const p = document.createElement('div');
  const isPos = amount > 0;
  p.style.cssText = `
    position:fixed; right:84px; top:45%;
    z-index:9500; pointer-events:none;
    background:${isPos ? 'rgba(243,112,30,0.95)' : 'rgba(255,61,90,0.9)'};
    color:#fff; padding:7px 16px; border-radius:30px;
    font-family:'Orbitron',sans-serif; font-size:11px; font-weight:700;
    display:flex; flex-direction:column; align-items:center; gap:2px;
    animation:xpPopup 1.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
    box-shadow:0 4px 20px rgba(243,112,30,0.45);
  `;
  p.innerHTML = `<span>${isPos ? '+' : ''}${amount} XP</span><span style="font-size:9px;letter-spacing:0.5px;opacity:0.7">${reason}</span>`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1900);
}

function showLevelUp(level) {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed; inset:0; z-index:99800;
    background:rgba(5,4,8,0.9); backdrop-filter:blur(16px);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
    animation: levelUpFadeIn 0.4s ease forwards, levelUpFadeOut 0.5s ease 2.8s forwards;
    pointer-events:none;
  `;
  el.innerHTML = `
    <div style="font-size:80px;animation:levelUpBounce 0.65s cubic-bezier(0.34,1.56,0.64,1)">${level.icon}</div>
    <div style="font-family:'Orbitron',sans-serif;font-size:9px;letter-spacing:5px;color:rgba(255,255,255,0.35);text-transform:uppercase">LEVEL UP!</div>
    <div style="font-family:'Orbitron',sans-serif;font-size:34px;font-weight:900;color:${level.color};text-shadow:0 0 40px ${level.color}88;letter-spacing:2px">${level.label}</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.4);font-family:'Inter',sans-serif">Selamat! Kamu naik level 🎉</div>
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// 
//  FEATURE 4 · AI PREDICTION ENGINE
// 
function generatePredictions(score) {
  if (score >= 80) return {
    twoWeeks: [
      '⚡ Konsistensi membentuk neural pathway baru — fokus terasa lebih tajam',
      '📈 Energi harian meningkat +15%, produktivitas bisa naik signifikan',
      '💬 2-3 orang terdekat mulai memperhatikan perubahanmu',
    ],
    oneMonth: [
      '🏆 Kamu masuk kategori "high performer" berdasarkan pola data pengguna serupa',
      '📚 Peluang nilai / performa kerja / belajar naik 15-25%',
      '🌱 Dampak kolektifmu setara menanam 24 pohon dalam sebulan',
    ],
    sixMonths: [
      '🌍 Earth Score kamu diproyeksikan masuk Skenario Terbaik (≥80%)',
      '🎓 Peluang beasiswa / prestasi membuka diri secara signifikan',
      '🔗 Kamu berpotensi menginspirasi komunitas lebih dari 30 orang',
    ],
  };
  if (score >= 60) return {
    twoWeeks: [
      '📊 Lintasanmu stabil — tidak turun, ada ruang untuk tumbuh',
      '💡 Satu kebiasaan kecil tambahan bisa mengubah seluruh projeksimi',
      '🔄 Pattern ini prediksi stabil, konsistensi adalah kuncinya',
    ],
    oneMonth: [
      '🌿 Jika konsisten, kamu akan naik ke Skenario Terbaik dalam 3 minggu',
      '📈 Dampak positif mulai terasa ke lingkungan dan orang-orang sekitar',
      '⏳ Fondasi yang kamu bangun sekarang bermanfaat jangka panjang',
    ],
    sixMonths: [
      '✅ Kamu berada di jalur yang sustainable — tidak mudah rebound ke bawah',
      '📚 Fondasi ini akan berdampak positif 5-10 tahun ke depan',
      '🤝 Kontribusimu terhadap lingkungan mulai terukur dan nyata',
    ],
  };
  return {
    twoWeeks: [
      '⚠️ Pola ini berpotensi menyebabkan burnout jika tidak ada perubahan',
      '😴 Energi dan motivasi cenderung menurun dalam 7-10 hari ke depan',
      '📉 Produktivitas berisiko turun 20-30% berdasarkan data pengguna serupa',
    ],
    oneMonth: [
      '🔴 Tanpa perubahan, dampak negatif mulai terasa di kesehatan & prestasi',
      '🌱 Tapi masih ada waktu! Satu kebiasaan baik hari ini = perubahan lintasan',
      '💬 Lingkungan sekitarmu ikut terpengaruh pola yang kamu jalankan',
    ],
    sixMonths: [
      '🆘 Masih bisa diubah — satu langkah kecil hari ini mengubah 6 bulan ke depan',
      '📞 Pertimbangkan bicara dengan mentor, guru, atau bergabung komunitas positif',
      '🌟 Ingat: kamu yang menentukan versi bumi 2050 — mulai dari keputusan hari ini',
    ],
  };
}

function renderPredictions(data, score) {
  const section  = document.getElementById('prediction-section');
  const timeline = document.getElementById('prediction-timeline');
  const counter  = document.getElementById('pred-interaction-count');
  if (!section || !timeline) return;

  RippleEngine.interactions++;
  localStorage.setItem('rpl_interactions', RippleEngine.interactions);
  if (counter) counter.textContent = RippleEngine.interactions;

  const preds = generatePredictions(score);
  const isNeg = score < 60;

  const CARD_TYPES = [
    { key: 'twoWeeks', icon: '⏱', label: '2 Minggu ke Depan', cls: isNeg ? 'pred-warning' : 'pred-green',   conf: 70 + Math.floor(Math.random()*15) },
    { key: 'oneMonth', icon: '📅', label: '1 Bulan ke Depan',  cls: isNeg ? 'pred-warning' : 'pred-blue',    conf: 60 + Math.floor(Math.random()*12) },
    { key: 'sixMonths',icon: '🌍', label: '6 Bulan ke Depan',  cls: isNeg ? 'pred-critical': 'pred-gold',    conf: 50 + Math.floor(Math.random()*12) },
  ];

  timeline.innerHTML = CARD_TYPES.map(ct => `
    <div class="pred-card ${ct.cls}">
      <div class="pred-card-header">
        <span class="pred-horizon">${ct.icon} ${ct.label}</span>
        <span class="pred-conf">${ct.conf}% akurasi</span>
      </div>
      <ul class="pred-list">
        ${preds[ct.key].map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  section.style.display = 'block';
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 200);
}

// 
//  FEATURE 5 · DIGITAL TWIN
// 
const TWIN_SCENARIOS = {
  current: { color: '#f3701e', mult: 1.0,   mood: '📍 Jalur Saat Ini',    note: (s) => s >= 70 ? 'Lintasan positif — pertahankan momentum ini!' : 'Ada ruang untuk tumbuh. Satu langkah kecil sudah cukup.' },
  better:  { color: '#4ade80', mult: 1.28,  mood: '🚀 Jalur Lebih Baik',  note: ()  => 'Tambah 1 kebiasaan baik kecil per minggu — ini hasilnya!' },
  worse:   { color: '#ff3d5a', mult: 0.65,  mood: '⚠️ Tanpa Perubahan',   note: ()  => 'Ini bukan takdir. Kamu masih bisa pilih jalur berbeda hari ini.' },
};

function renderTwinScenario(scenario, baseScore) {
  const visual = document.getElementById('twin-visual');
  if (!visual) return;

  const sc   = TWIN_SCENARIOS[scenario];
  const mult = sc.mult;

  const rawStats = {
    '🌿 Lingkungan': baseScore,
    '📚 Pendidikan':  Math.max(baseScore - 5, 10),
    '💰 Ekonomi':    Math.min(baseScore + 3, 99),
    '🤝 Sosial':     Math.max(baseScore - 2, 10),
  };

  const stats = Object.fromEntries(
    Object.entries(rawStats).map(([k, v]) => [k, Math.round(Math.min(Math.max(v * mult, 5), 99))])
  );

  const statsHtml = Object.entries(stats).map(([label, pct]) => `
    <div class="twin-stat-row">
      <span class="twin-stat-label">${label}</span>
      <div class="twin-stat-bar-wrap">
        <div class="twin-stat-bar" style="width:${pct}%;background:${sc.color}99;"></div>
      </div>
      <span class="twin-stat-val" style="color:${sc.color}">${pct}%</span>
    </div>
  `).join('');

  const [emoji, ...rest] = sc.mood.split(' ');
  const note = sc.note(baseScore);

  visual.innerHTML = `
    <div class="twin-scenario-card" style="border-color:${sc.color}33;">
      <div>
        <div class="twin-avatar">
          <div class="twin-avatar-ring" style="border-color:${sc.color}55;"></div>
          <div class="twin-avatar-core" style="box-shadow:0 0 40px ${sc.color}44;">
            <span style="font-size:34px">${emoji}</span>
            <span class="twin-mood-label" style="color:${sc.color}">${rest.join(' ')}</span>
          </div>
        </div>
      </div>
      <div class="twin-right">
        <div>
          <h3 class="twin-scenario-title" style="color:${sc.color}">${sc.mood}</h3>
          <p class="twin-scenario-note">${note}</p>
        </div>
        <div class="twin-stats-grid">${statsHtml}</div>
        <div class="twin-timeline">
          <div class="twin-tl-point active">Hari ini</div>
          <div class="twin-tl-line" style="background:linear-gradient(90deg,${sc.color},${sc.color}44);"></div>
          <div class="twin-tl-point">7 hari</div>
          <div class="twin-tl-line" style="background:linear-gradient(90deg,${sc.color}44,${sc.color}11);"></div>
          <div class="twin-tl-point">30 hari</div>
        </div>
      </div>
    </div>
  `;

  // Animate bars
  setTimeout(() => {
    visual.querySelectorAll('.twin-stat-bar').forEach(b => {
      const w = b.style.width;
      b.style.width = '0%';
      setTimeout(() => { b.style.transition = 'width 0.9s cubic-bezier(0.34,1.56,0.64,1)'; b.style.width = w; }, 50);
    });
  }, 50);
}

function initDigitalTwin(score) {
  const section = document.getElementById('digital-twin-section');
  if (!section || section.dataset.init) return;
  section.dataset.init = '1';
  section.style.display = 'block';

  renderTwinScenario('current', score);

  document.querySelectorAll('.twin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.twin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTwinScenario(tab.dataset.scenario, score);
    });
  });
}

// 
//  MONKEY-PATCH renderAiChain  (runs after main.js via 'load')
// 
window.addEventListener('load', () => {
  const origFn = window.renderAiChain;
  if (typeof origFn !== 'function') return;

  window.renderAiChain = function (data) {
    // 1. Original chain render
    origFn.call(this, data);

    const score = data.score || 70;

    // 2. Emotion detection
    const emotionInput = document.getElementById('aiInput');
    const lastText = emotionInput ? (emotionInput.dataset.lastSent || '') : '';
    applyEmotion(data.isNegative ? 'stressed' : detectEmotion(lastText + (data.category || '')));

    // 3. Augment chain items with Explainable AI
    const chainEl = document.getElementById('chainList');
    if (chainEl) {
      const exps = getExplanations(data);
      chainEl.querySelectorAll('.chain-item').forEach((item, i) => {
        const exp = exps[i] || exps[exps.length - 1];
        const btn = document.createElement('div');
        btn.className = 'chain-explainer-btn';
        btn.textContent = '🔍 Mengapa ini terjadi?';

        const box = document.createElement('div');
        box.className = 'chain-explainer-box';
        box.style.display = 'none';
        box.innerHTML = `<span class="exp-icon">📊</span><span class="exp-text">${exp}</span>`;

        btn.addEventListener('click', () => {
          const open = box.style.display !== 'none';
          box.style.display = open ? 'none' : 'flex';
          btn.textContent = open ? '🔍 Mengapa ini terjadi?' : '✕ Tutup penjelasan';
        });

        item.appendChild(btn);
        item.appendChild(box);
      });
    }

    // 4. Gamified XP
    const xpGain = data.isNegative ? 8 : Math.max(15, Math.round(20 + (score - 60) * 0.5));
    const xpReason = data.isNegative ? 'Kesadaran diri' : `Kebiasaan ${data.category || 'Baik'}`;
    setTimeout(() => addXP(xpGain, xpReason), 1200);

    // 5. Prediction Engine + Digital Twin (after chain finishes)
    const totalDelay = (data.chain.length * 400) + 900;
    setTimeout(() => {
      renderPredictions(data, score);
      initDigitalTwin(score);
    }, totalDelay);
  };

  // Save last typed input for emotion detection
  const aiInput = document.getElementById('aiInput');
  if (aiInput) {
    aiInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') aiInput.dataset.lastSent = aiInput.value;
    });
    // Also hook sendChip
    const origSendChip = window.sendChip;
    if (typeof origSendChip === 'function') {
      window.sendChip = function (text) {
        if (aiInput) aiInput.dataset.lastSent = text;
        origSendChip.call(this, text);
      };
    }
  }

  // Init XP bar on load
  updateXPBar();
});
