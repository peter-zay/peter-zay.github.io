// Peter's Gantt — expand/collapse builder summary rows
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.gantt .tog');
  const set = (btn, open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.getAttribute('aria-controls').split(' ').forEach((id) => {
      const row = document.getElementById(id);
      if (row) row.hidden = !open;
    });
  };
  toggles.forEach((btn) => {
    btn.addEventListener('click', () => set(btn, btn.getAttribute('aria-expanded') !== 'true'));
  });
  document.querySelectorAll('[data-all]').forEach((b) => {
    b.addEventListener('click', () => toggles.forEach((t) => set(t, b.dataset.all === 'expand')));
  });
});
