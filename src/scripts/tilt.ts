import { finePointer, reducedMotion, type Cleanup } from './env';

/** Inclinación 3D suave al pasar el ratón por [data-tilt]. Solo con puntero fino. */
export function initTilt(): Cleanup | void {
  if (!finePointer() || reducedMotion()) return;
  const MAX = 5;
  const offs: Cleanup[] = [];

  for (const el of document.querySelectorAll<HTMLElement>('[data-tilt]')) {
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = 'transform 0.12s ease-out';
        el.style.transform = `perspective(900px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    offs.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  }
  return () => offs.forEach((o) => o());
}
