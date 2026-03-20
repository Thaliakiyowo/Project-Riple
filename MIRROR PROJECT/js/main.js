// ================================
// RIPPLE — main.js (AI Edition)
// ================================

// ================================
// DATABASE KEBIASAAN (Pre-defined)
// ================================
const habitDatabase = {
  jalan: {
    keywords: ['jalan', 'kaki', 'jalankaki', 'berjalan', 'nge-jalan', 'ke sekolah', 'sekolah jalan', 'gowes', 'sepeda', 'bersepeda', 'naik sepeda', 'ontel'],
    icon: '🚶',
    category: 'Lingkungan',
    catColor: 'green',
    chain: [
      { text: 'Jalan kaki setiap hari', sub: 'Kebiasaan sehat dimulai', color: 'green' },
      { text: 'Tubuh lebih sehat & fit', sub: 'Stamina meningkat 40%', color: 'green' },
      { text: 'Fokus dan konsentrasi meningkat', sub: 'Produktivitas belajar naik', color: 'green' },
      { text: 'Nilai naik, beasiswa terbuka', sub: 'Masa depan terbuka lebar', color: 'blue' },
      { text: 'Emisi karbon berkurang', sub: 'Setara tanam 12 pohon/tahun', color: 'blue' },
    ],
    stats: { lingkungan: { pct: 88, label: 'Sangat Baik' }, pendidikan: { pct: 72, label: 'Bagus' }, ekonomi: { pct: 58, label: 'Sedang' }, sosial: { pct: 70, label: 'Baik' } },
    impact: [
      { num: '12', unit: 'pohon', desc: 'CO₂ tersimpan per tahun' },
      { num: '365', unit: 'km', desc: 'Jarak bebas emisi' },
      { num: '40%', unit: 'lebih fit', desc: 'Peningkatan stamina' },
      { num: 'Rp0', unit: 'bensin', desc: 'Penghematan transportasi' },
    ],
    score: 72,
    reply: 'Luar biasa! Jalan kaki adalah salah satu kebiasaan terkuat yang bisa kamu lakukan. 🚶 Berikut rantai dampaknya ke seluruh dunia:',
    quote: '"Kalau 10 juta pelajar Indonesia berjalan kaki seperti kamu, emisi CO₂ turun setara 120 juta pohon/tahun."'
  },

  belajar: {
    keywords: ['belajar', 'baca buku', 'membaca', 'study', 'ngaji', 'les', 'kursus', 'latihan soal', 'ulang', 'pr', 'tugas', 'perpustakaan', 'pustaka', 'baca'],
    icon: '📚',
    category: 'Pendidikan',
    catColor: 'blue',
    chain: [
      { text: 'Belajar ekstra setiap hari', sub: 'Konsistensi dimulai', color: 'blue' },
      { text: 'Pemahaman materi lebih dalam', sub: 'Nilai ujian meningkat signifikan', color: 'blue' },
      { text: 'Kepercayaan diri meningkat', sub: 'Aktif & vokal di kelas', color: 'blue' },
      { text: 'Peluang universitas terbaik', sub: 'Karir masa depan terbuka', color: 'green' },
      { text: 'Inovasi baru tercipta', sub: 'Kontribusi nyata ke masyarakat', color: 'blue' },
    ],
    stats: { lingkungan: { pct: 60, label: 'Sedang' }, pendidikan: { pct: 95, label: 'Luar Biasa' }, ekonomi: { pct: 78, label: 'Bagus' }, sosial: { pct: 82, label: 'Sangat Baik' } },
    impact: [
      { num: '730', unit: 'jam', desc: 'Belajar ekstra per tahun' },
      { num: '3×', unit: 'peluang', desc: 'Masuk universitas top' },
      { num: '+25%', unit: 'nilai', desc: 'Rata-rata peningkatan ujian' },
      { num: '1', unit: 'inovasi', desc: 'Ide baru per kuartal' },
    ],
    score: 85,
    reply: 'Pilihan yang sangat cerdas! Belajar ekstra adalah investasi terbesar untuk masa depanmu. 📚 Ini rantai dampaknya:',
    quote: '"Satu jam ekstra belajar per hari mengubah nasib lebih dari satu dekade kerja keras tanpa arah."'
  },

  nabung: {
    keywords: ['nabung', 'menabung', 'tabungan', 'saving', 'hemat', 'simpan uang', 'celengan', 'investasi', 'saham', 'reksa dana', 'deposito', 'dompet'],
    icon: '💰',
    category: 'Ekonomi',
    catColor: 'yellow',
    chain: [
      { text: 'Nabung rutin setiap hari', sub: 'Disiplin finansial dimulai', color: 'yellow' },
      { text: 'Uang terkumpul tanpa terasa', sub: 'Konsistensi = kekuatan', color: 'yellow' },
      { text: 'Pola pikir finansial sehat', sub: 'Kebiasaan seumur hidup', color: 'green' },
      { text: 'Modal usaha kecil tersedia', sub: 'UMKM lokal bisa tumbuh', color: 'yellow' },
      { text: 'Ekonomi lokal menguat', sub: 'Lapangan kerja bertambah', color: 'yellow' },
    ],
    stats: { lingkungan: { pct: 55, label: 'Sedang' }, pendidikan: { pct: 65, label: 'Baik' }, ekonomi: { pct: 92, label: 'Luar Biasa' }, sosial: { pct: 63, label: 'Sedang' } },
    impact: [
      { num: 'Rp1,8JT', unit: '/tahun', desc: 'Total tabungan terkumpul' },
      { num: '5', unit: 'UMKM', desc: 'Bisa didukung dari modal' },
      { num: '30th', unit: 'kebebasan', desc: 'Finansial sehat seumur hidup' },
      { num: '3×', unit: 'return', desc: 'Potensi investasi jangka panjang' },
    ],
    score: 65,
    reply: 'Keren banget! Disiplin menabung adalah fondasi kebebasan finansial. 💰 Berikut efek dominonya:',
    quote: '"Rp5.000 hari ini adalah pondasi kemandirian finansial yang akan mengubah hidupmu di usia 30."'
  },

  pohon: {
    keywords: ['tanam', 'pohon', 'tanaman', 'berkebun', 'menanam', 'bibit', 'penghijauan', 'hutan', 'reboisasi', 'taman', 'bunga', 'kebun'],
    icon: '🌱',
    category: 'Lingkungan',
    catColor: 'green',
    chain: [
      { text: 'Menanam satu pohon hari ini', sub: 'Aksi nyata untuk bumi', color: 'green' },
      { text: 'Oksigen bertambah sekitarmu', sub: 'Udara lebih segar & bersih', color: 'green' },
      { text: 'Ekosistem lokal membaik', sub: 'Burung & serangga kembali', color: 'green' },
      { text: 'Suhu lingkungan turun 2–3°C', sub: 'Urban heat island berkurang', color: 'blue' },
      { text: 'Indonesia lebih hijau di 2050', sub: 'Generasimu mewarisi bumi sehat', color: 'green' },
    ],
    stats: { lingkungan: { pct: 96, label: 'Luar Biasa' }, pendidikan: { pct: 62, label: 'Baik' }, ekonomi: { pct: 55, label: 'Sedang' }, sosial: { pct: 74, label: 'Bagus' } },
    impact: [
      { num: '100kg', unit: 'CO₂', desc: 'Diserap per pohon/tahun' },
      { num: '50th', unit: 'manfaat', desc: 'Pohon hidup & berikan oksigen' },
      { num: '+3°C', unit: 'lebih sejuk', desc: 'Suhu sekitar pohon' },
      { num: '1', unit: 'ekosistem', desc: 'Habitat baru untuk satwa' },
    ],
    score: 88,
    reply: 'Kamu adalah pahlawan bumi! 🌱 Menanam pohon adalah salah satu aksi paling nyata. Ini rantai dampaknya:',
    quote: '"Satu pohon yang kamu tanam hari ini akan memberikan oksigen untuk 2 orang selama 50 tahun."'
  },

  daging: {
    keywords: ['daging', 'makan daging', 'vegetarian', 'vegan', 'kurangi daging', 'plant based', 'tahu', 'tempe', 'sayur', 'buah', 'diet', 'makan sehat'],
    icon: '🥗',
    category: 'Lingkungan',
    catColor: 'green',
    chain: [
      { text: 'Mengurangi konsumsi daging', sub: 'Pilihan diet berkelanjutan', color: 'green' },
      { text: 'Emisi metan berkurang', sub: 'Peternakan = 14% emisi global', color: 'green' },
      { text: 'Penggunaan air & lahan hemat', sub: '15.000L air/kg daging sapi', color: 'blue' },
      { text: 'Kesehatan tubuh meningkat', sub: 'Risiko penyakit kronis turun', color: 'green' },
      { text: 'Ketahanan pangan dunia menguat', sub: 'Pangan lebih merata di 2050', color: 'blue' },
    ],
    stats: { lingkungan: { pct: 90, label: 'Sangat Baik' }, pendidikan: { pct: 68, label: 'Baik' }, ekonomi: { pct: 70, label: 'Baik' }, sosial: { pct: 72, label: 'Bagus' } },
    impact: [
      { num: '3kg', unit: 'CO₂ hemat', desc: 'Per hari tanpa daging merah' },
      { num: '15rb', unit: 'liter air', desc: 'Terhemat per kg daging sapi' },
      { num: '30%', unit: 'risiko turun', desc: 'Penyakit jantung & kanker' },
      { num: '1/3', unit: 'lahan bumi', desc: 'Digunakan untuk ternak' },
    ],
    score: 80,
    reply: 'Pilihan yang bijak untuk bumi! 🥗 Diet nabati adalah salah satu cara paling efektif mengurangi jejak karbonmu. Berikut dampaknya:',
    quote: '"Jika setiap orang mengurangi daging 1 hari/minggu, setara menghilangkan 7 juta mobil dari jalanan."'
  },

  sampah: {
    keywords: ['sampah', 'buang sampah', 'plastik', 'limbah', 'daur ulang', 'recycle', 'reduce', 'reuse', 'tidak buang', 'tong sampah', 'pilah', 'mcdonalds', 'bungkus'],
    icon: '♻️',
    category: 'Lingkungan',
    catColor: 'green',
    isNegative: false,
    chain: [
      { text: 'Membuang sampah pada tempatnya', sub: 'Kebiasaan kecil, dampak besar', color: 'green' },
      { text: 'Lingkungan sekitar bersih', sub: 'Kenyamanan komunitas meningkat', color: 'green' },
      { text: 'Risiko banjir berkurang', sub: 'Saluran air tidak tersumbat', color: 'blue' },
      { text: 'Ekosistem sungai & laut sehat', sub: 'Satwa laut terlindungi', color: 'blue' },
      { text: 'Pariwisata & ekonomi lokal naik', sub: 'Lingkungan bersih = daya tarik', color: 'yellow' },
    ],
    stats: { lingkungan: { pct: 85, label: 'Sangat Baik' }, pendidikan: { pct: 65, label: 'Baik' }, ekonomi: { pct: 68, label: 'Baik' }, sosial: { pct: 78, label: 'Bagus' } },
    impact: [
      { num: '8JT', unit: 'ton', desc: 'Plastik masuk laut per tahun (global)' },
      { num: '1rb+', unit: 'spesies', desc: 'Terancam oleh sampah plastik' },
      { num: '450th', unit: 'terurai', desc: 'Waktu plastik terurai' },
      { num: '70%', unit: 'berkurang', desc: 'Sampah jika semua pilah dengan benar' },
    ],
    score: 76,
    reply: 'Tindakan sederhana yang efeknya luar biasa! ♻️ Membuang sampah di tempatnya membuat perbedaan nyata. Ini rantai dampaknya:',
    quote: '"Satu kantong plastik bekas yang kamu buang ke tempat sampah menyelamatkan satu makhluk laut hari ini."'
  },

  // Handler untuk kebiasaan BURUK
  buangSampahSembarangan: {
    keywords: ['buang sembarangan', 'sampah sembarangan', 'nyampah', 'littering'],
    icon: '🚮',
    category: 'Negatif',
    catColor: 'red',
    isNegative: true,
    chain: [
      { text: 'Sampah dibuang sembarangan', sub: 'Kebiasaan merusak dimulai', color: 'yellow' },
      { text: 'Saluran air tersumbat', sub: 'Risiko banjir meningkat', color: 'yellow' },
      { text: 'Ekosistem sungai & laut terganggu', sub: 'Plastik mencekik satwa laut', color: 'yellow' },
      { text: 'Biaya kebersihan kota membengkak', sub: 'Pajak warga terbuang sia-sia', color: 'yellow' },
      { text: 'Generasi 2050 mewarisi bumi kotor', sub: 'Dampak permanen', color: 'yellow' },
    ],
    stats: { lingkungan: { pct: 18, label: 'Kritis' }, pendidikan: { pct: 40, label: 'Kurang' }, ekonomi: { pct: 30, label: 'Buruk' }, sosial: { pct: 25, label: 'Memprihatinkan' } },
    impact: [
      { num: '1rb', unit: 'tahun', desc: 'Waktu plastik terurai di tanah' },
      { num: '1+', unit: 'hewan laut', desc: 'Terancam per kantong plastik' },
      { num: '8JT', unit: 'ton', desc: 'Sampah ke laut per tahun' },
      { num: 'Rp∞', unit: 'biaya', desc: 'Kerugian ekologis tidak ternilai' },
    ],
    score: 25,
    reply: '😟 Aduh... kebiasaan ini memberikan dampak nyata yang serius ke lingkungan. Coba lihat rantai efeknya:',
    quote: '"Satu kantong plastik yang dibuang sembarangan butuh 1.000 tahun untuk terurai. Pilihan ada di tanganmu."'
  },
};

