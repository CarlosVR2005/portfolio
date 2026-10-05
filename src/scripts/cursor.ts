import { finePointer, reducedMotion } from './env';

/** Anillo que sigue al cursor (el cursor nativo se mantiene). Solo puntero fino y sin reduced-motion. */
export function bindCursor() {
  if (!finePointer() || reducedMotion()) return;
  const root = document.documentElement;
  const HOVER = 'a, button, summary, label, [data-cursor-hover]';
  let x = -100;
  let y = -100;
  let cx = x;
  let cy = y;
  let raf = 0;

  const loop = () => {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    const el = document.querySelector<HTMLElement>('[data-cursor]');
    if (el) el.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
  };

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      root.classList.add('has-cursor');
      if (!raf) raf = requestAnimationFrame(loop);
    },
    { passive: true },
  );
  document.addEventListener('pointerover', (e) => {
    root.classList.toggle('cursor-hover', !!(e.target as Element).closest?.(HOVER));
  });
  root.addEventListener('pointerleave', () => root.classList.remove('has-cursor'));
}
