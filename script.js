document.addEventListener('DOMContentLoaded', () => {
  // 1. Tahun otomatis di footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
  }

  // 3. Data Showcase Hero (Menggunakan bahan gambar & tautan asli Anda)
  const heroSlides = [
    {
      eyebrow: 'UNDANGAN DIGITAL, DENGAN SENTUHAN PERSONAL',
      title: 'Setiap momen<br>punya <em>ceritanya.</em>',
      desc: 'Rayakan momen berharga dengan undangan digital yang dirancang khusus untuk ceritamu. Elegan, praktis, dan mudah dibagikan kepada orang tersayang.',
      watermark: 'WEDDING',
      accent: '#8c6d53',
      frontImg: 'W2.jpg',
      backImg: 'W1.jpg',
      liveUrl: 'https://wedding-of-wira-dan-sueni.vercel.app/?to=',
      noteOne: 'Wira & Sueni — Glasses · Elegant',
      noteTwo: '✦ Made just for you',
      caption: 'Untuk hari istimewa, dari hati ke hati.',
      counter: '01 / 04 — WEDDING · WIRA & SUENI'
    },
    {
      eyebrow: 'MODERN & TIMELESS EDITION',
      title: 'Wira &amp; Ayu<br><em>Future Elegant.</em>',
      desc: 'Perpaduan tipografi modern dan tata letak bersih yang menghadirkan kesan hangat serta berkelas di setiap perangkat tamu.',
      watermark: 'ELEGANT',
      accent: '#5b6e74',
      frontImg: 'W1.jpg',
      backImg: 'wss.png',
      liveUrl: 'https://undangan-wira-ayu.vercel.app/?to=',
      noteOne: 'Wira & Ayu — Future · Elegant',
      noteTwo: '✦ Responsive Mobile & Desktop',
      caption: 'Detail acara, galeri, dan RSVP dalam satu tautan.',
      counter: '02 / 04 — WEDDING · WIRA & AYU'
    },
    {
      eyebrow: 'NATURE & SERENE ATMOSPHERE',
      title: 'Bayu &amp; Yanti<br><em>Nature Story.</em>',
      desc: 'Nuansa alam yang menenangkan dengan alur cerita personal, dirancang agar setiap tamu merasakan kehangatan hari bahagia.',
      watermark: 'NATURE',
      accent: '#4f6d5a',
      frontImg: 'BYY.png',
      backImg: 'waa.png',
      liveUrl: 'https://thewedding-bayu-yanti.vercel.app/',
      noteOne: 'Bayu & Yanti — Nature · Elegant',
      noteTwo: '✦ Personal Guest Name',
      caption: 'Sentuhan organik yang lembut dan berkesan.',
      counter: '03 / 04 — WEDDING · BAYU & YANTI'
    },
    {
      eyebrow: 'BESPOKE CUSTOM EXPERIENCE',
      title: 'Konsep Custom<br><em>Netflix Theme.</em>',
      desc: 'Wujudkan ide unik di luar template standar—mulai dari tema sinematik hingga konsep personal yang mencerminkan karakter kalian.',
      watermark: 'CUSTOM',
      accent: '#8b2626',
      frontImg: 'YRR.png',
      backImg: 'yr.png',
      liveUrl: 'https://yuda-regitha.vercel.app/?to=',
      noteOne: 'Custom C01 — Happy · Powerfull',
      noteTwo: '✦ 100% Custom Design',
      caption: 'Bebas berkreasi sesuai tema impianmu.',
      counter: '04 / 04 — CUSTOM · NETFLIX EDITION'
    }
  ];

  let currentSlide = 0;

  const heroSection = document.getElementById('home');
  const diagonalBg = document.getElementById('hero-diagonal-bg');
  const watermarkEl = document.getElementById('hero-watermark');
  const eyebrowEl = document.getElementById('hero-eyebrow');
  const titleEl = document.getElementById('hero-title');
  const descEl = document.getElementById('hero-desc');
  const frontImgEl = document.getElementById('hero-img-front');
  const backImgEl = document.getElementById('hero-img-back');
  const liveLinkEl = document.getElementById('hero-live-link');
  const noteOneEl = document.getElementById('hero-note-one');
  const noteTwoEl = document.getElementById('hero-note-two');
  const captionEl = document.getElementById('hero-caption');
  const counterEl = document.getElementById('hero-slide-counter');
  const dots = document.querySelectorAll('.v-dot');

  function updateHeroSlide(index) {
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    const data = heroSlides[currentSlide];

    // Animasi transisi halus pada konten
    titleEl.style.opacity = '0';
    titleEl.style.transform = 'translateY(8px)';
    frontImgEl.style.opacity = '0.35';

    setTimeout(() => {
      document.documentElement.style.setProperty('--accent', data.accent);
      if (diagonalBg) diagonalBg.style.backgroundColor = data.accent;
      if (watermarkEl) watermarkEl.textContent = data.watermark;
      if (eyebrowEl) eyebrowEl.innerHTML = `<span></span> ${data.eyebrow}`;
      if (titleEl) titleEl.innerHTML = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (frontImgEl) frontImgEl.src = data.frontImg;
      if (backImgEl) backImgEl.src = data.backImg;
      if (liveLinkEl) liveLinkEl.href = data.liveUrl;
      if (noteOneEl) noteOneEl.textContent = data.noteOne;
      if (noteTwoEl) noteTwoEl.textContent = data.noteTwo;
      if (captionEl) captionEl.textContent = data.caption;
      if (counterEl) counterEl.textContent = data.counter;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });

      titleEl.style.opacity = '1';
      titleEl.style.transform = 'translateY(0)';
      frontImgEl.style.opacity = '1';
    }, 180);
  }

  document.getElementById('hero-prev')?.addEventListener('click', () => {
    updateHeroSlide(currentSlide - 1);
  });

  document.getElementById('hero-next')?.addEventListener('click', () => {
    updateHeroSlide(currentSlide + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.slide);
      updateHeroSlide(idx);
    });
  });

  // 4. Filter Koleksi & Sinkronisasi dari Kartu Kategori
  const filterButtons = document.querySelectorAll('.filter-button');
  const designCards = document.querySelectorAll('.design-card');

  function applyFilter(category) {
    filterButtons.forEach((btn) => {
      const isMatch = btn.dataset.filter === category;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });

    designCards.forEach((card) => {
      const type = card.dataset.type;
      const shouldShow = category === 'Semua' || type === category;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  document.querySelectorAll('[data-category-link]').forEach((link) => {
    link.addEventListener('click', () => {
      applyFilter(link.dataset.categoryLink);
    });
  });

  // 5. Preview Dialog Modal
  const dialog = document.getElementById('preview-dialog');
  const dialogClose = dialog?.querySelector('.dialog-close');
  const dialogCategory = document.getElementById('dialog-category');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogStyle = document.getElementById('dialog-style');
  const dialogOpen = document.getElementById('dialog-open');

  document.querySelectorAll('.preview-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!dialog) return;
      dialogCategory.textContent = btn.dataset.category || 'INVITATION';
      dialogTitle.textContent = btn.dataset.title || '';
      dialogStyle.textContent = btn.dataset.style || '';
      dialogOpen.href = btn.dataset.url || '#';
      dialog.showModal();
    });
  });

  dialogClose?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  // 6. Form Konsultasi ke WhatsApp
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const eventType = document.getElementById('event').value;
    const date = document.getElementById('date').value.trim() || 'Belum ditentukan';
    const message = document.getElementById('message').value.trim();

    const text = `Halo Voluntaz Digital, saya *${name}* ingin konsultasi undangan digital.%0A%0A• *Jenis:* ${eventType}%0A• *Tanggal:* ${date}%0A• *Kebutuhan:* ${message}`;
    // Ganti nomor 6281234567890 dengan nomor WhatsApp bisnis Anda
    window.open(`https://wa.me/6282146068093?text=${text}`, '_blank', 'noopener');
  });
});
// Otomatis memilih paket di form konsultasi saat tombol paket diklik
  const eventSelect = document.getElementById('event');
  document.querySelectorAll('[data-select-package]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pkg = btn.getAttribute('data-select-package');
      if (eventSelect && pkg) {
        eventSelect.value = pkg;
      }
    });
  });
