(function () {
    const loader = document.getElementById("vtLoader");
    const percentEl = document.getElementById("vtPercent");
    const chars = loader ? Array.from(loader.querySelectorAll(".vt-word span")) : [];
    if (!loader || !percentEl) return;

    const duration = 1150;
    const start = performance.now();
    let leavingStarted = false;

    function updateLoader(now) {
      const elapsed = now - start;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      percentEl.textContent = String(progress);

      // Nyalakan huruf/karakter bertahap sesuai progres
      const activeCount = Math.ceil((progress / 100) * chars.length);
      chars.forEach((ch, i) => {
        const active = i < activeCount;
        ch.classList.toggle("is-active", active);
        if (ch.textContent !== "-") {
          ch.classList.toggle("is-accent", active && (i % 4 === 0));
        }
      });

      if (progress < 100) {
        requestAnimationFrame(updateLoader);
      } else if (!leavingStarted) {
        leavingStarted = true;
        setTimeout(() => {
          loader.classList.add("is-leaving");
          document.body.classList.add("page-entered");
          setTimeout(() => {
            loader.classList.add("is-done");
          }, 950);
        }, 160);
      }
    }

    requestAnimationFrame(updateLoader);
  })();