// ================================
// AI KEYWORD ENGINE
// ================================
function detectHabit(input) {
  const lower = input.toLowerCase();

  // Cek setiap habit di database
  for (const [key, data] of Object.entries(habitDatabase)) {
    for (const kw of data.keywords) {
      if (lower.includes(kw)) return { key, data };
    }
  }

  // Fallback: generate custom chain dari kata kunci
  return generateCustomHabit(input);
}

function generateCustomHabit(input) {
  const lower = input.toLowerCase();
  let score = 70;
  let catColor = 'green';
  let icon = '✨';
  let category = 'Umum';

  // Detect tone: positif / negatif
  const negWords = ['tidak', 'ga', 'gak', 'males', 'malas', 'lupa', 'lalai', 'buang', 'buang-buang', 'sampah', 'rokok', 'merokok', 'begadang', 'tidur larut'];
  const posWords = ['rajin', 'rutin', 'selalu', 'konsisten', 'setiap', 'tiap', 'mulai', 'coba', 'berhasil', 'baik'];

  const isNeg = negWords.some(w => lower.includes(w));
  const isPos = posWords.some(w => lower.includes(w));

  // Detect kategori dari kata kunci umum
  if (/olah raga|olahraga|gym|lari|renang|badminton|futsal|basket|sport|fitness/.test(lower)) {
    icon = '🏃'; category = 'Kesehatan'; catColor = 'green'; score = 80;
  } else if (/minum air|air putih|tidur cukup|istirahat|sehat|vitamin|makan teratur/.test(lower)) {
    icon = '💧'; category = 'Kesehatan'; catColor = 'green'; score = 78;
  } else if (/volunteer|sukarela|bantu|tolong|sosial|donasi|zakat|sedekah|amal/.test(lower)) {
    icon = '🤝'; category = 'Sosial'; catColor = 'blue'; score = 85;
  } else if (/listrik|lampu|matiin|hemat energi|ac|kipas|charger|cabut/.test(lower)) {
    icon = '💡'; category = 'Energi'; catColor = 'green'; score = 82;
  } else if (/rokok|merokok|vape|alkohol|narkoba|begadang|tidur larut/.test(lower)) {
    icon = '⚠️'; category = 'Kesehatan'; catColor = 'yellow'; score = 30;
  }

  if (isNeg && score > 50) score = Math.max(25, score - 40);
  if (isPos && score < 90) score = Math.min(90, score + 10);

  // Generate chain dinamis berdasarkan deteksi
  const positiveChain = [
    { text: `"${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"`, sub: 'Kebiasaan barumu terdeteksi', color: catColor === 'yellow' ? 'yellow' : 'green' },
    { text: 'Konsistensi mulai terbentuk', sub: '21 hari = kebiasaan permanen', color: 'green' },
    { text: 'Dampak nyata di sekitarmu', sub: 'Lingkungan & orang-orang merasakannya', color: 'blue' },
    { text: 'Menginspirasi orang sekitar', sub: 'Efek domino sosial dimulai', color: 'blue' },
    { text: 'Bumi 2050 lebih baik karenamu', sub: 'Setiap tindakan kecil dihitung', color: 'green' },
  ];

  const negativeChain = [
    { text: `"${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"`, sub: 'Kebiasaan ini terdeteksi', color: 'yellow' },
    { text: 'Dampak negatif mulai terakumulasi', sub: 'Kecil tapi konsisten', color: 'yellow' },
    { text: 'Kualitas hidup perlahan menurun', sub: 'Efek tidak langsung terasa', color: 'yellow' },
    { text: 'Orang sekitar terpengaruh', sub: 'Efek domino sosial', color: 'yellow' },
    { text: 'Masih bisa diubah hari ini!', sub: 'Satu langkah kecil sudah cukup', color: 'blue' },
  ];

  const chain = isNeg ? negativeChain : positiveChain;

  return {
    key: 'custom',
    data: {
      icon,
      category,
      catColor,
      chain,
      stats: {
        lingkungan: { pct: Math.min(95, score + (isNeg ? -20 : 10)), label: score > 70 ? 'Baik' : 'Perlu Perhatian' },
        pendidikan: { pct: Math.min(95, score + 5), label: score > 70 ? 'Bagus' : 'Sedang' },
        ekonomi: { pct: Math.min(95, score - 5), label: score > 70 ? 'Sedang' : 'Kurang' },
        sosial: { pct: Math.min(95, score + (isNeg ? -10 : 8)), label: score > 70 ? 'Baik' : 'Sedang' },
      },
      impact: [
        { num: isNeg ? '–' : '+', unit: 'dampak', desc: 'Terhadap lingkunganmu' },
        { num: '21', unit: 'hari', desc: 'Sampai jadi kebiasaan tetap' },
        { num: isNeg ? '↓' : '↑', unit: 'indeks', desc: 'Bumi Health Index' },
        { num: '10JT', unit: 'orang', desc: 'Terdampak jika semua melakukan ini' },
      ],
      score,
      reply: isNeg
        ? `😟 Hmm... ${icon} Kebiasaan ini punya efek yang perlu kamu pertimbangkan. Lihat rantai dampaknya:`
        : `✨ Keren! ${icon} Kebiasaan ini membawa gelombang perubahan yang nyata. Ini rantai dampaknya:`,
      quote: isNeg
        ? '"Sadar adalah langkah pertama. Mengubah kebiasaan sekarang adalah langkah terbesar."'
        : '"Setiap kebiasaan baik yang konsisten kamu lakukan, menciptakan versi bumi yang lebih baik."'
    }
  };
}

