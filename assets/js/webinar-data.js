// ==========================================
// STRATIVO WEBINAR DATABASE & RENDERER
// ==========================================

const webinars = [
  {
    id: 1,
    icon: "🏢",
    title: "Certified Organizational Design Professional",
    date: "2-3 Mei 2026 | 18:00 - 20:00 WIB",
    category: "Live",
    status: "upcoming",
    priceOld: "Rp 450.000",
    priceNew: "Rp 250.000",
    isEarlyBird: true,
    earlyBirdDeadline: "30 April 2026",
    flyerUrl: "https://via.placeholder.com/600x400?text=Flyer+Org+Design",
    topics: "<strong>HARI 1: Strategic Alignment</strong><ul><li>The Star Model (Galbraith)</li><li>Diagnosa Gejala Misalignment</li><li>Designing for Strategy</li></ul><br><strong>HARI 2: Structure & Process</strong><ul><li>Structural Archetypes & Sizing</li><li>RAPID® Framework Decision Rights</li><li>Lateral Capability & AI Integration</li></ul>",
    benefits: "<ul><li>Sertifikat Certified Organizational Design</li><li>Template Star Model & RAPID Framework</li><li>Bergabung Komunitas Inc. Box</li></ul>",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Org%20Design"
  },
  {
    id: 2,
    icon: "📦",
    title: "Certified Warehouse Management Officer",
    date: "9-10 Mei 2026 | 18:00 - 20:00 WIB",
    category: "Live",
    status: "upcoming",
    priceOld: "Rp 450.000",
    priceNew: "Rp 250.000",
    isEarlyBird: true,
    earlyBirdDeadline: "5 Mei 2026",
    flyerUrl: "https://via.placeholder.com/600x400?text=Flyer+Warehouse",
    topics: "<ul><li>Fundamental Warehouse Operation</li><li>Inventory Accuracy & Control</li><li>Warehouse Process & Productivity</li><li>Safety, KPI, dan Problem Solving</li></ul>",
    benefits: "<ul><li>Sertifikat Certified WMO</li><li>Materi Slide Lengkap</li><li>Akses Rekaman Webinar</li></ul>",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Warehouse"
  },
  {
    id: 3,
    icon: "📈",
    title: "Certified Financial Analysis Fundamentals",
    date: "16 Mei 2026 | 18:00 - 20:00 WIB",
    category: "Live",
    status: "upcoming",
    priceOld: "Rp 250.000",
    priceNew: "Rp 150.000",
    isEarlyBird: true,
    earlyBirdDeadline: "12 Mei 2026",
    flyerUrl: "https://via.placeholder.com/600x400?text=Flyer+Financial",
    speaker: "Narasumber: Febri Ardiansyah, S.Ak, M.Ak",
    topics: "<ul><li>Penyajian Laporan Analisis Horizontal & Vertikal</li><li>Mempelajari Laporan Analisa Rasio Keuangan</li><li>Proses dan Jenis-jenis Budgeting</li><li>Template Laporan Keuangan & Ratio Calculator</li></ul>",
    benefits: "<ul><li>Sertifikat Certified Financial Analysis</li><li>Kertas Kerja Executable (Excel)</li><li>Bergabung dengan komunitas Inc. Box</li></ul>",
    topicUrl: "https://tally.so/r/681N1Y"
  },
  {
    id: 4,
    icon: "⚖️",
    title: "Certified Business Contract Practitioner",
    date: "11 Mei 2026 | 18:00 - 20:00 WIB",
    category: "Live",
    status: "upcoming",
    priceOld: "Rp 200.000",
    priceNew: "Rp 100.000",
    isEarlyBird: true,
    earlyBirdDeadline: "4 Mei 2026",
    flyerUrl: "https://via.placeholder.com/600x400?text=Flyer+Contract",
    speaker: "Narasumber: Dr. Suwardi S.H., M.Hum.",
    topics: "<ul><li>Prinsip Kontrak & UU Cipta Kerja (Omnibus Law)</li><li>Anatomi Kontrak Bisnis & Hak Kewajiban Para Pihak</li><li>Strategi Litigasi vs Non-Litigasi</li><li>Perlindungan Bagi Pekerja & Pengusaha</li></ul>",
    benefits: "<ul><li>Gelar Non-Akademik Certified Business Contract Practitioner</li><li>Akses Materi & Dokumen Pendukung</li><li>Rekaman Webinar & Tes/Quiz</li><li>Konsultasi Gratis Kontrak (Berlaku)</li></ul>",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Contract"
  }
];

// ==========================================
// RENDERING LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ Webinar Data Loaded:', webinars.length, 'items');
  
  const grid = document.getElementById('webinar-grid');
  const filters = document.querySelectorAll('.filter-btn');
  
  if (!grid) {
    console.error('❌ Element #webinar-grid tidak ditemukan!');
    return;
  }

  function render(filter = 'all') {
    grid.innerHTML = '';
    
    const data = webinars.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'early') return item.isEarlyBird && item.status === 'upcoming';
      return item.status === filter;
    });

    if (data.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:2rem; color:#666;">Tidak ada webinar di kategori ini.</p>';
      return;
    }

    data.forEach(w => {
      const isPast = w.status === 'past';
      const btnClass = isPast ? 'btn-w-register btn-disabled' : 'btn-w-register';
      const btnText = isPast ? 'Webinar Selesai' : 'Daftar Sekarang';
      const speakerHTML = w.speaker ? `<div style="font-size:0.85rem; color:#555; margin:0.5rem 0 1rem; font-style:italic;">🎙️ ${w.speaker}</div>` : '';
      
      const card = `
        <div class="w-card animate-fade-in-up">
          <div class="w-header">
            <div class="w-flyer" style="background-image: url('${w.flyerUrl}');"></div>
            <div style="padding:1rem 0 0;">
              <h3 class="w-title">${w.title}</h3>
              ${speakerHTML}
              <div class="w-badges">
                <span class="badge badge-live">${w.category}</span>
                ${w.isEarlyBird ? '<span class="badge badge-early">🔥 Early Bird</span>' : ''}
              </div>
            </div>
          </div>
          <div class="w-body">
            <div class="w-date">📅 ${w.date}</div>
            <div class="w-price">
              <span class="price-old">${w.priceOld}</span>
              <span class="price-new">${w.priceNew}</span>
            </div>
            <div class="w-details">
              <div class="w-detail-group">
                <h5>📚 Topik & Materi</h5>
                <div class="w-list">${w.topics}</div>
              </div>
              <div class="w-detail-group">
                <h5>🎁 Benefit</h5>
                <div class="w-list">${w.benefits}</div>
              </div>
            </div>
          </div>
          <div class="w-footer">
            <a href="${isPast ? '#' : w.topicUrl}" class="${btnClass}" ${isPast ? 'style="pointer-events:none;opacity:0.6;"' : 'target="_blank"'}>${btnText}</a>
          </div>
        </div>
      `;
      grid.innerHTML += card;
    });
  }

  // Filter Buttons Logic
  filters.forEach(btn => {
    btn.addEventListener('click', function() {
      filters.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      render(this.getAttribute('data-filter'));
    });
  });

  // Initial Render
  render();
});