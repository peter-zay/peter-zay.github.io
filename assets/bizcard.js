// Homepage business card: tap or click to flip (QR code on the back), tilt and light follow the pointer
(() => {
  const card = document.getElementById('bc');
  if (!card) return;
  const stage = card.parentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let flipping = false;

  function flip() {
    // let the full flip animation play even while the pointer is tilting the card
    flipping = true;
    card.classList.remove('tracking');
    card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', card.classList.contains('flipped'));
    setTimeout(() => { flipping = false; }, 800);
  }
  card.addEventListener('click', flip);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });

  stage.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const r = card.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    stage.style.setProperty('--mx', (px * 100) + '%');
    stage.style.setProperty('--my', (py * 100) + '%');
    if (reduce || flipping) return;
    card.classList.add('tracking');
    stage.style.setProperty('--ry', ((px - .5) * 14) + 'deg');
    stage.style.setProperty('--rx', ((.5 - py) * 10) + 'deg');
  });
  stage.addEventListener('pointerleave', () => {
    card.classList.remove('tracking');
    stage.style.setProperty('--rx', '0deg'); stage.style.setProperty('--ry', '0deg');
  });
})();
