import type { Cleanup } from './env';

/** Revelado al hacer scroll: añade .is-in a cada [data-reveal] al entrar en pantalla (ver global.css). */
export function initReveal(): Cleanup | void {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    // Margen superior enorme: lo que ya quedó por encima de la pantalla (scroll rápido, salto a un ancla)
    // cuenta como visto y se muestra. Solo se espera a lo que entra por abajo.
    { rootMargin: '100000px 0px -8% 0px', threshold: 0 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Línea temporal: la línea se dibuja con el scroll y los hitos se "encienden" al pasar. */
export function initTimeline(): Cleanup | void {
  const wrap = document.querySelector<HTMLElement>('[data-timeline]');
  const bar = wrap?.querySelector<HTMLElement>('[data-timeline-progress]');
  if (!wrap || !bar) return;
  const items = [...wrap.querySelectorAll<HTMLElement>('[data-timeline-item]')];
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = wrap.getBoundingClientRect();
    const mark = innerHeight * 0.62;
    const progress = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));
    bar.style.setProperty('--progress', progress.toFixed(4));
    for (const item of items) {
      const top = item.getBoundingClientRect().top + 24;
      item.classList.toggle('is-lit', top < mark);
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  update();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  return () => {
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onScroll);
  };
}