// ================================
// IDLE STATE: Live Clock & Feed
// ================================
function startIdleClock() {
  function tick() {
    const el = document.getElementById('idleTime');
    if (el) {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      el.textContent = `${h}:${m}:${s}`;
    }
  }
  tick();
  setInterval(tick, 1000);
}

function setupIdleFeed() {
  const feed = document.getElementById('idleFeed');
  if (!feed) return;

  const events = [
    { icon: '🌱', text: '3 pohon baru ditanam di Kalimantan', time: 'baru saja' },
    { icon: '♻️', text: '127 kg plastik berhasil didaur ulang', time: '2 menit lalu' },
    { icon: '🚶', text: '1.240 pelajar memilih jalan kaki hari ini', time: '5 menit lalu' },
    { icon: '💧', text: 'Kualitas air Sungai Ciliwung menurun 3%', time: '8 menit lalu' },
    { icon: '🌡️', text: 'Suhu Jakarta hari ini: +0.3°C dari rata-rata', time: '12 menit lalu' },
    { icon: '📚', text: '890 siswa menyelesaikan sesi belajar ekstra', time: '15 menit lalu' },
  ];

  events.forEach((ev, i) => {
    const div = document.createElement('div');
    div.className = 'idle-feed-item';
    div.style.cssText = `
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 6px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      opacity: 0;
      animation: fadeUp 0.4s ease forwards;
      animation-delay: ${i * 0.12}s;
      font-size: 11.5px;
      color: #888;
      line-height: 1.5;
    `;
    div.innerHTML = `
      <span style="flex-shrink:0;font-size:14px">${ev.icon}</span>
      <span style="flex:1">${ev.text}</span>
      <span style="color:#555;font-size:10px;white-space:nowrap">${ev.time}</span>
    `;
    feed.appendChild(div);
  });
}

