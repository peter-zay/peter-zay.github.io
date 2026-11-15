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

  // Visitor counter (GoatCounter). Set data-goatcounter="yourcode" on <body> to turn it on.
  const gc = document.body.dataset.goatcounter;
  if (gc) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://gc.zgo.at/count.js';
    tag.dataset.goatcounter = `https://${gc}.goatcounter.com/count`;
    document.head.appendChild(tag);
    fetch(`https://${gc}.goatcounter.com/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const el = document.getElementById('visits');
        if (d && d.count && el) { el.textContent = ` · ${d.count} visitors`; el.hidden = false; }
      })
      .catch(() => {});
  }

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
