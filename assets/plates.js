// Gunmetal plates: add corner screws, move the light with the pointer, fill the on-site progress bar
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.plate').forEach((el, i) => {
    el.style.setProperty('--delay', (i * 0.7) + 's');
    if (!el.hasAttribute('data-no-screws')) {
      for (let n = 1; n <= 4; n++) {
        const s = document.createElement('span');
        s.className = 'screw s' + n;
        s.setAttribute('aria-hidden', 'true');
        s.style.setProperty('--r', (20 + ((i * 37 + n * 53) % 70)) + 'deg');
        el.appendChild(s);
      }
    }
    if (reduce) return;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--mx', '30%'); el.style.setProperty('--my', '0%'); });
  });

  // On site now: share of the construction schedule elapsed today
  const fill = document.getElementById('osFill');
  if (fill) {
    const start = new Date(2026, 3, 1), end = new Date(2027, 6, 31), now = new Date();
    const pct = Math.round(Math.min(1, Math.max(0, (now - start) / (end - start))) * 100);
    const today = document.getElementById('osToday');
    document.getElementById('osNum').textContent = pct + '%';
    document.getElementById('osBar').setAttribute('aria-label', pct + '% of the construction schedule has elapsed');
    const go = () => requestAnimationFrame(() => { fill.style.width = pct + '%'; today.style.left = pct + '%'; today.style.opacity = 1; });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { go(); io.disconnect(); } });
      io.observe(fill);
    } else go();
  }
})();