// ================================
// AI CHAT ENGINE
// ================================
let isAiThinking = false;

function addBubble(text, type) { // type: 'user' | 'system' | 'thinking'
  const history = document.getElementById('aiChatHistory');
  if (!history) return null;

  const div = document.createElement('div');
  div.className = `ai-bubble ${type}-bubble`;

  if (type === 'thinking') {
    div.className = 'ai-bubble thinking-bubble';
    div.innerHTML = `<div class="thinking-dots"><span></span><span></span><span></span></div>`;
  } else {
    div.innerHTML = `<p>${text}</p>`;
  }

  history.appendChild(div);
  history.scrollTop = history.scrollHeight;
  return div;
}

function setAiStatus(text) {
  const el = document.getElementById('aiStatus');
  if (el) el.textContent = text;
}

function sendChip(text) {
  const input = document.getElementById('aiInput');
  if (input) input.value = text;
  handleAiSend();
}

function handleAiSend() {
  if (isAiThinking) return;

  const input = document.getElementById('aiInput');
  const sendBtn = document.getElementById('aiSendBtn');
  const chips = document.getElementById('aiChips');
  const idle = document.getElementById('aiIdleState');
  const text = input ? input.value.trim() : '';
  if (!text) return;

  isAiThinking = true;
  if (sendBtn) sendBtn.disabled = true;
  if (chips) chips.style.display = 'none';

  // Sembunyikan idle state saat pertama kali mengirim
  if (idle) {
    idle.style.transition = 'opacity 0.35s ease';
    idle.style.opacity = '0';
    setTimeout(() => { idle.style.display = 'none'; }, 360);
  }

  // 1. Tambah bubble user
  addBubble(text, 'user');
  if (input) input.value = '';

  // 2. Ubah status AI
  setAiStatus('Menganalisis kebiasaanmu...');

  // 3. Tampilkan thinking dots
  const thinkBubble = addBubble('', 'thinking');

  // 4. Simulasi "AI processing" delay 1.5-2.5 detik
  const delay = 1500 + Math.random() * 1000;
  setTimeout(() => {
    // Remove thinking bubble
    if (thinkBubble) thinkBubble.remove();

    // Detect habit
    const result = detectHabit(text);
    const { data } = result;

    // 5. Tampilkan reply dari "AI"
    addBubble(data.reply, 'system');

    setAiStatus('Menampilkan butterfly effect...');

    // 6. Render chain
    setTimeout(() => {
      renderAiChain(data);
      isAiThinking = false;
      if (sendBtn) sendBtn.disabled = false;
      setAiStatus('Siap menganalisis kebiasaan lain');
    }, 600);

  }, delay);
}

