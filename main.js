document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Before/After Slider Logic
  // Drag only starts when the user grabs the handle arrow — not the image.
  const sliders = document.querySelectorAll('.ba-slider');
  sliders.forEach(slider => {
    let isDown = false;
    const afterImg = slider.querySelector('.img-after');
    const handle   = slider.querySelector('.handle');

    const moveSlider = (e) => {
      if (!isDown) return;
      e.preventDefault(); // prevent page scroll while dragging on touch
      let rect = slider.getBoundingClientRect();
      let clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      let x = clientX - rect.left;
      let percent = Math.max(0, Math.min(x / rect.width * 100, 100));
      afterImg.style.width = percent + '%';
      handle.style.left   = percent + '%';
    };

    // ── Start drag ONLY on the handle ──────────────────────────────────────
    handle.addEventListener('mousedown',  (e) => { isDown = true; e.preventDefault(); });
    handle.addEventListener('touchstart', (e) => { isDown = true; }, { passive: true });

    // ── Track movement across the full slider ──────────────────────────────
    slider.addEventListener('mousemove', moveSlider);
    slider.addEventListener('touchmove',  moveSlider, { passive: false });

    // ── Release anywhere ───────────────────────────────────────────────────
    window.addEventListener('mouseup',  () => { isDown = false; });
    window.addEventListener('touchend', () => { isDown = false; });
  });
});


