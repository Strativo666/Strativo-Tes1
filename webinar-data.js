// ==========================================
// DATABASE WEBINAR STRATIVO
// ==========================================
// Instruksi: 
// 1. Tambahkan object baru di dalam array 'webinars' untuk nambah webinar.
// 2. Hapus object untuk menghapus webinar.
// 3. Ubah status 'status' jadi 'upcoming' atau 'past'.
// ==========================================

const webinars = [
  {
    id: 1,
    icon: "🏢",
    title: "Certified Organizational Design Professional",
    date: "2-3 Mei 2026 | 18:00 - 20:00 WIB",
    category: "Live",
    status: "upcoming", // 'upcoming' atau 'past'
    priceOld: "Rp 450.000",
    priceNew: "Rp 250.000",
    isEarlyBird: true,
    earlyBirdDeadline: "30 April 2026",
    description: "Pelajari The Star Model, Diagnosis Misalignment, dan RAPID Framework untuk struktur organisasi yang agile.",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Organizational%20Design"
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
    description: "Fundamental Warehouse Operation, Inventory Accuracy, dan Productivity KPI.",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Warehouse%20Management"
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
    description: "Analisa Rasio, Laporan Keuangan Horizontal/Vertikal, dan Budgeting. Narasumber: Febri Ardiansyah, M.Ak.",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Financial%20Analysis"
  },
  {
    id: 4,
    icon: "📜",
    title: "Certified Business Contract Practitioner",
    date: "11 Mei 2026 | 18:00 - 20:00 WIB",
    category: "Live",
    status: "upcoming",
    priceOld: "Rp 200.000",
    priceNew: "Rp 100.000",
    isEarlyBird: true,
    earlyBirdDeadline: "4 Mei 2026",
    description: "Prinsip Kontrak, UU Cipta Kerja, dan Strategi Litigasi. Narasumber: Dr. Suwardi S.H., M.Hum.",
    topicUrl: "https://wa.me/6282124198198?text=Halo%20saya%20ingin%20mendaftar%20Webinar%20Business%20Contract"
  }
];

// ==========================================
// LOGIC RENDERING (JANGAN DIUBAH KECUALI PAHAM JS)
// ==========================================

const gridContainer = document.getElementById('webinar-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderWebinars(filterType = 'all') {
  gridContainer.innerHTML = ''; // Kosongkan dulu

  const filteredData = webinars.filter(item => {
    if (filterType === 'all') return true;
    if (filterType === 'early') return item.isEarlyBird && item.status === 'upcoming';
    return item.status === filterType;
  });

  if (filteredData.length === 0) {
    gridContainer.innerHTML = '<p style="text-align:center; grid-column:1/-1;">Belum ada jadwal webinar di kategori ini.</p>';
    return;
  }

  filteredData.forEach(webinar => {
    // Tentukan Status Tombol
    let btnClass = "btn-w-register";
    let btnText = "Daftar Sekarang via WhatsApp";
    if (webinar.status === 'past') {
      btnClass += " btn-disabled";
      btnText = "Webinar Selesai";
    }

    // Buat HTML Card
    const cardHTML = `
      <div class="w-card animate-fade-in-up">
        <div class="w-header">
          <span class="w-category">${webinar.icon}</span>
          <h3 class="w-title">${webinar.title}</h3>
          <div class="w-badges">
            <span class="badge badge-live">${webinar.category}</span>
            ${webinar.isEarlyBird ? '<span class="badge badge-early">🔥 Early Bird</span>' : ''}
          </div>
        </div>
        <div class="w-body">
          <div class="w-date">📅 ${webinar.date}</div>
          <div class="w-price">
            <span class="price-old">${webinar.priceOld}</span>
            <span class="price-new">${webinar.priceNew}</span>
          </div>
          <p class="w-desc">${webinar.description}</p>
        </div>
        <div class="w-footer">
          <a href="${webinar.topicUrl}" target="_blank" class="${btnClass}">${btnText}</a>
        </div>
      </div>
    `;
    gridContainer.innerHTML += cardHTML;
  });
}

// Event Listener untuk Filter
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Hapus active class dari semua tombol
    filterButtons.forEach(b => b.classList.remove('active'));
    // Tambah active ke tombol yang diklik
    btn.classList.add('active');
    // Render ulang
    renderWebinars(btn.dataset.filter);
  });
});

// Jalankan saat halaman load
document.addEventListener('DOMContentLoaded', () => {
  renderWebinars();
});