// Auto-resize textarea
function setupTextarea() {
  const ta = document.getElementById('aiInput');
  if (!ta) return;
  ta.addEventListener('input', () => {
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 90) + 'px';
  });
  ta.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAiSend();
    }
  });
}

// ================================
// FUNGSI: Render Chain dari AI
// ================================
function renderAiChain(data) {
  const resultBox = document.getElementById('aiResult');
  const labelEl = document.getElementById('aiResultLabel');
  const chainEl = document.getElementById('chainList');
  const finalLottie = document.getElementById('chainFinalLottie');
  const impactBox = document.getElementById('impactSummary');

  if (!resultBox || !chainEl) return;

  // Reset
  resultBox.style.display = 'flex';
  chainEl.innerHTML = '';
  if (finalLottie) { finalLottie.style.display = 'none'; finalLottie.style.opacity = '0'; }
  if (impactBox) impactBox.style.display = 'none';

  // Label hasil
  if (labelEl) labelEl.innerHTML = `${data.icon} BUTTERFLY EFFECT · <span style="color:var(--green)">${data.category.toUpperCase()}</span>`;

  // Build chain items
  data.chain.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'chain-item';
    el.style.animationDelay = `${i * 0.4}s`;
    const isLast = i === data.chain.length - 1;
    el.innerHTML = `
      <div class="chain-left">
        <div class="chain-dot ${item.color}"></div>
        ${!isLast ? '<div class="chain-line"></div>' : ''}
      </div>
      <div class="chain-text">
        ${item.text}
        <small>${item.sub}</small>
      </div>`;
    chainEl.appendChild(el);
  });

  // Update bumi
  updateEarthScore(data.score);
  updateStatBars(data.stats);
  updateProyeksi(data.score);
  updateQuoteText(data.quote);

  // Final lottie + impact setelah chain selesai
  const totalDelay = (data.chain.length * 400) + 400;
  setTimeout(() => {
    if (finalLottie) {
      finalLottie.style.display = 'flex';
      finalLottie.style.animation = 'none';
      finalLottie.offsetHeight;
      finalLottie.style.animation = 'fadeUp 0.5s ease forwards';
    }
    showImpactSummary(data.impact);
  }, totalDelay);
}

