// ==========================================
// DATABASE WEBINAR STRATIVO
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
    topics: "<strong>HARI 1: Strategic Alignment</strong><ul class='w-list'><li>The Star Model (Galbraith)</li><li>Diagnosa Gejala Misalignment</li><li>Designing for Strategy</li></ul><br><strong>HARI 2: Structure & Process</strong><ul class='w-list'><li>Structural Archetypes & Sizing</li><li>RAPID® Framework Decision Rights</li><li>Lateral Capability & AI Integration</li></ul>",
    benefits: "<ul class='w-list benefit'><li>Sertifikat Certified Organizational Design</li><li>Template Star Model & RAPID Framework</li><li>Bergabung Komunitas Inc. Box</li></ul>",
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
    topics: "<ul class='w-list'><li>Fundamental Warehouse Operation</li><li>Inventory Accuracy & Control</li><li>Warehouse Process & Productivity</li><li>Safety, KPI, dan Problem Solving</li></ul>",
    benefits: "<ul class='w-list benefit'><li>Sertifikat Certified WMO</li><li>Materi Slide Lengkap</li><li>Akses Rekaman Webinar</li></ul>",
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
    topics: "<ul class='w-list'><li>Penyajian Laporan Analisis Horizontal & Vertikal</li><li>Mempelajari Laporan Analisa Rasio Keuangan</li><li>Proses dan Jenis-jenis Budgeting</li><li>Template Laporan Keuangan & Ratio Calculator</li></ul>",
    benefits: "<ul class='w-list benefit'><li>Sertifikat Certified Financial Analysis</li><li>Kertas Kerja Executable (Excel)</li><li>Bergabung dengan komunitas Inc. Box</li></ul>",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Financial"
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
    topics: "<ul class='w-list'><li>Prinsip Kontrak & UU Cipta Kerja (Omnibus Law)</li><li>Anatomi Kontrak Bisnis & Hak Kewajiban Para Pihak</li><li>Strategi Litigasi vs Non-Litigasi</li><li>Perlindungan Bagi Pekerja & Pengusaha</li></ul>",
    benefits: "<ul class='w-list benefit'><li>Gelar Non-Akademik Certified Business Contract Practitioner</li><li>Akses Materi & Dokumen Pendukung</li><li>Rekaman Webinar & Tes/Quiz</li><li>Konsultasi Gratis Kontrak (Berlaku)</li></ul>",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Contract"
  }
];

// ==========================================
// LOGIC RENDERING WEBINAR
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Webinar script loaded');
  
  const gridContainer = document.getElementById('webinar-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (!gridContainer) {
    console.error('Element #webinar-grid tidak ditemukan!');
    return;
  }
  
  console.log('Webinars data:', webinars);
  
  function renderWebinars(filterType = 'all') {
    gridContainer.innerHTML = ''; 
    
    const filteredData = webinars.filter(item => {
      if (filterType === 'all') return true;
      if (filterType === 'early') return item.isEarlyBird && item.status === 'upcoming';
      return item.status === filterType;
    });
    
    console.log('Filtered webinars:', filteredData);
    
    if (filteredData.length === 0) {
      gridContainer.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#666; padding:40px;">Belum ada jadwal webinar di kategori ini.</p>';
      return;
    }
    
    filteredData.forEach(webinar => {
      let btnClass = "btn-w-register";
      let btnText = "Daftar Sekarang via WhatsApp";
      let priceHtml = '<span class="price-old">' + webinar.priceOld + '</span> <span class="price-new">' + webinar.priceNew + '</span>';
      
      if (webinar.status === 'past') {
        btnClass += " btn-disabled";
        btnText = "Webinar Selesai";
      }
      
      let speakerBadge = webinar.speaker ? '<div style="font-size:0.8rem; color:#666; margin-bottom:10px; font-style:italic;">🎙️ ' + webinar.speaker + '</div>' : '';
      
      const cardHTML = `
        <div class="w-card animate-fade-in-up">
          <div class="w-header">
            <div class="w-flyer" style="background-image: url('${webinar.flyerUrl}');"></div>
            <div style="padding:15px 0 0;">
              <h3 class="w-title">${webinar.title}</h3>
              ${speakerBadge}
              <div class="w-badges">
                <span class="badge badge-live">${webinar.category}</span>
                ${webinar.isEarlyBird ? '<span class="badge badge-early">🔥 Early Bird</span>' : ''}
              </div>
            </div>
          </div>
          
          <div class="w-body">
            <div class="w-date">📅 ${webinar.date}</div>
            <div class="w-price">${priceHtml}</div>
            
            <div class="w-details">
              <div class="w-detail-group">
                <h5>📚 Topik & Materi</h5>
                ${webinar.topics}
              </div>
              <div class="w-detail-group">
                <h5>🎁 Benefit</h5>
                ${webinar.benefits}
              </div>
            </div>
          </div>
          
          <div class="w-footer">
            <a href="${webinar.topicUrl}" target="_blank" class="${btnClass}">${btnText}</a>
          </div>
        </div>
      `;
      
      gridContainer.innerHTML += cardHTML;
    });
  }
  
  // Setup filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      console.log('Filter changed to:', filter);
      renderWebinars(filter);
    });
  });
  
  // Initial render
  renderWebinars();
});
