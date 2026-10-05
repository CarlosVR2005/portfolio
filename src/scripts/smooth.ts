import type Lenis from 'lenis';
import { reducedMotion, finePointer, NAV_OFFSET, type Cleanup } from './env';

/** Instancia actual de Lenis (null con reduced-motion o en táctil). */
export let lenis: Lenis | null = null;

/**
 * Scroll suave con rueda de ratón. En táctil el scroll nativo ya es suave, así que no se carga.
 * Se importa en diferido y en tiempo libre para no bloquear la carga inicial.
 */
export function initSmooth(): Cleanup | void {
  if (reducedMotion() || !finePointer()) return;
  let cancelled = false;
  const start = async () => {
    const { default: LenisCtor } = await import('lenis');
    if (cancelled) return;
    lenis = new LenisCtor({ autoRaf: true, lerp: 0.12 });
  };
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
  idle(() => void start());
  return () => {
    cancelled = true;
    lenis?.destroy();
    lenis = null;
  };
}

/** Desplaza hasta un elemento y le pasa el foco (accesible con teclado y lector de pantalla). */
export function scrollToTarget(target: HTMLElement) {
  const focus = () => {
    if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
  };
  if (lenis) {
    lenis.scrollTo(target, { offset: -NAV_OFFSET + 8, duration: 1.1, onComplete: focus });
  } else {
    target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    focus();
  }
}

/** Enlaces internos (#ancla) en la misma página: scroll suave + foco. Se registra una sola vez. */
export function bindAnchors() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname.replace(/\/$/, '') !== location.pathname.replace(/\/$/, '')) return;
    const id = decodeURIComponent(url.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    history.pushState(null, '', `#${id}`);
    scrollToTarget(target);
  });
}