// ================================
// FUNGSI: Animated Counter
// ================================
let currentScore = 0;

function animateCounter(el, from, to, duration = 1200) {
  const startTime = performance.now();
  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * ease) + '%';
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function updateEarthScore(score) {
  const el = document.getElementById('earthScore');
  if (!el) return;
  const prev = currentScore;
  currentScore = score;
  animateCounter(el, prev, score, 1200);

  if (score >= 80) {
    el.style.color = '#b8ff00';
    el.style.textShadow = '0 0 24px rgba(184,255,0,0.95), 0 0 60px rgba(184,255,0,0.3)';
  } else if (score >= 60) {
    el.style.color = '#ffe100';
    el.style.textShadow = '0 0 24px rgba(255,225,0,0.9)';
  } else {
    el.style.color = '#ff3d5a';
    el.style.textShadow = '0 0 24px rgba(255,61,90,0.9)';
  }
}

function updateStatBars(stats) {
  const keys = ['lingkungan', 'pendidikan', 'ekonomi', 'sosial'];
  keys.forEach(key => {
    const barEl = document.getElementById('bar-' + key);
    const valEl = document.getElementById('val-' + key);
    if (barEl) { barEl.style.width = '0%'; setTimeout(() => { barEl.style.width = stats[key].pct + '%'; }, 80); }
    if (valEl) valEl.textContent = stats[key].label + ' (' + stats[key].pct + '%)';
  });
}

