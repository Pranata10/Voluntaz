/* Voluntaz Digital — interactions */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
      });
    });
  }

  // Filter collection cards by category.
  const filterButtons = document.querySelectorAll("[data-filter]");
  const designCards = document.querySelectorAll(".design-card[data-type]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      designCards.forEach((card) => {
        card.hidden = selected !== "Semua" && card.dataset.type !== selected;
      });
    });
  });

  // Category cards choose the matching collection filter.
  document.querySelectorAll("[data-category-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const category = link.dataset.categoryLink;
      const button = document.querySelector(`[data-filter="${CSS.escape(category)}"]`);
      if (button) button.click();
    });
  });

  // Design preview modal. The complete invitation is opened via the dialog button.
  const dialog = document.querySelector("#preview-dialog");
  const dialogCategory = document.querySelector("#dialog-category");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogStyle = document.querySelector("#dialog-style");
  const dialogDesign = document.querySelector("#dialog-design");
  const dialogOpen = document.querySelector("#dialog-open");
  const closeDialog = document.querySelector(".dialog-close");

  const colors = {
    "Wedding": ["#d9dfd0", "#4d614c"],
    "Birthday": ["#efd7d5", "#895c5d"],
    "Tiga Bulanan": ["#d9e4e8", "#587078"],
    "Adat & Lainnya": ["#e7d5c2", "#7b5941"]
  };

  document.querySelectorAll("[data-preview-title]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.previewCategory || "Wedding";
      dialogCategory.textContent = `${category.toUpperCase()} INVITATION`;
      dialogTitle.textContent = button.dataset.previewTitle || "Undangan Digital";
      dialogStyle.textContent = button.dataset.previewStyle || "Made just for you";
      dialogOpen.href = button.dataset.invitation || "#kontak";
      const [background, foreground] = colors[category] || colors.Wedding;
      dialogDesign.style.backgroundColor = background;
      dialogDesign.style.color = foreground;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      document.body.classList.add("dialog-open");
    });
  });

  function closePreview() {
    if (dialog && typeof dialog.close === "function" && dialog.open) dialog.close();
    else if (dialog) dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
  }

  closeDialog?.addEventListener("click", closePreview);
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) closePreview();
  });
  dialog?.addEventListener("close", () => document.body.classList.remove("dialog-open"));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") document.body.classList.remove("dialog-open");
  });

  // Scroll reveal, with a fallback for browsers without IntersectionObserver.
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  // Footer year.
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Consultation form: use mailto until a backend/WhatsApp integration is configured.
  const contactForm = document.querySelector("#contact-form");
  const formNote = document.querySelector("#form-note");
  const BUSINESS_EMAIL = "ganti-dengan-email-anda@example.com"; // GANTI sebelum website dipublikasikan.

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const eventType = String(data.get("event") || "").trim();
    const date = String(data.get("date") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !eventType || !message) {
      if (formNote) formNote.textContent = "Mohon lengkapi nama, jenis acara, dan kebutuhan Anda.";
      return;
    }
    if (BUSINESS_EMAIL === "ganti-dengan-email-anda@example.com") {
      if (formNote) formNote.textContent = "Form belum dikonfigurasi. Buka script.js dan ganti BUSINESS_EMAIL dengan email bisnis Anda.";
      return;
    }

    const subject = encodeURIComponent(`Konsultasi Undangan Digital — ${eventType}`);
    const body = encodeURIComponent(
      `Nama: ${name}\nJenis acara: ${eventType}\nTanggal acara: ${date || "Belum ditentukan"}\n\nKebutuhan:\n${message}`
    );
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Set tahun otomatis di footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("open");
    });

    // Tutup menu saat link diklik di HP
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Filter Koleksi Desain
  const filterButtons = document.querySelectorAll(".filter-button");
  const designCards = document.querySelectorAll(".collection-grid .design-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      const filterValue = button.getAttribute("data-filter");

      designCards.forEach(card => {
        const cardType = card.getAttribute("data-type");
        if (filterValue === "Semua" || cardType === filterValue) {
          card.removeAttribute("hidden");
        } else {
          card.setAttribute("hidden", "true");
        }
      });
    });
  });

  // 4. Form Kontak ke WhatsApp
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      // Ambil nilai dari form
      const name = document.getElementById("name").value.trim();
      const eventType = document.getElementById("event").value;
      const date = document.getElementById("date").value.trim() || "Belum ditentukan";
      const message = document.getElementById("message").value.trim();

      // Masukkan nomor WhatsApp kamu di sini (Gunakan format internasional tanpa tanda +, contoh: 6281234567890)
      const phoneNumber = "6282146068093"; // <-- GANTI DENGAN NOMOR WA KAMU

      // Format pesan yang akan dikirim ke WhatsApp
      const waText = 
        `Halo Voluntaz Digital, saya ingin berkonsultasi mengenai pembuatan undangan.\n\n` +
        `*Nama:* ${name}\n` +
        `*Jenis Acara:* ${eventType}\n` +
        `*Tanggal Acara:* ${date}\n` +
        `*Keterangan/Pesan:* ${message}`;

      // Encode teks agar aman URL
      const encodedMessage = encodeURIComponent(waText);

      // Buka link WhatsApp
      const waURL = `https://wa.me/${6282146068093}?text=${encodedMessage}`;
      window.open(waURL, "_blank");
    });
  }

  // 5. Animasi Scroll (Reveal)
  const revealElements = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add("is-visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// Tambahkan delay bertahap untuk item dalam grid
document.querySelectorAll('.category-card, .design-card, .step-card, .benefit-card').forEach((el, index) => {
  el.style.transitionDelay = `${(index % 3) * 0.12}s`;
});

/* Voluntaz Digital — Interactions & WhatsApp Integration */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Footer Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
      });
    });
  }

  // 3. Filter Koleksi Desain
  const filterButtons = document.querySelectorAll(".filter-button");
  const designCards = document.querySelectorAll(".collection-grid .design-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      const filterValue = button.getAttribute("data-filter");

      designCards.forEach((card) => {
        const cardType = card.getAttribute("data-type");
        if (filterValue === "Semua" || cardType === filterValue) {
          card.removeAttribute("hidden");
        } else {
          card.setAttribute("hidden", "true");
        }
      });
    });
  });

  // 4. Category Cards Link to Filter
  document.querySelectorAll("[data-category-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const category = link.dataset.categoryLink;
      const button = document.querySelector(`[data-filter="${CSS.escape(category)}"]`);
      if (button) button.click();
    });
  });

  // 5. Form Konsultasi Langsung ke WhatsApp
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const eventType = document.getElementById("event").value;
      const date = document.getElementById("date").value.trim() || "Belum ditentukan";
      const message = document.getElementById("message").value.trim();

      // Nomor WhatsApp aktif kamu
      const phoneNumber = "6282146068093";

      const waText = 
        `Halo Voluntaz Digital, saya ingin berkonsultasi mengenai pembuatan undangan.\n\n` +
        `*Nama:* ${name}\n` +
        `*Jenis Acara:* ${eventType}\n` +
        `*Tanggal Acara:* ${date}\n` +
        `*Keterangan/Pesan:* ${message}`;

      const encodedMessage = encodeURIComponent(waText);
      const waURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      window.open(waURL, "_blank");
    });
  }

  // 6. Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  // Staggered Delay untuk Grid Items
  document.querySelectorAll('.category-card, .design-card, .step-card, .benefit-card').forEach((el, index) => {
    el.style.transitionDelay = `${(index % 3) * 0.12}s`;
  });
});