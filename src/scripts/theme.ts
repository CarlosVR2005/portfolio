import { reducedMotion } from './env';

type Theme = 'light' | 'dark';
const root = document.documentElement;

function apply(theme: Theme) {
  root.classList.add('theme-anim');
  root.dataset.theme = theme;
  window.setTimeout(() => root.classList.remove('theme-anim'), 450);
  document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

/** Botón sol/luna. Guarda la elección; si no hay elección, sigue al sistema. */
export function bindTheme() {
  document.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-theme-toggle]');
    if (!btn) return;
    const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', next);
    } catch {}

    // Revelado circular desde el botón (View Transitions API), si está disponible.
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || reducedMotion()) return apply(next);
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('theme-vt');
    const vt = doc.startViewTransition(() => {
      root.dataset.theme = next;
      document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
    });
    vt.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 600, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        ).finished,
      )
      .catch(() => {})
      .finally(() => root.classList.remove('theme-vt'));
  });

  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {}
    if (!stored) apply(e.matches ? 'dark' : 'light');
  });
}