function updateProyeksi(score) {
  const danger = document.getElementById('proj-danger');
  const medium = document.getElementById('proj-medium');
  const best = document.getElementById('proj-best');
  [danger, medium, best].forEach(el => el && el.classList.remove('active-proj'));
  if (score >= 80) best && best.classList.add('active-proj');
  else if (score >= 60) medium && medium.classList.add('active-proj');
  else danger && danger.classList.add('active-proj');
}

function updateQuoteText(quote) {
  const el = document.getElementById('quoteText');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = quote;
    el.style.transition = 'opacity 0.5s ease';
    el.style.opacity = '1';
  }, 300);
}

function showImpactSummary(impactData) {
  const box = document.getElementById('impactSummary');
  const grid = document.getElementById('impactGrid');
  if (!box || !grid) return;

  grid.innerHTML = '';
  impactData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'impact-item';
    div.innerHTML = `
      <span class="impact-num">${item.num}</span>
      <span class="impact-desc">${item.unit}<br>${item.desc}</span>`;
    grid.appendChild(div);
  });

  box.style.display = 'block';
  box.style.opacity = '0';
  requestAnimationFrame(() => {
    box.style.transition = 'opacity 0.5s ease';
    box.style.opacity = '1';
  });
}

// ================================
// FAKTA BUMI
// ================================
const faktaList = [
  'Setiap menit, 36 lapangan sepak bola hutan tropis ditebang di seluruh dunia.',
  'Suhu rata-rata bumi telah naik 1.2°C sejak era pra-industri — dan terus meningkat.',
  'Indonesia adalah rumah bagi 17% spesies burung dunia, namun 1.500 di antaranya terancam punah.',
  'Jika semua es di Antartika mencair, permukaan laut akan naik 58 meter.',
  'Setiap tahun, lebih dari 8 juta ton plastik mencemari lautan kita.',
  'Generasi Z yang belajar hari ini akan memegang kendali bumi di tahun 2050.',
];

