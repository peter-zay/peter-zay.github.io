// Peter Zay — portfolio interactions
document.addEventListener('DOMContentLoaded', () => {
  // Project filters
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.card');

  chips.forEach((chip) => {
    const f = chip.dataset.filter;
    const n = f === 'all' ? cards.length : document.querySelectorAll(`.card[data-type~="${f}"]`).length;
    const count = chip.querySelector('.count');
    if (count) count.textContent = n;

    chip.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      cards.forEach((card) => {
        const types = (card.dataset.type || '').split(' ');
        card.hidden = !(f === 'all' || types.includes(f));
      });
    });
  });

  // Email link (assembled here to keep it away from spam bots)
  const user = 'peter.zay';
  const domain = 'gmail.com';
  document.querySelectorAll('[data-email]').forEach((el) => {
    el.href = `mailto:${user}@${domain}`;
    if (el.dataset.email === 'show') el.textContent = `${user}@${domain}`;
  });

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }
});
