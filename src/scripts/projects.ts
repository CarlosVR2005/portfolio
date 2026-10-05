/** Filtros de proyectos (Todos / Equipo / Emprendimiento / Freelance). Delegado: se registra una vez. */
export function bindProjectFilters() {
  document.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('[data-filter]');
    if (!btn) return;
    const key = btn.dataset.filter!;
    btn
      .closest('[data-filters]')
      ?.querySelectorAll<HTMLButtonElement>('[data-filter]')
      .forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));

    let shown = 0;
    document.querySelectorAll<HTMLElement>('[data-project-grid] > .project-item').forEach((item) => {
      const match = key === 'all' || item.dataset.category === key;
      item.hidden = !match;
      if (!match) return;
      shown++;
      item.classList.add('is-in');
      item.classList.remove('filter-in');
      void item.offsetWidth; // reinicia la animación de entrada
      item.classList.add('filter-in');
    });

    const status = document.querySelector<HTMLElement>('[data-filter-status]');
    if (status) status.textContent = `${shown} ${status.dataset.label ?? ''}`.trim();
  });
}