let faktaCurrentIndex = 0;
let faktaInterval = null;

function showFakta(index) {
  const textEl = document.getElementById('faktaText');
  const indexEl = document.getElementById('faktaIndex');
  const dots = document.querySelectorAll('.fdot');
  if (!textEl) return;
  textEl.style.opacity = '0';
  setTimeout(() => {
    textEl.textContent = faktaList[index];
    if (indexEl) indexEl.textContent = index + 1;
    textEl.style.opacity = '1';
  }, 350);
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  faktaCurrentIndex = index;
}

function setupFaktaBumi() {
  document.querySelectorAll('.fdot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(faktaInterval);
      showFakta(i);
      faktaInterval = setInterval(() => showFakta((faktaCurrentIndex + 1) % faktaList.length), 4000);
    });
  });
  faktaInterval = setInterval(() => showFakta((faktaCurrentIndex + 1) % faktaList.length), 4000);
}

// ================================
// DAMPAK KOLEKTIF
// ================================
function animateDampakKolektif() {
  const duration = 2200;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const el = id => document.getElementById(id);
    if (el('dkPohon')) el('dkPohon').textContent = Math.round(128470 * ease).toLocaleString('id-ID');
    if (el('dkKm')) el('dkKm').textContent = Math.round(3650000 * ease).toLocaleString('id-ID');
    if (el('dkJam')) el('dkJam').textContent = Math.round(20000000 * ease).toLocaleString('id-ID');
    if (el('dkTabung')) el('dkTabung').textContent = p >= 1 ? 'Rp1,5 T' : 'Rp' + (1.5 * ease).toFixed(1) + ' T';
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ================================
// FLOATING PARTICLES
// ================================
function generateParticles() {
  const container = document.getElementById('particlesBg');
  if (!container) return;
  const colors = ['rgba(184,255,0,', 'rgba(0,229,255,', 'rgba(255,225,0,'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const op = (Math.random() * 0.3 + 0.07).toFixed(2);
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%; bottom:-10px;
      background:${color}${op});
      box-shadow:0 0 ${size * 2}px ${color}0.4);
      animation-duration:${Math.random() * 20 + 15}s;
      animation-delay:${Math.random() * -30}s;
    `;
    container.appendChild(p);
  }
}

// ================================
// SCROLL REVEAL (IntersectionObserver)
// ================================
function setupScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay berdasarkan urutan elemen terlihat
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => obs.observe(el));
}

// ================================
// TYPED TEXT EFFECT — Hero subtitle
// ================================
function setupTypedText() {
  const el = document.querySelector('.hero-sub');
  if (!el) return;
  const fullText = el.textContent.trim();
  el.textContent = '';
  el.style.opacity = '1';
  el.style.borderRight = '2px solid rgba(243,112,30,0.7)';

  let i = 0;
  const speed = 28; // ms per karakter

  function type() {
    if (i < fullText.length) {
      el.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Hapus cursor setelah selesai
      setTimeout(() => { el.style.borderRight = 'none'; }, 800);
    }
  }
  // Mulai setelah hero entrance animation selesai
  setTimeout(type, 900);
}

// ================================
// INIT
// ================================
document.addEventListener('DOMContentLoaded', () => {
  generateParticles();
  setupFaktaBumi();
  animateDampakKolektif();
  setupTextarea();
  startIdleClock();
  setupIdleFeed();
  setupScrollReveal();
  setupTypedText();
  // Set initial earth score ke 0 saat halaman baru load
  updateEarthScore(0);
});